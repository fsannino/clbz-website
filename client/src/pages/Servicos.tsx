import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import type { ServicePillar } from "@/content/services/types";
import { useSeo } from "@/lib/seo";

const pillarDescriptions: Record<ServicePillar, string> = {
  Estratégia:
    "Formulação, desdobramento e decisões de alto impacto — incluindo M&A, turnaround e redesenho organizacional.",
  Gestão: "PMO, governança e os sistemas que fazem o plano virar rotina.",
  Operação: "Eficiência, dados, IA e tecnologia aplicada à execução do dia a dia.",
  Pessoas:
    "Gestão de mudanças, estratégia de RH e engajamento — o lado humano que define se a transformação funciona.",
};

const pillarOrder: ServicePillar[] = ["Estratégia", "Gestão", "Operação", "Pessoas"];

const accentMap = {
  gold: { iconBg: "bg-gold/10", iconColor: "text-gold", border: "border-t-gold" },
  teal: { iconBg: "bg-teal/10", iconColor: "text-teal", border: "border-t-teal" },
  navy: { iconBg: "bg-navy/10", iconColor: "text-navy", border: "border-t-navy" },
} as const;

export default function Servicos() {
  useSeo({
    title: "Soluções",
    description:
      "Portfólio completo de consultoria em gestão, estratégia, operação e pessoas: Eficiência Operacional, PMO, Post-Merger Integration, Redesenho Organizacional, Gestão de Mudanças, Estratégia de RH, Dados e IA, Governança e Reestruturação.",
    path: "/servicos",
  });

  return (
    <Layout>
      {/* Hero */}
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
            <span className="mx-2">›</span> Soluções
          </p>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-3">Nossas Soluções</h1>
          <p className="text-lg text-white/60 max-w-2xl">
            Portfólio integrado de consultoria em gestão, estratégia, operação e pessoas. Cada
            solução tem sua página dedicada com metodologia, aplicações, diferenciais e cases.
          </p>
        </div>
      </div>

      {/* Pillars */}
      {pillarOrder.map((pillar, pi) => {
        const list = services.filter((s) => s.meta.pillar === pillar);
        if (list.length === 0) return null;
        return (
          <section key={pillar} className={`py-20 ${pi % 2 === 1 ? "bg-cream" : ""}`}>
            <div className="container">
              <p className="section-tag">Pilar</p>
              <h2 className="section-title">{pillar}</h2>
              <p className="section-subtitle">{pillarDescriptions[pillar]}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((entry) => {
                  const Icon = entry.meta.icon;
                  const a = accentMap[entry.meta.accent];
                  return (
                    <Link key={entry.meta.slug} href={`/servicos/${entry.meta.slug}`}>
                      <div
                        className={`bg-white rounded-lg p-7 border border-border border-t-[3px] ${a.border} hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl ${a.iconBg} flex items-center justify-center mb-5`}
                        >
                          <Icon className={`w-6 h-6 ${a.iconColor}`} />
                        </div>
                        <h3 className="font-display text-lg text-navy mb-2">{entry.meta.title}</h3>
                        <p className="text-sm text-gray-medium mb-5 flex-1">
                          {entry.meta.excerpt}
                        </p>
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
        );
      })}

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container">
          <div
            className="rounded-xl p-12 text-center text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1A6E8E, #0B3D5C)" }}
          >
            <h2 className="font-display text-3xl mb-3 relative z-10">
              Cada transformação é única. A sua também.
            </h2>
            <p className="text-white/65 mb-6 relative z-10 max-w-md mx-auto">
              Conte-nos sobre o seu desafio e nós desenhamos a solução sob medida.
            </p>
            <Link href="/contato">
              <Button className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-5 rounded-md relative z-10">
                Solicitar uma proposta <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
