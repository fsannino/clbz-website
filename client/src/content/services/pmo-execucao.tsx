import {
  BarChart3,
  ListChecks,
  Target,
  Layers2,
  TrendingUp,
} from "lucide-react";
import type { ServiceMeta } from "./types";

export const meta: ServiceMeta = {
  slug: "pmo-execucao",
  pillar: "Gestão",
  title: "PMO & Execução de Programas",
  tagline:
    "Estratégia sem execução é wishful thinking. Montamos e operamos PMOs que transformam portfólio de iniciativas em valor realizado — com governança, cadência e foco em benefícios, não em entregáveis.",
  excerpt:
    "Setup e operação de PMO, gestão de portfólio, governança de projetos, metodologias ágeis e híbridas, value realization.",
  icon: BarChart3,
  accent: "gold",
  triggers: [
    "Empresa tem 20+ iniciativas em paralelo, ninguém sabe o status de todas",
    "Recursos disputados entre projetos, prioridade mudando mensalmente",
    "Board cobra benefícios realizados, PMO entrega 'projetos no prazo'",
    "Metodologias misturadas (ágil, cascata, híbrido) sem governança clara",
  ],
  benefits: [
    {
      icon: ListChecks,
      title: "Portfólio transparente",
      desc: "Um único mapa com todas as iniciativas, status, saúde, alocação de recursos — acessível a board, CEO e líderes.",
    },
    {
      icon: Target,
      title: "Priorização por valor",
      desc: "Ranking de iniciativas por ROI, esforço e risco. Revisão trimestral para rebalanceamento.",
    },
    {
      icon: Layers2,
      title: "Metodologia adequada",
      desc: "Ágil, cascata ou híbrido — cada iniciativa com o framework que cabe ao seu contexto.",
    },
    {
      icon: TrendingUp,
      title: "Value realization",
      desc: "Cada projeto com hipótese de valor explícita e rastreio mensal do benefício capturado.",
    },
  ],
  methodology: [
    {
      title: "Diagnóstico do portfólio",
      desc: "Inventário, saúde, alinhamento estratégico, redundâncias e gaps.",
    },
    {
      title: "Desenho do PMO",
      desc: "Estratégico, tático ou operacional. Estrutura, papéis, templates mínimos, ritos.",
    },
    {
      title: "Instalação",
      desc: "Ferramentas, dashboards, rituais (steering, portfolio review, benefit review).",
    },
    {
      title: "Operação assistida",
      desc: "Consultores sêniores conduzindo o PMO lado a lado do time interno por 3 a 6 meses.",
    },
    {
      title: "Transferência",
      desc: "Capacitação de time interno, documentação institucional, handover completo.",
    },
  ],
  applications: [
    "Empresas com programa de transformação plurianual (5+ projetos conectados)",
    "Grupos com múltiplas unidades disputando recursos centrais",
    "Pós-M&A, quando o IMO precisa virar PMO permanente",
    "Organizações migrando para modelos ágeis/híbridos sem perder governança",
    "Empresas com PMO existente que virou 'relatório de status' sem impacto",
    "Áreas de CAPEX/infraestrutura com portfólio grande de obras",
  ],
  differentials: [
    {
      title: "Foco em valor realizado",
      desc: "Cada iniciativa com hipótese de benefício rastreada mês a mês — não apenas status de prazo.",
    },
    {
      title: "Templates mínimos",
      desc: "Burocracia só onde agrega. Business case, status report, benefit tracking enxutos.",
    },
    {
      title: "Parceria ScrumStudy",
      desc: "Consultores com certificações oficiais (SFC, SMC, SPOC, SDC) quando o contexto pede ágil.",
    },
    {
      title: "Transferência real",
      desc: "Objetivo explícito de tornar o cliente autônomo, não dependente de consultoria contínua.",
    },
  ],
  guideQuestions: [
    "O que diferencia um bom PMO de um PMO que vira relatório?",
    "Como desenhar governança de portfólio que o board usa?",
    "Como escolher entre ágil, híbrido e cascata por iniciativa?",
    "O que é value realization e como instalar na prática?",
  ],
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Nosso diferencial em PMO é a disciplina de <em>value realization</em>: cada iniciativa do
        portfólio precisa ter hipótese de valor explícita e rastreio mensal de quanto desse valor
        se materializou. Sem isso, PMO vira relatório de status — caro e pouco útil.
      </p>

      <div className="callout callout-teal">
        <strong>Treinamento aliado.</strong> Nossa escola oferece certificações ScrumStudy (SFC,
        SMC, SPOC, SDC) e treinamentos proprietários de PMO ágil — habilitando o cliente a operar
        sem dependência contínua.
      </div>
    </>
  );
}
