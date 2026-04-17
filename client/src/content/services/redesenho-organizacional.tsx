import {
  Network,
  Target,
  Layers3,
  Gauge,
  Users,
} from "lucide-react";
import type { ServiceMeta } from "./types";
import { ServiceCheckList } from "@/pages/ServiceDetail";

export const meta: ServiceMeta = {
  slug: "redesenho-organizacional",
  pillar: "Estratégia",
  title: "Redesenho Organizacional",
  tagline:
    "Estrutura antiga trava o negócio. Redesenhamos a organização para que decisões andem mais rápido, responsabilidade fique clara e o custo da hierarquia caia — sem perder gente boa no caminho.",
  excerpt:
    "Redesenho de estrutura, papéis e níveis hierárquicos para destravar decisão, reduzir custo e preparar a empresa para o próximo ciclo.",
  icon: Network,
  accent: "navy",
  triggers: [
    "Decisões simples sobem três níveis e voltam uma semana depois",
    "Cresceu via aquisições e sobram cargos duplicados, cadeias de comando confusas",
    "Reestruturação financeira em curso exige cortar custos de gestão de forma justificável",
    "Nova estratégia (digital, internacionalização, B2C) pede capacidades que o organograma não reflete",
    "Rotatividade concentrada em camadas do meio — as pessoas saem porque não veem rota",
  ],
  benefits: [
    {
      icon: Target,
      title: "Clareza de papéis",
      desc: "Responsabilidades, autoridades e interfaces entre áreas bem definidas, eliminando sobreposições, lacunas e disputa silenciosa por agenda.",
    },
    {
      icon: Layers3,
      title: "Hierarquia calibrada",
      desc: "Número adequado de camadas e spans de controle para o porte e estratégia da empresa — redução típica de 15% a 30% no custo de gestão.",
    },
    {
      icon: Gauge,
      title: "Decisões mais rápidas",
      desc: "Alçadas desenhadas por princípio, não por inércia. Tempo de decisão em pautas recorrentes cai pela metade ou mais.",
    },
    {
      icon: Users,
      title: "Retenção de talentos",
      desc: "Matching estruturado preserva pessoas-chave na transição; carreiras ficam claras, engajamento sobe, rotatividade da camada do meio cai.",
    },
  ],
  methodology: [
    {
      title: "Diagnóstico estrutural",
      desc: "3–4 semanas. Entrevistas com liderança, análise de spans, mapeamento de tempo de decisão, benchmarking por porte e setor.",
    },
    {
      title: "Princípios de desenho",
      desc: "2 semanas. Alinhamento com o board sobre grau de centralização, foco cliente vs. função, custo-alvo de gestão.",
    },
    {
      title: "Desenho da nova estrutura",
      desc: "4–6 semanas. Organograma-alvo em 2 a 3 opções com trade-offs explícitos, dimensionamento, descritivos e matriz RACI.",
    },
    {
      title: "Matching & transição",
      desc: "4–8 semanas. Alocação de pessoas reais, critérios justos de sucessão, pacotes de desligamento, comunicação estruturada.",
    },
    {
      title: "Ativação & sustentação",
      desc: "3–6 meses. Atualização de sistemas, revisão de metas, capacitação, monitoramento de KPIs de saúde organizacional.",
    },
  ],
  applications: [
    "Reestruturação após fusões e aquisições",
    "Preparação para crescimento acelerado ou entrada em novo mercado",
    "Redução de custos estruturais em contextos de turnaround",
    "Transformação do modelo operacional (centralização vs. descentralização)",
    "Criação de centros de serviços compartilhados (CSC)",
    "Profissionalização de empresas familiares em transição geracional",
    "Adaptação de estrutura para nova estratégia digital ou de produto",
  ],
  differentials: [
    {
      title: "Framework proprietário",
      desc: "Metodologia collab:Z combina melhores práticas de desenho organizacional com customização ao contexto regulatório e cultural do cliente.",
    },
    {
      title: "Presença na transição",
      desc: "Ficamos junto durante o matching e a ativação — o momento onde a maioria das consultorias falha por ausência.",
    },
    {
      title: "Integração com change",
      desc: "Gestão de mudança integrada ao projeto, não como serviço à parte. Transição conduzida com disciplina comportamental.",
    },
    {
      title: "Entregas incrementais",
      desc: "Valor desde as primeiras semanas. Diagnóstico com heatmap rápido, decisões de princípio antes de mexer em cargos.",
    },
  ],
  guideQuestions: [
    "Como agrupar atividades e competências de forma eficiente?",
    "Qual o nível adequado de centralização ou descentralização?",
    "Quantas camadas hierárquicas são necessárias?",
    "Como garantir coordenação entre áreas interdependentes?",
    "Qual modelo de governança suporta a estratégia?",
    "Como redesenhar sem destruir o engajamento do time?",
  ],
  cases: [
    {
      sector: "Varejo",
      title: "Integração pós-fusão",
      summary:
        "Redesenho de estrutura após fusão entre duas redes varejistas, com definição de modelo operacional único e redução de 25% no headcount administrativo.",
    },
    {
      sector: "Indústria",
      title: "Centro de Serviços Compartilhados",
      summary:
        "Criação de CSC para grupo industrial consolidando funções de 8 unidades de negócio com ganho de 40% em eficiência de back-office.",
    },
    {
      sector: "Energia",
      title: "Turnaround estrutural",
      summary:
        "Reestruturação de empresa em crise, com redução de 4 camadas hierárquicas e redesenho de processos críticos em 6 meses.",
    },
    {
      sector: "Serviços Financeiros",
      title: "Transformação digital",
      summary:
        "Redesenho para incorporar áreas de tecnologia e dados ao core business, criando squads ágeis e novos modelos de trabalho.",
    },
    {
      sector: "Agronegócio",
      title: "Centralização de compras",
      summary:
        "Centralização estratégica e descentralização operacional da área de suprimentos, gerando savings de 18% em compras.",
    },
    {
      sector: "Tecnologia",
      title: "Expansão internacional",
      summary:
        "Redesenho da estrutura corporativa para suportar expansão para 5 novos países, incluindo modelo de governança global-local.",
    },
  ],
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Organograma não é quadrinho de PowerPoint — é o contrato implícito que define quem decide,
        quem executa, quem responde. Quando esse contrato desalinha da estratégia ou do tamanho
        real da operação, a empresa paga todos os meses em lentidão, custo fixo inflado e talentos
        que escapam por falta de clareza sobre o próprio futuro. Redesenho organizacional é a
        cirurgia que recoloca esse contrato em dia com a realidade.
      </p>

      <h3>O que tratamos</h3>
      <p>
        Redesenho organizacional na CollabZ cobre cinco dimensões articuladas — nunca isoladas:
        <strong> estrutura</strong> (níveis, spans, agrupamentos), <strong>papéis</strong> (matriz
        RACI dos processos críticos), <strong>capacidades</strong> (skills vs. time atual),{" "}
        <strong>governança</strong> (comitês, alçadas, ritmos) e{" "}
        <strong>cultura e comportamento</strong> (o que a nova estrutura recompensa no dia a dia).
      </p>

      <h3>Quando NÃO é hora de redesenhar</h3>
      <p>
        Nem todo problema operacional é estrutural. Se o sintoma é processo mal desenhado, sistema
        ruim ou liderança individual fraca, redesenho organizacional vai mascarar o problema real
        e criar novos. Nosso diagnóstico sempre abre a pergunta "faz sentido mexer na estrutura?"
        — e temos coragem de recomendar que não, quando não faz.
      </p>

      <div className="callout callout-teal">
        <strong>Integração com outros programas.</strong> Redesenho organizacional costuma
        acompanhar <a href="/servicos/post-merger-integration">PMI</a>,{" "}
        <a href="/servicos/reestruturacao-turnaround">turnaround</a> ou estratégia nova.
        Coordenamos as frentes para que a estrutura não mude três vezes em 18 meses — o maior
        destruidor de engajamento que existe.
      </div>
    </>
  );
}
