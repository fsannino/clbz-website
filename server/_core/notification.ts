import { TRPCError } from "@trpc/server";
import { Resend } from "resend";
import { CONTACT } from "@shared/const";
import { ENV } from "./env";

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
