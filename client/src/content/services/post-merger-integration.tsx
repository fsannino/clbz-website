import {
  Handshake,
  Calendar,
  Gauge,
  Users2,
  Landmark,
} from "lucide-react";
import type { ServiceMeta } from "./types";
import { ServiceCheckList } from "@/pages/ServiceDetail";

export const meta: ServiceMeta = {
  slug: "post-merger-integration",
  pillar: "Estratégia",
  title: "Post-Merger Integration",
  tagline:
    "A fusão ou aquisição já fechou. Agora vem a parte que define se o deal criou ou destruiu valor: integrar duas organizações em uma, sem perder pessoas-chave, clientes ou o ritmo da operação.",
  excerpt:
    "Integração pós-fusão com foco em captura de sinergias, preservação de pessoas-chave e continuidade operacional.",
  icon: Handshake,
  accent: "teal",
  triggers: [
    "O closing está marcado e ninguém decidiu ainda quem opera o quê no primeiro dia útil",
    "Dois ERPs, dois RHs, duas culturas — e cronograma de sinergias para mostrar ao board",
    "Time-chave da empresa adquirida ameaça sair e não há plano de retenção formal",
    "Clientes da empresa comprada começam a perguntar se vão ser atendidos da mesma forma",
  ],
  benefits: [
    {
      icon: Calendar,
      title: "Day 1 sem rupturas",
      desc: "Checklist operacional hora-a-hora para que o primeiro dia da nova empresa não tenha eventos de descontinuidade visíveis a clientes, funcionários ou reguladores.",
    },
    {
      icon: Gauge,
      title: "Captura de sinergias",
      desc: "Árvore de sinergias quantificada, desdobrada em iniciativas com dono, prazo e métrica. Rastreio mensal de realizado vs. tese do deal.",
    },
    {
      icon: Users2,
      title: "Retenção de pessoas-chave",
      desc: "People Map com análise de risco de saída, pacotes de retenção e plano de integração cultural que preserva o DNA de ambos os lados.",
    },
    {
      icon: Landmark,
      title: "Integração em ambiente regulado",
      desc: "Coordenação com reguladores setoriais (Bacen, ANS, Aneel, CVM), compliance contínuo e integração jurídica estruturada.",
    },
  ],
  methodology: [
    {
      title: "Day 1 Readiness",
      desc: "Semanas −4 a 0. Checklist operacional, comunicação interna/externa e governança do IMO definidos antes do closing.",
    },
    {
      title: "First 100 Days",
      desc: "IMO ativo com líderes dos dois lados. Workstreams (Finance, HR, IT, Ops, Commercial, Legal) com ritmo semanal. Quick wins de sinergia.",
    },
    {
      title: "Deep Integration",
      desc: "Meses 4–12. Migração de ERPs, harmonização de processos core, unificação de RH, racionalização de fornecedores.",
    },
    {
      title: "Value Realization",
      desc: "Meses 12–24. Medição contínua das sinergias capturadas vs. tese. Ajustes finos de estrutura, cultura e governança.",
    },
    {
      title: "Transição para BAU",
      desc: "Encerramento do IMO com documentação institucional, playbook do deal e transferência de accountability para liderança de linha.",
    },
  ],
  applications: [
    "Fusões e aquisições entre empresas de porte similar (mergers of equals)",
    "Aquisições estratégicas para entrada em novo mercado ou segmento",
    "Consolidação de carve-outs vindos de spin-offs corporativos",
    "Integração de empresas familiares adquiridas por grupos maiores",
    "Joint ventures que exigem modelo operacional comum",
    "Roll-ups em setores fragmentados (saúde, educação, tecnologia)",
  ],
  differentials: [
    {
      title: "Time multidisciplinar",
      desc: "Estratégia, processos, tecnologia, pessoas e change management no mesmo projeto — não advisors fragmentados.",
    },
    {
      title: "Presença no cliente",
      desc: "Consultores sêniores dentro da operação do Day 1 até a captura final de sinergias, não relatórios vindos de fora.",
    },
    {
      title: "Foco em comportamento",
      desc: "Preservação de cultura e retenção de pessoas-chave tratadas como workstream com metodologia própria de change management.",
    },
    {
      title: "Setores regulados",
      desc: "Experiência comprovada em PMIs em ambientes sob Bacen, ANS, Aneel, CNJ — onde a integração exige coordenação regulatória adicional.",
    },
  ],
  guideQuestions: [
    "Quando devo engajar um parceiro de PMI — antes ou depois do closing?",
    "Como dimensionar corretamente a captura de sinergias prometidas no deal?",
    "Qual é o risco de perda de pessoas-chave e como mitigar?",
    "Como lidar com duas culturas organizacionais em integração?",
    "Que workstreams são obrigatórios nos primeiros 100 dias?",
    "Como integrar empresas em setor regulado sem quebrar compliance?",
  ],
  cases: [
    {
      sector: "Serviços Financeiros",
      title: "Integração de fintechs",
      summary:
        "Coordenação de IMO para fusão entre fintech nativa digital e instituição tradicional, preservando 92% de pessoas-chave e capturando 85% das sinergias de custo em 18 meses.",
    },
    {
      sector: "Saúde",
      title: "Consolidação hospitalar",
      summary:
        "PMI de grupo hospitalar após aquisição de 3 unidades, com integração de prontuário eletrônico, unificação de políticas clínicas e redução de 22% de custo administrativo.",
    },
    {
      sector: "Indústria",
      title: "Fusão entre fabricantes",
      summary:
        "Integração pós-fusão de dois fabricantes de bens de capital — Day 1 sem descontinuidade operacional, racionalização de portfolio, sinergias de R$ 180M ao longo de 24 meses.",
    },
  ],
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Entre 70% e 90% das fusões e aquisições não entregam o valor prometido no deck do deal.
        A causa quase nunca está na estratégia — está na execução dos 12 a 18 meses seguintes. A
        CollabZ atua nessa janela crítica com um modelo integrado de{" "}
        <strong>PMO + gestão de mudanças + desenho organizacional + integração tecnológica</strong>,
        coordenado por quem viveu PMIs em setores regulados e ambientes operacionalmente
        complexos.
      </p>

      <h3>O que é Post-Merger Integration</h3>
      <p>
        PMI é o conjunto de decisões e ações que transformam duas empresas legalmente combinadas
        em uma organização que opera, decide e cresce como uma só. Vai além de consolidar planos
        de contas: envolve definir que processos sobrevivem, quem ocupa cada cadeira do novo
        organograma, como os clientes são migrados, qual cultura prevalece e como medir se as
        sinergias prometidas estão se materializando.
      </p>
      <p>
        Tratar PMI como "projeto de TI" ou "projeto de RH" é o erro mais frequente. É um programa
        transversal que toca todas as áreas ao mesmo tempo, com custo alto de indecisão —
        semanas perdidas no início custam trimestres de captura de sinergia.
      </p>

      <h3>Workstreams que coordenamos</h3>
      <ServiceCheckList
        items={[
          "IMO (Integration Management Office) e governança executiva",
          "Organização, talentos e estrutura (redesenho organizacional)",
          "Captura e rastreamento de sinergias (custo e receita)",
          "Integração de sistemas: ERP, CRM, HCM, BI",
          "Harmonização de processos core e SLAs",
          "Change management e comunicação interna/externa",
          "Integração comercial: carteira de clientes, preços, canais",
          "Cultura organizacional e retenção de pessoas-chave",
          "Compliance regulatório e continuidade jurídica",
          "Gestão financeira: plano de contas, reporting, fechamento",
        ]}
      />

      <h3>Resultados que perseguimos</h3>
      <ul>
        <li>Captura de <strong>90%+ das sinergias financeiras</strong> no prazo projetado</li>
        <li>Zero eventos de descontinuidade operacional no Day 1 e First 100 Days</li>
        <li>Retenção de pessoas-chave acima de 85% nos 12 meses pós-closing</li>
        <li>Integração tecnológica completa em 12–30 meses conforme porte</li>
        <li>NPS de clientes preservado (sem queda superior a 5 pontos)</li>
      </ul>

      <div className="callout callout-gold">
        <strong>Quando chamar a collab:Z.</strong> Idealmente 30 a 60 dias antes do closing. Temos
        engajamentos mais curtos para PMIs em andamento que perderam governança, mas o retorno
        sobre o investimento é significativamente maior quando participamos desde o desenho do
        Day-1 Playbook.
      </div>
    </>
  );
}
