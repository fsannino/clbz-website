import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Servicos from "./pages/Servicos";
import Metodologia from "./pages/Metodologia";
import Educacao from "./pages/Educacao";
import Insights from "./pages/Insights";
import Parcerias from "./pages/Parcerias";
import Contato from "./pages/Contato";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/servicos" component={Servicos} />
      <Route path="/metodologia" component={Metodologia} />
      <Route path="/educacao" component={Educacao} />
      <Route path="/insights" component={Insights} />
      <Route path="/parcerias" component={Parcerias} />
      <Route path="/contato" component={Contato} />
      {/* Redirects from old routes */}
      <Route path="/about" component={Sobre} />
      <Route path="/solutions" component={Servicos} />
      <Route path="/contact" component={Contato} />
      <Route path="/industries" component={Servicos} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
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
