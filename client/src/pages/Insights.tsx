import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { ArrowRight, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

export default function Insights() {
  const articles = [
    {
      id: 1,
      category: "Digital",
      date: "15 JAN 2026",
      readTime: "5 MIN READ",
      title: "A Ilusão da IA Generativa na Indústria: Por que a base de dados importa mais que o modelo",
      excerpt: "Enquanto todos olham para o ChatGPT, as verdadeiras revoluções industriais estão acontecendo na estruturação de dados legados e na governança de informações críticas.",
      image: "/images/blog-1.jpg"
    },
    {
      id: 2,
      category: "Strategy",
      date: "10 JAN 2026",
      readTime: "7 MIN READ",
      title: "O Fim dos Projetos de \"Go-Live\": Focando em Adoção Sustentável",
      excerpt: "Por que 70% das transformações digitais falham não na tecnologia, mas na incapacidade de mudar comportamentos e processos operacionais no longo prazo.",
      image: "/images/blog-2.jpg"
    },
    {
      id: 3,
      category: "Execution",
      date: "05 JAN 2026",
      readTime: "4 MIN READ",
      title: "PMO 4.0: De Controlador de Prazos a Viabilizador de Valor",
      excerpt: "Como os escritórios de projetos modernos estão abandonando a burocracia excessiva para focar em métricas de valor real e desbloqueio de gargalos estratégicos.",
      image: "/images/blog-3.jpg"
    },
    {
      id: 4,
      category: "Industry 4.0",
      date: "28 DEZ 2025",
      readTime: "6 MIN READ",
      title: "Gêmeos Digitais: Da Teoria à Prática em Chão de Fábrica",
      excerpt: "Estudos de caso reais sobre como a implementação de Digital Twins reduziu o tempo de parada não programada em 30% em indústrias de manufatura pesada.",
      image: "/images/blog-4.jpg"
    },
    {
      id: 5,
      category: "Leadership",
      date: "15 DEZ 2025",
      readTime: "5 MIN READ",
      title: "Liderança em Tempos de Incerteza: Navegando Crises Globais",
      excerpt: "Como líderes resilientes estão adaptando suas estratégias operacionais para lidar com rupturas na cadeia de suprimentos e instabilidade geopolítica.",
      image: "/images/blog-5.jpg"
    },
    {
      id: 6,
      category: "Sustainability",
      date: "02 DEZ 2025",
      readTime: "8 MIN READ",
      title: "ESG como Driver de Eficiência Operacional, não apenas Compliance",
      excerpt: "Transformando a agenda de sustentabilidade em vantagem competitiva através da otimização de recursos e redução de desperdícios na operação.",
      image: "/images/blog-6.jpg"
    }
  ];

  const categories = ["Todos", "Strategy", "Digital", "Execution", "Industry 4.0", "Leadership", "Sustainability"];

  return (
    <Layout>
      {/* Header */}
      <div className="bg-secondary/30 py-20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
        <div className="container relative z-10">
          <span className="text-primary font-mono text-sm font-bold uppercase tracking-widest mb-2 block">Thought Leadership</span>
          <h1 className="text-5xl font-display font-bold uppercase tracking-tight text-foreground mb-6">Insights</h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Perspectivas profundas sobre transformação, tecnologia e execução estratégica para líderes que moldam o futuro.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="border-b border-border bg-background sticky top-16 z-30 shadow-sm">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              {categories.map((cat, idx) => (
                <button 
                  key={idx}
                  className={`text-sm font-medium px-3 py-1.5 whitespace-nowrap transition-colors ${
                    idx === 0 
                      ? "bg-primary text-white font-bold" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar artigos..." className="pl-9 rounded-none bg-secondary/10 border-border focus:border-primary h-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Article */}
      <section className="py-16 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group cursor-pointer">
            <div className="lg:col-span-8 overflow-hidden relative aspect-video lg:aspect-auto lg:h-[500px]">
              <div className="absolute top-6 left-6 bg-primary text-white text-sm font-bold px-3 py-1.5 uppercase tracking-wider z-10">
                Destaque
              </div>
              <img src="/images/blog-featured.jpg" alt="Featured" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.style.backgroundColor = '#e5e5e5'; }}
              />
            </div>
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                <span className="text-primary font-bold uppercase">Strategy</span>
                <span>•</span>
                <span>20 JAN 2026</span>
                <span>•</span>
                <span>10 MIN READ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight group-hover:text-primary transition-colors">
                O Futuro da Consultoria: Por que o modelo "Body Shop" está morrendo
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Em um mundo pós-IA, alocar horas de consultores juniores não gera mais valor. O futuro pertence às firmas que vendem outcomes, propriedade intelectual e execução tecnológica real.
              </p>
              <div className="pt-4">
                <Button variant="outline" className="rounded-none border-foreground/20 hover:bg-foreground/5 uppercase font-bold tracking-wide group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                  Ler Artigo Completo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 bg-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {articles.map((article) => (
              <article key={article.id} className="group cursor-pointer flex flex-col h-full">
                <div className="aspect-video bg-background border border-border mb-6 overflow-hidden relative">
                  <div className="absolute top-4 left-4 bg-secondary text-foreground text-xs font-bold px-2 py-1 uppercase tracking-wider z-10">
                    {article.category}
                  </div>
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.style.backgroundColor = '#e5e5e5'; }}
                  />
                </div>
                <div className="space-y-3 flex-grow">
                  <div className="text-xs font-mono text-muted-foreground">
                    {article.date} • {article.readTime}
                  </div>
                  <h3 className="text-xl font-display font-bold leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
                <div className="pt-6 mt-auto">
                  <div className="flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0">
                    Ler artigo <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" className="rounded-none border-foreground/20 hover:bg-foreground/5 uppercase font-bold tracking-wide px-10">
              Carregar Mais Artigos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold uppercase tracking-tight mb-4">
                Receba nossos insights
              </h2>
              <p className="text-background/70 text-lg">
                Análises estratégicas e tendências de mercado diretamente na sua caixa de entrada. Sem spam, apenas conteúdo de alto valor.
              </p>
            </div>
            <div className="bg-background/5 p-8 border border-background/10 backdrop-blur-sm">
              <form className="flex flex-col sm:flex-row gap-4">
                <Input placeholder="Seu e-mail corporativo" className="bg-background text-foreground rounded-none h-14 border-transparent focus:border-primary" />
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-none h-14 px-8 font-bold uppercase tracking-wide whitespace-nowrap">
                  Inscrever-se
                </Button>
              </form>
              <p className="text-xs text-background/40 mt-4">
                Ao se inscrever, você concorda com nossa Política de Privacidade. Você pode cancelar a inscrição a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
