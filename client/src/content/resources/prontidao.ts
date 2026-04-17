export type ChecklistDimension = {
  id: string;
  title: string;
  description: string;
  questions: Array<{ id: string; text: string }>;
};

export const CHECKLIST_PRONTIDAO: {
  title: string;
  subtitle: string;
  intro: string;
  dimensions: ChecklistDimension[];
  tiers: Array<{ min: number; max: number; label: string; color: string; advice: string }>;
} = {
  title: "Checklist de Prontidão para Mudança",
  subtitle: "20 perguntas em 5 dimensões",
  intro:
    "Este diagnóstico orienta executivos e líderes de transformação a avaliar, em 5 a 7 minutos, se sua organização está pronta para iniciar — ou sustentar — um programa de mudança. Cada pergunta vale de 0 a 5 pontos. O score total (0–100) indica a faixa de prontidão e a ação recomendada.",
  dimensions: [
    {
      id: "patrocinio",
      title: "Liderança & Patrocínio",
      description: "O projeto tem um sponsor executivo ativo, visível e com autoridade real?",
      questions: [
        {
          id: "p1",
          text: "O patrocinador executivo do programa está nomeado, comunicado e presente em rituais decisórios quinzenais ou mais frequentes.",
        },
        {
          id: "p2",
          text: "O C-level compartilha publicamente a narrativa da mudança com coerência (mesmo vocabulário, mesmas métricas).",
        },
        {
          id: "p3",
          text: "Os gestores intermediários sabem explicar, em 3 frases, por que esta mudança está acontecendo e qual o papel deles.",
        },
        {
          id: "p4",
          text: "O sponsor tem autoridade real sobre recursos, prioridades e decisões difíceis de pessoas.",
        },
      ],
    },
    {
      id: "comunicacao",
      title: "Comunicação & Engajamento",
      description: "Há plano de comunicação que cobre as 3 fases (incubação, lançamento, sustentação)?",
      questions: [
        {
          id: "c1",
          text: "Existe um plano de comunicação escrito cobrindo pelo menos 12 meses, não apenas o go-live.",
        },
        {
          id: "c2",
          text: "O mapa de stakeholders identifica apoiadores, neutros e resistentes, com estratégia específica para cada grupo.",
        },
        {
          id: "c3",
          text: "Existem canais de escuta ativa (pulse surveys, fóruns, ombudsman) com periodicidade e donos definidos.",
        },
        {
          id: "c4",
          text: "As comunicações variam em formato (vídeo, e-mail, presencial, chat) conforme a audiência, e não dependem de um único canal.",
        },
      ],
    },
    {
      id: "capacitacao",
      title: "Capacidade & Capacitação",
      description: "A organização tem as competências e o suporte necessários para absorver a mudança?",
      questions: [
        {
          id: "k1",
          text: "Existe um plano de capacitação dimensionado por perfil de usuário, com cronograma e medição de proficiência.",
        },
        {
          id: "k2",
          text: "Há mecanismos de suporte pós-treinamento (job aids, canal de dúvidas, peer learning) ativos por pelo menos 90 dias após o go-live.",
        },
        {
          id: "k3",
          text: "As lideranças intermediárias receberam treinamento específico em como conduzir a mudança com seus times, não apenas em como usar a nova ferramenta.",
        },
        {
          id: "k4",
          text: "A curva de aprendizado foi considerada no dimensionamento de produtividade esperada nos primeiros 6 meses.",
        },
      ],
    },
    {
      id: "processos",
      title: "Processos & Governança",
      description: "Há disciplina executiva e rituais que sustentam a mudança ao longo do tempo?",
      questions: [
        {
          id: "g1",
          text: "Existe um steering committee com cadência definida e pauta voltada à captura de valor, não apenas ao status de entregas.",
        },
        {
          id: "g2",
          text: "Os riscos de mudança estão mapeados com donos, mitigação e indicadores de alerta precoce.",
        },
        {
          id: "g3",
          text: "O business case da mudança inclui explicitamente métricas de adoção (não só de entrega técnica).",
        },
        {
          id: "g4",
          text: "Existe um mecanismo formal para decidir rapidamente ajustes de escopo, rota ou investimento adicional.",
        },
      ],
    },
    {
      id: "sustentacao",
      title: "Medição & Sustentação",
      description: "A organização sabe como medir e sustentar a mudança depois que o projeto 'acaba'?",
      questions: [
        {
          id: "s1",
          text: "Os KPIs de adoção (uso efetivo, proficiência, sentimento) são coletados e reportados mensalmente ao patrocínio.",
        },
        {
          id: "s2",
          text: "Existe uma fase formal de sustentação com orçamento e equipe dedicados por pelo menos 6 meses após o go-live.",
        },
        {
          id: "s3",
          text: "A transição de accountability do time de projeto para a operação de linha está desenhada e tem data.",
        },
        {
          id: "s4",
          text: "Lições aprendidas são documentadas e institucionalizadas para aplicação em próximas iniciativas.",
        },
      ],
    },
  ],
  tiers: [
    {
      min: 0,
      max: 40,
      label: "Não pronto",
      color: "#C83A3A",
      advice:
        "Iniciar agora traria risco alto de falha. Recomendado antes: estruturar patrocínio formal, mapear stakeholders e construir business case com métricas de adoção.",
    },
    {
      min: 41,
      max: 65,
      label: "Em risco",
      color: "#F7A823",
      advice:
        "Condições mínimas existem, mas há lacunas críticas — especialmente em capacitação de líderes intermediários e sustentação pós-go-live. Atacar essas frentes antes de avançar.",
    },
    {
      min: 66,
      max: 85,
      label: "Pronto com ressalvas",
      color: "#1A6E8E",
      advice:
        "Bom patamar. Vale ajustar 1 ou 2 dimensões mais fracas antes do lançamento para reduzir retrabalho. Boa hora para envolver change management estruturado no projeto.",
    },
    {
      min: 86,
      max: 100,
      label: "Pronto",
      color: "#2E7D32",
      advice:
        "Organização está preparada. Foco agora é execução disciplinada, não reforço da prontidão. Monitorar especialmente adoção nos primeiros 90 dias pós-go-live.",
    },
  ],
};
