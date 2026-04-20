import { useAuth } from "@/_core/hooks/useAuth";
import { AdminNav } from "@/components/AdminNav";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useSeo } from "@/lib/seo";
import { trpc } from "@/lib/trpc";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type Tier = "client" | "active_client" | "admin";

const TIER_OPTIONS: { value: Tier; label: string }[] = [
  { value: "client", label: "Cliente (todos)" },
  { value: "active_client", label: "Cliente em operação +" },
  { value: "admin", label: "Apenas admin" },
];

const MAX_SIZE_MB = 200;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

function formatSize(bytes?: number | null) {
  if (!bytes) return "—";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  const kb = bytes / 1024;
  return `${kb.toFixed(0)} KB`;
}

export default function AdminResources() {
  useSeo({
    title: "Administração — Recursos",
    description: "Gerencie os recursos da Área do Cliente.",
    path: "/admin/resources",
  });

  const { user, loading } = useAuth({ redirectOnUnauthenticated: true });

  const utils = trpc.useUtils();
  const categoriesQuery = trpc.resources.listCategories.useQuery(undefined, {
    enabled: user?.role === "admin",
  });
  const resourcesQuery = trpc.resources.listAll.useQuery(undefined, {
    enabled: user?.role === "admin",
  });

  // Category form
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  function slugify(input: string): string {
    return input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  const createCat = trpc.resources.createCategory.useMutation({
    onSuccess: () => {
      utils.resources.listCategories.invalidate();
      setNewCatName("");
      setNewCatSlug("");
      setSlugTouched(false);
      toast.success("Categoria criada.");
    },
    onError: (e) => toast.error(e.message),
  });
  const deleteCat = trpc.resources.deleteCategory.useMutation({
    onSuccess: () => {
      utils.resources.listCategories.invalidate();
      utils.resources.listAll.invalidate();
      toast.success("Categoria excluída.");
    },
    onError: (e) => toast.error(e.message),
  });
  const moveCat = trpc.resources.moveCategory.useMutation({
    onSuccess: () => utils.resources.listCategories.invalidate(),
    onError: (e) => toast.error(e.message),
  });

  const [search, setSearch] = useState("");

  // Resource form
  const [rTitle, setRTitle] = useState("");
  const [rDesc, setRDesc] = useState("");
  const [rCategoryId, setRCategoryId] = useState<string>("none");
  const [rTier, setRTier] = useState<Tier>("client");
  const [rStarred, setRStarred] = useState(false);
  const [rGithub, setRGithub] = useState("");
  const [rFile, setRFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const requestUpload = trpc.resources.requestUpload.useMutation();
  const createResource = trpc.resources.create.useMutation({
    onSuccess: () => {
      utils.resources.listAll.invalidate();
      setRTitle("");
      setRDesc("");
      setRCategoryId("none");
      setRTier("client");
      setRStarred(false);
      setRGithub("");
      setRFile(null);
      toast.success("Recurso publicado.");
    },
    onError: (e) => toast.error(e.message),
  });
  const updateResource = trpc.resources.update.useMutation({
    onSuccess: () => {
      utils.resources.listAll.invalidate();
      toast.success("Atualizado.");
    },
    onError: (e) => toast.error(e.message),
  });
  const deleteResource = trpc.resources.delete.useMutation({
    onSuccess: () => {
      utils.resources.listAll.invalidate();
      toast.success("Recurso excluído.");
    },
    onError: (e) => toast.error(e.message),
  });

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    if (!rTitle.trim()) {
      toast.error("Informe o título.");
      return;
    }
    if (!rFile && !rGithub.trim()) {
      toast.error("Anexe um arquivo ou informe um link do GitHub.");
      return;
    }
    if (rFile && rFile.size > MAX_SIZE_BYTES) {
      toast.error(`Arquivo maior que ${MAX_SIZE_MB} MB.`);
      return;
    }

    setUploading(true);
    try {
      let storagePath: string | undefined;
      let originalFileName: string | undefined;
      let mimeType: string | undefined;
      let sizeBytes: number | undefined;

      if (rFile) {
        const up = await requestUpload.mutateAsync({
          fileName: rFile.name,
          sizeBytes: rFile.size,
        });
        const putRes = await fetch(up.signedUrl, {
          method: "PUT",
          headers: { "Content-Type": rFile.type || "application/octet-stream" },
          body: rFile,
        });
        if (!putRes.ok) {
          const detail = await putRes.text().catch(() => "");
          throw new Error(
            `Upload falhou (${putRes.status}) ${detail.slice(0, 120)}`,
          );
        }
        storagePath = up.path;
        originalFileName = rFile.name;
        mimeType = rFile.type || undefined;
        sizeBytes = rFile.size;
      }

      await createResource.mutateAsync({
        title: rTitle.trim(),
        description: rDesc.trim(),
        categoryId: rCategoryId === "none" ? null : Number(rCategoryId),
        minTier: rTier,
        starredForActive: rStarred,
        storagePath,
        originalFileName,
        mimeType,
        sizeBytes,
        githubUrl: rGithub.trim() || undefined,
      });
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Erro no upload.");
    } finally {
      setUploading(false);
    }
  }

  const categories = categoriesQuery.data ?? [];
  const allResources = resourcesQuery.data ?? [];
  const catNameById = new Map(categories.map((c) => [c.id, c.name]));
  const resources = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allResources;
    return allResources.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        (r.description ?? "").toLowerCase().includes(q) ||
        (r.originalFileName ?? "").toLowerCase().includes(q),
    );
  }, [allResources, search]);

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
            Gerencie recursos e categorias da Área do Cliente.
          </p>

          <AdminNav />

          {/* Categorias */}
          <div className="rounded-lg border border-navy/10 bg-white p-6 mb-10">
            <h2 className="text-xl text-navy mb-4">Categorias</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const name = newCatName.trim();
                const slug = (newCatSlug.trim() || slugify(name));
                if (!name) {
                  toast.error("Informe o nome da categoria.");
                  return;
                }
                if (!slug) {
                  toast.error("Nome sem caracteres válidos — ajuste ou preencha o slug.");
                  return;
                }
                createCat.mutate({ name, slug });
              }}
              className="flex flex-col sm:flex-row gap-2 mb-6"
            >
              <Input
                placeholder="Nome (ex: Metodologias)"
                value={newCatName}
                onChange={(e) => {
                  const v = e.target.value;
                  setNewCatName(v);
                  if (!slugTouched) setNewCatSlug(slugify(v));
                }}
                className="sm:flex-1"
              />
              <Input
                placeholder="slug (auto)"
                value={newCatSlug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setNewCatSlug(
                    e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
                  );
                }}
                className="sm:w-56"
              />
              <Button type="submit" disabled={createCat.isPending}>
                Adicionar
              </Button>
            </form>
            {categories.length === 0 ? (
              <p className="text-sm text-gray-500">
                Nenhuma categoria ainda.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {categories.map((c, idx) => (
                  <li
                    key={c.id}
                    className="flex items-center gap-2 border border-navy/10 rounded-md px-3 py-2 bg-cream/40"
                  >
                    <div className="flex flex-col">
                      <button
                        type="button"
                        disabled={idx === 0 || moveCat.isPending}
                        onClick={() =>
                          moveCat.mutate({ id: c.id, direction: "up" })
                        }
                        className="text-gray-500 hover:text-navy disabled:opacity-30"
                        aria-label="Mover para cima"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={
                          idx === categories.length - 1 || moveCat.isPending
                        }
                        onClick={() =>
                          moveCat.mutate({ id: c.id, direction: "down" })
                        }
                        className="text-gray-500 hover:text-navy disabled:opacity-30"
                        aria-label="Mover para baixo"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-sm text-navy flex-1">{c.name}</span>
                    <span className="text-xs text-gray-500">/{c.slug}</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Excluir a categoria "${c.name}"?`)) {
                          deleteCat.mutate({ id: c.id });
                        }
                      }}
                      className="text-xs text-red-600 hover:underline ml-1"
                    >
                      remover
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Novo recurso */}
          <div className="rounded-lg border border-navy/10 bg-white p-6 mb-10">
            <h2 className="text-xl text-navy mb-4">Publicar recurso</h2>
            <form onSubmit={handlePublish} className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="r-title">Título</Label>
                  <Input
                    id="r-title"
                    value={rTitle}
                    onChange={(e) => setRTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="r-cat">Categoria</Label>
                  <Select value={rCategoryId} onValueChange={setRCategoryId}>
                    <SelectTrigger id="r-cat">
                      <SelectValue placeholder="Sem categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sem categoria</SelectItem>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="r-desc">Descrição</Label>
                <Textarea
                  id="r-desc"
                  value={rDesc}
                  onChange={(e) => setRDesc(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="r-tier">Acesso mínimo</Label>
                  <Select
                    value={rTier}
                    onValueChange={(v) => setRTier(v as Tier)}
                  >
                    <SelectTrigger id="r-tier">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIER_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end gap-3">
                  <Switch
                    id="r-starred"
                    checked={rStarred}
                    onCheckedChange={setRStarred}
                  />
                  <Label htmlFor="r-starred" className="cursor-pointer">
                    ★ Exclusivo para cliente em operação
                  </Label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="r-file">
                    Arquivo (até {MAX_SIZE_MB} MB)
                  </Label>
                  <Input
                    id="r-file"
                    type="file"
                    onChange={(e) => setRFile(e.target.files?.[0] ?? null)}
                  />
                  {rFile && (
                    <p className="text-xs text-gray-500 mt-1">
                      {rFile.name} — {formatSize(rFile.size)}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="r-github">Link GitHub (opcional)</Label>
                  <Input
                    id="r-github"
                    type="url"
                    placeholder="https://github.com/..."
                    value={rGithub}
                    onChange={(e) => setRGithub(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={uploading || createResource.isPending}
                >
                  {uploading
                    ? "Enviando…"
                    : createResource.isPending
                      ? "Publicando…"
                      : "Publicar"}
                </Button>
              </div>
            </form>
          </div>

          {/* Lista de recursos */}
          <div className="mb-4">
            <Input
              placeholder="Buscar por título, descrição ou arquivo…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="rounded-lg border border-navy/10 bg-white overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recurso</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Acesso</TableHead>
                  <TableHead>★</TableHead>
                  <TableHead>Tamanho</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.length === 0 && !resourcesQuery.isLoading && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Nenhum recurso publicado ainda.
                    </TableCell>
                  </TableRow>
                )}
                {resources.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div className="font-medium text-navy">{r.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">
                        {r.originalFileName || r.githubUrl || "—"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {r.categoryId ? catNameById.get(r.categoryId) ?? "—" : "—"}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={r.minTier}
                        onValueChange={(v) =>
                          updateResource.mutate({
                            id: r.id,
                            minTier: v as Tier,
                          })
                        }
                      >
                        <SelectTrigger className="w-44">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {TIER_OPTIONS.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                              {o.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={r.starredForActive}
                        onCheckedChange={(checked) =>
                          updateResource.mutate({
                            id: r.id,
                            starredForActive: checked,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>{formatSize(r.sizeBytes ?? undefined)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (
                            confirm(
                              `Excluir "${r.title}"? O arquivo no Storage também será removido.`,
                            )
                          ) {
                            deleteResource.mutate({ id: r.id });
                          }
                        }}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex gap-2 flex-wrap">
            <Badge variant="outline">TTL do download: 5 min</Badge>
            <Badge variant="outline">Tamanho máx: {MAX_SIZE_MB} MB</Badge>
          </div>
        </div>
      </section>
    </Layout>
  );
}
