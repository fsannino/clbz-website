import Layout from "@/components/layout/Layout";
import { ArrowRight, Settings, GraduationCap, Lightbulb, Star, TrendingUp, BarChart3, Cpu, Users, Layers, ShieldCheck, Wrench, Globe, Factory, Building2, Landmark, ShoppingCart, Radio, BookOpen, HeartPulse, Truck, Zap } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useSeo } from "@/lib/seo";

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        const startTime = Date.now();
        const step = () => {
          const progress = Math.min((Date.now() - startTime) / duration, 1);
          setCount(Math.floor(end * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);
  return <div ref={ref} className="font-display text-3xl md:text-4xl text-gold">{count}{suffix}</div>;
}

const sectors = [
  { icon: Factory, label: "Indústria & Manufatura" },
  { icon: Zap, label: "Energia & Utilities" },
  { icon: Landmark, label: "Serviços Financeiros" },
  { icon: ShoppingCart, label: "Varejo & Consumo" },
  { icon: Radio, label: "Telecomunicações" },
  { icon: BookOpen, label: "Educação" },
  { icon: HeartPulse, label: "Saúde" },
  { icon: Truck, label: "Logística & Transporte" },
  { icon: Cpu, label: "Tecnologia" },
  { icon: Building2, label: "Real Estate" },
];

export default function Home() {
  useSeo({
    title: "Transformação que funciona. De verdade.",
    description:
      "Consultoria boutique em transformação organizacional, gestão de mudanças, estratégia, PMO e tecnologia aplicada. Integramos as melhores práticas internacionais, sob medida para cada cliente.",
    path: "/",
    type: "website",
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-navy-dark">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Left-to-right scrim so the headline keeps contrast while
            the image stays visible on the right half of the hero */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,42,64,0.92) 0%, rgba(11,61,92,0.78) 35%, rgba(11,61,92,0.35) 70%, rgba(11,61,92,0.15) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,42,64,0.25) 0%, transparent 30%, transparent 70%, rgba(7,42,64,0.35) 100%)",
          }}
        />
        <div className="absolute inset-0">
          <div className="absolute top-[-50%] right-[-20%] w-[80%] h-[200%] bg-[radial-gradient(ellipse,rgba(26,110,142,0.15)_0%,transparent_60%)]" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-teal to-gold" />
        <div className="container relative z-10 pt-24">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-3 text-gold text-xs font-semibold tracking-[0.15em] uppercase">
              <span className="w-6 h-0.5 bg-gold" />collab:Z — Innovation & Strategy
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-[3.8rem] font-display font-bold leading-[1.08] text-white">
              Transformação que funciona.<br /><em className="text-gold italic">De verdade.</em>
            </h1>
            <p className="text-lg text-white/65 max-w-xl leading-relaxed">
              Integramos as melhores práticas internacionais de gestão, estratégia e tecnologia — modeladas sob medida para a realidade de cada cliente.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/contato"><Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-7 py-6 rounded-md text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all">Fale com um especialista <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
              <Link href="/metodologia"><Button variant="outline" className="border-white/25 text-white hover:bg-white/8 hover:border-white/50 px-7 py-6 rounded-md text-sm">Conheça a metodologia</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="py-20 md:py-24">
        <div className="container">
          <p className="section-tag">O que fazemos</p>
          <h2 className="section-title">Três pilares para a sua transformação</h2>
          <p className="section-subtitle">Consultoria estratégica, educação corporativa e tecnologia aplicada para transformar organizações de forma sustentável.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { href: "/servicos", icon: Settings, title: "Consultoria", desc: "Gestão de mudanças, eficiência operacional, estratégia, PMO, governança e reestruturação.", bg: "bg-navy/8", color: "text-navy" },
              { href: "/educacao", icon: GraduationCap, title: "Educação", desc: "Certificações ScrumStudy e treinamentos como Agile Change, Agile PMO e Transformação 5.0.", bg: "bg-teal/8", color: "text-teal" },
              { href: "/servicos", icon: Lightbulb, title: "Tecnologia", desc: "Dados, BI, automação de processos, dashboards, analytics e IA aplicada à gestão.", bg: "bg-gold/10", color: "text-gold" },
            ].map((c) => (
              <Link href={c.href} key={c.title}>
                <div className="group bg-white rounded-lg p-8 border border-border hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-full">
                  <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-5`}><c.icon className={`w-6 h-6 ${c.color}`} /></div>
                  <h3 className="text-xl font-display text-navy mb-3">{c.title}</h3>
                  <p className="text-sm text-gray-medium mb-4">{c.desc}</p>
                  <span className="text-sm font-semibold text-teal group-hover:gap-3 flex items-center gap-2 transition-all">Saiba mais <ArrowRight className="w-4 h-4" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Animated */}
      <section className="py-16 bg-navy">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 bg-white/5 rounded-lg overflow-hidden">
            <div className="text-center py-8 px-4"><AnimatedCounter end={50} suffix="+" /><div className="text-xs text-white/50 mt-1">Projetos entregues</div></div>
            <div className="text-center py-8 px-4"><AnimatedCounter end={10} /><div className="text-xs text-white/50 mt-1">Anos de experiência</div></div>
            <div className="text-center py-8 px-4"><AnimatedCounter end={98} suffix="%" /><div className="text-xs text-white/50 mt-1">Satisfação dos clientes</div></div>
            <div className="text-center py-8 px-4"><AnimatedCounter end={20} suffix="+" /><div className="text-xs text-white/50 mt-1">Empresas atendidas</div></div>
          </div>
        </div>
      </section>

      {/* Solutions Grid (BPI-style) */}
      <section className="py-20 md:py-24 bg-cream">
        <div className="container">
          <p className="section-tag">Nossas Soluções</p>
          <h2 className="section-title">Resultados duradouros e sustentáveis</h2>
          <p className="section-subtitle">Atuamos em múltiplas frentes para transformar desafios em oportunidades de sucesso.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: TrendingUp, title: "Eficiência Operacional", desc: "Otimização de recursos, redução de custos e melhoria de produtividade." },
              { icon: Layers, title: "Estratégia & Planejamento", desc: "Formulação estratégica, modelos operacionais, M&A e planejamento financeiro." },
              { icon: Users, title: "Gestão de Mudanças", desc: "Transformação organizacional, adoção de processos e gestão de resistência." },
              { icon: Cpu, title: "Dados, IA & Tecnologia", desc: "BI, dashboards, automação, analytics e inteligência artificial." },
              { icon: BarChart3, title: "PMO & Execução", desc: "Gestão de programas complexos, governança e realização de benefícios." },
              { icon: ShieldCheck, title: "Governança & Compliance", desc: "Processos decisórios, compliance e frameworks de governança." },
              { icon: Wrench, title: "Reestruturação & Turnaround", desc: "Gestão de crises, renegociação, otimização de caixa e recuperação." },
              { icon: Globe, title: "Gamificação & Engajamento", desc: "Sistemas online, presenciais e metodologias como LEGO® SERIOUS PLAY® para engajar equipes." },
            ].map((s) => (
              <Link href="/servicos" key={s.title}><div className="group bg-white rounded-lg p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-full">
                <div className="w-10 h-10 rounded-lg bg-navy/8 flex items-center justify-center mb-4 group-hover:bg-teal/8 transition-colors"><s.icon className="w-5 h-5 text-navy group-hover:text-teal transition-colors" /></div>
                <h3 className="text-[15px] font-bold text-navy mb-2">{s.title}</h3>
                <p className="text-xs text-gray-medium">{s.desc}</p>
              </div></Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why collab:Z */}
      <section className="py-20 md:py-24">
        <div className="container"><div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="section-tag">Por que a collab:Z?</p>
            <h2 className="section-title">Melhores práticas globais.<br />Customizadas para você.</h2>
            <p className="text-gray-medium mb-6">Nossa metodologia integra as melhores práticas de mercado e está alinhada com as principais referências internacionais. O grande diferencial? <strong className="text-navy">Modelamos a melhor prática sob medida para cada cliente.</strong></p>
            <div className="space-y-4 mb-8">
              {[
                { title: "Metodologia collab:Z", desc: "Framework proprietário: Gestão, Estratégia e Operação" },
                { title: "Customização radical", desc: "Cada projeto é modelado à realidade do cliente" },
                { title: "Equipe multidisciplinar", desc: "Consultores sênior de grandes empresas e consultorias internacionais" },
                { title: "Resultados mensuráveis", desc: "Foco em redução de custos, eficiência, adoção e ROI" },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 items-start"><Star className="w-5 h-5 text-gold mt-0.5 shrink-0" /><div><strong className="text-navy text-sm">{item.title}</strong><p className="text-sm text-gray-medium">{item.desc}</p></div></div>
              ))}
            </div>
            <Link href="/metodologia"><Button className="bg-navy hover:bg-teal text-white rounded-md">Conheça nossa metodologia <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
          <div className="rounded-xl p-10 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}>
            <div className="absolute top-[-20px] right-[-20px] w-28 h-28 rounded-full bg-gold/10" />
            <div className="relative z-10">
              <p className="text-gold text-xs font-bold tracking-widest uppercase mb-6">Metodologia collab:Z</p>
              {[
                { num: "01", title: "Gestão", desc: "Governança, processos, indicadores e gestão de mudanças" },
                { num: "02", title: "Estratégia", desc: "Visão, planejamento, roadmap e alinhamento" },
                { num: "03", title: "Operação", desc: "Execução, tecnologia, sustentação e melhoria contínua" },
              ].map((p) => (
                <div key={p.num} className="bg-white/8 rounded-lg p-5 mb-3"><div className="flex items-center gap-3 mb-1"><span className="text-gold text-xs font-mono font-bold">{p.num}</span><div className="font-extrabold text-lg">{p.title}</div></div><div className="text-sm text-white/55">{p.desc}</div></div>
              ))}
            </div>
          </div>
        </div></div>
      </section>

      {/* Nossa Atuação - Sectors */}
      <section className="py-20 md:py-24 bg-navy text-white">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3">Nossa Atuação</p>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">Experiência em múltiplos setores</h2>
            <p className="text-white/55 max-w-2xl mx-auto">Projetos no Brasil e no mundo. Atuamos em empresas de médio e grande porte nos mais diversos segmentos.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {sectors.map((s) => (
              <div key={s.label} className="bg-white/5 rounded-lg p-5 text-center hover:bg-white/10 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/20 transition-colors"><s.icon className="w-5 h-5 text-gold" /></div>
                <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { geo: "Brasil", sub: "São Paulo, Rio, Campinas e demais capitais" },
              { geo: "LATAM", sub: "Argentina, Chile, Colômbia, México" },
              { geo: "Global", sub: "EUA, Europa, projetos internacionais" },
            ].map((g) => (
              <div key={g.geo} className="bg-white/5 rounded-lg p-6 text-center"><div className="font-display text-2xl text-gold mb-1">{g.geo}</div><p className="text-xs text-white/45">{g.sub}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Profissionais de Alta Performance */}
      <section className="py-20 md:py-24">
        <div className="container">
          <p className="section-tag">Nosso Time</p>
          <h2 className="section-title">Profissionais de Alta Performance</h2>
          <p className="section-subtitle">Consultores sênior com vivência em grandes empresas e consultorias internacionais.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-muted rounded-xl p-8 text-center border-2 border-dashed border-border">
                <div className="w-20 h-20 rounded-full bg-navy/8 flex items-center justify-center mx-auto mb-4"><Users className="w-8 h-8 text-navy/30" /></div>
                <h3 className="font-display text-lg text-navy/40 mb-1">Em breve</h3>
                <p className="text-xs text-gray-medium/50">Perfil em desenvolvimento</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-medium mt-8">Seção em construção — perfis dos consultores serão adicionados em breve.</p>
        </div>
      </section>

      {/* Education Preview */}
      <section className="py-20 md:py-24 bg-muted">
        <div className="container">
          <p className="section-tag">Educação</p>
          <h2 className="section-title">Capacite sua equipe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {[
              { badge: "collab:Z", cls: "badge-collabz", title: "Agile Change", desc: "Gestão de mudanças em ambientes ágeis." },
              { badge: "collab:Z", cls: "badge-collabz", title: "Transformação 5.0", desc: "Liderança para a nova era." },
              { badge: "collab:Z", cls: "badge-collabz", title: "Consulting Foundations", desc: "Fundamentos de consultoria." },
              { badge: "ScrumStudy", cls: "badge-scrumstudy", title: "Scrum Master", desc: "Certificação SMC™ internacional." },
            ].map((t) => (
              <div key={t.title} className="bg-white rounded-lg p-6 border border-border hover:-translate-y-0.5 hover:shadow-md transition-all">
                <span className={`${t.cls} inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3`}>{t.badge}</span>
                <h3 className="text-[15px] font-bold text-navy mb-1.5">{t.title}</h3>
                <p className="text-xs text-gray-medium">{t.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10"><Link href="/educacao"><Button className="bg-navy hover:bg-teal text-white rounded-md">Ver todos os programas <ArrowRight className="w-4 h-4 ml-1" /></Button></Link></div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20"><div className="container"><div className="rounded-xl p-12 md:p-16 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}>
        <div className="absolute top-[-50%] right-[-30%] w-[60%] h-[200%] bg-[radial-gradient(ellipse,rgba(247,168,35,0.1)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <h2 className="font-display text-3xl md:text-4xl mb-4">Sua empresa precisa mudar.<br />Nós sabemos como.</h2>
          <p className="text-white/65 mb-8 max-w-xl mx-auto">Agende uma conversa sem compromisso.</p>
          <Link href="/contato"><Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-6 rounded-md text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all">Agendar uma conversa <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
        </div>
      </div></div></section>
    </Layout>
  );
}
