import { z } from "zod";
import { CONTACT } from "../../shared/const.js";
import { notifyOwner } from "./notification.js";
import { publicProcedure, router } from "./trpc.js";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(120),
  email: z.string().trim().email("E-mail inválido").max(180),
  phone: z.string().trim().max(40).optional().default(""),
  company: z.string().trim().max(160).optional().default(""),
  subject: z.string().trim().min(1, "Selecione um assunto").max(120),
  message: z.string().trim().min(10, "Mensagem muito curta").max(4000),
});

const newsletterSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(180),
  source: z.string().trim().max(60).optional().default("insights"),
});

const resourceSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(180),
  resourceSlug: z.string().trim().min(1).max(120),
  resourceTitle: z.string().trim().min(1).max(200),
});

function truncate(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

async function safeNotify(title: string, content: string): Promise<boolean> {
  try {
    return await notifyOwner({ title, content });
  } catch (err) {
    console.error("[contactRouter] notifyOwner failed:", err);
    return false;
  }
}

export const contactRouter = router({
  send: publicProcedure
    .input(contactSchema)
    .mutation(async ({ input }) => {
      const title = truncate(
        `[Contato site] ${input.subject} — ${input.name}`,
        200,
      );
      const content = [
        `Nome: ${input.name}`,
        `E-mail: ${input.email}`,
        input.phone ? `Telefone/WhatsApp: ${input.phone}` : null,
        input.company ? `Empresa: ${input.company}` : null,
        `Assunto: ${input.subject}`,
        "",
        "Mensagem:",
        input.message,
        "",
        "---",
        `Entregar em: ${CONTACT.email}`,
        `Canal: formulário /contato`,
      ]
        .filter((line): line is string => line !== null)
        .join("\n");

      const delivered = await safeNotify(title, content);
      return { success: delivered } as const;
    }),

  subscribeNewsletter: publicProcedure
    .input(newsletterSchema)
    .mutation(async ({ input }) => {
      const title = `[Newsletter Change Pulse] ${input.email}`;
      const content = [
        `Novo cadastro na newsletter Change Pulse.`,
        "",
        `E-mail: ${input.email}`,
        `Origem: ${input.source}`,
        "",
        "---",
        `Entregar em: ${CONTACT.email}`,
      ].join("\n");

      const delivered = await safeNotify(title, content);
      return { success: delivered } as const;
    }),

  requestResource: publicProcedure
    .input(resourceSchema)
    .mutation(async ({ input }) => {
      const title = `[Download recurso] ${truncate(input.resourceTitle, 140)}`;
      const content = [
        `Solicitação de download de recurso gratuito.`,
        "",
        `Recurso: ${input.resourceTitle} (${input.resourceSlug})`,
        `E-mail: ${input.email}`,
        "",
        "---",
        `Entregar em: ${CONTACT.email}`,
      ].join("\n");

      const delivered = await safeNotify(title, content);
      return { success: delivered } as const;
    }),
});
