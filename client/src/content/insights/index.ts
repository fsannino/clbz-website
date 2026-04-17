import type { ComponentType } from "react";
import type { InsightMeta } from "./types";
import * as cincoErros from "./5-erros-fatais-gestao-mudancas";
import * as melhorAbordagem from "./melhor-abordagem-gestao-mudancas";
import * as changeTransfDigital from "./change-management-transformacao-digital";
import * as liderancaEra5 from "./lideranca-era-5-0";
import * as agileChange from "./agile-change-agilidade-mudanca";
import * as iaTribunais from "./ia-tribunais-brasileiros";

export type InsightEntry = {
  meta: InsightMeta;
  Component: ComponentType;
};

const modules = [
  cincoErros,
  melhorAbordagem,
  changeTransfDigital,
  liderancaEra5,
  agileChange,
  iaTribunais,
];

export const insights: InsightEntry[] = modules
  .map((m) => ({ meta: m.meta, Component: m.default }))
  .sort((a, b) => (a.meta.publishedAt < b.meta.publishedAt ? 1 : -1));

export const draftInsights: InsightMeta[] = [];

export function getInsightBySlug(slug: string): InsightEntry | undefined {
  return insights.find((i) => i.meta.slug === slug);
}

export function getAllInsightCards(): InsightMeta[] {
  return [...insights.map((i) => i.meta), ...draftInsights].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}
