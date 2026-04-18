import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type Props = {
  user:
    | {
        id: number;
        email: string;
        name: string | null;
        role: "pending" | "client" | "active_client" | "admin";
      }
    | null;
  onClose: () => void;
};

type OverrideValue = "default" | "grant" | "revoke";

const TIER_LABEL: Record<string, string> = {
  client: "Cliente",
  active_client: "Em operação",
  admin: "Admin",
};

export function UserAccessDialog({ user, onClose }: Props) {
  const open = !!user;

  const allResources = trpc.resources.listAll.useQuery(undefined, {
    enabled: open,
  });
  const categories = trpc.resources.listCategories.useQuery(undefined, {
    enabled: open,
  });
  const overridesQuery = trpc.admin.listOverrides.useQuery(
    { userId: user?.id ?? 0 },
    { enabled: open && !!user },
  );
  const utils = trpc.useUtils();
  const setOverrideMut = trpc.admin.setOverride.useMutation({
    onSuccess: () => {
      if (user) {
        utils.admin.listOverrides.invalidate({ userId: user.id });
      }
    },
    onError: (e) => toast.error(e.message),
  });

  const [search, setSearch] = useState("");

  const overridesById = useMemo(() => {
    const map = new Map<number, boolean>();
    for (const o of overridesQuery.data ?? []) {
      map.set(o.resourceId, o.granted);
    }
    return map;
  }, [overridesQuery.data]);

  const catNameById = new Map(
    (categories.data ?? []).map((c) => [c.id, c.name]),
  );

  const resources = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = allResources.data ?? [];
    if (!q) return list;
    return list.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        (r.description ?? "").toLowerCase().includes(q),
    );
  }, [allResources.data, search]);

  function currentValue(resourceId: number): OverrideValue {
    const o = overridesById.get(resourceId);
    if (o === true) return "grant";
    if (o === false) return "revoke";
    return "default";
  }

  function handleChange(resourceId: number, value: OverrideValue) {
    if (!user) return;
    const granted =
      value === "grant" ? true : value === "revoke" ? false : null;
    setOverrideMut.mutate({ userId: user.id, resourceId, granted });
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            Acessos de {user?.name || user?.email || ""}
          </DialogTitle>
          <DialogDescription>
            Defina exceções por usuário. "Padrão" respeita o nível de acesso
            do recurso.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="mb-4">
            <Input
              placeholder="Buscar recurso…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {allResources.isLoading && <p>Carregando…</p>}
          {!allResources.isLoading && resources.length === 0 && (
            <p className="text-gray-500 text-sm">Nenhum recurso.</p>
          )}

          <ul className="divide-y divide-navy/5">
            {resources.map((r) => {
              const val = currentValue(r.id);
              return (
                <li
                  key={r.id}
                  className="flex items-center gap-3 py-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-navy truncate">
                        {r.title}
                      </span>
                      {r.starredForActive && (
                        <Star className="w-3.5 h-3.5 text-gold fill-gold shrink-0" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {r.categoryId ? catNameById.get(r.categoryId) ?? "—" : "—"}
                      {" · "}
                      <Badge variant="outline" className="align-middle">
                        {TIER_LABEL[r.minTier] ?? r.minTier}
                      </Badge>
                    </div>
                  </div>
                  <Select
                    value={val}
                    onValueChange={(v) =>
                      handleChange(r.id, v as OverrideValue)
                    }
                  >
                    <SelectTrigger className="w-36 shrink-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Padrão</SelectItem>
                      <SelectItem value="grant">Liberar</SelectItem>
                      <SelectItem value="revoke">Bloquear</SelectItem>
                    </SelectContent>
                  </Select>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="pt-3 border-t flex justify-end">
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
