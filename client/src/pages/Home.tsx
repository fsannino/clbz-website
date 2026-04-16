import Layout from "@/components/layout/Layout";
import { ArrowRight, Settings, GraduationCap, Lightbulb, Star } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #0B3D5C 0%, #072A40 60%, #1E2D3D 100%)" }}>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-50%] right-[-20%] w-[80%] h-[200%] bg-[radial-gradient(ellipse,rgba(26,110,142,0.15)_0%,transparent_60%)]" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-teal to-gold" />

        <div className="container relative z-10 pt-24">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-3 text-gold text-xs font-semibold tracking-[0.15em] uppercase">
              <span className="w-6 h-0.5 bg-gold" />
              collab:Z — Innovation & Strategy
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-[3.8rem] font-display font-bold leading-[1.08] text-white">
              Transformação que funciona.<br />
              <em className="text-gold italic">De verdade.</em>
            </h1>
            <p className="text-lg text-white/65 max-w-xl leading-relaxed">
              Metodologia global. Execução local. Resultados mensuráveis. Somos a consultoria brasileira com licença exclusiva LaMarsh Global para Brasil e LATAM.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/contato">
                <Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-7 py-6 rounded-md text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  Fale com um especialista <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/metodologia">
                <Button variant="outline" className="border-white/25 text-white hover:bg-white/8 hover:border-white/50 px-7 py-6 rounded-md text-sm">
                  Conheça a metodologia
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="py-20 md:py-24">
        <div className="container">
          <p className="section-tag">O que fazemos</p>
          <h2 className="section-title">Três pilares para a sua transformação</h2>
          <p className="section-subtitle">Combinamos consultoria estratégica, educação de ponta e tecnologia aplicada para transformar organizações de forma sustentável.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/servicos">
              <div className="group bg-white rounded-lg p-8 border border-border hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-navy/8 flex items-center justify-center mb-5">
                  <Settings className="w-6 h-6 text-navy" />
                </div>
                <h3 className="text-xl font-display text-navy mb-3">Consultoria</h3>
                <p className="text-sm text-gray-medium mb-4">Gestão de mudanças, projetos, governança corporativa e transformação organizacional com metodologia Managed Change™.</p>
                <span className="text-sm font-semibold text-teal group-hover:gap-3 flex items-center gap-2 transition-all">
                  Conheça os serviços <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link href="/educacao">
              <div className="group bg-white rounded-lg p-8 border border-border hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-teal/8 flex items-center justify-center mb-5">
                  <GraduationCap className="w-6 h-6 text-teal" />
                </div>
                <h3 className="text-xl font-display text-navy mb-3">Educação</h3>
                <p className="text-sm text-gray-medium mb-4">Certificações LaMarsh e ScrumStudy, treinamentos proprietários como Agile Change, Agile PMO e Transformação 5.0.</p>
                <span className="text-sm font-semibold text-teal group-hover:gap-3 flex items-center gap-2 transition-all">
                  Veja os programas <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link href="/servicos">
              <div className="group bg-white rounded-lg p-8 border border-border hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                  <Lightbulb className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-display text-navy mb-3">Tecnologia</h3>
                <p className="text-sm text-gray-medium mb-4">Automação de processos, dashboards, analytics e IA aplicada para monitorar sua transformação em tempo real.</p>
                <span className="text-sm font-semibold text-teal group-hover:gap-3 flex items-center gap-2 transition-all">
                  Saiba mais <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 bg-white/5 rounded-lg overflow-hidden">
            {[
              { n: "150+", l: "Projetos entregues" },
              { n: "12", l: "Anos de experiência" },
              { n: "95%", l: "Satisfação dos clientes" },
              { n: "40+", l: "Empresas atendidas" },
            ].map((s) => (
              <div key={s.l} className="text-center py-8 px-4">
                <div className="font-display text-3xl md:text-4xl text-gold">{s.n}</div>
                <div className="text-xs text-white/50 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why collab:Z */}
      <section className="py-20 md:py-24 bg-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="section-tag">Por que a collab:Z?</p>
              <h2 className="section-title">Metodologia global.<br />Entrega local.</h2>
              <p className="text-gray-medium mb-6">Somos a única consultoria brasileira com licença exclusiva LaMarsh Global — uma metodologia comprovada em 4 décadas de prática, presente em mais de 30 países.</p>

              <div className="space-y-4 mb-8">
                {[
                  { title: "Managed Change™", desc: "Metodologia comprovada da LaMarsh Global, focada em pessoas" },
                  { title: "Metodologia collab:Z", desc: "Framework proprietário: Gestão, Estratégia e Operação" },
                  { title: "Certificações reconhecidas", desc: "LaMarsh CMP, ScrumStudy, LEGO® SERIOUS PLAY®" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3 items-start">
                    <Star className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-navy text-sm">{item.title}</strong>
                      <p className="text-sm text-gray-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/metodologia">
                <Button className="bg-navy hover:bg-teal text-white rounded-md">
                  Conheça nossa metodologia <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Partners Card */}
            <div className="rounded-xl p-10 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}>
              <div className="absolute top-[-20px] right-[-20px] w-28 h-28 rounded-full bg-gold/10" />
              <div className="absolute bottom-[-40px] left-[-40px] w-40 h-40 rounded-full bg-white/3" />
              <div className="relative z-10">
                <p className="text-gold text-xs font-bold tracking-widest uppercase mb-6">Parceiros Oficiais</p>
                <div className="bg-white/8 rounded-lg p-5 mb-4">
                  <div className="font-extrabold text-lg">LaMarsh Global</div>
                  <div className="text-sm text-white/65">Licença exclusiva Brasil & LATAM</div>
                  <div className="text-xs text-white/40 mt-1">Desde 1979 · Chicago, EUA</div>
                </div>
                <div className="bg-white/8 rounded-lg p-5">
                  <div className="font-extrabold text-lg">ScrumStudy</div>
                  <div className="text-sm text-white/65">Authorized Training Partner</div>
                  <div className="text-xs text-white/40 mt-1">VMEdu Group · Certificações Ágeis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Preview */}
      <section className="py-20 md:py-24">
        <div className="container">
          <p className="section-tag">Metodologia collab:Z</p>
          <h2 className="section-title">Três pilares. Uma transformação.</h2>
          <p className="section-subtitle">Nossa abordagem proprietária integra gestão, estratégia e operação em um framework coeso.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Gestão", desc: "Governança, processos, indicadores. Onde o Managed Change™ se integra para garantir que as pessoas abracem a mudança.", cls: "pillar-gestao" },
              { num: "02", title: "Estratégia", desc: "Visão de futuro, planejamento, roadmap de transformação e alinhamento de stakeholders.", cls: "pillar-estrategia" },
              { num: "03", title: "Operação", desc: "Execução disciplinada, sustentação, melhoria contínua e tecnologia aplicada.", cls: "pillar-operacao" },
            ].map((p) => (
              <div key={p.num} className={`${p.cls} bg-white rounded-xl p-8 relative hover:-translate-y-1 hover:shadow-lg transition-all border border-border`}>
                <span className="absolute top-4 right-6 font-display text-5xl text-navy/5">{p.num}</span>
                <h3 className="text-xl font-display text-navy mb-3">{p.title}</h3>
                <p className="text-sm text-gray-medium">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/metodologia">
              <Button className="bg-teal hover:bg-teal-light text-white rounded-md">
                Explorar a metodologia completa <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Education Preview */}
      <section className="py-20 md:py-24 bg-muted">
        <div className="container">
          <p className="section-tag">Educação</p>
          <h2 className="section-title">Capacite sua equipe para liderar a mudança</h2>
          <p className="section-subtitle">Certificações internacionais e treinamentos proprietários.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { badge: "LaMarsh", cls: "badge-lamarsh", title: "Certificação CMP", desc: "Certified Managed Change Professional — certificação internacional." },
              { badge: "collab:Z", cls: "badge-collabz", title: "Agile Change", desc: "Gestão de mudanças em ambientes ágeis e transformação digital." },
              { badge: "collab:Z", cls: "badge-collabz", title: "Transformação 5.0", desc: "Liderança adaptativa para a nova era da indústria e sociedade." },
              { badge: "ScrumStudy", cls: "badge-scrumstudy", title: "Scrum Master", desc: "Certificação SMC™ reconhecida internacionalmente." },
            ].map((t) => (
              <div key={t.title} className="bg-white rounded-lg p-6 border border-border hover:-translate-y-0.5 hover:shadow-md transition-all">
                <span className={`${t.cls} inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3`}>{t.badge}</span>
                <h3 className="text-[15px] font-bold text-navy mb-1.5">{t.title}</h3>
                <p className="text-xs text-gray-medium">{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/educacao">
              <Button className="bg-navy hover:bg-teal text-white rounded-md">
                Ver todos os programas <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24">
        <div className="container">
          <div className="rounded-xl p-12 md:p-16 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B3D5C 0%, #1A6E8E 100%)" }}>
            <div className="absolute top-[-50%] right-[-30%] w-[60%] h-[200%] bg-[radial-gradient(ellipse,rgba(247,168,35,0.1)_0%,transparent_60%)]" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl mb-4">Sua empresa precisa mudar.<br />Nós sabemos como.</h2>
              <p className="text-white/65 text-base mb-8 max-w-xl mx-auto">Agende uma conversa sem compromisso com nossos especialistas e descubra como a metodologia Managed Change™ pode transformar sua organização.</p>
              <Link href="/contato">
                <Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-6 rounded-md text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  Agendar uma conversa <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
