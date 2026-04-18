import { useAuth } from "@/_core/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/lib/seo";
import { trpc } from "@/lib/trpc";
import { CONTACT } from "@shared/const";
import { Download, Github, Star } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

const ROLE_LABEL: Record<string, string> = {
  pending: "Em análise",
  client: "Cliente",
  active_client: "Cliente em operação",
  admin: "Administrador",
};

function formatSize(bytes?: number | null) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  const kb = bytes / 1024;
  return `${kb.toFixed(0)} KB`;
}

export default function Portal() {
  useSeo({
    title: "Portal do Cliente",
    description: "Área exclusiva da collab:Z para clientes.",
    path: "/portal",
  });

  const { user, loading, logout } = useAuth({ redirectOnUnauthenticated: true });

  const canSeeResources =
    !!user && (user.role === "client" || user.role === "active_client" || user.role === "admin");

  const resourcesQuery = trpc.resources.listVisible.useQuery(undefined, {
    enabled: canSeeResources,
  });
  const categoriesQuery = trpc.resources.listCategories.useQuery(undefined, {
    enabled: canSeeResources,
  });
  const downloadMut = trpc.resources.getDownloadUrl.useMutation();

  async function handleDownload(resourceId: number) {
    try {
      const res = await downloadMut.mutateAsync({ id: resourceId });
      window.open(res.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Falha no download.";
      toast.error(msg);
    }
  }

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
  const resources = resourcesQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];
  const catNameById = new Map(categories.map((c) => [c.id, c.name]));

  const grouped = new Map<string, typeof resources>();
  for (const r of resources) {
    const key = r.categoryId ? catNameById.get(r.categoryId) ?? "Outros" : "Outros";
    const arr = grouped.get(key) ?? [];
    arr.push(r);
    grouped.set(key, arr);
  }

  return (
    <Layout>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
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

          {role === "admin" && (
            <div className="rounded-lg border border-gold/40 bg-white p-6 mb-8">
              <h2 className="text-xl text-navy mb-2">Acesso administrativo</h2>
              <p className="text-gray-700 mb-4">
                Gerencie usuários, categorias e recursos da área do cliente.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button asChild>
                  <Link href="/admin">Usuários</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/admin/resources">Recursos</Link>
                </Button>
              </div>
            </div>
          )}

          {role === "pending" && (
            <div className="rounded-lg border border-navy/10 bg-cream/60 p-6">
              <h2 className="text-xl text-navy mb-2">Seu acesso está em análise</h2>
              <p className="text-gray-700">
                Recebemos seu pedido. Um administrador revisará manualmente e
                liberará o acesso em breve.
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

          {canSeeResources && (
            <div>
              <h2 className="text-2xl font-serif text-navy mb-4">
                Materiais exclusivos
              </h2>

              {resourcesQuery.isLoading && (
                <p className="text-gray-600">Carregando recursos…</p>
              )}

              {!resourcesQuery.isLoading && resources.length === 0 && (
                <p className="text-gray-600">
                  Nenhum recurso disponível no momento.
                </p>
              )}

              {Array.from(grouped.entries()).map(([catName, items]) => (
                <div key={catName} className="mb-8">
                  <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500 mb-3">
                    {catName}
                  </h3>
                  <ul className="grid gap-3 md:grid-cols-2">
                    {items.map((r) => {
                      const locked =
                        r.starredForActive && role === "client";
                      return (
                        <li
                          key={r.id}
                          className="rounded-lg border border-navy/10 bg-white p-4"
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-navy font-semibold">
                                  {r.title}
                                </h4>
                                {r.starredForActive && (
                                  <Star
                                    className="w-4 h-4 text-gold fill-gold"
                                    aria-label="Exclusivo cliente em operação"
                                  />
                                )}
                              </div>
                              {r.description && (
                                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                                  {r.description}
                                </p>
                              )}
                            </div>
                            {r.sizeBytes && (
                              <Badge variant="outline" className="shrink-0">
                                {formatSize(r.sizeBytes)}
                              </Badge>
                            )}
                          </div>

                          {locked ? (
                            <div className="mt-3 text-sm text-gray-600 border-t border-navy/5 pt-3">
                              Acesso exclusivo para cliente em operação. Entre
                              em contato pelo{" "}
                              <a
                                href={`mailto:${CONTACT.email}?subject=Solicitação de acesso — ${encodeURIComponent(
                                  r.title,
                                )}`}
                                className="text-navy underline"
                              >
                                {CONTACT.email}
                              </a>
                              .
                            </div>
                          ) : (
                            <div className="mt-3 flex gap-2 flex-wrap">
                              {(r.storagePath || r.githubUrl) && (
                                <Button
                                  size="sm"
                                  onClick={() => handleDownload(r.id)}
                                  disabled={downloadMut.isPending}
                                >
                                  {r.githubUrl && !r.storagePath ? (
                                    <>
                                      <Github className="w-4 h-4 mr-1" />
                                      Abrir no GitHub
                                    </>
                                  ) : (
                                    <>
                                      <Download className="w-4 h-4 mr-1" />
                                      Baixar
                                    </>
                                  )}
                                </Button>
                              )}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
