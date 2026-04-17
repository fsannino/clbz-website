import {
  ShieldCheck,
  ScrollText,
  Users2,
  AlertTriangle,
  FileCheck,
} from "lucide-react";
import type { ServiceMeta } from "./types";

export const meta: ServiceMeta = {
  slug: "governanca-compliance",
  pillar: "Gestão",
  title: "Governança & Compliance",
  tagline:
    "Governança não é conselho bonito na parede — é o sistema que garante que decisões certas são tomadas no momento certo pelas pessoas certas. Desenhamos e ativamos esse sistema em ambientes regulados.",
  excerpt:
    "Estruturação de governança corporativa, compliance regulatório, processos decisórios, comitês, gestão de riscos e reporting executivo.",
  icon: ShieldCheck,
  accent: "navy",
  triggers: [
    "Empresa cresceu rápido, governança continua informal — CEO centraliza tudo",
    "Setor regulado (financeiro, energia, saúde, jurídico) exige reporting estruturado",
    "Board recém-constituído precisa de ritos, templates e políticas",
    "Compliance com LGPD, SOX, ESG ou regulador setorial vira tema urgente",
  ],
  benefits: [
    {
      icon: ScrollText,
      title: "Governança formal",
      desc: "Estatuto, regimentos, alçadas e ritos desenhados conforme porte e complexidade — não copiado de manual genérico.",
    },
    {
      icon: Users2,
      title: "Board que funciona",
      desc: "Charter, agenda anual, pacote de material padrão, avaliação de efetividade — conselho com rotina de decisão.",
    },
    {
      icon: AlertTriangle,
      title: "Riscos sob controle",
      desc: "Mapa de riscos, apetite definido, linhas de defesa, plano de mitigação e rotina de monitoramento.",
    },
    {
      icon: FileCheck,
      title: "Compliance regulatório",
      desc: "Adequação a LGPD, SOX, setoriais (Bacen, CVM, Aneel, ANS, CNJ) com rastreabilidade e auditoria.",
    },
  ],
  methodology: [
    {
      title: "Assessment",
      desc: "Avaliação da governança atual vs. boas práticas e exigências regulatórias. Gaps priorizados.",
    },
    {
      title: "Desenho",
      desc: "Órgãos (conselho, comitês), alçadas, ritos, políticas, charters. Calibrado ao porte do cliente.",
    },
    {
      title: "Instalação",
      desc: "Primeiras reuniões conduzidas por nós, templates em uso, rituais rodando.",
    },
    {
      title: "Capacitação",
      desc: "Conselheiros e comitês treinados em governança, compliance, gestão de riscos.",
    },
    {
      title: "Sustentação",
      desc: "Avaliação de efetividade do board e comitês anualmente; ajustes de governança conforme a empresa evolui.",
    },
  ],
  applications: [
    "Empresas que ganharam porte rápido e precisam profissionalizar governança",
    "Companhias em preparação para IPO ou novo round (due diligence institucional)",
    "Setores regulados: serviços financeiros, energia, saúde, educação, judiciário",
    "Implementação de LGPD, SOX ou regulatórios setoriais",
    "Estruturação de programas ESG com governança formal",
    "Empresas familiares em transição para governança profissional",
  ],
  differentials: [
    {
      title: "Setores regulados",
      desc: "Experiência em Bacen, CVM, Aneel, ANS, CNJ e outros — conhecemos exigências específicas, não apenas boas práticas genéricas.",
    },
    {
      title: "Governança calibrada",
      desc: "Excesso sufoca, falta expõe. Calibramos conforme porte e risco — sem burocracia desnecessária.",
    },
    {
      title: "Board ativo",
      desc: "Não entregamos regimento bonito — entregamos conselho que efetivamente delibera com agenda e material.",
    },
    {
      title: "Integração com riscos",
      desc: "Governança conectada a gestão de riscos e compliance — três pilares desenhados juntos.",
    },
  ],
  guideQuestions: [
    "Quando profissionalizar governança?",
    "Como desenhar um conselho que realmente decide?",
    "LGPD, SOX, ESG — como priorizar compliance?",
    "Como calibrar alçadas para não travar a operação?",
  ],
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Governança adequada é função direta do tamanho, da complexidade e do perfil regulatório
        da empresa. Excesso sufoca; falta expõe. Nosso trabalho é calibrar — desenhar uma
        governança que protege o que precisa proteger e não trava o que precisa andar.
      </p>

      <div className="callout callout-navy">
        <strong>Setores regulados são nosso terreno.</strong> Atuamos com frequência em serviços
        financeiros, energia, saúde, educação e judiciário — ambientes onde governança e
        compliance não são acessórios e sim parte estrutural da tese de negócio.
      </div>
    </>
  );
}
