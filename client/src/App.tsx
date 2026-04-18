import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Home is rendered eagerly (LCP), the rest is code-split per route
import Home from "./pages/Home";

const Sobre = lazy(() => import("./pages/Sobre"));
const Servicos = lazy(() => import("./pages/Servicos"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Metodologia = lazy(() => import("./pages/Metodologia"));
const Educacao = lazy(() => import("./pages/Educacao"));
const Insights = lazy(() => import("./pages/Insights"));
const InsightArticle = lazy(() => import("./pages/InsightArticle"));
const ChecklistProntidao = lazy(() => import("./pages/ChecklistProntidao"));
const Parcerias = lazy(() => import("./pages/Parcerias"));
const Contato = lazy(() => import("./pages/Contato"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Portal = lazy(() => import("./pages/Portal"));

function RouteFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#F0EDE8" }}
      role="status"
      aria-live="polite"
    >
      <div className="w-10 h-10 rounded-full border-4 border-navy/15 border-t-navy animate-spin" />
      <span className="sr-only">Carregando…</span>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sobre" component={Sobre} />
        <Route path="/servicos" component={Servicos} />
        <Route path="/servicos/:slug" component={ServiceDetail} />
        <Route path="/metodologia" component={Metodologia} />
        <Route path="/educacao" component={Educacao} />
        <Route path="/insights" component={Insights} />
        <Route path="/insights/:slug" component={InsightArticle} />
        <Route path="/recursos/checklist-prontidao" component={ChecklistProntidao} />
        <Route path="/parcerias" component={Parcerias} />
        <Route path="/contato" component={Contato} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/portal" component={Portal} />
        {/* Redirects from old routes */}
        <Route path="/about" component={Sobre} />
        <Route path="/solutions" component={Servicos} />
        <Route path="/contact" component={Contato} />
        <Route path="/industries" component={Servicos} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
