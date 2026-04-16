import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const articles = [
  { cat: "Gestão de Mudanças", title: "5 erros fatais na gestão de mudanças", desc: "Os equívocos mais comuns que fazem 70% das transformações falharem." },
  { cat: "Metodologia", title: "Managed Change™ vs. ADKAR", desc: "Comparativo detalhado entre as duas principais metodologias." },
  { cat: "Transformação Digital", title: "Change management na transformação digital", desc: "Por que investir em tecnologia sem gestão de mudanças é como comprar um Ferrari sem aprender a dirigir." },
  { cat: "Liderança", title: "Liderança na era 5.0", desc: "Como a convergência entre tecnologia e humanização redefine o papel do líder." },
  { cat: "Agilidade", title: "Agile Change: agilidade + mudança", desc: "Framework para integrar práticas ágeis com change management." },
  { cat: "IA & Direito", title: "IA nos tribunais brasileiros", desc: "Impactos e frameworks legais da inteligência artificial no judiciário." },
];

const resources = [
  { emoji: "📘", title: "5 Erros Fatais na Gestão de Mudanças", desc: "eBook com os equívocos mais comuns e como evitá-los.", border: "border-t-gold" },
  { emoji: "✅", title: "Checklist de Prontidão", desc: "20 perguntas essenciais para avaliar se sua organização está pronta.", border: "border-t-teal" },
  { emoji: "📋", title: "Template Plano de Comunicação", desc: "Modelo pronto para estruturar comunicação em qualquer mudança.", border: "border-t-navy" },
];

export default function Insights() {
  return (
    <Layout>
      <div className="pt-32 pb-16 relative" style={{ background: "linear-gradient(135deg, #0B3D5C, #072A40)" }}>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-teal to-gold" />
        <div className="container relative z-10">
          <p className="text-xs text-white/40 mb-4"><Link href="/" className="hover:text-gold cursor-pointer">Home</Link> <span className="mx-2">›</span> Insights</p>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-3">Insights</h1>
          <p className="text-lg text-white/60 max-w-xl">Artigos, cases, recursos gratuitos e pensamento de liderança sobre transformação organizacional.</p>
        </div>
      </div>

      {/* Blog */}
      <section className="py-20">
        <div className="container">
          <p className="section-tag">Blog</p>
          <h2 className="section-title">Artigos recentes</h2>
          <p className="section-subtitle">Conteúdo original sobre gestão de mudanças e liderança — em português.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <div key={a.title} className="bg-white rounded-lg p-7 border border-border hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
                <span className="text-teal text-[10px] font-semibold tracking-widest uppercase">{a.cat}</span>
                <h3 className="font-display text-lg text-navy mt-3 mb-2">{a.title}</h3>
                <p className="text-sm text-gray-medium mb-4">{a.desc}</p>
                <span className="text-sm font-semibold text-teal flex items-center gap-1">Ler artigo <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-cream">
        <div className="container">
          <p className="section-tag">Downloads</p>
          <h2 className="section-title">Recursos gratuitos</h2>
          <p className="section-subtitle">eBooks, checklists e templates para ajudar na mudança organizacional.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((r) => (
              <div key={r.title} className={`bg-white rounded-lg p-7 border border-border border-t-[3px] ${r.border} hover:shadow-md transition-all cursor-pointer`}>
                <div className="text-3xl mb-3">{r.emoji}</div>
                <h3 className="font-display text-lg text-navy mb-2">{r.title}</h3>
                <p className="text-sm text-gray-medium mb-4">{r.desc}</p>
                <span className="text-sm font-semibold text-teal flex items-center gap-1">Download gratuito <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container">
          <div className="rounded-xl p-12 md:p-16 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}>
            <div className="absolute top-[-40px] right-[-40px] w-48 h-48 rounded-full bg-gold/8" />
            <div className="relative z-10">
              <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3">Newsletter</p>
              <h2 className="font-display text-3xl mb-3">Change Pulse</h2>
              <p className="text-white/65 mb-8 max-w-md mx-auto">Artigos, tendências e ferramentas sobre gestão de mudanças — quinzenalmente.</p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input type="email" placeholder="seu@email.com" className="flex-1 px-4 py-3 rounded-md border-none bg-white text-foreground text-sm" />
                <Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-md">Assinar</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases placeholder */}
      <section className="py-20 bg-muted">
        <div className="container">
          <p className="section-tag">Cases de sucesso</p>
          <h2 className="section-title">Resultados reais</h2>
          <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-border mt-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="font-display text-xl text-navy mb-2">Cases em desenvolvimento</h3>
            <p className="text-sm text-gray-medium max-w-md mx-auto mb-5">Estamos documentando nossos cases com métricas e resultados detalhados.</p>
            <Link href="/contato"><Button variant="outline" className="border-teal text-teal hover:bg-teal/5 rounded-md text-sm">Solicitar referências <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
