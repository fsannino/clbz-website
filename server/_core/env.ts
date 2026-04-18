const adminEmailsRaw =
  process.env.ADMIN_EMAILS ?? "fsannino@clbz.com.br,fsannino@collabz.com.br";
const autoApproveRaw = process.env.AUTO_APPROVE_DOMAINS ?? "";
const notifyEmailsRaw = process.env.NOTIFY_EMAILS ?? "";

export const ENV = {
  databaseUrl: process.env.DATABASE_URL ?? "",
  supabaseUrl: process.env.SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  resendFrom: process.env.RESEND_FROM ?? "",
  notifyEmails: notifyEmailsRaw
    .split(",")
    .map(s => s.trim())
    .filter(Boolean),
  adminEmails: adminEmailsRaw
    .split(",")
    .map(s => s.trim().toLowerCase())
    .filter(Boolean),
  autoApproveDomains: autoApproveRaw
    .split(",")
    .map(s => s.trim().toLowerCase().replace(/^@/, ""))
    .filter(Boolean),
  isProduction: process.env.NODE_ENV === "production",
};
