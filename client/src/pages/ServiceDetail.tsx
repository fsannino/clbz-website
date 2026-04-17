import { Link, useRoute } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Printer,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getServiceBySlug, services } from "@/content/services";
import NotFound from "./NotFound";
import {
  useSeo,
  buildServiceJsonLd,
  buildBreadcrumbJsonLd,
  SITE,
} from "@/lib/seo";

const accentMap = {
  gold: {
    bar: "from-gold via-teal to-gold",
    tag: "text-gold",
    border: "border-t-gold",
    iconBg: "bg-gold/10",
    iconColor: "text-gold",
    numberBg: "bg-gold text-navy-dark",
  },
  teal: {
    bar: "from-teal via-gold to-teal",
    tag: "text-teal",
    border: "border-t-teal",
    iconBg: "bg-teal/10",
    iconColor: "text-teal",
    numberBg: "bg-teal text-white",
  },
  navy: {
    bar: "from-navy via-gold to-navy",
    tag: "text-gold",
    border: "border-t-navy",
    iconBg: "bg-navy/10",
    iconColor: "text-navy",
    numberBg: "bg-navy text-white",
  },
} as const;

export default function ServiceDetail() {
  const [, params] = useRoute<{ slug: string }>("/servicos/:slug");
  const slug = params?.slug ?? "";
  const entry = getServiceBySlug(slug);

  useSeo(
    entry
      ? {
          title: entry.meta.title,
          description: entry.meta.excerpt,
          path: `/servicos/${entry.meta.slug}`,
          type: "website",
          jsonLd: [
            buildServiceJsonLd({
              name: entry.meta.title,
              description: entry.meta.excerpt,
              slug: entry.meta.slug,
              category: entry.meta.pillar,
            }),
            buildBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Soluções", url: "/servicos" },
              {
                name: entry.meta.title,
                url: `${SITE.baseUrl}/servicos/${entry.meta.slug}`,
              },
            ]),
          ],
        }
      : { title: "Serviço não encontrado", path: "/servicos", noIndex: true },
  );

  if (!entry) return <NotFound />;

  const { meta, Component } = entry;
  const accent = accentMap[meta.accent];
  const Icon = meta.icon;

  const related = services
    .filter((s) => s.meta.slug !== meta.slug && s.meta.pillar === meta.pillar)
    .slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <header
        className="pt-32 pb-16 relative"
        style={{ background: "linear-gradient(135deg, #0B3D5C 0%, #072A40 100%)" }}
      >
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${accent.bar}`} />
        <div className="container relative z-10">
          <p className="text-xs text-white/40 mb-4">
            <Link href="/" className="hover:text-gold cursor-pointer">
              Home
            </Link>{" "}
            <span className="mx-2">›</span>
            <Link href="/servicos" className="hover:text-gold cursor-pointer">
              Soluções
            </Link>{" "}
            <span className="mx-2">›</span> {meta.pillar}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <span
                className={`inline-block text-[10px] font-semibold tracking-widest uppercase mb-3 ${accent.tag}`}
              >
                {meta.pillar}
              </span>
              <h1 className="text-3xl md:text-5xl font-display text-white leading-tight mb-4">
                {meta.title}
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mb-6">{meta.tagline}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contato">
                  <Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-md">
                    Fale com um especialista <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/metodologia">
                  <Button
                    variant="outline"
                    className="border-white/25 text-white hover:bg-white/8"
                  >
                    Conheça a metodologia
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-11 h-11 rounded-lg ${accent.iconBg} flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${accent.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/60 uppercase tracking-wider font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5 text-gold" />
                    Sinais de que você precisa disso
                  </div>
                </div>
                <ul className="space-y-2">
                  {meta.triggers.map((t) => (
                    <li key={t} className="flex gap-2 items-start text-sm text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Benefits */}
      <section className="no-print py-20">
        <div className="container">
          <p className="section-tag">Benefícios</p>
          <h2 className="section-title">Por que escolher a collab:Z?</h2>
          <p className="section-subtitle">
            Entregas que impactam o negócio, não apenas entregáveis de consultoria.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {meta.benefits.map((b) => {
              const BIcon = b.icon;
              return (
                <div
                  key={b.title}
                  className={`bg-white rounded-lg p-6 border border-border border-t-[3px] ${accent.border} hover:shadow-md transition-all`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${accent.iconBg} flex items-center justify-center mb-4`}
                  >
                    <BIcon className={`w-5 h-5 ${accent.iconColor}`} />
                  </div>
                  <h3 className="font-display text-lg text-navy mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-medium">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="no-print py-20 bg-cream">
        <div className="container">
          <p className="section-tag">Nossa Metodologia</p>
          <h2 className="section-title">Como conduzimos o trabalho</h2>
          <p className="section-subtitle">
            Etapas desenhadas para gerar clareza, cadência e resultado.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {meta.methodology.map((step, i) => (
              <div
                key={step.title}
                className="bg-white rounded-lg p-5 border border-border relative"
              >
                <span
                  className={`absolute -top-3 left-5 ${accent.numberBg} text-sm font-bold px-2.5 py-0.5 rounded`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base text-navy mt-3 mb-2">{step.title}</h3>
                <p className="text-xs text-gray-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/contato">
              <Button className="bg-navy hover:bg-teal text-white rounded-md">
                Solicitar proposta <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="no-print py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="section-tag">Aplicações</p>
              <h2 className="section-title">Quando esta solução faz a diferença?</h2>
              <p className="text-gray-medium">
                Nossa experiência cobre cenários variados — sempre com foco em resultado
                mensurável.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-4">
                {meta.applications.map((a) => (
                  <li
                    key={a}
                    className="flex gap-3 items-start bg-white border border-border rounded-lg p-4"
                  >
                    <CheckCircle2 className={`w-5 h-5 ${accent.iconColor} shrink-0 mt-0.5`} />
                    <span className="text-base text-slate">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="no-print py-20 bg-muted">
        <div className="container">
          <p className="section-tag">Diferenciais collab:Z</p>
          <h2 className="section-title">O que nos diferencia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {meta.differentials.map((d) => (
              <div
                key={d.title}
                className="bg-white rounded-lg p-6 border border-border hover:shadow-md transition-all"
              >
                <h3 className="font-display text-base text-navy mb-2">{d.title}</h3>
                <p className="text-sm text-gray-medium leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases (if any) */}
      {meta.cases && meta.cases.length > 0 && (
        <section className="no-print py-20">
          <div className="container">
            <p className="section-tag">Cases de sucesso</p>
            <h2 className="section-title">Histórico de resultados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meta.cases.map((c) => (
                <div
                  key={c.title}
                  className="bg-white rounded-lg p-6 border border-border hover:shadow-md transition-all"
                >
                  <span className="text-xs font-semibold tracking-widest uppercase text-teal">
                    {c.sector}
                  </span>
                  <h3 className="font-display text-lg text-navy mt-2 mb-2">{c.title}</h3>
                  <p className="text-sm text-gray-medium">{c.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Guide (free-form article) */}
      <section className="py-20 bg-cream" data-print-root>
        <div className="container max-w-4xl">
          {/* Print-only header */}
          <div className="print-header" aria-hidden="true">
            <div className="print-header-brand">
              collab<span style={{ color: "#F7A823" }}>:</span>Z
            </div>
            <div className="print-header-meta">
              <div className="print-header-cat">Solução · {meta.pillar}</div>
              <h1 className="print-header-title">{meta.title}</h1>
              <p className="print-header-excerpt">{meta.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 no-print">
            <p className="section-tag m-0">Guia Completo</p>
            <Button
              onClick={() => typeof window !== "undefined" && window.print()}
              variant="outline"
              className="border-gold text-navy hover:bg-gold/10 rounded-md text-sm"
              aria-label="Imprimir ou salvar como PDF"
            >
              <Printer className="w-4 h-4 mr-1" /> Imprimir / PDF
            </Button>
          </div>
          <h2 className="section-title">{meta.title}: o que você precisa saber</h2>
          {meta.guideQuestions && meta.guideQuestions.length > 0 && (
            <div className="bg-white border border-border rounded-lg p-6 mb-10">
              <div className="flex items-center gap-2 mb-4 text-teal">
                <HelpCircle className="w-5 h-5" />
                <span className="font-semibold text-sm">Perguntas que este guia responde</span>
              </div>
              <ul className="space-y-2 text-sm text-slate">
                {meta.guideQuestions.map((q) => (
                  <li key={q} className="flex gap-2">
                    <span className="text-gold">›</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="service-body">
            <Component />
          </div>
          <div className="print-footer" aria-hidden="true">
            <p>
              © {new Date().getUTCFullYear()} collab:Z — Collaborazione Assessoria.
              Todos os direitos reservados.
            </p>
            <p>
              Esta e outras soluções em{" "}
              <strong>www.clbz.com.br/servicos</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="no-print py-20">
          <div className="container max-w-5xl">
            <p className="section-tag">Pilar {meta.pillar}</p>
            <h2 className="section-title">Soluções relacionadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => {
                const RIcon = r.meta.icon;
                return (
                  <Link key={r.meta.slug} href={`/servicos/${r.meta.slug}`}>
                    <div className="bg-white rounded-lg p-7 border border-border hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer h-full">
                      <div
                        className={`w-10 h-10 rounded-lg ${accentMap[r.meta.accent].iconBg} flex items-center justify-center mb-4`}
                      >
                        <RIcon className={`w-5 h-5 ${accentMap[r.meta.accent].iconColor}`} />
                      </div>
                      <h3 className="font-display text-lg text-navy mb-2">{r.meta.title}</h3>
                      <p className="text-sm text-gray-medium mb-4">{r.meta.excerpt}</p>
                      <span className="text-sm font-semibold text-teal flex items-center gap-1">
                        Saiba mais <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="no-print py-16">
        <div className="container max-w-3xl">
          <div
            className="rounded-xl p-10 md:p-14 text-center text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}
          >
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3">
              Vamos conversar
            </p>
            <h2 className="font-display text-2xl md:text-3xl mb-3">
              Cada transformação é única. A sua também.
            </h2>
            <p className="text-white/65 mb-6 max-w-md mx-auto">
              Conte o desafio — desenhamos a solução sob medida para o seu contexto.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contato">
                <Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-md">
                  Fale com um especialista <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/servicos">
                <Button
                  variant="outline"
                  className="border-white/25 text-white hover:bg-white/8"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Todas as soluções
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Utility for service guide bodies
export function ServiceCheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 list-none pl-0">
      {items.map((i) => (
        <li key={i} className="flex gap-2 items-start text-base text-slate">
          <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-1" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}
