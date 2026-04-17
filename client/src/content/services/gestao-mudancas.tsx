import {
  Users,
  Compass,
  MessageSquare,
  TrendingUp,
  GitBranch,
} from "lucide-react";
import type { ServiceMeta } from "./types";

export const meta: ServiceMeta = {
  slug: "gestao-mudancas",
  pillar: "Pessoas",
  title: "Gestão de Mudanças & Transformação",
  tagline:
    "70% das transformações falham por gestão de mudança mal feita. Garantimos que a sua não seja uma delas — com metodologia proprietária, acompanhamento do desenho à adoção e métricas comportamentais rastreáveis.",
  excerpt:
    "Gestão de mudança organizacional com foco em pessoas, adoção real e resultados sustentáveis — ADKAR, Kotter, Agile Change e práticas proprietárias collab:Z.",
  icon: Users,
  accent: "navy",
  triggers: [
    "Vai implementar ERP, CRM, BI ou IA e a maior incerteza é como o time vai reagir",
    "Transformação em curso perdeu engajamento — pessoas dizem 'sim' mas operam como antes",
    "Liderança do meio não está reforçando o novo comportamento",
    "Board cobra métricas de adoção e o único KPI disponível é 'treinamentos realizados'",
  ],
  benefits: [
    {
      icon: Compass,
      title: "Roadmap integrado",
      desc: "Plano de change sincronizado ao cronograma técnico — incubação, lançamento e sustentação com marcos próprios.",
    },
    {
      icon: MessageSquare,
      title: "Comunicação contínua",
      desc: "Planos de 12 meses cobrindo as três fases da mudança, com mensagens adaptadas a cada audiência e canal.",
    },
    {
      icon: TrendingUp,
      title: "Adoção mensurável",
      desc: "Métricas de uso efetivo, proficiência e sentimento acompanhadas mensalmente, não apenas treinamentos completados.",
    },
    {
      icon: GitBranch,
      title: "Capacitação de líderes",
      desc: "Programa específico para a camada do meio — onde mais transformações falham — com scripts, rituais e métricas próprias.",
    },
  ],
  methodology: [
    {
      title: "Diagnóstico",
      desc: "Assessment de prontidão, mapa de stakeholders, riscos de resistência por segmento.",
    },
    {
      title: "Planejamento",
      desc: "Roadmap 12 meses, plano de comunicação, capacitação e engajamento de lideranças.",
    },
    {
      title: "Execução",
      desc: "Ondas de comunicação, rituais de reforço, treinamentos, programa de líderes, acompanhamento de resistência.",
    },
    {
      title: "Medição",
      desc: "Dashboard de adoção, proficiência e sentimento. Ajustes quinzenais com base em sinais fracos.",
    },
    {
      title: "Sustentação",
      desc: "6 a 12 meses pós-lançamento. Reforço de comportamento, cultura de melhoria contínua, transferência para gestores.",
    },
  ],
  applications: [
    "Implementação de ERP, CRM, HCM ou plataformas equivalentes",
    "Transformação digital com introdução de dados, IA e automação",
    "Mudança de modelo operacional (centralização, shared services, squads ágeis)",
    "Integração pós-fusão e harmonização cultural",
    "Mudanças regulatórias com impacto em processo e comportamento",
    "Programas de cultura e valores corporativos",
  ],
  differentials: [
    {
      title: "Frameworks integrados",
      desc: "ADKAR, Kotter, Bridges, Agile Change — usamos o que cabe ao contexto, não o único que dominamos.",
    },
    {
      title: "Foco em comportamento",
      desc: "Medimos mudança de hábito, não apenas volumes de comunicação. Métricas comportamentais rastreadas.",
    },
    {
      title: "Método collab:Z",
      desc: "Metodologia proprietária desenvolvida em 15+ anos de projetos, testada em setores regulados.",
    },
    {
      title: "Change as a Service",
      desc: "Modelo contínuo para empresas com múltiplas iniciativas — capacidade on-demand sem time interno grande.",
    },
  ],
  guideQuestions: [
    "Quais são os 5 erros fatais na gestão de mudanças?",
    "Como medir adoção real — e não apenas treinamentos realizados?",
    "Por que a camada do meio é a mais crítica?",
    "Quando faz sentido adotar Change as a Service?",
    "Como escolher entre ADKAR, Kotter e outros frameworks?",
  ],
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Mudar sistema é fácil. Mudar comportamento é difícil. Nossa prática de change management
        foca na segunda — porque é nela que o valor do projeto se materializa. Integramos
        frameworks internacionais (ADKAR, Kotter, Bridges), práticas ágeis e metodologia
        proprietária collab:Z, customizadas ao contexto regulatório e cultural de cada cliente.
      </p>

      <h3>O que entregamos</h3>
      <p>
        <strong>Assessments de prontidão</strong>, <strong>planos de change</strong> integrados
        ao cronograma técnico, <strong>gestão de resistência</strong> estruturada,{" "}
        <strong>comunicação</strong> das três fases, <strong>capacitação</strong> que vai além
        do "como usar", <strong>Change as a Service</strong> para múltiplas iniciativas
        simultâneas.
      </p>

      <div className="callout callout-gold">
        <strong>Leia também:</strong>{" "}
        <a href="/insights/5-erros-fatais-gestao-mudancas">
          5 erros fatais na gestão de mudanças
        </a>{" "}
        — artigo detalhando os equívocos mais comuns que fazem 70% das transformações falharem.
      </div>
    </>
  );
}
