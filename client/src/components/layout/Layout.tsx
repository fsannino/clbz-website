import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const navItems = [
    { label: "Sobre", href: "/sobre" },
    { label: "Serviços", href: "/servicos" },
    { label: "Metodologia", href: "/metodologia" },
    { label: "Educação", href: "/educacao" },
    { label: "Insights", href: "/insights" },
    { label: "Parcerias", href: "/parcerias" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm py-2"
            : "bg-white/90 backdrop-blur-sm border-b border-transparent py-3"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-1 cursor-pointer group">
              {/* 4-Square Icon */}
              <svg width="32" height="32" viewBox="0 0 32 32" className="mr-2">
                <rect x="1" y="1" width="13" height="13" rx="1.5" fill="#0B3D5C" />
                <rect x="17" y="1" width="13" height="13" rx="1.5" fill="#1A6E8E" />
                <rect x="1" y="17" width="13" height="13" rx="1.5" fill="#F7A823" />
                <rect x="17" y="17" width="13" height="13" rx="1.5" fill="#94A3B8" />
              </svg>
              <div>
                <span className="font-sans font-extrabold text-xl tracking-tight text-navy">
                  collab<span className="text-gold">:</span>Z
                </span>
                <span className="block text-[8px] font-medium tracking-[0.2em] uppercase text-gray-medium -mt-1">
                  innovation & strategy
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-[13px] font-medium transition-colors cursor-pointer relative pb-1 ${
                    location === item.href
                      ? "text-navy font-semibold"
                      : "text-gray-medium hover:text-navy"
                  }`}
                >
                  {item.label}
                  {location === item.href && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" />
                  )}
                </span>
              </Link>
            ))}
            <Link href="/contato">
              <Button className="bg-navy hover:bg-teal text-white text-[13px] font-semibold px-5 py-2 rounded-md transition-all">
                Fale Conosco
              </Button>
            </Link>
          </nav>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white p-0">
              <div className="flex flex-col h-full">
                <div className="p-5 border-b border-border">
                  <div className="flex items-center gap-2">
                    <svg width="28" height="28" viewBox="0 0 32 32">
                      <rect x="1" y="1" width="13" height="13" rx="1.5" fill="#0B3D5C" />
                      <rect x="17" y="1" width="13" height="13" rx="1.5" fill="#1A6E8E" />
                      <rect x="1" y="17" width="13" height="13" rx="1.5" fill="#F7A823" />
                      <rect x="17" y="17" width="13" height="13" rx="1.5" fill="#94A3B8" />
                    </svg>
                    <span className="font-sans font-extrabold text-lg text-navy">
                      collab<span className="text-gold">:</span>Z
                    </span>
                  </div>
                </div>
                <nav className="flex-1 py-4 px-5 flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div className={`py-3 px-3 rounded-md cursor-pointer transition-colors ${
                        location === item.href
                          ? "bg-cream text-navy font-semibold"
                          : "text-gray-medium hover:bg-cream/50 hover:text-navy"
                      }`}>
                        {item.label}
                      </div>
                    </Link>
                  ))}
                  <div className="pt-4 mt-2 border-t border-border">
                    <Link href="/contato">
                      <Button className="w-full bg-navy hover:bg-teal text-white rounded-md">
                        Fale Conosco
                      </Button>
                    </Link>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-navy-dark text-white/70 pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg width="28" height="28" viewBox="0 0 32 32">
                  <rect x="1" y="1" width="13" height="13" rx="1.5" fill="#F7A823" />
                  <rect x="17" y="1" width="13" height="13" rx="1.5" fill="#1A6E8E" />
                  <rect x="1" y="17" width="13" height="13" rx="1.5" fill="#1A6E8E" />
                  <rect x="17" y="17" width="13" height="13" rx="1.5" fill="#94A3B8" />
                </svg>
                <span className="font-sans font-extrabold text-lg text-white">
                  collab<span className="text-gold">:</span>Z
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                Consultoria em transformação organizacional, gestão de mudanças e educação corporativa. Metodologias customizadas para cada cliente. Parceira ScrumStudy para certificações ágeis.
              </p>
            </div>

            {/* Empresa */}
            <div>
              <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Empresa</h4>
              <ul className="space-y-2.5">
                <li><Link href="/sobre" className="text-sm hover:text-gold transition-colors cursor-pointer">Sobre nós</Link></li>
                <li><Link href="/metodologia" className="text-sm hover:text-gold transition-colors cursor-pointer">Metodologia</Link></li>
                <li><Link href="/parcerias" className="text-sm hover:text-gold transition-colors cursor-pointer">Parcerias</Link></li>
                <li><Link href="/insights" className="text-sm hover:text-gold transition-colors cursor-pointer">Insights</Link></li>
                <li><Link href="/contato" className="text-sm hover:text-gold transition-colors cursor-pointer">Contato</Link></li>
              </ul>
            </div>

            {/* Serviços */}
            <div>
              <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Serviços</h4>
              <ul className="space-y-2.5">
                <li><Link href="/servicos" className="text-sm hover:text-gold transition-colors cursor-pointer">Gestão de Mudanças</Link></li>
                <li><Link href="/servicos" className="text-sm hover:text-gold transition-colors cursor-pointer">Gestão de Projetos</Link></li>
                <li><Link href="/servicos" className="text-sm hover:text-gold transition-colors cursor-pointer">Governança</Link></li>
                <li><Link href="/servicos" className="text-sm hover:text-gold transition-colors cursor-pointer">Gamificação</Link></li>
              </ul>
            </div>

            {/* Educação */}
            <div>
              <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Educação</h4>
              <ul className="space-y-2.5">
                <li><Link href="/educacao" className="text-sm hover:text-gold transition-colors cursor-pointer">Certificação LaMarsh</Link></li>
                <li><Link href="/educacao" className="text-sm hover:text-gold transition-colors cursor-pointer">ScrumStudy</Link></li>
                <li><Link href="/educacao" className="text-sm hover:text-gold transition-colors cursor-pointer">Treinamentos collab:Z</Link></li>
                <li><Link href="/educacao" className="text-sm hover:text-gold transition-colors cursor-pointer">Calendário</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
            <span>© 2026 collab:Z — Collaborazione Assessoria. Todos os direitos reservados.</span>
            <span className="text-white/40">Parceiro: ScrumStudy (ATP)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
