import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

export type ServicePillar = "Gestão" | "Estratégia" | "Operação" | "Pessoas";

export type BenefitItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type MethodologyStep = {
  title: string;
  desc: string;
};

export type DifferentialItem = {
  title: string;
  desc: string;
};

export type CaseItem = {
  sector: string;
  title: string;
  summary: string;
};

export type ServiceMeta = {
  slug: string;
  pillar: ServicePillar;
  title: string;
  tagline: string;
  excerpt: string;
  icon: LucideIcon;
  accent: "gold" | "teal" | "navy";
  // Symptoms/triggers shown in the hero as "Sinais de que você precisa disso"
  triggers: string[];
  // 4 benefit cards shown right below the hero
  benefits: BenefitItem[];
  // 5 numbered methodology steps
  methodology: MethodologyStep[];
  // Bulleted list of situations where this service fits
  applications: string[];
  // 4 differential cards
  differentials: DifferentialItem[];
  // Optional: guide questions shown as bullets in the "Guia Completo" block
  guideQuestions?: string[];
  // Optional: case studies (for future)
  cases?: CaseItem[];
};

export type ServiceEntry = {
  meta: ServiceMeta;
  Component: ComponentType;
};
