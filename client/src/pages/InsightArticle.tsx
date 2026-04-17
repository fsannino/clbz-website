import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, Clock, Calendar, Share2, Printer } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getInsightBySlug, insights } from "@/content/insights";
import NotFound from "./NotFound";
import { useSeo, buildArticleJsonLd, buildBreadcrumbJsonLd, SITE } from "@/lib/seo";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default function InsightArticle() {
  const [, params] = useRoute<{ slug: string }>("/insights/:slug");
  const slug = params?.slug ?? "";
  const entry = getInsightBySlug(slug);

  useSeo(
    entry
      ? {
          title: entry.meta.title,
          description: entry.meta.excerpt,
          path: `/insights/${entry.meta.slug}`,
          type: "article",
          publishedTime: entry.meta.publishedAt,
          author: entry.meta.author.name,
          category: entry.meta.category,
          jsonLd: [
            buildArticleJsonLd({
              title: entry.meta.title,
              description: entry.meta.excerpt,
              slug: entry.meta.slug,
              publishedAt: entry.meta.publishedAt,
              authorName: entry.meta.author.name,
              authorRole: entry.meta.author.role,
              category: entry.meta.category,
              readTimeMin: entry.meta.readTimeMin,
            }),
            buildBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Insights", url: "/insights" },
              {
                name: entry.meta.title,
                url: `${SITE.baseUrl}/insights/${entry.meta.slug}`,
              },
            ]),
          ],
        }
      : { title: "Artigo não encontrado", path: "/insights", noIndex: true },
  );

  if (!entry) return <NotFound />;

  const { meta, Component } = entry;
  const related = insights
    .filter((i) => i.meta.slug !== meta.slug)
    .slice(0, 3);

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: meta.title, text: meta.excerpt, url });
        return;
      } catch {
        // ignore user cancel
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copiado para a área de transferência.");
    } catch {
      toast.error("Não foi possível copiar o link.");
    }
  };

  return (
    <Layout>
      {/* Cover */}
      <header className="pt-32 pb-12 relative" style={{ background: meta.coverGradient }}>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-teal to-gold" />
        <div className="container relative z-10 max-w-3xl">
          <p className="text-xs text-white/60 mb-4">
            <Link href="/" className="hover:text-gold cursor-pointer">
              Home
            </Link>{" "}
            <span className="mx-2">›</span>
            <Link href="/insights" className="hover:text-gold cursor-pointer">
              Insights
            </Link>{" "}
            <span className="mx-2">›</span>
            {meta.category}
          </p>
          <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-gold mb-3">
            {meta.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-display text-white leading-tight mb-4">
            {meta.title}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mb-6">{meta.excerpt}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-white/15 grid place-items-center text-white font-semibold text-xs">
                {meta.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span>
                <span className="text-white font-medium block leading-none">
                  {meta.author.name}
                </span>
                <span className="text-white/50 text-xs">{meta.author.role}</span>
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(meta.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {meta.readTimeMin} min de leitura
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <article className="py-16" data-print-root>
        <div className="container max-w-3xl">
          {/* Print-only header: shown instead of the web hero on the printed page */}
          <div className="print-header" aria-hidden="true">
            <div className="print-header-brand">
              collab<span style={{ color: "#F7A823" }}>:</span>Z
            </div>
            <div className="print-header-meta">
              <div className="print-header-cat">{meta.category}</div>
              <h1 className="print-header-title">{meta.title}</h1>
              <p className="print-header-excerpt">{meta.excerpt}</p>
              <p className="print-header-byline">
                {meta.author.name} · {meta.author.role} ·{" "}
                {formatDate(meta.publishedAt)} · {meta.readTimeMin} min de leitura
              </p>
            </div>
          </div>

          <div className="article-body">
            <Component />
          </div>

          {/* Print-only footer */}
          <div className="print-footer" aria-hidden="true">
            <p>
              © {new Date().getUTCFullYear()} collab:Z — Collaborazione Assessoria. Todos os
              direitos reservados.
            </p>
            <p>
              Leitura online, cases e recursos gratuitos em{" "}
              <strong>www.clbz.com.br/insights</strong>
            </p>
          </div>

          {/* Actions — hidden on print */}
          <div className="no-print mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <Link href="/insights">
              <Button
                variant="outline"
                className="border-teal text-teal hover:bg-teal/5 rounded-md text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Voltar para Insights
              </Button>
            </Link>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handlePrint}
                variant="outline"
                className="border-gold text-navy hover:bg-gold/10 rounded-md text-sm"
                aria-label="Imprimir ou salvar como PDF"
              >
                <Printer className="w-4 h-4 mr-1" /> Imprimir / PDF
              </Button>
              <Button
                onClick={share}
                variant="outline"
                className="border-navy text-navy hover:bg-navy/5 rounded-md text-sm"
              >
                <Share2 className="w-4 h-4 mr-1" /> Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="no-print py-16 bg-muted">
          <div className="container max-w-5xl">
            <p className="section-tag">Continue lendo</p>
            <h2 className="section-title">Outros insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.meta.slug} href={`/insights/${r.meta.slug}`}>
                  <div className="bg-white rounded-lg p-7 border border-border hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer h-full">
                    <span className="text-teal text-[10px] font-semibold tracking-widest uppercase">
                      {r.meta.category}
                    </span>
                    <h3 className="font-display text-lg text-navy mt-3 mb-2">{r.meta.title}</h3>
                    <p className="text-sm text-gray-medium mb-4">{r.meta.excerpt}</p>
                    <span className="text-sm font-semibold text-teal flex items-center gap-1">
                      Ler artigo <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
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
              Próximo passo
            </p>
            <h2 className="font-display text-2xl md:text-3xl mb-3">
              Quer aplicar essas ideias na sua organização?
            </h2>
            <p className="text-white/65 mb-6 max-w-md mx-auto">
              Agende uma conversa inicial com um de nossos consultores.
            </p>
            <Link href="/contato">
              <Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-md">
                Falar com especialista <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
