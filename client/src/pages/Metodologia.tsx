import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Metodologia() {
  return (
    <Layout>
      <div className="pt-32 pb-16 relative" style={{ background: "linear-gradient(135deg, #0B3D5C, #072A40)" }}>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-teal to-gold" />
        <div className="container relative z-10">
          <p className="text-xs text-white/40 mb-4"><Link href="/" className="hover:text-gold cursor-pointer">Home</Link> <span className="mx-2">›</span> Metodologia</p>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-3">Nossa Metodologia</h1>
          <p className="text-lg text-white/60 max-w-xl">Framework proprietário que integra as melhores práticas internacionais, modelado sob medida para cada cliente.</p>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl">
            <p className="section-tag">Nossa abordagem</p>
            <h2 className="section-title">O diferencial está na customização</h2>
            <p className="text-gray-medium mb-5">Nossa metodologia integra as melhores práticas de mercado e está alinhada com as principais referências internacionais em gestão de mudanças, estratégia e operações.</p>
            <p className="text-gray-medium mb-5">Estudamos e aplicamos frameworks consagrados como ADKAR, Kotter, McKinsey 7-S, Lean, Six Sigma e outras referências mundiais. Mas <strong className="text-navy">não somos reféns de nenhuma delas.</strong></p>
            <p className="text-gray-medium">O grande diferencial da collab:Z é que <strong className="text-navy">modelamos a melhor prática ao contexto específico de cada cliente</strong> — combinando elementos de diversas metodologias em uma abordagem única, prática e orientada a resultados.</p>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="py-20 bg-cream">
        <div className="container">
          <p className="section-tag">Framework proprietário</p>
          <h2 className="section-title">Os 3 pilares da Metodologia collab:Z</h2>
          <p className="section-subtitle">Três dimensões interdependentes que cobrem todo o ciclo de transformação organizacional.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Gestão", cls: "pillar-gestao",
                items: ["Governança de projetos e programas", "PMO e gestão de portfólio", "Indicadores e dashboards", "Compliance e processos decisórios", "Gestão de mudanças e resistência"] },
              { num: "02", title: "Estratégia", cls: "pillar-estrategia",
                items: ["Diagnóstico organizacional", "Formulação e planejamento estratégico", "Roadmap de transformação", "Alinhamento de stakeholders", "Design organizacional e M&A"] },
              { num: "03", title: "Operação", cls: "pillar-operacao",
                items: ["Implementação e acompanhamento", "Eficiência operacional e OBZ", "Automação e tecnologia", "Sustentação e melhoria contínua", "Dados, BI e IA aplicada"] },
            ].map((p) => (
              <div key={p.num} className={`${p.cls} bg-white rounded-xl p-8 relative border border-border hover:-translate-y-1 hover:shadow-lg transition-all`}>
                <span className="absolute top-4 right-6 font-display text-5xl text-navy/5">{p.num}</span>
                <h3 className="text-xl font-display text-navy mb-4">{p.title}</h3>
                <div className="space-y-2 text-sm text-gray-medium">
                  {p.items.map((item) => <div key={item}>→ {item}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-navy text-white">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3">Como funciona</p>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">Da análise à sustentação</h2>
            <p className="text-white/55 max-w-xl mx-auto">Nosso processo é estruturado em 4 fases, mas flexível o suficiente para se adaptar à complexidade de cada projeto.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: "01", title: "Diagnosticar", desc: "Mapeamento de contexto, stakeholders, riscos, cultura e prontidão para mudança." },
              { n: "02", title: "Planejar", desc: "Definição de estratégia, comunicação, engajamento, métricas e roadmap de execução." },
              { n: "03", title: "Executar", desc: "Implementação disciplinada com monitoramento contínuo de adoção e ajustes em tempo real." },
              { n: "04", title: "Sustentar", desc: "Garantia de resultados no longo prazo, melhoria contínua e transferência de conhecimento." },
            ].map((step) => (
              <div key={step.n} className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/8 transition-all">
                <div className="text-gold font-mono font-bold text-sm mb-3">{step.n}</div>
                <h3 className="font-display text-xl text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best practices */}
      <section className="py-20">
        <div className="container">
          <p className="section-tag">Referências Integradas</p>
          <h2 className="section-title">Alinhados com as melhores referências mundiais</h2>
          <p className="section-subtitle">Não seguimos uma única metodologia — integramos o melhor de cada uma ao contexto do cliente.</p>
          <div className="overflow-x-auto rounded-lg shadow-sm">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="bg-navy text-white p-4 text-left text-xs font-semibold tracking-wider">Referência</th>
                  <th className="bg-navy text-white p-4 text-left text-xs font-semibold tracking-wider">Foco</th>
                  <th className="bg-navy text-white p-4 text-left text-xs font-semibold tracking-wider">O que integramos</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { ref: "ADKAR (Prosci)", foco: "Transição individual", integra: "Modelo de adoção individual em projetos com alto impacto em pessoas" },
                  { ref: "Kotter 8 Steps", foco: "Liderança top-down", integra: "Criação de senso de urgência e formação de coalizões em transformações amplas" },
                  { ref: "McKinsey 7-S", foco: "Alinhamento organizacional", integra: "Diagnóstico de alinhamento entre estratégia, estrutura, sistemas e cultura" },
                  { ref: "Lean / Six Sigma", foco: "Eficiência operacional", integra: "Eliminação de desperdícios e otimização de processos em operações" },
                  { ref: "OBZ / Matricial", foco: "Gestão de custos", integra: "Orçamento base zero e matricial para redução estrutural de gastos" },
                  { ref: "Agile / Scrum", foco: "Entrega iterativa", integra: "Ciclos curtos, feedback contínuo e adaptação rápida em projetos dinâmicos" },
                ].map((row, i) => (
                  <tr key={row.ref} className={i % 2 === 0 ? "bg-white" : "bg-muted"}>
                    <td className="p-4 font-semibold text-navy">{row.ref}</td>
                    <td className="p-4 text-gray-medium">{row.foco}</td>
                    <td className="p-4 text-gray-medium">{row.integra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream"><div className="container"><div className="rounded-xl p-12 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}>
        <h2 className="font-display text-3xl mb-3 relative z-10">Quer ver essa metodologia em ação?</h2>
        <p className="text-white/65 mb-6 relative z-10">Agende uma conversa e receba um diagnóstico preliminar gratuito.</p>
        <div className="flex gap-4 justify-center flex-wrap relative z-10">
          <Link href="/contato"><Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-5 rounded-md">Agendar diagnóstico <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          <Link href="/servicos"><Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-5 rounded-md">Ver soluções</Button></Link>
        </div>
      </div></div></section>
    </Layout>
  );
}
