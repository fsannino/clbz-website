import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Factory, Building2, ShieldCheck, Zap, Plane, Truck, Pill, ShoppingCart } from "lucide-react";
import { Link } from "wouter";

export default function Industries() {
  const industries = [
    {
      id: "manufacturing",
      icon: Factory,
      title: "Manufatura & Indústria 4.0",
      description: "Otimização de chão de fábrica, integração OT/IT e digitalização de processos produtivos.",
      details: [
        "Manutenção Preditiva",
        "Digital Twin",
        "Supply Chain Optimization",
        "Eficiência Energética Industrial"
      ]
    },
    {
      id: "energy",
      icon: Zap,
      title: "Energia & Utilities",
      description: "Gestão de ativos críticos, transição energética e eficiência operacional em larga escala.",
      details: [
        "Smart Grids",
        "Gestão de Ativos Críticos",
        "Sustentabilidade & ESG",
        "Field Service Management"
      ]
    },
    {
      id: "finance",
      icon: Building2,
      title: "Serviços Financeiros",
      description: "Transformação digital, automação de back-office e governança de dados em ambientes regulados.",
      details: [
        "Automação de Processos (RPA)",
        "Customer Experience Digital",
        "Compliance & Risco",
        "Modernização de Core Banking"
      ]
    },
    {
      id: "regulated",
      icon: ShieldCheck,
      title: "Setor Público & Regulado",
      description: "Compliance, gestão de riscos e adequação a normas complexas com suporte tecnológico.",
      details: [
        "Governo Digital",
        "Segurança Cibernética",
        "Gestão de Contratos Públicos",
        "Transparência & Dados Abertos"
      ]
    },
    {
      id: "aerospace",
      icon: Plane,
      title: "Aeroespacial & Defesa",
      description: "Engenharia de sistemas complexos, gestão de programas de longo prazo e conformidade rigorosa.",
      details: [
        "Program Management",
        "Systems Engineering",
        "Quality Assurance",
        "Supply Chain Resilience"
      ]
    },
    {
      id: "logistics",
      icon: Truck,
      title: "Logística & Transporte",
      description: "Visibilidade em tempo real, otimização de rotas e gestão de frotas conectadas.",
      details: [
        "Rastreabilidade End-to-End",
        "Warehouse Management Systems",
        "Last Mile Optimization",
        "Fleet Analytics"
      ]
    },
    {
      id: "pharma",
      icon: Pill,
      title: "Farmacêutica & Life Sciences",
      description: "Inovação em R&D, conformidade regulatória (Anvisa/FDA) e eficiência na cadeia de valor.",
      details: [
        "Clinical Trials Management",
        "Regulatory Affairs Automation",
        "Quality Control Systems",
        "R&D Digitalization"
      ]
    },
    {
      id: "retail",
      icon: ShoppingCart,
      title: "Varejo & Bens de Consumo",
      description: "Omnichannel real, previsão de demanda e personalização da experiência do cliente.",
      details: [
        "Demand Forecasting",
        "Customer Data Platforms",
        "E-commerce Operations",
        "Store Digitization"
      ]
    }
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="bg-secondary/30 py-20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
        <div className="container relative z-10">
          <span className="text-primary font-mono text-sm font-bold uppercase tracking-widest mb-2 block">Onde Atuamos</span>
          <h1 className="text-5xl font-display font-bold uppercase tracking-tight text-foreground mb-6">Indústrias</h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Nossa expertise é profunda em setores onde a falha não é uma opção e a complexidade é a norma. Entendemos a linguagem e os desafios específicos de cada indústria.
          </p>
        </div>
      </div>

      {/* Industries Grid */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <div key={industry.id} className="group border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg p-8 flex flex-col h-full">
                <div className="mb-6 p-4 bg-secondary/30 w-fit rounded-none group-hover:bg-primary/10 transition-colors">
                  <industry.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
                  {industry.title}
                </h3>
                <p className="text-muted-foreground mb-8 flex-grow">
                  {industry.description}
                </p>
                
                <div className="space-y-2 mb-8 border-t border-border pt-6">
                  {industry.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm font-medium">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {detail}
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full rounded-none border-foreground/20 hover:bg-foreground/5 uppercase font-bold tracking-wide mt-auto">
                  Ver Cases
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary/30 border-t border-border">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold uppercase tracking-tight mb-6">
            Não encontrou sua indústria?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Nossa metodologia é adaptável a diversos contextos complexos. Entre em contato para discutir como podemos aplicar nossa expertise ao seu setor.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-none px-10 h-16 text-lg font-display font-bold tracking-wide uppercase">
              Fale Conosco
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
