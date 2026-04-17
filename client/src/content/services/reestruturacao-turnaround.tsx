import {
  Wrench,
  CircleDollarSign,
  TriangleAlert,
  Handshake,
  Activity,
} from "lucide-react";
import type { ServiceMeta } from "./types";

export const meta: ServiceMeta = {
  slug: "reestruturacao-turnaround",
  pillar: "Estratégia",
  title: "Reestruturação & Turnaround",
  tagline:
    "Quando o caixa fica curto e as margens viram negativas, agir rápido e certo é a diferença entre sobrevivência e falência. Entramos com diagnóstico, plano e execução — ao lado da liderança, no dia a dia.",
  excerpt:
    "Gestão de crise, renegociação de dívidas, otimização de caixa, reestruturação organizacional e turnaround operacional.",
  icon: Wrench,
  accent: "gold",
  triggers: [
    "Dívida líquida/EBITDA acima do que o mercado tolera no setor",
    "Fluxo de caixa apertando, renegociações bancárias urgentes",
    "Margem EBITDA virou negativa em unidades de negócio relevantes",
    "Risco de descumprimento de covenants ou recuperação judicial no radar",
  ],
  benefits: [
    {
      icon: CircleDollarSign,
      title: "Recuperação de caixa",
      desc: "Ações imediatas e estruturadas para restaurar a capacidade de geração de caixa no curto prazo.",
    },
    {
      icon: TriangleAlert,
      title: "Gestão de crise",
      desc: "Diagnóstico preciso da situação e implementação de plano de ação emergencial com governança diária.",
    },
    {
      icon: Handshake,
      title: "Renegociação de passivos",
      desc: "Reestruturação de dívidas com bancos, fundos e fornecedores para viabilizar continuidade do negócio.",
    },
    {
      icon: Activity,
      title: "Melhoria sustentável",
      desc: "Otimização de processos e custos para garantir performance sustentável no longo prazo, não só sobrevivência.",
    },
  ],
  methodology: [
    {
      title: "Diagnóstico de crise",
      desc: "2 a 4 semanas. Avaliação rápida e profunda da situação financeira, operacional e estratégica.",
    },
    {
      title: "Estabilização de caixa",
      desc: "Cash forecast de 13 semanas rolling, corte de sangria, gestão diária de desembolsos.",
    },
    {
      title: "Reestruturação de passivos",
      desc: "Negociação com credores, bancos, fornecedores. Term sheets, padronização de acordos.",
    },
    {
      title: "Recuperação operacional",
      desc: "Melhorias em processos, custos e mix. Descontinuação de linhas deficitárias. Reprecificação.",
    },
    {
      title: "Monitoramento",
      desc: "Acompanhamento contínuo dos KPIs e ajustes. Transição para governança permanente após estabilização.",
    },
  ],
  applications: [
    "Empresas em situação de insolvência ou pré-insolvência",
    "Negócios com queda acentuada de receita ou margem",
    "Organizações com alto endividamento e dificuldade de pagamento",
    "Empresas em recuperação judicial ou extrajudicial",
    "Negócios com problemas de fluxo de caixa e capital de giro",
    "Organizações que precisam de turnaround estratégico",
    "Carve-outs que chegam com legado financeiro complexo",
  ],
  differentials: [
    {
      title: "Velocidade com rigor",
      desc: "Atuamos rápido sem sacrificar método. Diagnóstico em semanas, não meses — com dados rastreáveis.",
    },
    {
      title: "Abordagem integrada",
      desc: "Reestruturação financeira + operacional + organizacional conduzidas pelo mesmo time.",
    },
    {
      title: "Relacionamento com stakeholders",
      desc: "Experiência de negociação com bancos, fundos, fornecedores e órgãos públicos preservando reputação.",
    },
    {
      title: "Discrição absoluta",
      desc: "Confidencialidade total com funcionários, clientes, fornecedores e mercado. Nossa reputação de 15+ anos depende disso.",
    },
  ],
  guideQuestions: [
    "Quando a empresa realmente está em crise — e quando ainda há tempo?",
    "Quais sinais antecipam a necessidade de turnaround?",
    "Como estruturar uma recuperação extrajudicial?",
    "Como proteger pessoas-chave durante o turnaround?",
  ],
  cases: [
    {
      sector: "Manufatura",
      title: "Turnaround industrial",
      summary:
        "Reestruturação completa de metalúrgica, com renegociação de R$ 200M em dívidas e recuperação de margem EBITDA de −5% para +12% em 18 meses.",
    },
    {
      sector: "Varejo",
      title: "Recuperação de rede",
      summary:
        "Turnaround de rede varejista com fechamento estratégico de lojas, renegociação com fornecedores e reversão de prejuízo operacional em 12 meses.",
    },
    {
      sector: "Agronegócio",
      title: "Reestruturação agro",
      summary:
        "Apoio a grupo agrícola em recuperação judicial, com plano aprovado por credores e retomada das operações produtivas.",
    },
    {
      sector: "Transporte",
      title: "Crise logística",
      summary:
        "Estabilização financeira de transportadora em crise, com redução de 40% nos custos fixos e renegociação de contratos de arrendamento.",
    },
    {
      sector: "Construção Civil",
      title: "Turnaround construção",
      summary:
        "Reestruturação de construtora com passivo de R$ 150M, incluindo negociação com bancos e desinvestimento de ativos não-core.",
    },
    {
      sector: "Têxtil",
      title: "Recuperação têxtil",
      summary:
        "Turnaround operacional com redesenho de mix de produtos, fechamento de unidades deficitárias e retorno à lucratividade em 24 meses.",
    },
  ],
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Turnaround exige velocidade sem sacrificar rigor. Trabalhamos com foco em três horizontes
        simultâneos: estancar a sangria (caixa), estabilizar (operação) e reconstruir (valor) —
        com governança executiva diária quando o momento pede.
      </p>

      <div className="callout callout-gold">
        <strong>Discrição e integridade.</strong> Projetos de turnaround exigem confidencialidade
        absoluta com funcionários, clientes, fornecedores e mercado. Nossa reputação de 15+ anos
        depende disso — e protegemos a sua.
      </div>
    </>
  );
}
