import { useAuth } from "@/_core/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import { ArrowRight, BarChart3, Cpu, Layers, Users, Factory, Building2, ShieldCheck, Zap, Award, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden" style={{backgroundColor: '#0B0D10'}}>
        {/* Background Image Placeholder - Industrial/Corporate */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent z-10" />
          <img 
            src="/images/hero-bg.jpg" 
            alt="Corporate Architecture" 
            className="w-full h-full object-cover grayscale opacity-50"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.style.backgroundColor = '#f0f0f0';
            }}
          />
          {/* Grid Overlay */}
          <div className="absolute inset-0 grid-lines opacity-30 z-0 pointer-events-none" />
        </div>

        <div className="container relative z-20 pt-20">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              System Operational
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] tracking-tight" style={{color: '#F9FAFB'}}>
              TRANSFORMAÇÃO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-destructive">QUE FUNCIONA</span> <br />
              NO MUNDO REAL.
            </h1>
            
            <p className="text-xl max-w-xl leading-relaxed border-l-2 border-primary/50 pl-6" style={{color: '#F9FAFB'}}>
              A CollabZ não vende frameworks teóricos. Entregamos execução estratégica e tecnologia aplicada para ambientes complexos e regulados.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/solutions">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none px-8 h-14 text-lg font-display font-bold tracking-wide uppercase">
                  Nossas Soluções
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-foreground/20 hover:bg-foreground/5 rounded-none px-8 h-14 text-lg font-display font-bold tracking-wide uppercase">
                  Fale Conosco
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Technical Decor Elements */}
        <div className="absolute bottom-0 right-0 p-8 hidden md:block z-20">
          <div className="flex flex-col items-end gap-2 font-mono text-xs text-muted-foreground/60">
            <span>SYS.STATUS: NOMINAL</span>
            <span>LOC: SAO PAULO, BR</span>
            <span>LAT: -23.5505 | LON: -46.6333</span>
          </div>
        </div>
      </section>

      {/* Value Proposition / Intro */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-display font-bold uppercase tracking-tight mb-6">
                Consultoria Boutique <br />
                <span className="text-primary">Enterprise</span>
              </h2>
              <div className="w-20 h-1 bg-primary mb-6" />
            </div>
            <div className="md:col-span-8 space-y-6">
              <p className="text-2xl font-light leading-relaxed text-foreground/80">
                Atuamos na interseção entre <strong className="font-semibold text-foreground">consultoria estratégica</strong>, <strong className="font-semibold text-foreground">tecnologia aplicada</strong> e <strong className="font-semibold text-foreground">indústria</strong>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Diferente de consultorias genéricas, a CollabZ se posiciona como advisor e executor. Entendemos que em ambientes industriais e regulados, o PowerPoint não resolve problemas. É preciso descer ao nível da operação, entender a tecnologia e garantir a adoção real.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border mt-8">
                <div className="space-y-2">
                  <h3 className="text-4xl font-display font-bold text-foreground">15+</h3>
                  <p className="text-sm text-muted-foreground font-mono uppercase">Anos de Experiência</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-display font-bold text-foreground">50+</h3>
                  <p className="text-sm text-muted-foreground font-mono uppercase">Projetos Complexos</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-display font-bold text-foreground">100%</h3>
                  <p className="text-sm text-muted-foreground font-mono uppercase">Foco em Resultado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 relative" style={{backgroundColor: '#1F2933'}}>
        <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
        <div className="container relative z-10">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-primary font-mono text-sm font-bold uppercase tracking-widest mb-2 block">Capabilities</span>
              <h2 className="text-4xl font-display font-bold uppercase tracking-tight" style={{color: '#F9FAFB'}}>Nossas Soluções</h2>
            </div>
            <Link href="/solutions" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors" style={{color: '#F9FAFB'}}>
              Ver todas as soluções <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group border border-border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden" style={{backgroundColor: '#1F2933', borderColor: 'rgba(249, 250, 251, 0.1)'}}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/50 -mr-8 -mt-8 rounded-full group-hover:bg-primary/10 transition-colors" />
              <Layers className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors" style={{color: '#F9FAFB'}}>Strategy & Transformation</h3>
              <p className="text-sm leading-relaxed mb-6" style={{color: '#F9FAFB'}}>
                Diagnóstico organizacional, modelos operacionais e governança para tomada de decisão em ambientes complexos.
              </p>
              <div className="mt-auto pt-4 border-t flex justify-between items-center" style={{borderColor: 'rgba(249, 250, 251, 0.1)'}}>
                <span className="text-xs font-mono" style={{color: 'rgba(249, 250, 251, 0.6)'}}>01</span>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="group border border-border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden" style={{backgroundColor: '#1F2933', borderColor: 'rgba(249, 250, 251, 0.1)'}}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/50 -mr-8 -mt-8 rounded-full group-hover:bg-primary/10 transition-colors" />
              <Cpu className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors" style={{color: '#F9FAFB'}}>Digital, Data & AI</h3>
              <p className="text-sm leading-relaxed mb-6" style={{color: '#F9FAFB'}}>
                IA aplicada a processos reais, automação inteligente e analytics para decisão executiva baseada em dados.
              </p>
              <div className="mt-auto pt-4 border-t flex justify-between items-center" style={{borderColor: 'rgba(249, 250, 251, 0.1)'}}>
                <span className="text-xs font-mono" style={{color: 'rgba(249, 250, 251, 0.6)'}}>02</span>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="group border border-border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden" style={{backgroundColor: '#1F2933', borderColor: 'rgba(249, 250, 251, 0.1)'}}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/50 -mr-8 -mt-8 rounded-full group-hover:bg-primary/10 transition-colors" />
              <BarChart3 className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors" style={{color: '#F9FAFB'}}>PMO & Execution</h3>
              <p className="text-sm leading-relaxed mb-6" style={{color: '#F9FAFB'}}>
                Gestão de programas complexos, CAPEX, ERP e métricas de valor. Foco na realização de benefícios tangíveis.
              </p>
              <div className="mt-auto pt-4 border-t flex justify-between items-center" style={{borderColor: 'rgba(249, 250, 251, 0.1)'}}>
                <span className="text-xs font-mono" style={{color: 'rgba(249, 250, 251, 0.6)'}}>03</span>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
              </div>
            </div>

            {/* Card 4 */}
            <div className="group border border-border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden" style={{backgroundColor: '#1F2933', borderColor: 'rgba(249, 250, 251, 0.1)'}}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/50 -mr-8 -mt-8 rounded-full group-hover:bg-primary/10 transition-colors" />
              <Users className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors" style={{color: '#F9FAFB'}}>Change & Adoption</h3>
              <p className="text-sm leading-relaxed mb-6" style={{color: '#F9FAFB'}}>
                Gestão de mudança organizacional, treinamento e adoção real de novas tecnologias e processos.
              </p>
              <div className="mt-auto pt-4 border-t flex justify-between items-center" style={{borderColor: 'rgba(249, 250, 251, 0.1)'}}>
                <span className="text-xs font-mono" style={{color: 'rgba(249, 250, 251, 0.6)'}}>04</span>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/solutions">
              <Button variant="outline" className="w-full" style={{borderColor: 'rgba(249, 250, 251, 0.2)', color: '#F9FAFB'}}>Ver todas as soluções</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cases / Success Stories Section */}
      <section className="py-24 border-b border-border" style={{backgroundColor: '#F9FAFB'}}>
        <div className="container">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-primary font-mono text-sm font-bold uppercase tracking-widest mb-2 block">Resultados Reais</span>
              <h2 className="text-4xl font-display font-bold uppercase tracking-tight">Nossos Cases</h2>
            </div>
            <Link href="/insights" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">
              Ver todos os cases <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Case 1 */}
            <div className="group bg-secondary/30 border border-border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 -mr-10 -mt-10 rounded-full group-hover:bg-primary/10 transition-colors" />
              <Award className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-xl font-display font-bold mb-4 text-foreground">Transformação Digital em Manufatura</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Implementação de sistema ERP integrado com IoT em fábrica de 500+ colaboradores. Resultado: 35% de redução em tempo de ciclo.
              </p>
              <div className="space-y-2 pt-4 border-t border-border/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-muted-foreground">Indústria</span>
                  <span className="text-foreground font-semibold">Manufatura 4.0</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-muted-foreground">Duração</span>
                  <span className="text-foreground font-semibold">18 meses</span>
                </div>
              </div>
            </div>

            {/* Case 2 */}
            <div className="group bg-secondary/30 border border-border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 -mr-10 -mt-10 rounded-full group-hover:bg-primary/10 transition-colors" />
              <TrendingUp className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-xl font-display font-bold mb-4 text-foreground">Automação de Processos em Utilities</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Automação RPA de processos de back-office em empresa de energia. Resultado: 60% redução de custos operacionais.
              </p>
              <div className="space-y-2 pt-4 border-t border-border/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-muted-foreground">Setor</span>
                  <span className="text-foreground font-semibold">Energia & Utilities</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-muted-foreground">Duração</span>
                  <span className="text-foreground font-semibold">12 meses</span>
                </div>
              </div>
            </div>

            {/* Case 3 */}
            <div className="group bg-secondary/30 border border-border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 -mr-10 -mt-10 rounded-full group-hover:bg-primary/10 transition-colors" />
              <ShieldCheck className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-xl font-display font-bold mb-4 text-foreground">Governança de Dados em Serviços Financeiros</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Implementação de framework de governança de dados e compliance regulatório. Resultado: 100% conformidade com LGPD.
              </p>
              <div className="space-y-2 pt-4 border-t border-border/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-muted-foreground">Setor</span>
                  <span className="text-foreground font-semibold">Serviços Financeiros</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-muted-foreground">Duração</span>
                  <span className="text-foreground font-semibold">9 meses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries / Contexts */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-mono text-sm font-bold uppercase tracking-widest mb-2 block">Setores de Atuação</span>
            <h2 className="text-4xl font-display font-bold uppercase tracking-tight mb-6">Onde Geramos Valor</h2>
            <p className="text-muted-foreground">
              Nossa expertise é profunda em setores onde a falha não é uma opção e a complexidade é a norma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Industry 1 */}
            <div className="group relative h-64 overflow-hidden border border-border bg-secondary/10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img src="/images/industry-1.jpg" alt="Industrial" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <div className="flex items-center gap-4 mb-2">
                  <Factory className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-display font-bold text-white">Manufatura & Indústria 4.0</h3>
                </div>
                <p className="text-white/80 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Otimização de chão de fábrica, integração OT/IT e digitalização de processos produtivos.
                </p>
              </div>
            </div>

            {/* Industry 2 */}
            <div className="group relative h-64 overflow-hidden border border-border bg-secondary/10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img src="/images/industry-2.jpg" alt="Energy" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <div className="flex items-center gap-4 mb-2">
                  <Zap className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-display font-bold text-white">Energia & Utilities</h3>
                </div>
                <p className="text-white/80 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Gestão de ativos críticos, transição energética e eficiência operacional em larga escala.
                </p>
              </div>
            </div>

            {/* Industry 3 */}
            <div className="group relative h-64 overflow-hidden border border-border bg-secondary/10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img src="/images/industry-3.jpg" alt="Corporate" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <div className="flex items-center gap-4 mb-2">
                  <Building2 className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-display font-bold text-white">Serviços Financeiros & Corporativo</h3>
                </div>
                <p className="text-white/80 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Transformação digital, automação de back-office e governança de dados.
                </p>
              </div>
            </div>

            {/* Industry 4 */}
            <div className="group relative h-64 overflow-hidden border border-border bg-secondary/10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img src="/images/industry-4.jpg" alt="Regulated" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <div className="flex items-center gap-4 mb-2">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-display font-bold text-white">Ambientes Regulados</h3>
                </div>
                <p className="text-white/80 text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Compliance, gestão de riscos e adequação a normas complexas com suporte tecnológico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights / Blog Preview */}
      <section className="py-24 border-t border-border" style={{backgroundColor: '#1F2933'}}>
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-mono text-sm font-bold uppercase tracking-widest mb-2 block">Thought Leadership</span>
              <h2 className="text-4xl font-display font-bold uppercase tracking-tight" style={{color: '#F9FAFB'}}>Artigos Recentes</h2>
            </div>
            <Link href="/insights" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors" style={{color: '#F9FAFB'}}>
              Ler todos os artigos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <article className="group cursor-pointer">
              <div className="aspect-video border border-border mb-6 overflow-hidden relative" style={{backgroundColor: '#1F2933', borderColor: 'rgba(249, 250, 251, 0.2)'}}>
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-2 py-1 uppercase tracking-wider z-10" style={{backgroundColor: '#E60000'}}>
                  Digital
                </div>
                <img src="/images/blog-1.jpg" alt="AI in Industry" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div className="space-y-3">
                <div className="text-xs font-mono" style={{color: 'rgba(249, 250, 251, 0.8)'}}>15 JAN 2026 • 5 MIN READ</div>
                <h3 className="text-xl font-display font-bold leading-tight group-hover:text-primary transition-colors" style={{color: '#F9FAFB', fontWeight: 700}}>
                  A Ilusão da IA Generativa na Indústria: Por que a base de dados importa mais que o modelo
                </h3>
                <p className="text-sm line-clamp-3" style={{color: '#F9FAFB'}}>
                  Enquanto todos olham para o ChatGPT, as verdadeiras revoluções industriais estão acontecendo na estruturação de dados legados e na governança de informações críticas.
                </p>
                <div className="pt-2 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" style={{color: '#E60000', fontWeight: 700}}>
                  Ler artigo <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </article>

            {/* Article 2 */}
            <article className="group cursor-pointer">
              <div className="aspect-video border border-border mb-6 overflow-hidden relative" style={{backgroundColor: '#1F2933', borderColor: 'rgba(249, 250, 251, 0.2)'}}>
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-2 py-1 uppercase tracking-wider z-10" style={{backgroundColor: '#E60000'}}>
                  Strategy
                </div>
                <img src="/images/blog-2.jpg" alt="Change Management" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div className="space-y-3">
                <div className="text-xs font-mono" style={{color: 'rgba(249, 250, 251, 0.8)'}}>10 JAN 2026 • 7 MIN READ</div>
                <h3 className="text-xl font-display font-bold leading-tight group-hover:text-primary transition-colors" style={{color: '#F9FAFB', fontWeight: 700}}>
                  O Fim dos Projetos de "Go-Live": Focando em Adoção Sustentável
                </h3>
                <p className="text-sm line-clamp-3" style={{color: '#F9FAFB'}}>
                  Por que 70% das transformações digitais falham não na tecnologia, mas na incapacidade de mudar comportamentos e processos operacionais no longo prazo.
                </p>
                <div className="pt-2 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" style={{color: '#E60000', fontWeight: 700}}>
                  Ler artigo <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </article>

            {/* Article 3 */}
            <article className="group cursor-pointer">
              <div className="aspect-video border border-border mb-6 overflow-hidden relative" style={{backgroundColor: '#1F2933', borderColor: 'rgba(249, 250, 251, 0.2)'}}>
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-2 py-1 uppercase tracking-wider z-10" style={{backgroundColor: '#E60000'}}>
                  Execution
                </div>
                <img src="/images/blog-3.jpg" alt="PMO" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div className="space-y-3">
                <div className="text-xs font-mono" style={{color: 'rgba(249, 250, 251, 0.8)'}}>05 JAN 2026 • 4 MIN READ</div>
                <h3 className="text-xl font-display font-bold leading-tight group-hover:text-primary transition-colors" style={{color: '#F9FAFB', fontWeight: 700}}>
                  PMO 4.0: De Controlador de Prazos a Viabilizador de Valor
                </h3>
                <p className="text-sm line-clamp-3" style={{color: '#F9FAFB'}}>
                  Como os escritórios de projetos modernos estão abandonando a burocracia excessiva para focar em métricas de valor real e desbloqueio de gargalos estratégicos.
                </p>
                <div className="pt-2 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" style={{color: '#E60000', fontWeight: 700}}>
                  Ler artigo <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden" style={{backgroundColor: '#0B0D10'}}>
        <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-6" style={{color: '#F9FAFB'}}>
            Pronto para transformar <br />
            <span className="text-primary">sua operação?</span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-10" style={{color: 'rgba(249, 250, 251, 0.7)'}}>
            Vamos conversar sobre como a CollabZ pode ajudar sua empresa a navegar pela complexidade e entregar resultados reais.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none px-10 h-16 text-lg font-display font-bold tracking-wide uppercase">
                Falar com um Especialista
              </Button>
            </Link>
            <Link href="/insights">
              <Button variant="outline" size="lg" className="border-background/30 text-background hover:bg-background/10 rounded-none px-10 h-16 text-lg font-display font-bold tracking-wide uppercase">
                Conhecer Nossos Cases
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
