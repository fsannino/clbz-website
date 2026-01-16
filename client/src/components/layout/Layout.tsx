import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Search, Globe, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Soluções", href: "/solutions" },
    { label: "Indústrias", href: "/industries" },
    { label: "Insights", href: "/insights" },
    { label: "Sobre", href: "/about" },
    { label: "Contato", href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Top Bar */}
      <div className="bg-secondary/30 text-xs py-2 border-b border-border hidden md:block">
        <div className="container flex justify-end items-center gap-6 text-muted-foreground font-mono">
          <Link href="/careers" className="hover:text-primary transition-colors">CARREIRAS</Link>
          <Link href="/investors" className="hover:text-primary transition-colors">INVESTIDORES</Link>
          <div className="flex items-center gap-2 cursor-pointer hover:text-foreground">
            <Globe className="w-3 h-3" />
            <span>BRASIL (PT)</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header 
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur border-border py-2" : "bg-background border-transparent py-4"
        }`}
      >
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-10 h-10 bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg tracking-tighter group-hover:bg-primary/90 transition-colors">
                CB
              </div>
              <span className="font-display font-bold text-2xl tracking-tight hidden sm:block">
                CollabZ
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={`text-sm font-medium uppercase tracking-wider hover:text-primary transition-colors cursor-pointer ${
                  location === item.href ? "text-primary font-bold" : "text-foreground"
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <Search className="w-5 h-5" />
            </Button>
          </nav>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background border-l border-border p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm">CB</div>
                    <span className="font-display font-bold text-xl">CollabZ</span>
                  </div>
                </div>
                <nav className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-6">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div className="flex items-center justify-between group cursor-pointer">
                        <span className="text-lg font-medium uppercase tracking-wider group-hover:text-primary transition-colors">
                          {item.label}
                        </span>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-border my-4 pt-6 flex flex-col gap-4">
                    <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">Carreiras</Link>
                    <Link href="/investors" className="text-sm text-muted-foreground hover:text-foreground">Investidores</Link>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary/20 border-t border-border pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm">CB</div>
                <span className="font-display font-bold text-xl">CollabZ</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Transformação organizacional, execução estratégica e tecnologia aplicada para ambientes complexos e regulados.
              </p>
            </div>
            
            <div>
              <h4 className="font-display font-bold text-lg mb-6 uppercase tracking-wider">Soluções</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/solutions/strategy" className="hover:text-primary transition-colors">Strategy & Transformation</Link></li>
                <li><Link href="/solutions/digital" className="hover:text-primary transition-colors">Digital, Data & AI</Link></li>
                <li><Link href="/solutions/pmo" className="hover:text-primary transition-colors">PMO & Execution</Link></li>
                <li><Link href="/solutions/change" className="hover:text-primary transition-colors">Change Management</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg mb-6 uppercase tracking-wider">Empresa</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Carreiras</Link></li>
                <li><Link href="/insights" className="hover:text-primary transition-colors">Insights</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contato</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg mb-6 uppercase tracking-wider">Contato</h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-mono">
                <li>São Paulo, Brasil</li>
                <li>contato@collabz.com.br</li>
                <li>+55 11 9999-9999</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>&copy; 2026 CollabZ Consultoria. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-foreground">Privacidade</Link>
              <Link href="/terms" className="hover:text-foreground">Termos de Uso</Link>
              <Link href="/cookies" className="hover:text-foreground">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
