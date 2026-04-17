import { useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { getAllInsightCards } from "@/content/insights";
import type { InsightCategory, InsightMeta } from "@/content/insights/types";

const resources = [
  {
    emoji: "📘",
    title: "5 Erros Fatais na Gestão de Mudanças",
    desc: "eBook com os equívocos mais comuns e como evitá-los.",
    border: "border-t-gold",
  },
  {
    emoji: "✅",
    title: "Checklist de Prontidão",
    desc: "20 perguntas essenciais para avaliar se sua organização está pronta.",
    border: "border-t-teal",
  },
  {
    emoji: "📋",
    title: "Template Plano de Comunicação",
    desc: "Modelo pronto para estruturar comunicação em qualquer mudança.",
    border: "border-t-navy",
  },
];

function ArticleCard({ article }: { article: InsightMeta }) {
  const isPublished = article.status === "published";

  const inner = (
    <div
      className={`bg-white rounded-lg p-7 border border-border transition-all h-full flex flex-col ${
        isPublished
          ? "hover:shadow-md hover:-translate-y-1 cursor-pointer"
          : "opacity-70"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-teal text-[10px] font-semibold tracking-widest uppercase">
          {article.category}
        </span>
        {!isPublished && (
          <span className="text-[10px] font-semibold tracking-widest uppercase text-gold bg-gold/10 px-2 py-0.5 rounded">
            Em breve
          </span>
        )}
      </div>
      <h3 className="font-display text-lg text-navy mb-2">{article.title}</h3>
      <p className="text-sm text-gray-medium mb-4 flex-1">{article.excerpt}</p>
      <div className="flex items-center justify-between text-xs text-gray-medium">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {article.readTimeMin} min
        </span>
        {isPublished && (
          <span className="text-sm font-semibold text-teal flex items-center gap-1">
            Ler artigo <ArrowRight className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
    </div>
  );

  return isPublished ? (
    <Link href={`/insights/${article.slug}`}>{inner}</Link>
  ) : (
    inner
  );
}

export default function Insights() {
  const allArticles = useMemo(() => getAllInsightCards(), []);
  const categories = useMemo(() => {
    const set = new Set<InsightCategory>();
    allArticles.forEach((a) => set.add(a.category));
    return ["Todos", ...Array.from(set)] as const;
  }, [allArticles]);

  const [activeCat, setActiveCat] = useState<string>("Todos");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribeMutation = trpc.contact.subscribeNewsletter.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setSubscribed(true);
        setNewsletterEmail("");
        toast.success("Inscrição registrada! Em breve você receberá novidades.");
      } else {
        toast.error("Não foi possível registrar agora. Tente novamente em instantes.");
      }
    },
    onError: (err) => toast.error(err.message || "E-mail inválido."),
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    subscribeMutation.mutate({ email: newsletterEmail, source: "change-pulse" });
  };
  const filtered =
    activeCat === "Todos"
      ? allArticles
      : allArticles.filter((a) => a.category === activeCat);

  return (
    <Layout>
      <div
        className="pt-32 pb-16 relative"
        style={{ background: "linear-gradient(135deg, #0B3D5C, #072A40)" }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-teal to-gold" />
        <div className="container relative z-10">
          <p className="text-xs text-white/40 mb-4">
            <Link href="/" className="hover:text-gold cursor-pointer">
              Home
            </Link>{" "}
            <span className="mx-2">›</span> Insights
          </p>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-3">Insights</h1>
          <p className="text-lg text-white/60 max-w-xl">
            Artigos, cases, recursos gratuitos e pensamento de liderança sobre transformação
            organizacional.
          </p>
        </div>
      </div>

      {/* Blog */}
      <section className="py-20">
        <div className="container">
          <p className="section-tag">Blog</p>
          <h2 className="section-title">Artigos recentes</h2>
          <p className="section-subtitle">
            Conteúdo original sobre gestão de mudanças e liderança — em português.
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeCat === cat
                    ? "bg-navy text-white"
                    : "bg-white border border-border text-gray-medium hover:border-teal hover:text-teal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-cream">
        <div className="container">
          <p className="section-tag">Downloads</p>
          <h2 className="section-title">Recursos gratuitos</h2>
          <p className="section-subtitle">
            eBooks, checklists e templates para ajudar na mudança organizacional.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((r) => (
              <div
                key={r.title}
                className={`bg-white rounded-lg p-7 border border-border border-t-[3px] ${r.border} hover:shadow-md transition-all cursor-pointer`}
              >
                <div className="text-3xl mb-3">{r.emoji}</div>
                <h3 className="font-display text-lg text-navy mb-2">{r.title}</h3>
                <p className="text-sm text-gray-medium mb-4">{r.desc}</p>
                <span className="text-sm font-semibold text-teal flex items-center gap-1">
                  Em breve <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container">
          <div
            className="rounded-xl p-12 md:p-16 text-center text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}
          >
            <div className="absolute top-[-40px] right-[-40px] w-48 h-48 rounded-full bg-gold/8" />
            <div className="relative z-10">
              <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3">
                Newsletter
              </p>
              <h2 className="font-display text-3xl mb-3">Change Pulse</h2>
              <p className="text-white/65 mb-8 max-w-md mx-auto">
                Artigos, tendências e ferramentas sobre gestão de mudanças — quinzenalmente.
              </p>
              {subscribed ? (
                <p className="text-white text-sm bg-white/10 rounded-md px-4 py-3 max-w-md mx-auto">
                  ✓ Inscrição registrada. Aguarde a próxima edição.
                </p>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="flex-1 px-4 py-3 rounded-md border-none bg-white text-foreground text-sm outline-none"
                  />
                  <Button
                    type="submit"
                    disabled={subscribeMutation.isPending}
                    className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-md disabled:opacity-60"
                  >
                    {subscribeMutation.isPending ? "Enviando..." : "Assinar"}
                  </Button>
                </form>
              )}
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
            <p className="text-sm text-gray-medium max-w-md mx-auto mb-5">
              Estamos documentando nossos cases com métricas e resultados detalhados.
            </p>
            <Link href="/contato">
              <Button
                variant="outline"
                className="border-teal text-teal hover:bg-teal/5 rounded-md text-sm"
              >
                Solicitar referências <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
