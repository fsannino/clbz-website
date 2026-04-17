// Single source of truth for static routes + content metadata used by
// the sitemap/robots/rss Vite plugin. When adding a new insight article
// or service page, update the arrays below.

export const SITE_BASE_URL = "https://www.clbz.com.br";
export const SITE_NAME = "collab:Z";
export const SITE_DESCRIPTION =
  "Consultoria boutique em transformação organizacional, gestão de mudanças, estratégia, PMO e tecnologia aplicada.";

export const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changefreq?: string;
}> = [
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

export type InsightFeedItem = {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  publishedAt: string; // ISO
};

export const INSIGHT_ITEMS: InsightFeedItem[] = [
  {
    slug: "5-erros-fatais-gestao-mudancas",
    title: "5 erros fatais na gestão de mudanças",
    description:
      "Os equívocos mais comuns que fazem 70% das transformações falharem — e o que a prática de consultoria aprendeu sobre como evitá-los.",
    category: "Gestão de Mudanças",
    author: "CollabZ Consultoria",
    publishedAt: "2026-04-17",
  },
  {
    slug: "melhor-abordagem-gestao-mudancas",
    title: "Qual a melhor abordagem para gestão de mudanças?",
    description:
      "Comparativo entre LaMarsh, ADKAR, Kotter, Bridges e Agile Change — e como combiná-los conforme o tipo de mudança e a maturidade da organização.",
    category: "Metodologia",
    author: "CollabZ Consultoria",
    publishedAt: "2026-04-17",
  },
  {
    slug: "change-management-transformacao-digital",
    title: "Change management na transformação digital",
    description:
      "Por que investir em tecnologia sem gestão de mudanças é como comprar um Ferrari sem aprender a dirigir — e como estruturar a adoção para que o ROI planejado vire realizado.",
    category: "Transformação Digital",
    author: "CollabZ Consultoria",
    publishedAt: "2026-04-17",
  },
  {
    slug: "lideranca-era-5-0",
    title: "Liderança na era 5.0",
    description:
      "Como a convergência entre tecnologia e humanização redefine o papel do líder — cinco competências críticas para navegar a Sociedade 5.0.",
    category: "Liderança",
    author: "CollabZ Consultoria",
    publishedAt: "2026-04-17",
  },
  {
    slug: "agile-change-agilidade-mudanca",
    title: "Agile Change: agilidade + mudança",
    description:
      "Framework para integrar práticas ágeis com change management — preservando o rigor clássico e incorporando o dinamismo dos ciclos iterativos.",
    category: "Agilidade",
    author: "CollabZ Consultoria",
    publishedAt: "2026-04-17",
  },
  {
    slug: "ia-tribunais-brasileiros",
    title: "IA nos tribunais brasileiros",
    description:
      "Impactos e frameworks legais da inteligência artificial no Judiciário — Resolução CNJ 332/2020, LGPD, Marco Civil da IA e implicações para organizações.",
    category: "IA & Direito",
    author: "CollabZ Consultoria",
    publishedAt: "2026-04-17",
  },
];

// Backwards-compat export used by the sitemap plugin.
export const INSIGHT_SLUGS = INSIGHT_ITEMS.map((i) => ({
  slug: i.slug,
  lastmod: i.publishedAt,
}));
