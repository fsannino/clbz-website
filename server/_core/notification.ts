import { TRPCError } from "@trpc/server";
import { Resend } from "resend";
import { CONTACT } from "../../shared/const.js";
import { ENV } from "./env.js";

export type NotificationPayload = {
  title: string;
  content: string;
};

const TITLE_MAX_LENGTH = 1200;
const CONTENT_MAX_LENGTH = 20000;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

function validatePayload(input: NotificationPayload): NotificationPayload {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required.",
    });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required.",
    });
  }
  const title = input.title.trim();
  const content = input.content.trim();
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`,
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`,
    });
  }
  return { title, content };
}

let _resend: Resend | null = null;
function getResend(): Resend | null {
  if (!ENV.resendApiKey) return null;
  if (!_resend) _resend = new Resend(ENV.resendApiKey);
  return _resend;
}

/**
 * Sends a notification email to the project owner(s) via Resend.
 * Returns true if the request was accepted, false on soft failure
 * (misconfigured or upstream error) so callers can still complete
 * the user-facing flow without blowing up.
 */
export async function notifyOwner(
  payload: NotificationPayload,
): Promise<boolean> {
  const { title, content } = validatePayload(payload);

  const resend = getResend();
  if (!resend) {
    console.warn("[Notification] RESEND_API_KEY not configured");
    return false;
  }

  const from = ENV.resendFrom || `collab:Z <no-reply@${defaultDomain()}>`;
  const to = ENV.notifyEmails.length > 0 ? ENV.notifyEmails : [CONTACT.email];

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: title,
      text: content,
      html: renderHtml(title, content),
      replyTo: CONTACT.email,
    });
    if (error) {
      console.warn("[Notification] Resend error:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Unexpected Resend failure:", error);
    return false;
  }
}

function defaultDomain(): string {
  const email = CONTACT.email;
  const at = email.lastIndexOf("@");
  return at >= 0 ? email.slice(at + 1) : "clbz.com.br";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHtml(title: string, content: string): string {
  const safeTitle = escapeHtml(title);
  const body = escapeHtml(content).replace(/\n/g, "<br />");
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle}</title>
</head>
<body style="margin:0;padding:0;background:#F0EDE8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1b1b1b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F0EDE8;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(11,61,92,0.08);">
          <tr>
            <td style="background:#0B3D5C;padding:20px 28px;color:#ffffff;font-family:Georgia,serif;font-size:20px;letter-spacing:0.5px;">
              collab:Z
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <h1 style="margin:0 0 16px 0;font-size:18px;color:#0B3D5C;font-weight:600;line-height:1.35;">${safeTitle}</h1>
              <div style="font-size:14px;line-height:1.6;color:#333333;white-space:normal;">${body}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px;background:#f7f5f1;color:#6b6b6b;font-size:12px;border-top:1px solid #e5e1d9;">
              Enviado automaticamente por collab:Z — responda este e-mail para contatar o remetente.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
