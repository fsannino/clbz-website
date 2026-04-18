const adminEmailsRaw = process.env.ADMIN_EMAILS ?? "fsannino@clbz.com.br,fsannino@collabz.com.br";
const autoApproveRaw = process.env.AUTO_APPROVE_DOMAINS ?? "";

export const ENV = {
  databaseUrl: process.env.DATABASE_URL ?? "",
  supabaseUrl: process.env.SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  adminEmails: adminEmailsRaw
    .split(",")
    .map(s => s.trim().toLowerCase())
    .filter(Boolean),
  autoApproveDomains: autoApproveRaw
    .split(",")
    .map(s => s.trim().toLowerCase().replace(/^@/, ""))
    .filter(Boolean),
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
};
