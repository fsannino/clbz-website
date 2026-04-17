import {
  Globe,
  Puzzle,
  Trophy,
  Users,
  Laptop,
} from "lucide-react";
import type { ServiceMeta } from "./types";

export const meta: ServiceMeta = {
  slug: "gamificacao-engajamento",
  pillar: "Pessoas",
  title: "Gamificação & Engajamento",
  tagline:
    "Quando comunicação tradicional não cola, jogo entra. Usamos gamificação, LEGO® SERIOUS PLAY® e plataformas digitais para transformar alinhamento em experiência vivida — não palestra assistida.",
  excerpt:
    "Gamificação corporativa, LEGO® SERIOUS PLAY®, plataformas de engajamento, team building experiencial e dinâmicas de alinhamento.",
  icon: Globe,
  accent: "teal",
  triggers: [
    "Kick-off importante, mas você sabe que PowerPoint não vai colar",
    "Time tem ideias fragmentadas, precisa de problema complexo discutido em 3 horas",
    "Fusão, reorganização ou estratégia nova — cultura precisa ser construída, não apenas comunicada",
    "Programa de capacitação enfrenta baixa conclusão — conteúdo não envolve",
  ],
  benefits: [
    {
      icon: Puzzle,
      title: "Convergência acelerada",
      desc: "Sessões de LEGO® SERIOUS PLAY® constroem alinhamento em horas sobre temas que levariam semanas em reuniões tradicionais.",
    },
    {
      icon: Trophy,
      title: "Engajamento mensurável",
      desc: "Plataformas gamificadas com métricas reais de participação, conclusão e impacto — não apenas 'senso positivo'.",
    },
    {
      icon: Users,
      title: "Memória compartilhada",
      desc: "Experiências que ficam no time — discussões abstratas viram artefatos concretos que podem ser retomados meses depois.",
    },
    {
      icon: Laptop,
      title: "Escala digital",
      desc: "Programas que funcionam para 50 ou 5.000 pessoas, presencial ou remoto, com experiência equivalente.",
    },
  ],
  methodology: [
    {
      title: "Desafio de negócio",
      desc: "Começamos pelo problema real do cliente — nunca é 'queremos uma atividade divertida'.",
    },
    {
      title: "Desenho de experiência",
      desc: "Escolha de formato (presencial, digital, LEGO, campanha gamificada) conforme objetivo e audiência.",
    },
    {
      title: "Prototipagem",
      desc: "Teste com grupo pequeno antes de escalar. Ajustes de narrativa, mecânica e duração.",
    },
    {
      title: "Entrega",
      desc: "Facilitação por certificados (LSP) ou operação de plataforma digital com acompanhamento contínuo.",
    },
    {
      title: "Debrief e ativação",
      desc: "Sessão de consolidação traduz o que viveram em decisões concretas e rotinas do time.",
    },
  ],
  applications: [
    "Kick-off de estratégia, plano ou programa de transformação",
    "Off-site executivo para decisão complexa ou reconstrução de time",
    "Construção ou reafirmação de cultura pós-M&A",
    "Capacitação massiva que exige retenção (vendas, segurança, compliance)",
    "Programa de inovação com challenges gamificados",
    "Engajamento de times remotos geograficamente distribuídos",
  ],
  differentials: [
    {
      title: "Facilitadores certificados",
      desc: "Equipe com certificação LEGO® SERIOUS PLAY® e portfolio comprovado em clientes enterprise.",
    },
    {
      title: "Desenho sob medida",
      desc: "Nenhuma sessão é 'pacote pronto' — sempre construída a partir do desafio específico do cliente.",
    },
    {
      title: "Plataforma própria",
      desc: "Plataforma digital de engajamento com mecânicas customizáveis para campanhas internas.",
    },
    {
      title: "Ativação pós-sessão",
      desc: "Não entregamos experiência e vamos embora — apoiamos a tradução em decisão e rotina.",
    },
  ],
  guideQuestions: [
    "Quando usar LEGO® SERIOUS PLAY® vs. outra metodologia?",
    "Como desenhar uma campanha gamificada que dá resultado?",
    "Como escolher entre presencial e digital?",
    "Quais KPIs realmente medem engajamento?",
  ],
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Gamificação bem aplicada não é "enfeite" — é método para acelerar convergência, tornar
        conversas difíceis concretas e criar memória compartilhada. Usamos desde sessões
        presenciais de LEGO® SERIOUS PLAY® com C-level até plataformas digitais de engajamento
        para grandes operações.
      </p>

      <div className="callout callout-teal">
        <strong>Facilitadores certificados.</strong> Nossa equipe inclui facilitadores
        certificados em LEGO® SERIOUS PLAY® e designers de experiência com portfólio comprovado em
        clientes enterprise brasileiros e multinacionais.
      </div>
    </>
  );
}
