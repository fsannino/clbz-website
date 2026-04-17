// Single source of truth for static routes + content slugs used by the
// sitemap/robots Vite plugin. When adding a new insight article or
// service page, update the arrays below.

export const SITE_BASE_URL = "https://www.clbz.com.br";

export const STATIC_ROUTES: Array<{ path: string; priority: number; changefreq?: string }> = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/sobre", priority: 0.8, changefreq: "monthly" },
  { path: "/servicos", priority: 0.9, changefreq: "monthly" },
  { path: "/metodologia", priority: 0.7, changefreq: "monthly" },
  { path: "/educacao", priority: 0.7, changefreq: "monthly" },
  { path: "/insights", priority: 0.9, changefreq: "weekly" },
  { path: "/parcerias", priority: 0.6, changefreq: "monthly" },
  { path: "/contato", priority: 0.6, changefreq: "yearly" },
];

export const SERVICE_SLUGS = [
  "eficiencia-operacional",
  "gestao-mudancas",
  "estrategia-planejamento",
  "post-merger-integration",
  "redesenho-organizacional",
  "dados-ia-tecnologia",
  "pmo-execucao",
  "governanca-compliance",
  "reestruturacao-turnaround",
  "estrategia-rh",
  "gamificacao-engajamento",
];

export const INSIGHT_SLUGS: Array<{ slug: string; lastmod: string }> = [
  { slug: "5-erros-fatais-gestao-mudancas", lastmod: "2026-04-17" },
  { slug: "melhor-abordagem-gestao-mudancas", lastmod: "2026-04-17" },
  { slug: "change-management-transformacao-digital", lastmod: "2026-04-17" },
  { slug: "lideranca-era-5-0", lastmod: "2026-04-17" },
  { slug: "agile-change-agilidade-mudanca", lastmod: "2026-04-17" },
  { slug: "ia-tribunais-brasileiros", lastmod: "2026-04-17" },
];
