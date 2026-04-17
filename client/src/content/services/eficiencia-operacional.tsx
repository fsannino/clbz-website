import {
  TrendingUp,
  DollarSign,
  Zap,
  LineChart,
  Recycle,
} from "lucide-react";
import type { ServiceMeta } from "./types";

export const meta: ServiceMeta = {
  slug: "eficiencia-operacional",
  pillar: "Operação",
  title: "Eficiência Operacional",
  tagline:
    "Reduzir custo sem quebrar a operação — com método, não com tesoura. Programas ancorados em Orçamento Base Zero, otimização de processos e disciplina de execução.",
  excerpt:
    "Otimização de recursos, redução de custos e ganho de produtividade com metodologias proprietárias e foco em resultado financeiro mensurável.",
  icon: TrendingUp,
  accent: "gold",
  triggers: [
    "Margem operacional em queda há 3 trimestres ou mais",
    "Custos gerais crescendo acima da receita",
    "Processos inchados, retrabalho visível, excesso de níveis de aprovação",
    "Board pediu plano de 15–20% de redução sem derrubar operação",
  ],
  benefits: [
    {
      icon: DollarSign,
      title: "Economia mensurável",
      desc: "Reduções típicas de 10% a 25% nas categorias endereçadas, com payback de 6 a 12 meses e rastreio mês a mês.",
    },
    {
      icon: Zap,
      title: "Ganho de produtividade",
      desc: "Processos redesenhados para eliminar retrabalho, reduzir aprovações redundantes e acelerar ciclos operacionais.",
    },
    {
      icon: LineChart,
      title: "Disciplina orçamentária",
      desc: "Governança de OBZ/Matricial instalada com comitês, donos de categoria e rito mensal de accountability.",
    },
    {
      icon: Recycle,
      title: "Sustentação real",
      desc: "Acompanhamento de 12 a 24 meses para garantir que 80%+ da economia se sustente — não devolução do custo em um ano.",
    },
  ],
  methodology: [
    {
      title: "Diagnóstico",
      desc: "Mapa de custos por categoria e área, benchmarks e identificação das frentes de maior potencial.",
    },
    {
      title: "Desenho OBZ ou Matricial",
      desc: "Reconstrução do orçamento a partir do zero ou matriz de pacotes × unidades, conforme maturidade.",
    },
    {
      title: "Priorização",
      desc: "Iniciativas ranqueadas por impacto financeiro, facilidade de execução e risco operacional.",
    },
    {
      title: "Execução",
      desc: "Donos, cronograma e métricas por iniciativa. Rito mensal de steering com captura rastreada.",
    },
    {
      title: "Sustentação",
      desc: "12 a 24 meses de acompanhamento pós-projeto. Lean management instalado nos processos críticos.",
    },
  ],
  applications: [
    "Empresas com margens em deterioração e pressão do board",
    "Companhias com programas fracassados anteriormente de corte de custos",
    "Preparação para IPO ou M&A com pressão de rentabilidade",
    "Pós-aquisição, para capturar sinergias operacionais",
    "Grupos com múltiplas unidades e duplicidade de estruturas",
    "Operações industriais com produtividade abaixo do benchmark setorial",
  ],
  differentials: [
    {
      title: "Método + change",
      desc: "Eficiência sustentável exige mudar comportamento, não só cortar linha. Integramos change management em cada iniciativa.",
    },
    {
      title: "OBZ e Matricial",
      desc: "Escolhemos metodologia conforme maturidade do cliente — não enfiamos um framework único que não cabe.",
    },
    {
      title: "Rastreio financeiro",
      desc: "Dashboard de economia realizada vs. planejada conectado ao controller, auditável pelo board.",
    },
    {
      title: "Ponta + corporativo",
      desc: "Atacamos custos corporativos e operação com o mesmo time — não dois projetos que não conversam.",
    },
  ],
  guideQuestions: [
    "Qual a diferença entre OBZ e Orçamento Matricial — e qual serve para meu caso?",
    "Como garantir que a economia não volte em 18 meses?",
    "Quando vale a pena atacar custos corporativos vs. operação?",
    "Como tratar áreas-suporte (RH, Jurídico, TI) em programas de eficiência?",
  ],
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Programas de eficiência operacional mal conduzidos destroem moral, perdem gente boa e
        devolvem o custo em 18 meses. Os que funcionam atacam a causa, não o sintoma: despesas
        nascem de decisões estruturais (processos, estrutura, políticas), e é lá que precisam ser
        tratadas — com metodologia e governança disciplinada.
      </p>

      <h3>Frentes de atuação</h3>
      <p>
        <strong>Orçamento Base Zero (OBZ)</strong>: reconstrução do orçamento partindo do zero,
        cada gasto justificado contra a estratégia.{" "}
        <strong>Orçamento Matricial (GMD)</strong>: matriz de pacotes × unidades de negócio com
        donos cruzados. <strong>Otimização de processos</strong>: mapeamento end-to-end,
        identificação de desperdícios, redesenho com automação quando couber.{" "}
        <strong>Lean management</strong>: gestão à vista, kaizen, resolução estruturada de
        problemas na ponta.
      </p>

      <div className="callout callout-teal">
        <strong>Sem change management, não há eficiência sustentável.</strong> Mais da metade dos
        programas de corte volta ao patamar anterior em 18 meses porque a estrutura e os hábitos
        que geraram a ineficiência continuam lá.
      </div>
    </>
  );
}
