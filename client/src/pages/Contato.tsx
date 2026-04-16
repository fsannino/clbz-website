import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Mail, Calendar, Settings, GraduationCap, Lightbulb, BookOpen, Handshake } from "lucide-react";
import { useState } from "react";

export default function Contato() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <div className="pt-32 pb-16 relative" style={{ background: "linear-gradient(135deg, #0B3D5C, #072A40)" }}>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-teal to-gold" />
        <div className="container relative z-10">
          <p className="text-xs text-white/40 mb-4"><Link href="/" className="hover:text-gold cursor-pointer">Home</Link> <span className="mx-2">›</span> Contato</p>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-3">Fale Conosco</h1>
          <p className="text-lg text-white/60 max-w-xl">Conte-nos sobre o seu desafio. Respondemos em até 24 horas úteis.</p>
        </div>
      </div>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Form */}
            <div>
              <p className="section-tag">Como podemos ajudar?</p>
              <h2 className="section-title">Envie sua mensagem</h2>

              {submitted ? (
                <div className="bg-teal/5 border border-teal/20 rounded-lg p-8 text-center mt-6">
                  <div className="text-4xl mb-3">✓</div>
                  <h3 className="font-display text-xl text-navy mb-2">Mensagem enviada!</h3>
                  <p className="text-sm text-gray-medium">Entraremos em contato em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">Seu nome *</label>
                    <input type="text" required placeholder="Nome completo" className="w-full px-4 py-3 border border-border rounded-md text-sm bg-white focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">E-mail *</label>
                    <input type="email" required placeholder="seu@email.com" className="w-full px-4 py-3 border border-border rounded-md text-sm bg-white focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">Telefone / WhatsApp</label>
                    <input type="tel" placeholder="(11) 99999-9999" className="w-full px-4 py-3 border border-border rounded-md text-sm bg-white focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">Empresa</label>
                    <input type="text" placeholder="Nome da empresa" className="w-full px-4 py-3 border border-border rounded-md text-sm bg-white focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">Assunto *</label>
                    <select required className="w-full px-4 py-3 border border-border rounded-md text-sm bg-white focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all">
                      <option value="">Selecione</option>
                      <option>Consultoria</option>
                      <option>Certificação (LaMarsh / ScrumStudy)</option>
                      <option>Treinamento in-company</option>
                      <option>Proposta de parceria</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">Mensagem *</label>
                    <textarea required placeholder="Descreva brevemente seu desafio..." className="w-full px-4 py-3 border border-border rounded-md text-sm bg-white focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all min-h-[120px] resize-y" />
                  </div>
                  <Button type="submit" className="w-full bg-gold hover:bg-gold-light text-navy-dark font-semibold py-6 rounded-md justify-center">
                    Enviar mensagem <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </form>
              )}
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Channels */}
              <div className="bg-muted rounded-xl p-7">
                <h3 className="font-display text-lg text-navy mb-5">Canais diretos</h3>
                <div className="space-y-5">
                  {[
                    { icon: MessageCircle, title: "WhatsApp", desc: "Converse diretamente conosco", link: "Iniciar conversa →", bg: "bg-green-100" },
                    { icon: Mail, title: "E-mail", desc: "contato@clbz.com.br", bg: "bg-teal/8" },
                    { icon: Calendar, title: "Agende uma call", desc: "30 minutos sem compromisso", link: "Agendar no Calendly →", bg: "bg-gold/10" },
                  ].map((ch) => (
                    <div key={ch.title} className="flex gap-3.5 items-start">
                      <div className={`w-10 h-10 rounded-lg ${ch.bg} flex items-center justify-center shrink-0`}>
                        <ch.icon className="w-5 h-5 text-navy" />
                      </div>
                      <div>
                        <strong className="text-navy text-sm">{ch.title}</strong>
                        <p className="text-xs text-gray-medium mt-0.5">{ch.desc}</p>
                        {ch.link && <span className="text-xs font-semibold text-teal cursor-pointer">{ch.link}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick nav */}
              <div className="rounded-xl p-7 text-white" style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}>
                <h3 className="font-display text-lg mb-3">Navegação rápida</h3>
                <p className="text-sm text-white/60 mb-5">Explore nossos conteúdos:</p>
                <div className="space-y-2">
                  {[
                    { icon: Settings, label: "Serviços de consultoria", href: "/servicos" },
                    { icon: GraduationCap, label: "Educação e certificação", href: "/educacao" },
                    { icon: Lightbulb, label: "Nossa metodologia", href: "/metodologia" },
                    { icon: BookOpen, label: "Recursos gratuitos", href: "/insights" },
                    { icon: Handshake, label: "Parcerias internacionais", href: "/parcerias" },
                  ].map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div className="flex items-center gap-3 bg-white/8 px-4 py-3 rounded-lg cursor-pointer hover:bg-white/12 transition-colors">
                        <item.icon className="w-4 h-4 text-gold" />
                        <span className="text-sm">{item.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
