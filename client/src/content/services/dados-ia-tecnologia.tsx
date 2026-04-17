import {
  Cpu,
  BarChart3,
  Database,
  Brain,
  Cog,
} from "lucide-react";
import type { ServiceMeta } from "./types";

export const meta: ServiceMeta = {
  slug: "dados-ia-tecnologia",
  pillar: "Operação",
  title: "Dados, IA & Tecnologia",
  tagline:
    "Transformar dados em decisão, decisão em ação. Do data lake ao dashboard executivo, passando por IA aplicada e automação — conectados à pergunta de negócio que você precisa responder.",
  excerpt:
    "Business intelligence, dashboards inteligentes, data lake, automação de processos, analytics e IA aplicada à gestão.",
  icon: Cpu,
  accent: "teal",
  triggers: [
    "Áreas brigam sobre números porque cada uma tem sua 'fonte da verdade'",
    "Relatório executivo mensal leva mais tempo para montar do que para discutir",
    "Time de dados cresceu mas o board continua decidindo no 'achômetro'",
    "Oportunidade clara de automação ou IA, sem clareza de por onde começar",
  ],
  benefits: [
    {
      icon: BarChart3,
      title: "Dashboards que decidem",
      desc: "Cockpits executivos com narrativa, não apenas gráficos — conectados aos rituais de decisão da empresa.",
    },
    {
      icon: Database,
      title: "Arquitetura enxuta",
      desc: "Data lake/warehouse calibrados para o volume e complexidade reais — sem over-engineering.",
    },
    {
      icon: Brain,
      title: "IA aplicada",
      desc: "Forecasting, classificação, anomalia, IA generativa — sempre partindo do caso de uso e do ROI, não da tecnologia.",
    },
    {
      icon: Cog,
      title: "Automação pragmática",
      desc: "Processos repetitivos automatizados com RPA/n8n/scripts; governança FinOps no cloud.",
    },
  ],
  methodology: [
    {
      title: "Pergunta de negócio",
      desc: "Começamos pelo KPI que precisa melhorar — não pelo stack de dados a escolher.",
    },
    {
      title: "Inventário e gaps",
      desc: "O que existe de dado, onde, com qual qualidade. O que falta para responder às perguntas certas.",
    },
    {
      title: "Casos de uso priorizados",
      desc: "Lista curta de casos de maior ROI. Dashboards, modelos, automações com dono e métrica.",
    },
    {
      title: "Entrega incremental",
      desc: "Primeiro dashboard em 30 dias, primeiro modelo em 60–90. Nada de big bang de 12 meses.",
    },
    {
      title: "Governança",
      desc: "Data ownership, catálogo, qualidade, MLOps, FinOps — instalados conforme o portfolio cresce.",
    },
  ],
  applications: [
    "Empresas que precisam de cockpit executivo confiável para o board",
    "Operações com oportunidades claras de automação (back-office, atendimento)",
    "Manufatura ou varejo com caso de uso de forecasting",
    "Áreas de crédito, risco ou antifraude com potencial de ML",
    "Serviços que podem aplicar IA generativa em atendimento ou conteúdo",
    "Companhias pré-IPO que precisam de reporting institucional robusto",
  ],
  differentials: [
    {
      title: "Negócio primeiro",
      desc: "Time consultivo entende P&L antes de entender stack — tecnologia serve pergunta de negócio, não o inverso.",
    },
    {
      title: "Stack agnóstico",
      desc: "Power BI, Tableau, Looker, AWS, Azure, GCP, Databricks — escolhemos conforme cliente, não conforme parceria comercial.",
    },
    {
      title: "MLOps real",
      desc: "Modelos em produção com monitoramento, retreino e governança — não PoC bonito que nunca roda.",
    },
    {
      title: "Integração com change",
      desc: "IA na operação exige mudança de processo e comportamento. Entregamos junto de gestão de mudanças.",
    },
  ],
  guideQuestions: [
    "Como montar dashboards que o board realmente usa?",
    "Quando investir em data lake vs. um warehouse simples?",
    "Como estruturar um roadmap de IA aplicada por ROI?",
    "O que é MLOps e quando começar a me preocupar com ele?",
  ],
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Projetos de dados e IA que não começam pela pergunta de negócio acabam como tecnologia
        órfã: bonita no demo, inútil na decisão. Nosso método parte sempre do KPI que precisa
        melhorar, e vai daí para o dashboard, o modelo, o data lake.
      </p>

      <div className="callout callout-gold">
        <strong>IA sem gestão de mudanças é shelfware.</strong> Introduzir IA na operação muda
        processo e comportamento. Por isso, entregamos junto do nosso time de{" "}
        <a href="/servicos/gestao-mudancas">Gestão de Mudanças</a> — para garantir que a
        ferramenta seja usada, não apenas instalada.
      </div>
    </>
  );
}
