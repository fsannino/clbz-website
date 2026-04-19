import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SIGNUP_PATH } from "@/const";
import { supabase } from "@/lib/supabase";
import { useSeo } from "@/lib/seo";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Login() {
  useSeo({
    title: "Entrar",
    description: "Acesse a Área do Cliente collab:Z.",
    path: "/login",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) {
        toast.error(error.message || "Não foi possível entrar.");
        setLoading(false);
        return;
      }
      window.location.href = "/portal";
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao entrar.");
      setLoading(false);
    }
  }

  return (
    <Layout>
      <section className="py-20">
        <div className="max-w-md mx-auto px-6">
          <h1 className="text-3xl font-serif text-navy mb-2">Entrar</h1>
          <p className="text-gray-700 mb-8">
            Acesse a Área do Cliente.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <label htmlFor="password" className="block text-sm mb-1 text-navy">
                Senha
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-navy/20 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Entrando…" : "Entrar"}
            </Button>
          </form>

          <p className="text-sm text-gray-700 mt-6">
            Ainda não tem acesso?{" "}
            <Link href={SIGNUP_PATH} className="text-navy underline">
              Solicitar cadastro
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
