import { z } from "zod";
import { CONTACT } from "@shared/const";
import { ENV } from "./env.js";
import { notifyOwner } from "./notification.js";
import { publicProcedure, router } from "./trpc.js";

const requestSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(120),
  email: z.string().trim().email("E-mail inválido").max(180),
  company: z.string().trim().max(160).optional().default(""),
});

function truncate(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

function resolveTier(email: string): "admin" | "client" | "pending" {
  const lower = email.toLowerCase();
  if (ENV.adminEmails.includes(lower)) return "admin";
  const domain = lower.split("@")[1];
  if (domain && ENV.autoApproveDomains.includes(domain)) return "client";
  return "pending";
}

export const accessRequestRouter = router({
  notify: publicProcedure
    .input(requestSchema)
    .mutation(async ({ input }) => {
      const tier = resolveTier(input.email);
      const statusLabel =
        tier === "admin"
          ? "admin (auto)"
          : tier === "client"
            ? "cliente (auto-aprovado por domínio)"
            : "pendente — requer aprovação manual";

      const title = truncate(
        `[Área do Cliente] Pedido de acesso — ${input.name}`,
        200,
      );
      const content = [
        "Novo pedido de acesso à Área do Cliente.",
        "",
        `Nome: ${input.name}`,
        `E-mail: ${input.email}`,
        input.company ? `Empresa: ${input.company}` : null,
        `Status inicial: ${statusLabel}`,
        "",
        "---",
        `Entregar em: ${CONTACT.email}`,
        `Canal: formulário /signup`,
      ]
        .filter((line): line is string => line !== null)
        .join("\n");

      try {
        const delivered = await notifyOwner({ title, content });
        return { success: delivered, tier } as const;
      } catch (err) {
        console.error("[accessRequestRouter] notifyOwner failed:", err);
        return { success: false, tier } as const;
      }
    }),
});
