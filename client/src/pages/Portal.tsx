import { useAuth } from "@/_core/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { LOGIN_PATH } from "@/const";
import { useSeo } from "@/lib/seo";
import { Link } from "wouter";

const ROLE_LABEL: Record<string, string> = {
  pending: "Em análise",
  client: "Cliente",
  active_client: "Cliente em operação",
  admin: "Administrador",
};

export default function Portal() {
  useSeo({
    title: "Portal do Cliente",
    description: "Área exclusiva da collab:Z para clientes.",
    path: "/portal",
  });

  const { user, loading, logout } = useAuth({ redirectOnUnauthenticated: true });

  if (loading || !user) {
    return (
      <Layout>
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="text-gray-700">Carregando…</p>
          </div>
        </section>
      </Layout>
    );
  }

  const role = user.role;
  const name = user.name || user.email;
  const label = ROLE_LABEL[role] ?? role;

  return (
    <Layout>
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-serif text-navy mb-1">
                Bem-vindo, {name}
              </h1>
              <p className="text-sm text-gray-600">
                Nível de acesso:{" "}
                <span className="text-navy font-semibold">{label}</span>
              </p>
            </div>
            <Button variant="outline" onClick={() => logout()}>
              Sair
            </Button>
          </div>

          {role === "pending" && (
            <div className="rounded-lg border border-navy/10 bg-cream/60 p-6">
              <h2 className="text-xl text-navy mb-2">Seu acesso está em análise</h2>
              <p className="text-gray-700">
                Recebemos seu pedido. Um administrador revisará manualmente e
                liberará o acesso em breve. Você receberá um aviso por e-mail.
              </p>
              <p className="text-gray-700 mt-4">
                Enquanto isso, continue acompanhando nossos{" "}
                <Link href="/insights" className="text-navy underline">
                  Insights
                </Link>
                .
              </p>
            </div>
          )}

          {(role === "client" || role === "active_client") && (
            <div className="rounded-lg border border-navy/10 bg-white p-6">
              <h2 className="text-xl text-navy mb-2">Materiais exclusivos</h2>
              <p className="text-gray-700">
                Em breve você verá aqui a biblioteca de materiais da collab:Z —
                PDFs, metodologias, ferramentas e códigos disponibilizados pela
                parceria.
              </p>
              {role === "active_client" && (
                <p className="text-gray-700 mt-3">
                  Como cliente em operação, você também poderá acessar os
                  recursos marcados com{" "}
                  <span aria-label="estrela">★</span>.
                </p>
              )}
            </div>
          )}

          {role === "admin" && (
            <div className="rounded-lg border border-gold/40 bg-white p-6">
              <h2 className="text-xl text-navy mb-2">Acesso administrativo</h2>
              <p className="text-gray-700 mb-4">
                O painel administrativo (gerenciar pedidos, usuários e recursos)
                será liberado na próxima fase.
              </p>
              <Button asChild variant="outline">
                <a href={LOGIN_PATH}>Voltar ao login</a>
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
