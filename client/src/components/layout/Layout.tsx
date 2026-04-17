import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { buildWhatsAppLink } from "@shared/const";

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
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="skip-link focus:outline-none focus:ring-2 focus:ring-gold"
      >
        Pular para o conteúdo
      </a>
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
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href={buildWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

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
