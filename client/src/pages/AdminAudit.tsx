import { useAuth } from "@/_core/hooks/useAuth";
import { AdminNav } from "@/components/AdminNav";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSeo } from "@/lib/seo";
import { trpc } from "@/lib/trpc";
import { useMemo, useState } from "react";

const ACTION_FILTERS = [
  { value: "all", label: "Todas" },
  { value: "resource.download", label: "Downloads" },
  { value: "resource.create", label: "Recursos criados" },
  { value: "resource.update", label: "Recursos atualizados" },
  { value: "resource.delete", label: "Recursos excluídos" },
  { value: "user.role.change", label: "Mudança de nível" },
  { value: "user.active.change", label: "Toggle em operação" },
  { value: "user.delete", label: "Usuários excluídos" },
  { value: "override.set", label: "Overrides" },
  { value: "account.self_delete", label: "Auto-exclusão" },
  { value: "consent.accept", label: "Consentimento" },
  { value: "category.create", label: "Categorias criadas" },
  { value: "category.update", label: "Categorias atualizadas" },
  { value: "category.delete", label: "Categorias excluídas" },
  { value: "category.move", label: "Categorias movidas" },
];

function formatDateTime(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
  });
}

export default function AdminAudit() {
  useSeo({
    title: "Administração — Auditoria",
    description: "Log de atividades do painel administrativo.",
    path: "/admin/audit",
  });

  const { user, loading } = useAuth({ redirectOnUnauthenticated: true });
  const [action, setAction] = useState<string>("all");
  const [search, setSearch] = useState("");

  const auditQuery = trpc.admin.listAudit.useQuery(
    { action: action === "all" ? undefined : action, limit: 500 },
    { enabled: user?.role === "admin" },
  );
  const usersQuery = trpc.admin.listUsers.useQuery(
    { limit: 200 },
    { enabled: user?.role === "admin" },
  );

  const userLabelById = useMemo(() => {
    const m = new Map<number, string>();
    for (const u of usersQuery.data ?? []) {
      m.set(u.id, u.name || u.email);
    }
    return m;
  }, [usersQuery.data]);

  const rows = useMemo(() => {
    const list = auditQuery.data ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter((r) => {
      const actorLabel = r.actorId
        ? (userLabelById.get(r.actorId) ?? "").toLowerCase()
        : "";
      const meta = JSON.stringify(r.metadata ?? {}).toLowerCase();
      return (
        r.action.toLowerCase().includes(q) ||
        actorLabel.includes(q) ||
        meta.includes(q)
      );
    });
  }, [auditQuery.data, search, userLabelById]);

  if (loading) {
    return (
      <Layout>
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-gray-700">Carregando…</p>
          </div>
        </section>
      </Layout>
    );
  }
  if (!user || user.role !== "admin") {
    return (
      <Layout>
        <section className="py-20">
          <div className="max-w-xl mx-auto px-6 text-center">
            <h1 className="text-2xl font-serif text-navy mb-2">
              Acesso restrito
            </h1>
            <p className="text-gray-700">
              Esta página é exclusiva para administradores.
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-serif text-navy mb-2">Administração</h1>
          <p className="text-gray-600 mb-6">
            Auditoria — últimas {rows.length} atividades registradas.
          </p>

          <AdminNav />

          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger className="w-full md:w-72">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ACTION_FILTERS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Buscar por ator, ação ou metadados…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="md:flex-1"
            />
          </div>

          <div className="rounded-lg border border-navy/10 bg-white overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quando</TableHead>
                  <TableHead>Quem</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Alvo</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Detalhes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditQuery.isLoading && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Carregando…
                    </TableCell>
                  </TableRow>
                )}
                {!auditQuery.isLoading && rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Nenhum evento.
                    </TableCell>
                  </TableRow>
                )}
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="whitespace-nowrap text-xs text-gray-600">
                      {formatDateTime(r.createdAt)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {r.actorId
                        ? (userLabelById.get(r.actorId) ?? `#${r.actorId}`)
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {r.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {r.targetType
                        ? `${r.targetType}${r.targetId ? ` #${r.targetId}` : ""}`
                        : "—"}
                    </TableCell>
                    <TableCell className="text-xs text-gray-600">
                      {r.ip ?? "—"}
                    </TableCell>
                    <TableCell className="text-xs text-gray-600 max-w-xs">
                      {r.metadata ? (
                        <code className="font-mono text-[11px] break-all">
                          {JSON.stringify(r.metadata)}
                        </code>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </Layout>
  );
}
