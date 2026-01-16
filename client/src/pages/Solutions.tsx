import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { ArrowRight, BarChart3, Cpu, Layers, Users, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Solutions() {
  return (
    <Layout>
      {/* Header */}
      <div className="bg-secondary/30 py-20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
        <div className="container relative z-10">
          <span className="text-primary font-mono text-sm font-bold uppercase tracking-widest mb-2 block">O que fazemos</span>
          <h1 className="text-5xl font-display font-bold uppercase tracking-tight text-foreground mb-6">Nossas Soluções</h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Transformamos desafios complexos em resultados operacionais tangíveis através de estratégia, tecnologia e execução disciplinada.
          </p>
        </div>
      </div>

      {/* Solution 1: Strategy */}
      <section id="strategy" className="py-24 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="aspect-square bg-secondary/10 border border-border relative p-8 flex items-center justify-center">
                <div className="absolute inset-0 grid-lines opacity-10" />
                <Layers className="w-32 h-32 text-primary/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <img src="/images/solution-strategy.jpg" alt="Strategy" className="relative z-10 w-full h-full object-cover grayscale shadow-lg" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <Layers className="w-10 h-10 text-primary" />
                <h2 className="text-3xl font-display font-bold uppercase tracking-tight">Strategy & Transformation</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Não entregamos apenas slides. Desenhamos estratégias que sobrevivem ao contato com a realidade operacional. Nosso foco é alinhar a visão executiva com a capacidade de execução da organização.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">Diagnóstico Organizacional</h4>
                    <p className="text-sm text-muted-foreground">Análise profunda de gargalos, cultura e processos.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">Modelos Operacionais</h4>
                    <p className="text-sm text-muted-foreground">Redesenho de estruturas para agilidade e eficiência.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">Governança Corporativa</h4>
                    <p className="text-sm text-muted-foreground">Estruturas de decisão claras e ágeis.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">M&A Integration</h4>
                    <p className="text-sm text-muted-foreground">Integração cultural e sistêmica pós-fusão.</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="rounded-none border-foreground/20 hover:bg-foreground/5 uppercase font-bold tracking-wide">
                Saiba mais sobre Estratégia
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solution 2: Digital */}
      <section id="digital" className="py-24 border-b border-border bg-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-6">
                <Cpu className="w-10 h-10 text-primary" />
                <h2 className="text-3xl font-display font-bold uppercase tracking-tight">Digital, Data & AI</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Tecnologia aplicada a problemas reais. Fugimos do hype para entregar soluções de dados e IA que geram valor mensurável no curto prazo e escalabilidade no longo prazo.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">IA Aplicada</h4>
                    <p className="text-sm text-muted-foreground">Automação inteligente de processos complexos.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">Data Analytics</h4>
                    <p className="text-sm text-muted-foreground">Dashboards executivos e preditivos para decisão.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">Automação (RPA/BPA)</h4>
                    <p className="text-sm text-muted-foreground">Eficiência operacional e redução de erros.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">Arquitetura Enterprise</h4>
                    <p className="text-sm text-muted-foreground">Modernização de legado e integração de sistemas.</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="rounded-none border-foreground/20 hover:bg-foreground/5 uppercase font-bold tracking-wide">
                Saiba mais sobre Digital
              </Button>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-square bg-secondary/10 border border-border relative p-8 flex items-center justify-center">
                <div className="absolute inset-0 grid-lines opacity-10" />
                <Cpu className="w-32 h-32 text-primary/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <img src="/images/solution-digital.jpg" alt="Digital" className="relative z-10 w-full h-full object-cover grayscale shadow-lg" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution 3: PMO */}
      <section id="pmo" className="py-24 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="aspect-square bg-secondary/10 border border-border relative p-8 flex items-center justify-center">
                <div className="absolute inset-0 grid-lines opacity-10" />
                <BarChart3 className="w-32 h-32 text-primary/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <img src="/images/solution-pmo.jpg" alt="PMO" className="relative z-10 w-full h-full object-cover grayscale shadow-lg" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <BarChart3 className="w-10 h-10 text-primary" />
                <h2 className="text-3xl font-display font-bold uppercase tracking-tight">PMO & Execution</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Transformamos a gestão de projetos de uma função burocrática para um motor de entrega de valor. Focamos na realização de benefícios e na visibilidade real do portfólio.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">Gestão de Programas</h4>
                    <p className="text-sm text-muted-foreground">Coordenação de iniciativas complexas e interdependentes.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">Value Realization</h4>
                    <p className="text-sm text-muted-foreground">Monitoramento de KPIs de negócio, não apenas prazos.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">CAPEX Management</h4>
                    <p className="text-sm text-muted-foreground">Controle rigoroso de grandes investimentos.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">Agile at Scale</h4>
                    <p className="text-sm text-muted-foreground">Implementação de metodologias ágeis em grandes corporações.</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="rounded-none border-foreground/20 hover:bg-foreground/5 uppercase font-bold tracking-wide">
                Saiba mais sobre PMO
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solution 4: Change */}
      <section id="change" className="py-24 border-b border-border bg-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-6">
                <Users className="w-10 h-10 text-primary" />
                <h2 className="text-3xl font-display font-bold uppercase tracking-tight">Change & Adoption</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                A tecnologia é fácil; as pessoas são difíceis. Garantimos que suas iniciativas de transformação sejam realmente adotadas pelas equipes, minimizando resistências e maximizando o ROI.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">Gestão de Mudança</h4>
                    <p className="text-sm text-muted-foreground">Metodologias estruturadas para conduzir a transição.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">Treinamento Corporativo</h4>
                    <p className="text-sm text-muted-foreground">Capacitação técnica e comportamental.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">Cultura & Liderança</h4>
                    <p className="text-sm text-muted-foreground">Alinhamento de lideranças para a nova realidade.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">Comunicação Interna</h4>
                    <p className="text-sm text-muted-foreground">Estratégias de engajamento e clareza.</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="rounded-none border-foreground/20 hover:bg-foreground/5 uppercase font-bold tracking-wide">
                Saiba mais sobre Change
              </Button>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-square bg-secondary/10 border border-border relative p-8 flex items-center justify-center">
                <div className="absolute inset-0 grid-lines opacity-10" />
                <Users className="w-32 h-32 text-primary/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <img src="/images/solution-change.jpg" alt="Change" className="relative z-10 w-full h-full object-cover grayscale shadow-lg" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-display font-bold uppercase tracking-tight mb-6">
            Desafios complexos exigem <br />soluções robustas
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Não importa o tamanho do seu desafio, temos a expertise para ajudar.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-none px-10 h-16 text-lg font-display font-bold tracking-wide uppercase">
              Fale com um Consultor
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
