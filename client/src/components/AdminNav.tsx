import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/admin", label: "Usuários" },
  { href: "/admin/resources", label: "Recursos" },
];

export function AdminNav() {
  const [loc] = useLocation();
  return (
    <nav className="flex gap-2 border-b border-navy/10 mb-8">
      {tabs.map((t) => {
        const active = loc === t.href;
        return (
          <Link key={t.href} href={t.href}>
            <span
              className={cn(
                "px-4 py-2 text-sm cursor-pointer border-b-2 -mb-px transition-colors",
                active
                  ? "border-gold text-navy font-semibold"
                  : "border-transparent text-gray-500 hover:text-navy",
              )}
            >
              {t.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
