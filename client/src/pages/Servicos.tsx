import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, BarChart3, ShieldCheck, Blocks, Cpu, Bot, Wrench } from "lucide-react";

export default function Servicos() {
  return (
    <Layout>
      <div className="pt-32 pb-16 relative" style={{ background: "linear-gradient(135deg, #0B3D5C, #072A40)" }}>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-teal to-gold" />
        <div className="container relative z-10">
          <p className="text-xs text-white/40 mb-4"><Link href="/" className="hover:text-gold cursor-pointer">Home</Link> <span className="mx-2">›</span> Serviços</p>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-3">Nossos Serviços</h1>
          <p className="text-lg text-white/60 max-w-xl">Soluções integradas de consultoria, desde o diagnóstico até a sustentação da mudança.</p>
        </div>
      </div>

      {/* Change Management */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="section-tag">Serviço principal</p>
              <h2 className="section-title">Gestão de Mudanças</h2>
              <p className="text-gray-medium mb-4">Utilizando a metodologia <strong className="text-navy">Managed Change™</strong> da LaMarsh Global, ajudamos sua organização a navegar por transformações complexas com foco nas pessoas.</p>
              <p className="text-gray-medium mb-6">Nossa abordagem identifica, analisa e supera a resistência à mudança de forma estruturada, mensurável e sustentável.</p>
              <Link href="/metodologia"><Button className="bg-teal hover:bg-teal-light text-white rounded-md text-sm">Conheça a metodologia <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
            </div>
            <div className="space-y-3">
              {[
                { title: "Diagnóstico & Assessments", desc: "Avaliação de prontidão, mapeamento de stakeholders e análise de impacto.", color: "border-navy" },
                { title: "Planejamento & Estratégia", desc: "Planos de comunicação, engajamento, treinamento e gestão de resistência.", color: "border-teal" },
                { title: "Implementação & Acompanhamento", desc: "Execução com monitoramento contínuo de adoção e ajustes em tempo real.", color: "border-gold" },
                { title: "Change as a Service", desc: "Suporte contínuo sob demanda, como extensão do seu time interno.", color: "border-slate" },
              ].map((s) => (
                <div key={s.title} className={`bg-muted rounded-lg p-6 border-l-[3px] ${s.color}`}>
                  <strong className="text-navy text-sm">{s.title}</strong>
                  <p className="text-xs text-gray-medium mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PMO */}
      <section className="py-20 bg-cream">
        <div className="container">
          <p className="section-tag">Gestão de projetos</p>
          <h2 className="section-title">Gestão de Projetos & PMO</h2>
          <p className="text-gray-medium max-w-2xl mb-8">Estruturamos escritórios de projetos e implementamos governança para garantir entregas no prazo, no orçamento e com qualidade.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Governança", desc: "Projetos e programas com processos claros de decisão." },
              { title: "PMO Setup", desc: "Implantação e sustentação de escritórios de projetos." },
              { title: "Portfólio", desc: "Gestão e priorização de iniciativas estratégicas." },
              { title: "Ágil & Híbrido", desc: "Metodologias adaptadas à maturidade da organização." },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-lg p-6 border border-border hover:shadow-md transition-all">
                <h3 className="font-display text-lg text-navy mb-2">{c.title}</h3>
                <p className="text-sm text-gray-medium">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-20">
        <div className="container">
          <p className="section-tag">Governança</p>
          <h2 className="section-title">Governança Corporativa</h2>
          <p className="section-subtitle">Processos decisórios, compliance e frameworks de governança para organizações em transformação.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Estruturação", desc: "Design de governança, comitês, papéis e responsabilidades alinhados à estratégia." },
              { icon: Layers, title: "Compliance", desc: "Frameworks de compliance, fluxos de aprovação e processos decisórios transparentes." },
              { icon: BarChart3, title: "Dashboards", desc: "Painéis de controle e reporting executivo para visibilidade em todos os níveis." },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-lg p-7 border border-border hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-11 h-11 rounded-lg bg-navy/8 flex items-center justify-center mb-4">
                  <c.icon className="w-5 h-5 text-navy" />
                </div>
                <h3 className="font-display text-lg text-navy mb-2">{c.title}</h3>
                <p className="text-sm text-gray-medium">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEGO SERIOUS PLAY */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="rounded-xl p-12 text-white" style={{ background: "linear-gradient(135deg, #E05040, #F7A823)" }}>
              <p className="text-sm font-bold tracking-widest opacity-80 mb-4">METODOLOGIA CERTIFICADA</p>
              <div className="font-display text-4xl leading-tight">LEGO®<br />SERIOUS<br />PLAY®</div>
              <p className="text-sm opacity-80 mt-4">Facilitação certificada</p>
            </div>
            <div>
              <p className="section-tag">Workshop experiencial</p>
              <h2 className="section-title">LEGO® SERIOUS PLAY®</h2>
              <p className="text-gray-medium mb-5">Metodologia de facilitação que utiliza peças LEGO como ferramenta de pensamento, comunicação e resolução de problemas.</p>
              <ul className="space-y-2 mb-6">
                {["Workshops facilitados para equipes e liderança", "Team building e alinhamento estratégico", "Resolução de problemas complexos", "Design de modelos de negócio e cenários futuros"].map((item) => (
                  <li key={item} className="flex gap-2 items-center text-sm text-gray-medium"><span className="text-gold">✦</span> {item}</li>
                ))}
              </ul>
              <Link href="/contato"><Button className="bg-navy hover:bg-teal text-white rounded-md text-sm">Solicitar um workshop <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20">
        <div className="container">
          <p className="section-tag">Tecnologia</p>
          <h2 className="section-title">Tecnologia aplicada à transformação</h2>
          <p className="section-subtitle">Ferramentas digitais e automação para potencializar e medir o impacto da mudança.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Wrench, title: "Automação", desc: "Workflows com n8n, Node-RED e ferramentas de integração para eliminar gargalos.", bg: "bg-teal/8", color: "text-teal" },
              { icon: BarChart3, title: "Analytics", desc: "Painéis em tempo real para monitorar adoção e resultados das iniciativas.", bg: "bg-navy/8", color: "text-navy" },
              { icon: Bot, title: "IA aplicada", desc: "Análise de sentimento, predição de resistência e personalização de comunicações.", bg: "bg-gold/10", color: "text-gold" },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-lg p-7 border border-border hover:shadow-md hover:-translate-y-1 transition-all">
                <div className={`w-11 h-11 rounded-lg ${c.bg} flex items-center justify-center mb-4`}>
                  <c.icon className={`w-5 h-5 ${c.color}`} />
                </div>
                <h3 className="font-display text-lg text-navy mb-2">{c.title}</h3>
                <p className="text-sm text-gray-medium">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="rounded-xl p-12 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}>
            <h2 className="font-display text-3xl mb-3 relative z-10">Cada transformação é única. A sua também.</h2>
            <p className="text-white/65 mb-6 relative z-10">Conte-nos sobre o seu desafio e nós desenhamos a solução.</p>
            <Link href="/contato"><Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-5 rounded-md relative z-10">Solicitar uma proposta <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
