export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = 'Please login (10001)';
export const NOT_ADMIN_ERR_MSG = 'You do not have required permission (10002)';

// Contact channels (single source of truth).
// Any update to phone/email should go here.
export const CONTACT = {
  email: "fsannino@clbz.com.br",
  whatsappNumber: "5511989991358",
  whatsappDisplay: "+55 (11) 98999-1358",
  whatsappDefaultMessage:
    "Olá! Gostaria de saber mais sobre os serviços da collab:Z.",
} as const;

export function buildWhatsAppLink(message: string = CONTACT.whatsappDefaultMessage) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
