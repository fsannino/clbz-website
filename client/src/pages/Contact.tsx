import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/layout/Layout";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      // Reset form logic would go here
    }, 1500);
  };

  return (
    <Layout>
      {/* Header */}
      <div className="bg-secondary/30 py-20 border-b border-border">
        <div className="container">
          <span className="text-primary font-mono text-sm font-bold uppercase tracking-widest mb-2 block">Fale Conosco</span>
          <h1 className="text-5xl font-display font-bold uppercase tracking-tight text-foreground">Contato</h1>
        </div>
      </div>

      <div className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-6">Informações de Contato</h2>
              <p className="text-muted-foreground mb-8">
                Estamos prontos para discutir seus desafios mais complexos. Entre em contato com nossa equipe de especialistas.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase text-sm mb-1">Escritório Principal</h3>
                    <p className="text-muted-foreground text-sm">
                      Av. Paulista, 1000 - Bela Vista<br />
                      São Paulo - SP, 01310-100<br />
                      Brasil
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase text-sm mb-1">E-mail</h3>
                    <p className="text-muted-foreground text-sm">
                      contato@clbz.com.br<br />
                      comercial@clbz.com.br
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase text-sm mb-1">Telefone</h3>
                    <p className="text-muted-foreground text-sm">
                      +55 11 9999-9999
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-secondary/20 border border-border">
              <h3 className="font-display font-bold uppercase text-lg mb-2">Suporte ao Cliente</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Já é cliente CLBZ e precisa de suporte técnico ou operacional?
              </p>
              <Button variant="outline" className="w-full border-foreground/20 hover:bg-foreground/5">
                Acessar Portal do Cliente
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-8 bg-background p-8 border border-border shadow-sm">
              <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-6">Envie uma mensagem</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-bold uppercase tracking-wide">Nome *</label>
                  <Input id="firstName" required placeholder="Seu nome" className="rounded-none h-12 bg-secondary/10 border-border focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-bold uppercase tracking-wide">Sobrenome *</label>
                  <Input id="lastName" required placeholder="Seu sobrenome" className="rounded-none h-12 bg-secondary/10 border-border focus:border-primary" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold uppercase tracking-wide">E-mail Corporativo *</label>
                  <Input id="email" type="email" required placeholder="nome@empresa.com" className="rounded-none h-12 bg-secondary/10 border-border focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-bold uppercase tracking-wide">Telefone</label>
                  <Input id="phone" type="tel" placeholder="+55 (11) 99999-9999" className="rounded-none h-12 bg-secondary/10 border-border focus:border-primary" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-bold uppercase tracking-wide">Empresa *</label>
                  <Input id="company" required placeholder="Nome da sua empresa" className="rounded-none h-12 bg-secondary/10 border-border focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-bold uppercase tracking-wide">Assunto *</label>
                  <Select required>
                    <SelectTrigger className="rounded-none h-12 bg-secondary/10 border-border focus:border-primary">
                      <SelectValue placeholder="Selecione um assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comercial">Proposta Comercial</SelectItem>
                      <SelectItem value="parceria">Parceria</SelectItem>
                      <SelectItem value="imprensa">Imprensa</SelectItem>
                      <SelectItem value="carreiras">Carreiras</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold uppercase tracking-wide">Mensagem *</label>
                <Textarea id="message" required placeholder="Como podemos ajudar?" className="rounded-none min-h-[150px] bg-secondary/10 border-border focus:border-primary resize-y" />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Checkbox id="privacy" required className="mt-1 rounded-none data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                <label htmlFor="privacy" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                  Concordo com a <a href="/privacy" className="underline hover:text-primary">Política de Privacidade</a> e autorizo o contato da CLBZ para fins comerciais.
                </label>
              </div>

              <Button type="submit" disabled={isSubmitting} size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white rounded-none px-10 h-14 text-lg font-display font-bold tracking-wide uppercase">
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
