import type { ComponentType } from "react";
import type { ServiceEntry, ServiceMeta } from "./types";

import * as postMergerIntegration from "./post-merger-integration";
import * as redesenhoOrganizacional from "./redesenho-organizacional";
import * as estrategiaRh from "./estrategia-rh";
import * as eficienciaOperacional from "./eficiencia-operacional";
import * as gestaoMudancas from "./gestao-mudancas";
import * as estrategiaPlanejamento from "./estrategia-planejamento";
import * as dadosIaTecnologia from "./dados-ia-tecnologia";
import * as pmoExecucao from "./pmo-execucao";
import * as governancaCompliance from "./governanca-compliance";
import * as reestruturacaoTurnaround from "./reestruturacao-turnaround";
import * as gamificacaoEngajamento from "./gamificacao-engajamento";

const modules = [
  eficienciaOperacional,
  gestaoMudancas,
  estrategiaPlanejamento,
  postMergerIntegration,
  redesenhoOrganizacional,
  dadosIaTecnologia,
  pmoExecucao,
  governancaCompliance,
  reestruturacaoTurnaround,
  estrategiaRh,
  gamificacaoEngajamento,
];

export const services: ServiceEntry[] = modules.map((m) => ({
  meta: m.meta,
  Component: m.default as ComponentType,
}));

export function getServiceBySlug(slug: string): ServiceEntry | undefined {
  return services.find((s) => s.meta.slug === slug);
}

export function getServicesByPillar(pillar: ServiceMeta["pillar"]): ServiceEntry[] {
  return services.filter((s) => s.meta.pillar === pillar);
}
