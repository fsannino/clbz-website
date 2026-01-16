import Layout from "@/components/layout/Layout";
import { CheckCircle2, Target, Award, Users, Zap, Shield } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  const values = [
    {
      icon: CheckCircle2,
      title: "Execução com Excelência",
      description: "Não acreditamos em soluções teóricas. Cada recomendação é testada na realidade operacional. Acompanhamos desde o design até a adoção, garantindo que o que foi planejado realmente funciona no dia a dia.",
      motto: "Nós não saímos até que funcione."
    },
    {
      icon: Shield,
      title: "Integridade e Transparência",
      description: "Falamos a verdade, mesmo quando é inconveniente. Se um projeto não vai funcionar, dizemos. Nossos clientes confiam em nós porque nossas recomendações são baseadas em análise rigorosa.",
      motto: "Confiança é construída com honestidade."
    },
    {
      icon: Zap,
      title: "Profundidade Técnica e Estratégica",
      description: "Nossos consultores entendem tanto a estratégia de negócio quanto a tecnologia subjacente. Não delegamos a compreensão técnica—nossos líderes sabem arquitetura, governança e dinâmica organizacional.",
      motto: "Profundidade em ambos os lados."
    },
    {
      icon: Target,
      title: "Foco em Resultados Mensuráveis",
      description: "Cada projeto tem métricas claras: redução de custo, tempo de ciclo, conformidade regulatória, capacidade de inovação. Não entregamos relatórios—entregamos valor quantificável.",
      motto: "Se não pode ser medido, não foi feito."
    },
    {
      icon: Award,
      title: "Aprendizado Contínuo",
      description: "O mundo muda rápido. Investimos em desenvolvimento contínuo da equipe, acompanhamos tendências em IA, automação, regulação e modelos operacionais.",
      motto: "Quem para de aprender, para de servir."
    },
    {
      icon: Users,
      title: "Parceria Verdadeira",
      description: "Jogamos junto com o cliente. Se o projeto atrasa ou falha, assumimos a responsabilidade. Seu sucesso é nossa única métrica.",
      motto: "Seu sucesso é nosso sucesso."
    }
  ];

  const leaders = [
    {
      name: "Fundador & CEO",
      title: "Transformação Organizacional",
      bio: "25+ anos em transformação organizacional. Anteriormente sênior em consultoria global. Especialista em modelos operacionais e governança.",
      expertise: "Engenharia + MBA"
    },
    {
      name: "COO & Partner",
      title: "Execução de Programas",
      bio: "20+ anos em execução de programas complexos. Liderança de 100+ projetos de ERP, automação e transformação.",
      expertise: "Administração + PMP"
    },
    {
      name: "CTO & Partner",
      title: "Transformação Digital",
      bio: "18+ anos em arquitetura de sistemas. Expertise em cloud, dados, IA e integração de sistemas em grandes corporações.",
      expertise: "Ciência da Computação + Especialização"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden" style={{backgroundColor: '#0B0D10'}}>
        <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-mono text-sm font-bold uppercase tracking-widest mb-4 block">Quem Somos</span>
            <h1 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tight mb-8" style={{color: '#F9FAFB'}}>
              Transformação que Funciona no Mundo Real
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl" style={{color: 'rgba(249, 250, 251, 0.8)'}}>
              A CollabZ é uma consultoria boutique enterprise especializada em transformação organizacional, execução estratégica e tecnologia aplicada para ambientes complexos e regulados.
            </p>
          </div>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-24 border-b border-border" style={{backgroundColor: '#F9FAFB'}}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Missão */}
            <div className="space-y-6">
              <div>
                <span className="text-primary font-mono text-sm font-bold uppercase tracking-widest mb-3 block">Nossa Missão</span>
                <h2 className="text-3xl font-display font-bold uppercase tracking-tight mb-6" style={{color: '#0B0D10'}}>
                  Capacitar Transformação Real
                </h2>
              </div>
              <p className="text-lg leading-relaxed" style={{color: '#0B0D10'}}>
                Capacitar organizações a navegar pela complexidade operacional, tecnológica e regulatória através de consultoria estratégica, execução disciplinada e adoção real de transformações que geram valor tangível.
              </p>
              <p className="text-base leading-relaxed" style={{color: 'rgba(11, 13, 16, 0.7)'}}>
                Entendemos que em ambientes industriais, financeiros e regulados, o PowerPoint não resolve problemas. É preciso descer ao nível da operação, compreender a tecnologia em profundidade, garantir a adoção real dos colaboradores e medir o impacto em métricas que importam.
              </p>
            </div>

            {/* Visão */}
            <div className="space-y-6">
              <div>
                <span className="text-primary font-mono text-sm font-bold uppercase tracking-widest mb-3 block">Nossa Visão</span>
                <h2 className="text-3xl font-display font-bold uppercase tracking-tight mb-6" style={{color: '#0B0D10'}}>
                  Referência em Transformação
                </h2>
              </div>
              <p className="text-lg leading-relaxed" style={{color: '#0B0D10'}}>
                Ser a consultoria de referência em transformação para empresas que operam em contextos de alta complexidade, onde a integração entre estratégia, tecnologia e operação é crítica para o sucesso.
              </p>
              <p className="text-base leading-relaxed" style={{color: 'rgba(11, 13, 16, 0.7)'}}>
                Queremos ser conhecidos não apenas por recomendações brilhantes, mas por transformações que realmente funcionam—que geram valor mensurável, que são adotadas pelos colaboradores e que sustentam-se no longo prazo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24 border-b border-border" style={{backgroundColor: '#1F2933'}}>
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-display font-bold uppercase tracking-tight mb-12" style={{color: '#F9FAFB'}}>
              Nosso Manifesto
            </h2>
            <div className="space-y-8">
              <div className="text-3xl font-light leading-tight" style={{color: '#F9FAFB'}}>
                "A estratégia sem execução é alucinação. A execução sem estratégia é pesadelo."
              </div>
              <div className="space-y-6" style={{color: 'rgba(249, 250, 251, 0.8)'}}>
                <p className="text-lg leading-relaxed">
                  Fundada por executivos que cansaram de ver projetos de consultoria terminarem em apresentações de PowerPoint que nunca saíam do papel, a CollabZ nasceu com um propósito claro: <strong>fazer acontecer</strong>.
                </p>
                <p className="text-lg leading-relaxed">
                  Acreditamos que a verdadeira transformação acontece nas trincheiras da operação, não apenas nas salas de reunião. Por isso, nossos consultores não são apenas teóricos; são engenheiros, cientistas de dados e gestores experientes que sabem como navegar a complexidade do mundo real.
                </p>
                <p className="text-lg leading-relaxed">
                  <strong>Não vendemos horas.</strong> Vendemos resultados. <strong>Não entregamos relatórios.</strong> Entregamos capacidade instalada e mudança cultural.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 border-b border-border" style={{backgroundColor: '#F9FAFB'}}>
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-mono text-sm font-bold uppercase tracking-widest mb-4 block">Nossa Cultura</span>
            <h2 className="text-4xl font-display font-bold uppercase tracking-tight" style={{color: '#0B0D10'}}>
              Valores que nos Guiam
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div 
                  key={idx} 
                  className="border p-8 transition-all hover:shadow-lg" 
                  style={{backgroundColor: '#1F2933', borderColor: 'rgba(249, 250, 251, 0.1)'}}
                >
                  <Icon className="w-10 h-10 text-primary mb-6" />
                  <h3 className="text-xl font-display font-bold uppercase mb-4" style={{color: '#F9FAFB'}}>
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{color: 'rgba(249, 250, 251, 0.8)'}}>
                    {value.description}
                  </p>
                  <p className="text-sm font-mono italic" style={{color: 'rgba(249, 250, 251, 0.6)'}}>
                    "{value.motto}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-24 border-b border-border" style={{backgroundColor: '#0B0D10'}}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-4">
              <div className="text-5xl font-display font-bold text-primary">15+</div>
              <div className="text-sm font-mono uppercase tracking-widest" style={{color: 'rgba(249, 250, 251, 0.6)'}}>Anos de Experiência</div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-display font-bold text-primary">50+</div>
              <div className="text-sm font-mono uppercase tracking-widest" style={{color: 'rgba(249, 250, 251, 0.6)'}}>Projetos Complexos</div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-display font-bold text-primary">150+</div>
              <div className="text-sm font-mono uppercase tracking-widest" style={{color: 'rgba(249, 250, 251, 0.6)'}}>Consultores</div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-display font-bold text-primary">85%</div>
              <div className="text-sm font-mono uppercase tracking-widest" style={{color: 'rgba(249, 250, 251, 0.6)'}}>Retenção de Clientes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Liderança */}
      <section className="py-24 border-b border-border" style={{backgroundColor: '#F9FAFB'}}>
        <div className="container">
          <div className="mb-20">
            <span className="text-primary font-mono text-sm font-bold uppercase tracking-widest mb-4 block">Liderança</span>
            <h2 className="text-4xl font-display font-bold uppercase tracking-tight" style={{color: '#0B0D10'}}>
              Quem Faz Acontecer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {leaders.map((leader, idx) => (
              <div key={idx} className="space-y-6">
                <div 
                  className="aspect-[3/4] border flex items-center justify-center overflow-hidden"
                  style={{backgroundColor: '#1F2933', borderColor: 'rgba(249, 250, 251, 0.1)'}}
                >
                  <Users className="w-20 h-20" style={{color: 'rgba(249, 250, 251, 0.2)'}} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold uppercase mb-2" style={{color: '#0B0D10'}}>
                    {leader.name}
                  </h3>
                  <p className="text-primary font-bold text-sm mb-4">{leader.title}</p>
                  <p className="text-base leading-relaxed mb-4" style={{color: 'rgba(11, 13, 16, 0.7)'}}>
                    {leader.bio}
                  </p>
                  <p className="text-sm font-mono" style={{color: 'rgba(11, 13, 16, 0.6)'}}>
                    {leader.expertise}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-24 border-b border-border" style={{backgroundColor: '#1F2933'}}>
        <div className="container">
          <div className="mb-20">
            <span className="text-primary font-mono text-sm font-bold uppercase tracking-widest mb-4 block">Diferencial</span>
            <h2 className="text-4xl font-display font-bold uppercase tracking-tight" style={{color: '#F9FAFB'}}>
              O Que Nos Torna Único
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold" style={{color: '#F9FAFB'}}>Modelo Advisor + Executor</h3>
              <p style={{color: 'rgba(249, 250, 251, 0.8)'}}>
                Não apenas recomendamos—executamos junto. Nossos consultores ficam no projeto do design até a adoção, garantindo que a transformação realmente acontece.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold" style={{color: '#F9FAFB'}}>Expertise em Contextos Regulados</h3>
              <p style={{color: 'rgba(249, 250, 251, 0.8)'}}>
                Entendemos compliance, governança, auditoria e risco. Não é um add-on—é parte do DNA de cada projeto.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold" style={{color: '#F9FAFB'}}>Integração Strategy-Technology-Operations</h3>
              <p style={{color: 'rgba(249, 250, 251, 0.8)'}}>
                Nossos líderes entendem os três pilares. Não há silos entre estratégia e tecnologia em nossos projetos.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold" style={{color: '#F9FAFB'}}>Equipe Multidisciplinar</h3>
              <p style={{color: 'rgba(249, 250, 251, 0.8)'}}>
                Consultores de estratégia, engenheiros, especialistas em processos, change managers, data scientists—todos integrados no mesmo projeto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{backgroundColor: '#0B0D10'}}>
        <div className="container text-center">
          <h2 className="text-4xl font-display font-bold uppercase tracking-tight mb-6" style={{color: '#F9FAFB'}}>
            Pronto para transformar sua operação?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{color: 'rgba(249, 250, 251, 0.7)'}}>
            Vamos conversar sobre como a CollabZ pode ajudar sua empresa a navegar pela complexidade e entregar resultados reais.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="text-white rounded-none px-10 h-16 text-lg font-display font-bold tracking-wide uppercase" style={{backgroundColor: '#E60000'}}>
                Agendar Conversa
              </Button>
            </Link>
            <Link href="/insights">
              <Button variant="outline" size="lg" className="rounded-none px-10 h-16 text-lg font-display font-bold tracking-wide uppercase" style={{borderColor: 'rgba(249, 250, 251, 0.2)', color: '#F9FAFB'}}>
                Conhecer Nossos Cases
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
