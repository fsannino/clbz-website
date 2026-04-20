import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Handshake, Ruler, FlaskConical } from "lucide-react";
import { useSeo } from "@/lib/seo";

export default function Sobre() {
  useSeo({
    title: "Sobre a collab:Z",
    description:
      "Consultoria boutique sediada em São Paulo, especializada em transformação organizacional para ambientes complexos e regulados. Missão, visão, valores e história.",
    path: "/sobre",
  });

  return (
    <Layout>
      {/* Header */}
      <div className="pt-32 pb-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B3D5C, #072A40)" }}>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-teal to-gold" />
        <div className="container relative z-10">
          <p className="text-xs text-white/40 mb-4"><Link href="/" className="hover:text-gold transition-colors cursor-pointer">Home</Link> <span className="mx-2">›</span> Sobre</p>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-3">Quem somos</h1>
          <p className="text-lg text-white/60 max-w-xl">De Collaborazione a collab:Z — uma evolução constante guiada pelo propósito de transformar organizações através de pessoas.</p>
        </div>
      </div>

      {/* History */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <p className="section-tag">Nossa história</p>
              <h2 className="section-title">Da colaboração nasceu a transformação</h2>
              <p className="text-gray-medium mb-4">A Collaborazione nasceu da paixão por conectar pessoas e estratégias para gerar resultados reais. Ao longo dos anos, evoluímos para um hub de transformação com alcance internacional.</p>
              <p className="text-gray-medium mb-4">Hoje, como <strong className="text-navy">collab:Z</strong>, somos a ponte entre metodologias globais comprovadas e a realidade das organizações brasileiras e latino-americanas.</p>
              <p className="text-gray-medium">O "Z" representa o <strong className="text-navy">ponto de inflexão</strong> — a geração que transforma, a última letra que inicia um novo ciclo.</p>
            </div>
            <div>
              <div className="relative pl-8 border-l-2 border-gradient space-y-8" style={{ borderImage: "linear-gradient(to bottom, #F7A823, #1A6E8E) 1" }}>
                {[
                  { t: "Fundação", d: "Nasce a Collaborazione Assessoria com foco em gestão de projetos e consultoria organizacional." },
                  { t: "Expansão", d: "Incorporação de LEGO® SERIOUS PLAY®, governança corporativa e transformação digital." },
                  { t: "Expansão Internacional", d: "Alinhamento com referências internacionais de gestão de mudanças e certificações ágeis." },
                  { t: "Rebranding collab:Z", d: "Nova marca, nova identidade: Consultoria + Educação + Tecnologia." },
                  { t: "ScrumStudy ATP", d: "Authorized Training Partner para certificações ágeis no Brasil." },
                ].map((item) => (
                  <div key={item.t} className="relative">
                    <div className="absolute -left-[13px] top-1.5 w-3.5 h-3.5 rounded-full bg-gold border-[3px] border-white shadow-sm" />
                    <h4 className="font-display text-lg text-navy mb-1">{item.t}</h4>
                    <p className="text-sm text-gray-medium">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream">
        <div className="container">
          <p className="section-tag">Propósito & Valores</p>
          <h2 className="section-title">O que nos move</h2>
          <p className="section-subtitle">Acreditamos que toda transformação organizacional começa e termina nas pessoas.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: "Propósito", desc: "Empoderar organizações a abraçar a mudança com confiança, método e resultados.", bg: "bg-navy/8", color: "text-navy" },
              { icon: Handshake, title: "Colaboração", desc: "Trabalhamos com nossos clientes, não para eles. Parceria genuína.", bg: "bg-teal/8", color: "text-teal" },
              { icon: Ruler, title: "Método", desc: "Rigor metodológico com flexibilidade prática. Global adaptado ao local.", bg: "bg-gold/10", color: "text-gold" },
              { icon: FlaskConical, title: "Inovação", desc: "Novas abordagens, tecnologias e formas de entregar valor.", bg: "bg-navy/8", color: "text-navy" },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-lg p-7 border border-border hover:shadow-md hover:-translate-y-1 transition-all">
                <div className={`w-11 h-11 rounded-lg ${v.bg} flex items-center justify-center mb-4`}>
                  <v.icon className={`w-5 h-5 ${v.color}`} />
                </div>
                <h3 className="font-display text-lg text-navy mb-2">{v.title}</h3>
                <p className="text-sm text-gray-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container">
          <p className="section-tag">Liderança</p>
          <h2 className="section-title">Nossa equipe</h2>
          <div className="bg-muted rounded-xl p-8 md:p-10 flex flex-col md:flex-row gap-8 mt-8">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl flex items-center justify-center text-white font-display text-4xl shrink-0" style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}>
              FS
            </div>
            <div>
              <h3 className="font-display text-2xl text-navy mb-1">Fabiano Sannino</h3>
              <p className="text-teal font-semibold text-sm mb-4">Fundador & CEO</p>
              <p className="text-sm text-gray-medium mb-3">Executivo Sênior e Consultor de Gestão com mais de 20 anos liderando transformação corporativa em larga escala, execução estratégica, mudança organizacional e integrações de M&amp;A multi-países em corporações globais. Histórico comprovado na concepção e execução de agendas de transformação, gestão de portfólios estratégicos complexos e assessoria a líderes C-level em governança, redesenho de modelo operacional, integração cultural e criação de valor pós-fusão.</p>
              <div className="flex gap-2 flex-wrap">
                <span className="badge-lamarsh inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">Change Management</span>
                <span className="badge-collabz inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">LEGO® SERIOUS PLAY®</span>
                <span className="badge-scrumstudy inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">ScrumStudy ATP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="rounded-xl p-12 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}>
            <h2 className="font-display text-3xl mb-3 relative z-10">Quer transformar sua organização?</h2>
            <p className="text-white/65 mb-6 relative z-10">Converse com nossos especialistas e descubra como podemos ajudar.</p>
            <Link href="/contato"><Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-5 rounded-md relative z-10">Agendar uma conversa <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
