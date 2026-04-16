import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Layers, Users, Cpu, BarChart3, ShieldCheck, Wrench, Globe, CheckCircle2 } from "lucide-react";

const solutions = [
  {
    id: "eficiencia", icon: TrendingUp, title: "Eficiência Operacional", color: "border-gold",
    desc: "Otimização de recursos, redução de custos e melhoria de produtividade com metodologias comprovadas e personalizadas.",
    indicated: "Empresas com gastos crescentes, margens decrescentes ou processos ineficientes.",
    items: ["Orçamento Base Zero (OBZ)", "Orçamento Matricial", "Otimização de Processos", "Redução de Custos Operacionais", "Melhoria de Produtividade", "Lean Management"],
  },
  {
    id: "estrategia", icon: Layers, title: "Estratégia & Planejamento", color: "border-teal",
    desc: "Formulação estratégica, modelos operacionais e planejamento financeiro para decisões de alto impacto.",
    indicated: "Empresas em crescimento, reestruturação ou processos de fusão e aquisição.",
    items: ["Formulação Estratégica", "Planejamento Financeiro", "Modelos Operacionais", "Fusões & Aquisições (M&A)", "Valuation & Due Diligence", "Design Organizacional"],
  },
  {
    id: "mudancas", icon: Users, title: "Gestão de Mudanças & Transformação", color: "border-navy",
    desc: "Gestão de mudança organizacional com foco em pessoas, adoção real e resultados sustentáveis. Integramos as melhores práticas internacionais, customizadas ao contexto de cada cliente.",
    indicated: "Empresas em processo de transformação, implementação de novas tecnologias ou reestruturação.",
    items: ["Diagnóstico & Assessments", "Planejamento de Mudança", "Gestão de Resistência", "Comunicação & Engajamento", "Treinamento & Capacitação", "Change as a Service"],
  },
  {
    id: "dados", icon: Cpu, title: "Dados, IA & Tecnologia", color: "border-teal",
    desc: "Business Intelligence, automação, analytics e inteligência artificial aplicada a decisões de negócio.",
    indicated: "Empresas que precisam transformar dados em decisões estratégicas.",
    items: ["Business Intelligence & Dashboards", "Automação de Processos (RPA/n8n)", "Analytics & Data Science", "IA aplicada a gestão", "ETL & Integração de Dados", "Cloud & Infraestrutura"],
  },
  {
    id: "pmo", icon: BarChart3, title: "PMO & Execução de Programas", color: "border-gold",
    desc: "Gestão de programas complexos, governança de projetos e foco na realização de benefícios tangíveis.",
    indicated: "Organizações com múltiplos projetos simultâneos ou programas de transformação.",
    items: ["Setup & Sustentação de PMO", "Gestão de Portfólio", "Governança de Projetos", "Metodologias Ágeis & Híbridas", "Métricas de Valor & KPIs", "CAPEX & Gestão de Investimentos"],
  },
  {
    id: "governanca", icon: ShieldCheck, title: "Governança & Compliance", color: "border-navy",
    desc: "Estruturação de processos decisórios, compliance regulatório e frameworks de governança corporativa.",
    indicated: "Empresas em crescimento que precisam de estruturas robustas de decisão e controle.",
    items: ["Estruturação de Governança", "Compliance & Regulatório", "Processos Decisórios", "Comitês & Conselhos", "Gestão de Riscos", "Reporting Executivo"],
  },
  {
    id: "reestruturacao", icon: Wrench, title: "Reestruturação & Turnaround", color: "border-gold",
    desc: "Gestão de crises, renegociação de dívidas, otimização de caixa e recuperação operacional.",
    indicated: "Empresas altamente endividadas, com crise de caixa ou margens negativas.",
    items: ["Diagnóstico de Crise", "Gestão de Caixa & Working Capital", "Renegociação de Dívidas", "Reestruturação Organizacional", "Turnaround Operacional", "Plano de Recuperação"],
  },
  {
    id: "lsp", icon: Globe, title: "LEGO® SERIOUS PLAY®", color: "border-teal",
    desc: "Metodologia de facilitação experiencial para estratégia, inovação, team building e resolução de problemas complexos.",
    indicated: "Equipes que precisam de alinhamento estratégico, inovação ou resolução de conflitos.",
    items: ["Workshops de Estratégia", "Team Building", "Resolução de Problemas", "Design de Modelos de Negócio", "Cenários Futuros", "Alinhamento de Liderança"],
  },
];

export default function Servicos() {
  return (
    <Layout>
      <div className="pt-32 pb-16 relative" style={{ background: "linear-gradient(135deg, #0B3D5C, #072A40)" }}>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-teal to-gold" />
        <div className="container relative z-10">
          <p className="text-xs text-white/40 mb-4"><Link href="/" className="hover:text-gold cursor-pointer">Home</Link> <span className="mx-2">›</span> Serviços</p>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-3">Nossas Soluções</h1>
          <p className="text-lg text-white/60 max-w-xl">Soluções projetadas para resultados duradouros e sustentáveis, impulsionando sua empresa para novos patamares.</p>
        </div>
      </div>

      {/* Solutions */}
      {solutions.map((s, i) => (
        <section key={s.id} id={s.id} className={`py-20 ${i % 2 === 1 ? "bg-cream" : ""}`}>
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-navy/8 flex items-center justify-center"><s.icon className="w-6 h-6 text-navy" /></div>
                  <h2 className="text-2xl md:text-3xl font-display text-navy">{s.title}</h2>
                </div>
                <p className="text-gray-medium mb-4">{s.desc}</p>
                <div className="bg-gold/5 border border-gold/20 rounded-lg p-4 mb-6">
                  <p className="text-sm"><strong className="text-navy">Indicado para: </strong><span className="text-gray-medium">{s.indicated}</span></p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {s.items.map((item) => (
                    <div key={item} className="flex gap-2 items-center text-sm text-gray-medium">
                      <CheckCircle2 className="w-4 h-4 text-teal shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className={`bg-white rounded-xl p-8 border border-border ${s.color} border-t-4 shadow-sm`}>
                  <div className="text-center">
                    <s.icon className="w-16 h-16 text-navy/10 mx-auto mb-4" />
                    <h3 className="font-display text-xl text-navy mb-3">{s.title}</h3>
                    <p className="text-sm text-gray-medium mb-6">Quer saber como essa solução pode ajudar sua empresa?</p>
                    <Link href="/contato"><Button className="bg-navy hover:bg-teal text-white rounded-md text-sm w-full justify-center">Solicitar proposta <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-navy"><div className="container"><div className="rounded-xl p-12 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1A6E8E, #0B3D5C)" }}>
        <h2 className="font-display text-3xl mb-3 relative z-10">Cada transformação é única. A sua também.</h2>
        <p className="text-white/65 mb-6 relative z-10">Conte-nos sobre o seu desafio e nós desenhamos a solução sob medida.</p>
        <Link href="/contato"><Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-5 rounded-md relative z-10">Solicitar uma proposta <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
      </div></div></section>
    </Layout>
  );
}
