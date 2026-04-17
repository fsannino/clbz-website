import {
  UserCog,
  Compass,
  LineChart,
  HeartHandshake,
  Award,
} from "lucide-react";
import type { ServiceMeta } from "./types";
import { ServiceCheckList } from "@/pages/ServiceDetail";

export const meta: ServiceMeta = {
  slug: "estrategia-rh",
  pillar: "Pessoas",
  title: "Estratégia de RH",
  tagline:
    "RH estratégico é mais do que folha e benefícios. Conectamos atração, desenvolvimento, remuneração e cultura à estratégia do negócio, com indicadores que o CEO entende e o board cobra.",
  excerpt:
    "Alinhamento da estratégia de pessoas à estratégia do negócio — do modelo de atração à remuneração, passando por cultura, desenvolvimento e people analytics.",
  icon: UserCog,
  accent: "gold",
  triggers: [
    "CEO quer saber qual é o ROI de gente — e o RH não tem resposta em números",
    "Atrição em posições-chave acima do benchmark do setor, sem explicação clara",
    "Plano estratégico aprovado exige capacidades que a empresa não tem hoje",
    "Programas de RH fragmentados: treinamento, headhunting e cargos caminhando sem fio condutor",
    "Pós-fusão, pós-reestruturação ou pós-aporte: cultura e estrutura de pessoas precisam ser repensadas",
  ],
  benefits: [
    {
      icon: Compass,
      title: "RH conectado à estratégia",
      desc: "Plano de pessoas desdobrado diretamente da estratégia do negócio — não um PDI genérico replicado do ano passado.",
    },
    {
      icon: LineChart,
      title: "People analytics acionável",
      desc: "Indicadores que informam decisão, não apenas dashboards mensais de headcount. KPIs executivos que o board cobra.",
    },
    {
      icon: HeartHandshake,
      title: "EVP diferenciado",
      desc: "Proposta de valor ao empregado construída a partir do diagnóstico real, não de aspirações genéricas. Atrai e retém quem importa.",
    },
    {
      icon: Award,
      title: "Remuneração calibrada",
      desc: "Estrutura salarial, bônus e ILP equilibrando competitividade externa e equidade interna, com governança clara de aumentos e promoções.",
    },
  ],
  methodology: [
    {
      title: "Leitura estratégica",
      desc: "3 semanas. Partimos da estratégia do negócio (não do RH). Que capacidades a empresa precisa nos próximos 3 anos?",
    },
    {
      title: "Diagnóstico de RH",
      desc: "4 semanas. Avaliação das 6 alavancas (workforce, atração, desenvolvimento, remuneração, cultura, analytics).",
    },
    {
      title: "Desenho da estratégia",
      desc: "4–6 semanas. Plano trienal com iniciativas priorizadas, cronograma, orçamento e KPIs de impacto no negócio.",
    },
    {
      title: "Ativação",
      desc: "6–18 meses. Projetos específicos (remuneração, sucessão, people analytics, EVP) e instalação de ritos recorrentes.",
    },
    {
      title: "Monitoramento",
      desc: "Contínuo. Dashboard trimestral com indicadores executivos e ajuste fino das iniciativas com base no que o dado mostra.",
    },
  ],
  applications: [
    "Empresas em crescimento acelerado (triplicar headcount em 24 meses)",
    "Pós-fusão e aquisição (harmonização de cultura e remuneração)",
    "Transformação digital (introdução de capacidades novas: dados, IA, produto, design)",
    "Turnaround e reestruturação (recompor equipe com orçamento reduzido e reter pessoas-chave)",
    "Profissionalização de empresas familiares (estruturação de RH maduro)",
    "Preparação para IPO ou novo round (governança de pessoas adequada ao rigor de investidor)",
    "Crises de engajamento, atrição ou cultura",
  ],
  differentials: [
    {
      title: "Visão de capital, não custo",
      desc: "Conversamos com CEO e board em linguagem financeira — traduzimos decisões de RH em impacto no P&L e no valor da companhia.",
    },
    {
      title: "Integração com change",
      desc: "Toda transformação de RH é transformação de comportamento. Conectamos desenho ao nosso time de gestão de mudanças e educação corporativa.",
    },
    {
      title: "People Analytics real",
      desc: "Não entregamos dashboards bonitos — entregamos insights que mudam decisão. Rastreabilidade de atrição regrettable, sucessão, ROI.",
    },
    {
      title: "Experiência em contextos regulados",
      desc: "Serviços financeiros, saúde, energia, judiciário. Conhecemos as restrições regulatórias que condicionam políticas de pessoas.",
    },
  ],
  guideQuestions: [
    "Como traduzir a estratégia do negócio em plano de capacidades?",
    "O que é um EVP (Employee Value Proposition) diferenciado e como construir?",
    "Como medir ROI de iniciativas de RH em termos financeiros?",
    "Como estruturar people analytics sem virar um time paralelo de BI?",
    "Como calibrar remuneração entre competitividade externa e equidade interna?",
    "Quais rituais o CEO deve ter com RH para RH ser estratégico?",
  ],
  cases: [
    {
      sector: "Saúde",
      title: "Plano de capacidades",
      summary:
        "Workforce plan trienal para rede hospitalar em expansão, com mapeamento de gap de especialistas clínicos e plano de atração regional.",
    },
    {
      sector: "Serviços Financeiros",
      title: "EVP digital",
      summary:
        "Construção de proposta de valor diferenciada para atrair talentos de tecnologia em banco tradicional, com redução de tempo de preenchimento de posições críticas de 120 para 45 dias.",
    },
    {
      sector: "Indústria",
      title: "Remuneração pós-M&A",
      summary:
        "Harmonização da política salarial após fusão de dois fabricantes, com matriz comparativa, migração gradual e preservação de competitividade.",
    },
  ],
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Estratégia de RH não é sobre ter o último app de engajamento ou a mesa de pingue-pongue
        mais bonita. É sobre responder três perguntas simples com números: quais capacidades o
        negócio precisa nos próximos 3 anos, quais temos hoje, e como vamos fechar o gap de forma
        econômica. A CollabZ estrutura essa resposta em conjunto com CEO, CHRO e board — e depois
        ajuda a executar.
      </p>

      <h3>As seis alavancas do RH estratégico</h3>
      <ServiceCheckList
        items={[
          "Workforce Planning — quantas pessoas, com quais capacidades, ao longo dos próximos 12–36 meses",
          "Atração & Seleção — EVP, canais, experiência de candidato, funil mensurável",
          "Desenvolvimento & Carreira — trilhas, sucessão, aprendizagem, mobilidade interna",
          "Remuneração & Reconhecimento — salário, bônus, ILP, benefícios, equidade",
          "Cultura & Engajamento — valores vividos (não declarados), mecanismos de escuta",
          "People Analytics — KPIs executivos, rastreabilidade, decisão baseada em dado",
        ]}
      />

      <h3>Indicadores que passamos a acompanhar com o cliente</h3>
      <ul>
        <li>Taxa de preenchimento de posições-chave e tempo médio para preencher</li>
        <li>Atrição regrettable (saída de quem não queríamos perder), segmentada</li>
        <li>ROI de iniciativas de RH em produtividade, receita por funcionário, margem</li>
        <li>Readiness do pipeline de sucessão para posições críticas</li>
        <li>Índice de engajamento segmentado por área, tempo de casa, camada de liderança</li>
        <li>Competitividade de remuneração vs. mercado por posição crítica</li>
      </ul>

      <div className="callout callout-gold">
        <strong>Um princípio inegociável.</strong> Estratégia de RH só vira resultado quando o CEO
        e o board enxergam pessoas como capital estratégico, não como linha de custo. Nosso
        primeiro trabalho é quase sempre construir essa visão — traduzindo decisões de RH em
        impacto no P&L e no valor da companhia.
      </div>
    </>
  );
}
