import type { ComponentType } from "react";
import type { InsightMeta } from "./types";
import * as cincoErros from "./5-erros-fatais-gestao-mudancas";

export type InsightEntry = {
  meta: InsightMeta;
  Component: ComponentType;
};

const modules = [cincoErros];

export const insights: InsightEntry[] = modules
  .map((m) => ({ meta: m.meta, Component: m.default }))
  .sort((a, b) => (a.meta.publishedAt < b.meta.publishedAt ? 1 : -1));

export const draftInsights: InsightMeta[] = [
  {
    slug: "qual-melhor-abordagem-gestao-mudancas",
    category: "Metodologia",
    title: "Qual a melhor abordagem para gestão de mudanças?",
    excerpt:
      "Como escolher e combinar metodologias de change management para cada contexto.",
    author: { name: "CollabZ", role: "Equipe editorial" },
    publishedAt: "2026-05-01",
    readTimeMin: 10,
    coverGradient: "linear-gradient(135deg, #1A6E8E, #0B3D5C)",
    status: "draft",
  },
  {
    slug: "change-management-transformacao-digital",
    category: "Transformação Digital",
    title: "Change management na transformação digital",
    excerpt:
      "Por que investir em tecnologia sem gestão de mudanças é como comprar um Ferrari sem aprender a dirigir.",
    author: { name: "CollabZ", role: "Equipe editorial" },
    publishedAt: "2026-05-15",
    readTimeMin: 11,
    coverGradient: "linear-gradient(135deg, #0B3D5C, #2A8EAE)",
    status: "draft",
  },
  {
    slug: "lideranca-era-5-0",
    category: "Liderança",
    title: "Liderança na era 5.0",
    excerpt:
      "Como a convergência entre tecnologia e humanização redefine o papel do líder.",
    author: { name: "CollabZ", role: "Equipe editorial" },
    publishedAt: "2026-06-01",
    readTimeMin: 9,
    coverGradient: "linear-gradient(135deg, #F7A823, #0B3D5C)",
    status: "draft",
  },
  {
    slug: "agile-change-agilidade-mais-mudanca",
    category: "Agilidade",
    title: "Agile Change: agilidade + mudança",
    excerpt:
      "Framework para integrar práticas ágeis com change management.",
    author: { name: "CollabZ", role: "Equipe editorial" },
    publishedAt: "2026-06-15",
    readTimeMin: 13,
    coverGradient: "linear-gradient(135deg, #1A6E8E, #F7A823)",
    status: "draft",
  },
  {
    slug: "ia-tribunais-brasileiros",
    category: "IA & Direito",
    title: "IA nos tribunais brasileiros",
    excerpt:
      "Impactos e frameworks legais da inteligência artificial no judiciário.",
    author: { name: "CollabZ", role: "Equipe editorial" },
    publishedAt: "2026-07-01",
    readTimeMin: 14,
    coverGradient: "linear-gradient(135deg, #072A40, #1A6E8E)",
    status: "draft",
  },
];

export function getInsightBySlug(slug: string): InsightEntry | undefined {
  return insights.find((i) => i.meta.slug === slug);
}

export function getAllInsightCards(): InsightMeta[] {
  return [...insights.map((i) => i.meta), ...draftInsights].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}
