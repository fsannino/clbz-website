import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Metodologia() {
  return (
    <Layout>
      <div className="pt-32 pb-16 relative" style={{ background: "linear-gradient(135deg, #0B3D5C, #072A40)" }}>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-teal to-gold" />
        <div className="container relative z-10">
          <p className="text-xs text-white/40 mb-4"><Link href="/" className="hover:text-gold cursor-pointer">Home</Link> <span className="mx-2">›</span> Metodologia</p>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-3">Nossa Metodologia</h1>
          <p className="text-lg text-white/60 max-w-xl">Framework proprietário + Managed Change™ da LaMarsh Global para transformação completa.</p>
        </div>
      </div>

      {/* collab:Z Framework */}
      <section className="py-20">
        <div className="container">
          <p className="section-tag">Framework proprietário</p>
          <h2 className="section-title">Metodologia collab:Z</h2>
          <p className="section-subtitle">Três pilares interdependentes que cobrem todo o ciclo de mudança organizacional.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Gestão", cls: "pillar-gestao", items: ["Governança de projetos e programas", "PMO e gestão de portfólio", "Indicadores e dashboards", "Compliance e processos"], highlight: "★ Managed Change™ integrado" },
              { num: "02", title: "Estratégia", cls: "pillar-estrategia", items: ["Diagnóstico organizacional", "Planejamento estratégico", "Roadmap de transformação", "Alinhamento de stakeholders", "Design organizacional"] },
              { num: "03", title: "Operação", cls: "pillar-operacao", items: ["Implementação e acompanhamento", "Automação de processos", "Tecnologia e ferramentas", "Sustentação e melhoria contínua", "Change as a Service"] },
            ].map((p) => (
              <div key={p.num} className={`${p.cls} bg-white rounded-xl p-8 relative border border-border hover:-translate-y-1 hover:shadow-lg transition-all`}>
                <span className="absolute top-4 right-6 font-display text-5xl text-navy/5">{p.num}</span>
                <h3 className="text-xl font-display text-navy mb-3">{p.title}</h3>
                <div className="space-y-2 text-sm text-gray-medium">
                  {p.items.map((item) => <div key={item} className="flex gap-2">→ {item}</div>)}
                  {p.highlight && <div className="flex gap-2 text-gold font-semibold mt-2">{p.highlight}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Managed Change */}
      <section className="py-20 bg-navy text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3">LaMarsh Global · Desde 1979</p>
              <h2 className="font-display text-3xl md:text-4xl text-white mb-5">Managed Change™</h2>
              <p className="text-white/60 mb-5">A metodologia que é o coração do nosso pilar de Gestão. Desenvolvida pela LaMarsh Global ao longo de mais de 4 décadas — estruturada para identificar, analisar e superar a resistência à mudança.</p>
              <p className="text-white/60 mb-6">Como licenciados exclusivos no Brasil e LATAM, somos os únicos habilitados a aplicar e certificar profissionais nesta metodologia na região.</p>
              <div className="flex gap-3 flex-wrap">
                {["Completa", "Universal", "Escalável"].map((tag) => (
                  <span key={tag} className="bg-gold/15 text-gold px-3 py-1 rounded-full text-xs font-semibold">{tag}</span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { n: "1. Identificar", d: "Mapeamento de impactos, stakeholders e riscos." },
                { n: "2. Analisar", d: "Prontidão, cultura e fontes de resistência." },
                { n: "3. Planejar", d: "Estratégia com planos de comunicação e engajamento." },
                { n: "4. Implementar & Sustentar", d: "Execução, monitoramento e sustentação no longo prazo." },
              ].map((step) => (
                <div key={step.n} className="bg-white/5 rounded-lg p-6 border-l-[3px] border-gold">
                  <strong className="text-gold">{step.n}</strong>
                  <p className="text-sm text-white/45 mt-1">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="container">
          <p className="section-tag">Comparativo</p>
          <h2 className="section-title">Como nos comparamos</h2>
          <p className="section-subtitle">Principais metodologias de gestão de mudanças no mercado.</p>

          <div className="overflow-x-auto rounded-lg shadow-sm">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="bg-navy text-white p-4 text-left text-xs font-semibold tracking-wider">Aspecto</th>
                  <th className="bg-gold text-navy-dark p-4 text-left text-xs font-bold tracking-wider">collab:Z + Managed Change™</th>
                  <th className="bg-navy text-white p-4 text-left text-xs font-semibold tracking-wider">ADKAR (Prosci)</th>
                  <th className="bg-navy text-white p-4 text-left text-xs font-semibold tracking-wider">Kotter 8 Steps</th>
                  <th className="bg-navy text-white p-4 text-left text-xs font-semibold tracking-wider">McKinsey 7-S</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { a: "Foco", b: "Pessoas + Processo + Resultado", c: "Indivíduo", d: "Liderança top-down", e: "Alinhamento org." },
                  { a: "Abordagem", b: "Integrada: 3 pilares", c: "Linear: 5 fases", d: "Sequencial: 8 passos", e: "Diagnóstico: 7 dim." },
                  { a: "Resistência", b: "Risco gerenciável", c: "Por fase", d: "Implícita", e: "Não aborda" },
                  { a: "Escalabilidade", b: "Departamento a enterprise", c: "Individual a times", d: "Organizacional", e: "Organizacional" },
                  { a: "Certificação BR", b: "✓ collab:Z (exclusivo)", c: "Prosci (limitado)", d: "—", e: "—" },
                ].map((row, i) => (
                  <tr key={row.a} className={i % 2 === 0 ? "bg-white" : "bg-muted"}>
                    <td className="p-4 font-semibold text-navy">{row.a}</td>
                    <td className="p-4 text-teal font-medium">{row.b}</td>
                    <td className="p-4 text-gray-medium">{row.c}</td>
                    <td className="p-4 text-gray-medium">{row.d}</td>
                    <td className="p-4 text-gray-medium">{row.e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="rounded-xl p-12 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}>
            <h2 className="font-display text-3xl mb-3 relative z-10">Quer aplicar essa metodologia?</h2>
            <p className="text-white/65 mb-6 relative z-10">Agende uma conversa e receba um diagnóstico preliminar gratuito.</p>
            <div className="flex gap-4 justify-center flex-wrap relative z-10">
              <Link href="/contato"><Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-5 rounded-md">Agendar diagnóstico <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
              <Link href="/educacao"><Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-5 rounded-md">Ver certificações</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
