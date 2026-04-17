import {
  Layers,
  Target,
  Activity,
  Briefcase,
  BarChart3,
} from "lucide-react";
import type { ServiceMeta } from "./types";

export const meta: ServiceMeta = {
  slug: "estrategia-planejamento",
  pillar: "Estratégia",
  title: "Estratégia & Planejamento",
  tagline:
    "Da formulação à execução. Construímos estratégia com base de dados, desdobrada em metas operacionais e conectada à estrutura e à cultura da empresa.",
  excerpt:
    "Formulação estratégica, planejamento financeiro, modelos operacionais, M&A, valuation e desdobramento de metas.",
  icon: Layers,
  accent: "teal",
  triggers: [
    "Plano estratégico vigente virou letra morta ou contradição do dia a dia",
    "Cenário macro mudou e a estratégia não acompanhou",
    "Aquisição em avaliação, business case dividindo o board",
    "Crescimento orgânico estagnou e é hora de olhar M&A ou novo modelo",
  ],
  benefits: [
    {
      icon: Target,
      title: "Escolhas claras",
      desc: "Onde competir, como vencer, o que deixar de fazer — formuladas com dado, não com intuição.",
    },
    {
      icon: Activity,
      title: "Metas desdobradas",
      desc: "Da visão do board até o KPI da ponta, em árvore coerente com donos e cadência de revisão.",
    },
    {
      icon: Briefcase,
      title: "M&A estruturado",
      desc: "Da lista de alvos ao business case de aquisição, com due diligence e valuation rigorosos.",
    },
    {
      icon: BarChart3,
      title: "Execução acompanhada",
      desc: "Cockpit mensal que conecta o plano ao resultado e dispara ajustes antes de virar problema grande.",
    },
  ],
  methodology: [
    {
      title: "Diagnóstico",
      desc: "Análise de mercado, concorrentes, cenário macro e capacidades internas. Leitura honesta de onde estamos.",
    },
    {
      title: "Formulação",
      desc: "Visão, escolhas estratégicas, metas de 3 a 5 anos em cenários. Alinhamento com board e acionistas.",
    },
    {
      title: "Desdobramento",
      desc: "Tradução em objetivos por área, KPIs em árvore, metas anuais e trimestrais com donos.",
    },
    {
      title: "Modelo operacional",
      desc: "Desenho do 'como fazemos acontecer' — processos, estrutura, tecnologia, pessoas alinhados.",
    },
    {
      title: "Cockpit",
      desc: "Rito executivo mensal, relatório para board, mecanismo de ajuste de curso.",
    },
  ],
  applications: [
    "Revisão quinquenal ou trienal de estratégia corporativa",
    "Entrada em novo mercado, geografia ou segmento",
    "Avaliação e estruturação de M&A (buy-side e sell-side)",
    "Desdobramento de metas em grupos com múltiplas unidades",
    "Business cases de investimento relevante (CAPEX, aquisição, novo produto)",
    "Preparação para IPO ou novo round de captação",
    "Diagnóstico empresarial 360° para novos executivos",
  ],
  differentials: [
    {
      title: "Estratégia executável",
      desc: "Não entregamos visão ambiciosa desconectada das capacidades reais — o plano é calibrado para o que a empresa consegue executar.",
    },
    {
      title: "Conectada à estrutura",
      desc: "Estratégia, modelo operacional e desenho organizacional coordenados — não três projetos separados.",
    },
    {
      title: "Dado rigoroso",
      desc: "Modelos financeiros e análises de mercado rastreáveis, não slides com premissas não explícitas.",
    },
    {
      title: "Do plano à rotina",
      desc: "Ficamos até o cockpit estar girando e os KPIs sendo revistos todo mês — não até o closing do deck.",
    },
  ],
  guideQuestions: [
    "Como construir uma estratégia realmente executável?",
    "Como desdobrar metas sem criar cascata burocrática?",
    "Quando vale fazer M&A vs. crescer organicamente?",
    "O que é um bom business case — e o que é só storytelling?",
  ],
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Estratégia boa não é a mais ambiciosa — é a mais executável. Nosso método combina
        análise rigorosa (dados, mercado, concorrentes) com leitura realista das capacidades
        internas, para desenhar caminhos que a empresa efetivamente consegue trilhar.
      </p>

      <div className="callout callout-teal">
        <strong>Princípio CollabZ.</strong> Estratégia que fica em PowerPoint é custo. Estratégia
        que vira rotina é ativo. Nosso trabalho só termina quando a empresa está medindo os KPIs
        certos, com cadência clara, e ajustando rumo mês a mês.
      </div>
    </>
  );
}
