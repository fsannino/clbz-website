import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSeo } from "@/lib/seo";

export default function Parcerias() {
  useSeo({
    title: "Parcerias",
    description:
      "Parcerias internacionais da collab:Z, incluindo ScrumStudy (Authorized Training Provider) e rede de colaboradores em Brasil, LATAM e contextos regulados.",
    path: "/parcerias",
  });

  return (
    <Layout>
      <div className="pt-32 pb-16 relative" style={{ background: "linear-gradient(135deg, #0B3D5C, #072A40)" }}>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-teal to-gold" />
        <div className="container relative z-10">
          <p className="text-xs text-white/40 mb-4"><Link href="/" className="hover:text-gold cursor-pointer">Home</Link> <span className="mx-2">›</span> Parcerias</p>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-3">Nossas Parcerias</h1>
          <p className="text-lg text-white/60 max-w-xl">Alianças estratégicas que potencializam nossa capacidade de entrega e ampliam o acesso a certificações internacionais.</p>
        </div>
      </div>

      {/* ScrumStudy */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="section-tag">Parceria de treinamento</p>
              <h2 className="section-title">ScrumStudy</h2>
              <p className="text-gray-medium mb-4">A ScrumStudy, parte do grupo VMEdu, é um dos maiores provedores globais de certificações ágeis, com presença em mais de 150 países.</p>
              <p className="text-gray-medium mb-5">Como <strong className="text-navy">Authorized Training Partner (ATP)</strong>, a collab:Z está habilitada a oferecer todo o portfólio de certificações ScrumStudy no Brasil.</p>
              <div className="bg-muted rounded-lg p-5 mb-6">
                <p className="font-bold text-navy text-sm mb-3">Certificações disponíveis:</p>
                <ul className="space-y-1.5 text-sm text-gray-medium">
                  {["Scrum Fundamentals Certified (SFC™)", "Scrum Master Certified (SMC™)", "Scrum Product Owner Certified (SPOC™)", "Scrum Developer Certified (SDC™)", "Expert Scrum Master (ESM™)", "Scaled Scrum Expert (SSE™)"].map((c) => (
                    <li key={c}>✦ {c}</li>
                  ))}
                </ul>
              </div>
              <Link href="/educacao"><Button className="bg-navy hover:bg-teal text-white rounded-md text-sm">Ver programa completo <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
            </div>
            <div className="rounded-xl p-10 text-white" style={{ background: "linear-gradient(135deg, #1B5E20, #2E7D32)" }}>
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
          </div>
        </div>
      </section>

      {/* Aligned with best practices */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-tag" style={{ textAlign: "center" }}>Alinhamento Internacional</p>
            <h2 className="section-title" style={{ textAlign: "center" }}>Conectados com as melhores referências globais</h2>
            <p className="text-gray-medium mb-8">Nossa metodologia integra práticas e frameworks das principais referências mundiais em gestão de mudanças, estratégia, eficiência operacional e agilidade. Mantemos nosso conhecimento atualizado e alinhado com os padrões internacionais mais reconhecidos do mercado.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["Gestão de Mudanças", "Lean & Six Sigma", "Agile & Scrum", "OBZ & Orçamento Matricial", "Estratégia & M&A", "Data & Analytics"].map((p) => (
                <div key={p} className="bg-white rounded-lg p-4 border border-border text-center">
                  <span className="text-sm font-semibold text-navy">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20"><div className="container"><div className="rounded-xl p-12 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}>
        <h2 className="font-display text-3xl mb-3 relative z-10">Quer ser parceiro da collab:Z?</h2>
        <p className="text-white/65 mb-6 relative z-10">Estamos abertos a novas alianças estratégicas que ampliem nosso impacto.</p>
        <Link href="/contato"><Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-5 rounded-md relative z-10">Enviar proposta <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
      </div></div></section>
    </Layout>
  );
}
