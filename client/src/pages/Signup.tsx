import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { LOGIN_PATH } from "@/const";
import { supabase } from "@/lib/supabase";
import { useSeo } from "@/lib/seo";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Signup() {
  useSeo({
    title: "Solicitar acesso",
    description: "Solicite acesso à Área do Cliente collab:Z.",
    path: "/signup",
  });

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const notifyMutation = trpc.accessRequest.notify.useMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
            company: company.trim(),
          },
          emailRedirectTo: `${window.location.origin}${LOGIN_PATH}`,
        },
      });
      if (error) {
        toast.error(error.message || "Não foi possível cadastrar.");
        return;
      }
      try {
        await notifyMutation.mutateAsync({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
        });
      } catch (err) {
        console.warn("[Signup] admin notification failed:", err);
      }
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <Layout>
        <section className="py-20">
          <div className="max-w-md mx-auto px-6">
            <h1 className="text-3xl font-serif text-navy mb-4">
              Cadastro recebido
            </h1>
            <p className="text-gray-700 mb-4">
              Enviamos um e-mail de confirmação para <strong>{email}</strong>.
              Confirme seu endereço e depois faça login.
            </p>
            <p className="text-gray-700 mb-6">
              Seu pedido de acesso será revisado manualmente — você receberá um
              aviso assim que for aprovado.
            </p>
            <Button asChild>
              <Link href={LOGIN_PATH}>Ir para o login</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20">
        <div className="max-w-md mx-auto px-6">
          <h1 className="text-3xl font-serif text-navy mb-2">
            Solicitar acesso
          </h1>
          <p className="text-gray-700 mb-8">
            Cadastre-se para acessar a Área do Cliente. A aprovação é manual.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm mb-1 text-navy">
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-navy/20 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm mb-1 text-navy">
                Empresa
              </label>
              <input
                id="company"
                type="text"
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full border border-navy/20 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm mb-1 text-navy">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-navy/20 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm mb-1 text-navy"
              >
                Senha (mínimo 8 caracteres)
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-navy/20 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Enviando…" : "Solicitar acesso"}
            </Button>
          </form>

          <p className="text-sm text-gray-700 mt-6">
            Já tem cadastro?{" "}
            <Link href={LOGIN_PATH} className="text-navy underline">
              Entrar
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
