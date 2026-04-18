import { useAuth } from "@/_core/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useState } from "react";
import { toast } from "sonner";

type Role = "pending" | "client" | "active_client" | "admin";

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "pending", label: "Pendente" },
  { value: "client", label: "Cliente" },
  { value: "active_client", label: "Cliente em operação" },
  { value: "admin", label: "Administrador" },
];

const ROLE_LABEL = Object.fromEntries(
  ROLE_OPTIONS.map((o) => [o.value, o.label]),
) as Record<Role, string>;

export default function Admin() {
  useSeo({
    title: "Administração",
    description: "Painel administrativo da collab:Z.",
    path: "/admin",
  });

  const { user, loading } = useAuth({ redirectOnUnauthenticated: true });
  const [filter, setFilter] = useState<Role | "all">("all");

  const utils = trpc.useUtils();
  const statsQuery = trpc.admin.stats.useQuery(undefined, {
    enabled: user?.role === "admin",
  });
  const listQuery = trpc.admin.listUsers.useQuery(
    { role: filter === "all" ? undefined : filter },
    { enabled: user?.role === "admin" },
  );

  const updateRoleMut = trpc.admin.updateRole.useMutation({
    onSuccess: () => {
      utils.admin.listUsers.invalidate();
      utils.admin.stats.invalidate();
      toast.success("Acesso atualizado.");
    },
    onError: (e) => toast.error(e.message),
  });
  const setActiveMut = trpc.admin.setActiveClient.useMutation({
    onSuccess: () => {
      utils.admin.listUsers.invalidate();
      toast.success("Status atualizado.");
    },
    onError: (e) => toast.error(e.message),
  });
  const deleteMut = trpc.admin.deleteUser.useMutation({
    onSuccess: () => {
      utils.admin.listUsers.invalidate();
      utils.admin.stats.invalidate();
      toast.success("Usuário excluído.");
    },
    onError: (e) => toast.error(e.message),
  });

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

  const rows = listQuery.data ?? [];
  const stats = statsQuery.data;

  return (
    <Layout>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-serif text-navy mb-2">Administração</h1>
          <p className="text-gray-600 mb-8">
            Gerencie os pedidos de acesso e os níveis dos usuários.
          </p>

          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {(Object.keys(stats) as Role[]).map((k) => (
                <div
                  key={k}
                  className="rounded-lg border border-navy/10 bg-white p-4"
                >
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    {ROLE_LABEL[k]}
                  </div>
                  <div className="text-2xl font-semibold text-navy mt-1">
                    {stats[k]}
                  </div>
                </div>
              ))}
            </div>
          )}

          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as Role | "all")}
            className="mb-6"
          >
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="client">Clientes</TabsTrigger>
              <TabsTrigger value="active_client">Em operação</TabsTrigger>
              <TabsTrigger value="admin">Admins</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="rounded-lg border border-navy/10 bg-white overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome / E-mail</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Em operação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listQuery.isLoading && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Carregando…
                    </TableCell>
                  </TableRow>
                )}
                {!listQuery.isLoading && rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      Nenhum usuário encontrado.
                    </TableCell>
                  </TableRow>
                )}
                {rows.map((u) => {
                  const isSelf = u.supabaseId === user.supabaseId;
                  return (
                    <TableRow key={u.supabaseId}>
                      <TableCell>
                        <div className="font-medium text-navy">
                          {u.name || "—"}
                          {isSelf && (
                            <Badge variant="outline" className="ml-2">
                              Você
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{u.email}</div>
                      </TableCell>
                      <TableCell>{u.company || "—"}</TableCell>
                      <TableCell>
                        <Select
                          value={u.role}
                          onValueChange={(v) =>
                            updateRoleMut.mutate({
                              supabaseId: u.supabaseId,
                              role: v as Role,
                            })
                          }
                        >
                          <SelectTrigger className="w-44">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ROLE_OPTIONS.map((o) => (
                              <SelectItem key={o.value} value={o.value}>
                                {o.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={u.isActiveClient}
                          onCheckedChange={(checked) =>
                            setActiveMut.mutate({
                              supabaseId: u.supabaseId,
                              isActiveClient: checked,
                            })
                          }
                          disabled={u.role !== "client" && u.role !== "active_client"}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={isSelf}
                          onClick={() => {
                            if (
                              confirm(
                                `Excluir definitivamente ${u.email}? Esta ação não pode ser desfeita.`,
                              )
                            ) {
                              deleteMut.mutate({ supabaseId: u.supabaseId });
                            }
                          }}
                        >
                          Excluir
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </Layout>
  );
}
