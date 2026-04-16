import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Parcerias() {
  return (
    <Layout>
      <div className="pt-32 pb-16 relative" style={{ background: "linear-gradient(135deg, #0B3D5C, #072A40)" }}>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-teal to-gold" />
        <div className="container relative z-10">
          <p className="text-xs text-white/40 mb-4"><Link href="/" className="hover:text-gold cursor-pointer">Home</Link> <span className="mx-2">›</span> Parcerias</p>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-3">Nossas Parcerias</h1>
          <p className="text-lg text-white/60 max-w-xl">Alianças estratégicas com líderes globais que potencializam nossa entrega.</p>
        </div>
      </div>

      {/* LaMarsh */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="section-tag">Parceria estratégica</p>
              <h2 className="section-title">LaMarsh Global</h2>
              <p className="text-gray-medium mb-4">Fundada em 1979 por Jeanenne LaMarsh. Pioneira mundial em gestão de mudanças, desenvolveu a metodologia <strong className="text-navy">Managed Change™</strong> — 4 décadas de pesquisa e prática.</p>
              <p className="text-gray-medium mb-5">A collab:Z detém a <strong className="text-navy">licença exclusiva</strong> para Brasil e América Latina.</p>
              <div className="bg-muted rounded-lg p-5 mb-6">
                <p className="font-bold text-navy text-sm mb-3">O que a parceria habilita:</p>
                <ul className="space-y-1.5 text-sm text-gray-medium">
                  <li>✦ Consultoria com Managed Change™</li>
                  <li>✦ Certificação CMP e Masters</li>
                  <li>✦ Executive Change Leadership</li>
                  <li>✦ Ferramentas e templates proprietários</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <Link href="/metodologia"><Button className="bg-navy hover:bg-teal text-white rounded-md text-sm">Metodologia <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
                <Link href="/educacao"><Button variant="outline" className="border-navy/20 text-navy hover:bg-navy/5 rounded-md text-sm">Certificações <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
              </div>
            </div>
            <div className="rounded-xl p-10 text-white" style={{ background: "linear-gradient(135deg, #0B3D5C, #1E2D3D)" }}>
              <p className="text-gold text-xs font-bold tracking-widest uppercase mb-6">LaMarsh Global</p>
              <div className="font-display text-4xl mb-2">Managed<br />Change™</div>
              <p className="text-sm text-white/50 mb-8">Desde 1979 · Chicago, EUA</p>
              <div className="space-y-4">
                {[{ n: "45+", l: "Anos" }, { n: "30+", l: "Países" }, { n: "ACMP", l: "Qualified Education Provider" }].map((s) => (
                  <div key={s.l} className="bg-white/6 rounded-lg p-4 text-center">
                    <div className="font-display text-2xl text-gold">{s.n}</div>
                    <div className="text-xs text-white/40">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ScrumStudy */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="order-2 lg:order-1 rounded-xl p-10 text-white" style={{ background: "linear-gradient(135deg, #1B5E20, #2E7D32)" }}>
              <p className="text-[#81C784] text-xs font-bold tracking-widest uppercase mb-6">ScrumStudy</p>
              <div className="font-display text-4xl mb-2">Certificações<br />Ágeis</div>
              <p className="text-sm text-white/50 mb-8">VMEdu Group · Global</p>
              <div className="space-y-4">
                {[{ n: "150+", l: "Países" }, { n: "6+", l: "Certificações" }, { n: "ATP", l: "Authorized Training Partner" }].map((s) => (
                  <div key={s.l} className="bg-white/8 rounded-lg p-4 text-center">
                    <div className="font-display text-2xl text-[#81C784]">{s.n}</div>
                    <div className="text-xs text-white/40">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="section-tag">Parceria de treinamento</p>
              <h2 className="section-title">ScrumStudy</h2>
              <p className="text-gray-medium mb-4">Parte do grupo VMEdu, é um dos maiores provedores globais de certificações ágeis, com presença em mais de 150 países.</p>
              <p className="text-gray-medium mb-5">Como <strong className="text-navy">Authorized Training Partner</strong>, oferecemos todo o portfólio no Brasil.</p>
              <div className="bg-white rounded-lg p-5 mb-6 border border-border">
                <p className="font-bold text-navy text-sm mb-3">Certificações disponíveis:</p>
                <ul className="space-y-1.5 text-sm text-gray-medium">
                  <li>✦ Scrum Fundamentals (SFC™)</li>
                  <li>✦ Scrum Master (SMC™)</li>
                  <li>✦ Product Owner (SPOC™)</li>
                  <li>✦ Developer (SDC™)</li>
                  <li>✦ Expert Scrum Master (ESM™)</li>
                  <li>✦ Scaled Scrum Expert (SSE™)</li>
                </ul>
              </div>
              <Link href="/educacao"><Button className="bg-navy hover:bg-teal text-white rounded-md text-sm">Ver programa completo <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="rounded-xl p-12 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}>
            <h2 className="font-display text-3xl mb-3 relative z-10">Quer ser parceiro da collab:Z?</h2>
            <p className="text-white/65 mb-6 relative z-10">Estamos abertos a novas alianças estratégicas.</p>
            <Link href="/contato"><Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-5 rounded-md relative z-10">Enviar proposta <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
