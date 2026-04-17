import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MessageCircle,
  Mail,
  Calendar,
  Settings,
  GraduationCap,
  Lightbulb,
  BookOpen,
  Handshake,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { CONTACT, buildWhatsAppLink } from "@shared/const";
import { useSeo } from "@/lib/seo";

const subjects = [
  "Consultoria",
  "Certificação (ScrumStudy / collab:Z)",
  "Treinamento in-company",
  "Proposta de parceria",
  "Agendamento de conversa",
  "Outro",
] as const;

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
};

export default function Contato() {
  useSeo({
    title: "Fale Conosco",
    description:
      "Conte seu desafio. Respondemos em até 24 horas úteis. WhatsApp, e-mail e agendamento disponíveis.",
    path: "/contato",
  });

  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  const sendMutation = trpc.contact.send.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setSubmitted(true);
        setForm(emptyForm);
        toast.success("Mensagem enviada! Responderemos em até 24h úteis.");
      } else {
        toast.error(
          "Não conseguimos enviar agora. Tente pelo WhatsApp ou e-mail direto.",
        );
      }
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao enviar mensagem.");
    },
  });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMutation.mutate(form);
  };

  const whatsappLink = buildWhatsAppLink(
    "Olá! Vim pelo site collab:Z e gostaria de falar sobre consultoria.",
  );
  const scheduleLink = buildWhatsAppLink(
    "Olá! Gostaria de agendar uma conversa inicial de 30 minutos com o time collab:Z.",
  );
  const mailtoLink = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    "Contato pelo site collab:Z",
  )}`;

  const channels = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      desc: CONTACT.whatsappDisplay,
      link: "Iniciar conversa →",
      href: whatsappLink,
      target: "_blank" as const,
      bg: "bg-green-100",
    },
    {
      icon: Mail,
      title: "E-mail",
      desc: CONTACT.email,
      link: "Enviar e-mail →",
      href: mailtoLink,
      bg: "bg-teal/8",
    },
    {
      icon: Calendar,
      title: "Agende uma call",
      desc: "30 minutos sem compromisso",
      link: "Solicitar horário →",
      href: scheduleLink,
      target: "_blank" as const,
      bg: "bg-gold/10",
    },
  ];

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
            <span className="mx-2">›</span> Contato
          </p>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-3">Fale Conosco</h1>
          <p className="text-lg text-white/60 max-w-xl">
            Conte-nos sobre o seu desafio. Respondemos em até 24 horas úteis.
          </p>
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
                  <p className="text-sm text-gray-medium mb-5">
                    Recebemos sua mensagem em <strong>{CONTACT.email}</strong>. Retornamos em até
                    24 horas úteis.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    className="border-teal text-teal hover:bg-teal/5 rounded-md text-sm"
                  >
                    Enviar outra mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">
                      Seu nome *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Nome completo"
                      className="w-full px-4 py-3 border border-border rounded-md text-sm bg-white focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 border border-border rounded-md text-sm bg-white focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">
                      Telefone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="(11) 98999-1358"
                      className="w-full px-4 py-3 border border-border rounded-md text-sm bg-white focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">Empresa</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder="Nome da empresa"
                      className="w-full px-4 py-3 border border-border rounded-md text-sm bg-white focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">
                      Assunto *
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-md text-sm bg-white focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all"
                    >
                      <option value="">Selecione</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">
                      Mensagem *
                    </label>
                    <textarea
                      required
                      minLength={10}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Descreva brevemente seu desafio..."
                      className="w-full px-4 py-3 border border-border rounded-md text-sm bg-white focus:border-teal focus:ring-2 focus:ring-teal/10 outline-none transition-all min-h-[120px] resize-y"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={sendMutation.isPending}
                    className="w-full bg-gold hover:bg-gold-light text-navy-dark font-semibold py-6 rounded-md justify-center disabled:opacity-60"
                  >
                    {sendMutation.isPending ? (
                      "Enviando..."
                    ) : (
                      <>
                        Enviar mensagem <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-medium text-center">
                    Ao enviar, sua mensagem será entregue em{" "}
                    <strong className="text-navy">{CONTACT.email}</strong>.
                  </p>
                </form>
              )}
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Channels */}
              <div className="bg-muted rounded-xl p-7">
                <h3 className="font-display text-lg text-navy mb-5">Canais diretos</h3>
                <div className="space-y-5">
                  {channels.map((ch) => (
                    <a
                      key={ch.title}
                      href={ch.href}
                      target={ch.target}
                      rel={ch.target === "_blank" ? "noopener noreferrer" : undefined}
                      className="flex gap-3.5 items-start group"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg ${ch.bg} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}
                      >
                        <ch.icon className="w-5 h-5 text-navy" />
                      </div>
                      <div>
                        <strong className="text-navy text-sm">{ch.title}</strong>
                        <p className="text-xs text-gray-medium mt-0.5">{ch.desc}</p>
                        <span className="text-xs font-semibold text-teal group-hover:text-navy transition-colors">
                          {ch.link}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick nav */}
              <div
                className="rounded-xl p-7 text-white"
                style={{ background: "linear-gradient(135deg, #0B3D5C, #1A6E8E)" }}
              >
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
