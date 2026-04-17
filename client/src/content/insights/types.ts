import type { ComponentType } from "react";

export type InsightCategory =
  | "Gestão de Mudanças"
  | "Metodologia"
  | "Transformação Digital"
  | "Liderança"
  | "Agilidade"
  | "IA & Direito";

export type InsightStatus = "published" | "draft";

export type InsightMeta = {
  slug: string;
  category: InsightCategory;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  readTimeMin: number;
  coverGradient: string;
  status: InsightStatus;
};

export type InsightModule = {
  meta: InsightMeta;
  default: ComponentType;
};
