import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Printer,
  RefreshCcw,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { CHECKLIST_PRONTIDAO } from "@/content/resources/prontidao";
import { useSeo } from "@/lib/seo";

type Scores = Record<string, number>;

const TOTAL_QUESTIONS = CHECKLIST_PRONTIDAO.dimensions.reduce(
  (acc, d) => acc + d.questions.length,
  0,
);

function pickTier(total: number) {
  return (
    CHECKLIST_PRONTIDAO.tiers.find((t) => total >= t.min && total <= t.max) ??
    CHECKLIST_PRONTIDAO.tiers[0]
  );
}

export default function ChecklistProntidao() {
  useSeo({
    title: "Checklist de Prontidão para Mudança",
    description:
      "Diagnóstico gratuito em 5 a 7 minutos — 20 perguntas em 5 dimensões que avaliam se sua organização está pronta para iniciar ou sustentar um programa de transformação.",
    path: "/recursos/checklist-prontidao",
  });

  const [scores, setScores] = useState<Scores>({});
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState("");
  const [leadSent, setLeadSent] = useState(false);

  const answered = Object.keys(scores).length;
  const rawTotal = Object.values(scores).reduce((a, b) => a + b, 0);
  const total = Math.round((rawTotal / (TOTAL_QUESTIONS * 5)) * 100);

  const requestMutation = trpc.contact.requestResource.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setLeadSent(true);
        toast.success("Perfeito! Você receberá os próximos recursos em seu e-mail.");
      } else {
        toast.error("Não conseguimos registrar agora. Tente novamente.");
      }
    },
    onError: () => toast.error("E-mail inválido."),
  });

  const dimensionBreakdown = useMemo(
    () =>
      CHECKLIST_PRONTIDAO.dimensions.map((d) => {
        const raw = d.questions.reduce((acc, q) => acc + (scores[q.id] ?? 0), 0);
        const max = d.questions.length * 5;
        return {
          ...d,
          raw,
          max,
          pct: Math.round((raw / max) * 100),
        };
      }),
    [scores],
  );

  const allAnswered = answered === TOTAL_QUESTIONS;

  const setScore = (questionId: string, value: number) =>
    setScores((prev) => ({ ...prev, [questionId]: value }));

  const reset = () => {
    setScores({});
    setShowResult(false);
    setEmail("");
    setLeadSent(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAnswered) {
      toast.error(
        `Responda todas as ${TOTAL_QUESTIONS} perguntas antes de ver o resultado.`,
      );
      return;
    }
    setShowResult(true);
    if (typeof window !== "undefined")
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sendLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    requestMutation.mutate({
      email,
      resourceSlug: "checklist-prontidao",
      resourceTitle: `Checklist de Prontidão — Score ${total}/100 (${pickTier(total).label})`,
    });
  };

  const tier = pickTier(total);

  return (
    <Layout>
      {/* Hero */}
      <header
        className="pt-32 pb-12 relative no-print"
        style={{ background: "linear-gradient(135deg, #0B3D5C 0%, #1A6E8E 100%)" }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-teal to-gold" />
        <div className="container relative z-10 max-w-4xl">
          <p className="text-xs text-white/60 mb-4">
            <Link href="/" className="hover:text-gold cursor-pointer">
              Home
            </Link>{" "}
            <span className="mx-2">›</span>
            <Link href="/insights" className="hover:text-gold cursor-pointer">
              Insights
            </Link>{" "}
            <span className="mx-2">›</span>
            Recursos
          </p>
          <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-gold mb-3">
            Recurso gratuito · Checklist interativo
          </span>
          <h1 className="text-3xl md:text-5xl font-display text-white leading-tight mb-4">
            {CHECKLIST_PRONTIDAO.title}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            {CHECKLIST_PRONTIDAO.intro}
          </p>
        </div>
      </header>

      {/* Result block — rendered both on screen after submit and always on print */}
      {showResult && (
        <section className="py-12 bg-cream" data-print-root>
          <div className="container max-w-3xl">
            {/* Print header (hidden on screen, institutional on paper) */}
            <div className="print-header" aria-hidden="true">
              <div className="print-header-brand">
                collab<span style={{ color: "#F7A823" }}>:</span>Z
              </div>
              <div className="print-header-meta">
                <div className="print-header-cat">Recurso · Checklist interativo</div>
                <h1 className="print-header-title">{CHECKLIST_PRONTIDAO.title}</h1>
                <p className="print-header-excerpt">{CHECKLIST_PRONTIDAO.intro}</p>
                <p className="print-header-byline">
                  Data:{" "}
                  {new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }).format(new Date())}
                </p>
              </div>
            </div>

            <div
              className="bg-white border border-border rounded-xl p-8 md:p-10 shadow-sm"
              style={{ borderTopWidth: 4, borderTopColor: tier.color }}
            >
              <p className="section-tag">Resultado</p>
              <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
                <div>
                  <div
                    className="font-display text-6xl"
                    style={{ color: tier.color }}
                  >
                    {total}
                    <span className="text-2xl text-gray-medium">/100</span>
                  </div>
                  <div
                    className="text-lg font-semibold mt-1"
                    style={{ color: tier.color }}
                  >
                    {tier.label}
                  </div>
                </div>
                <p className="text-base text-slate md:flex-1">{tier.advice}</p>
              </div>

              <h3 className="font-display text-lg text-navy mt-8 mb-4">
                Breakdown por dimensão
              </h3>
              <div className="space-y-3">
                {dimensionBreakdown.map((d) => (
                  <div key={d.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-navy">{d.title}</span>
                      <span className="text-gray-medium">
                        {d.raw}/{d.max} · {d.pct}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${d.pct}%`,
                          background:
                            d.pct < 50
                              ? "#C83A3A"
                              : d.pct < 70
                                ? "#F7A823"
                                : "#1A6E8E",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="font-display text-lg text-navy mt-8 mb-3">
                Próximo passo
              </h3>
              <p className="text-base text-slate mb-5">
                Este diagnóstico indica a faixa de prontidão da sua organização. Em
                consultoria de mudança, o próximo passo depende do score:
              </p>
              <ul className="text-base text-slate space-y-2 mb-6">
                <li>
                  • <strong>0–40</strong>: estruturar patrocínio, mapa de stakeholders e
                  business case antes de avançar
                </li>
                <li>
                  • <strong>41–65</strong>: atacar as 1–2 dimensões mais fracas (veja
                  breakdown acima)
                </li>
                <li>
                  • <strong>66–85</strong>: envolver change management estruturado no
                  projeto
                </li>
                <li>
                  • <strong>86–100</strong>: executar com disciplina e monitorar adoção
                  nos primeiros 90 dias
                </li>
              </ul>

              <div className="no-print bg-muted rounded-lg p-5 mt-6">
                <p className="text-sm text-slate mb-3">
                  <strong className="text-navy">Quer aprofundar?</strong> Podemos enviar
                  um e-mail com análise personalizada do seu resultado e sugestões
                  práticas para os próximos 90 dias.
                </p>
                {leadSent ? (
                  <p className="text-sm text-teal font-medium">
                    ✓ Recebemos seu e-mail — retornaremos em breve.
                  </p>
                ) : (
                  <form onSubmit={sendLead} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="flex-1 px-4 py-2 border border-border rounded-md text-sm bg-white focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none"
                    />
                    <Button
                      type="submit"
                      disabled={requestMutation.isPending}
                      className="bg-navy hover:bg-teal text-white rounded-md text-sm disabled:opacity-60"
                    >
                      {requestMutation.isPending ? "Enviando..." : "Receber análise"}
                    </Button>
                  </form>
                )}
              </div>

              {/* Print footer */}
              <div className="print-footer" aria-hidden="true">
                <p>
                  © {new Date().getUTCFullYear()} collab:Z — Collaborazione Assessoria.
                  Diagnóstico gratuito. Para aprofundar: fsannino@clbz.com.br.
                </p>
                <p>
                  Versão online e mais recursos:{" "}
                  <strong>www.clbz.com.br/insights</strong>
                </p>
              </div>
            </div>

            <div className="no-print flex flex-wrap gap-3 mt-8 justify-center">
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="border-gold text-navy hover:bg-gold/10 rounded-md"
              >
                <Printer className="w-4 h-4 mr-1" /> Imprimir / Salvar PDF
              </Button>
              <Button
                variant="outline"
                onClick={reset}
                className="border-teal text-teal hover:bg-teal/5 rounded-md"
              >
                <RefreshCcw className="w-4 h-4 mr-1" /> Refazer
              </Button>
              <Link href="/contato">
                <Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-md">
                  Falar com especialista <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Form */}
      <section className={`py-16 no-print ${showResult ? "bg-white" : ""}`}>
        <div className="container max-w-3xl">
          {!showResult && (
            <p className="section-tag">Diagnóstico</p>
          )}
          {!showResult && (
            <h2 className="section-title">Responda as 20 perguntas</h2>
          )}
          {showResult && (
            <h2 className="section-title mt-4">Revise ou ajuste suas respostas</h2>
          )}

          <div className="flex items-center justify-between bg-muted rounded-lg px-4 py-3 mb-6 sticky top-20 z-20 border border-border">
            <span className="text-sm text-slate">
              <strong className="text-navy">{answered}</strong> de {TOTAL_QUESTIONS}{" "}
              respondidas
            </span>
            <div className="w-48 h-2 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-teal rounded-full transition-all"
                style={{ width: `${(answered / TOTAL_QUESTIONS) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {CHECKLIST_PRONTIDAO.dimensions.map((dim, di) => (
              <div key={dim.id} className="border border-border rounded-lg p-6 bg-white">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-gold font-display text-lg">{String(di + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-xl text-navy">{dim.title}</h3>
                </div>
                <p className="text-sm text-gray-medium mb-5">{dim.description}</p>

                <div className="space-y-5">
                  {dim.questions.map((q, qi) => (
                    <div key={q.id} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                      <p className="text-sm text-slate mb-3">
                        <strong className="text-navy">{qi + 1}.</strong> {q.text}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[0, 1, 2, 3, 4, 5].map((v) => (
                          <button
                            type="button"
                            key={v}
                            onClick={() => setScore(q.id, v)}
                            className={`px-3 py-1.5 rounded-md text-sm font-semibold border transition-all ${
                              scores[q.id] === v
                                ? "bg-navy text-white border-navy"
                                : "bg-white text-gray-medium border-border hover:border-teal hover:text-teal"
                            }`}
                            aria-pressed={scores[q.id] === v}
                            aria-label={`Nota ${v} para pergunta ${qi + 1} da dimensão ${dim.title}`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-3 justify-between items-center">
              <Link href="/insights">
                <Button
                  variant="outline"
                  className="border-teal text-teal hover:bg-teal/5 rounded-md text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Voltar para Insights
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!allAnswered}
                className="bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-md disabled:opacity-60"
              >
                {allAnswered ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Ver meu score
                  </>
                ) : (
                  `Faltam ${TOTAL_QUESTIONS - answered} respostas`
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
