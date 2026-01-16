# Prompt Completo para Replicar o Site CollabZ

## 📋 Visão Geral do Projeto

Você está criando um **site institucional corporativo** para uma consultoria boutique enterprise chamada **CollabZ**. O site deve transmitir solidez, precisão, expertise técnica e foco em execução real. A estética segue o padrão **Industrial Brutalism Refined**, inspirado em empresas como Honeywell, mas com identidade própria.

---

## 🎨 Design System Completo

### Paleta de Cores (OBRIGATÓRIA)

| Cor | HEX | Nome | Uso |
|-----|-----|------|-----|
| #0B0D10 | Industrial Graphite | Hero, Header, Footer, Seções institucionais | Sensação: engenharia, criticidade, solidez |
| #1F2933 | Technical Dark Gray | Cards, Blocos de serviço, Seções alternadas | Fundo secundário |
| #F9FAFB | Technical Light | Páginas internas, Artigos, Textos longos | Fundo de leitura |
| #E60000 | Vermelho Honeywell | Destaques, CTAs, Badges | Ação e alerta |
| #000000 | Preto Puro | Texto principal | Contraste máximo |

### Tipografia

**Fontes a usar:**
- **Títulos/Headlines**: Rajdhani (font-weight: 700, letter-spacing: 0.05em)
  - Tamanho: 2.25rem (36px) para H2, 3rem (48px) para H1
  - Estilo: UPPERCASE, tracking-tight
  
- **Corpo/Body**: Inter (font-weight: 400-500)
  - Tamanho: 1rem (16px) para texto principal
  - Line-height: 1.6
  
- **Dados/Monospace**: JetBrains Mono (font-weight: 400)
  - Tamanho: 0.75rem (12px)
  - Uso: datas, números, labels técnicos

### Espaçamento

- **Padding padrão**: 1.5rem (24px) em mobile, 2rem (32px) em desktop
- **Gap entre elementos**: 1.5rem (24px)
- **Seções**: py-24 (96px vertical)
- **Container max-width**: 1280px

### Sombras e Efeitos

- **Sombra padrão**: `box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)`
- **Hover effect**: `-translate-y-1` (4px up) + shadow increase
- **Transições**: `transition-all duration-300`
- **Borders**: 1px solid com 10% opacidade da cor de fundo

---

## 🏗️ Estrutura de Páginas

### 1. Home (Landing Page)

#### Seção Hero
- **Background**: Industrial Graphite (#0B0D10) com imagem de fundo (industrial/tecnologia)
- **Grid overlay**: Linhas finas cinzas (opacity: 0.1)
- **Conteúdo**:
  - Badge vermelho: "SYSTEM OPERATIONAL"
  - Título: "TRANSFORMAÇÃO QUE FUNCIONA NO MUNDO REAL." (branco, 3rem)
  - Subtítulo: "A CollabZ não vende frameworks teóricos. Entregamos execução estratégica e tecnologia aplicada para ambientes complexos e regulados." (branco, 1.125rem)
  - CTA primária: "NOSSAS SOLUÇÕES" (vermelho fundo, branco texto)
  - CTA secundária: "FALE CONOSCO" (border branco, branco texto)
  - Status bar no canto inferior: "SYS.STATUS: NOMINAL | LOC: SÃO PAULO, BR | LAT: -23.5505 | LON: -46.6333"

#### Seção Solutions (Soluções)
- **Background**: Technical Dark Gray (#1F2933)
- **Título**: "Nossas Soluções" (branco, uppercase)
- **Layout**: Grid 4 colunas (desktop), 1 coluna (mobile)
- **Cards**:
  - Fundo: #1F2933
  - Border: 1px rgba(249, 250, 251, 0.1)
  - Ícone: 40px, vermelho
  - Título: branco, 1.25rem
  - Descrição: branco, 0.875rem
  - Hover: border mais clara, sombra, -translate-y-1
  - Número no rodapé: cinza claro (0.6 opacidade)

**4 Cards de Soluções:**
1. Strategy & Transformation
   - Descrição: "Diagnóstico organizacional, modelos operacionais e governança para tomada de decisão em ambientes complexos."
   - Ícone: Layers

2. Digital, Data & AI
   - Descrição: "IA aplicada a processos reais, automação inteligente e analytics para decisão executiva baseada em dados."
   - Ícone: Cpu

3. PMO & Execution
   - Descrição: "Gestão de programas complexos, CAPEX, ERP e métricas de valor. Foco na realização de benefícios tangíveis."
   - Ícone: BarChart3

4. Change & Adoption
   - Descrição: "Gestão de mudança organizacional, treinamento e adoção real de novas tecnologias e processos."
   - Ícone: Users

#### Seção Cases (Histórias de Sucesso)
- **Background**: Technical Light (#F9FAFB)
- **Título**: "Casos de Sucesso" (preto, uppercase)
- **Layout**: Grid 3 colunas (desktop)
- **Cards**:
  - Fundo: branco
  - Border: 1px #E0E0E0
  - Imagem: 200px altura
  - Título: preto, 1.125rem
  - Resultado: vermelho, bold
  - Descrição: cinza escuro

**3 Cases:**
1. Transformação Digital em Manufatura
   - Resultado: "Redução de 35% em tempo de ciclo de produção"
   - Descrição: "Implementação de automação inteligente em planta industrial de 500+ funcionários"

2. Automação de Processos em Utilities
   - Resultado: "Economia de R$2.1M anuais em operações"
   - Descrição: "Governança de dados e automação de workflows críticos em empresa de energia"

3. Governança de Dados em Serviços Financeiros
   - Resultado: "100% conformidade regulatória em 6 meses"
   - Descrição: "Estruturação de data governance e compliance em instituição financeira"

#### Seção Insights (Blog Preview)
- **Background**: Technical Dark Gray (#1F2933)
- **Título**: "Artigos Recentes" (branco, uppercase)
- **Layout**: Grid 3 colunas (desktop)
- **Cards de Artigo**:
  - Imagem: 16:9 aspect ratio, grayscale, hover: color + scale 1.05
  - Badge: vermelho fundo, branco texto, uppercase
  - Data: cinza claro, 0.75rem
  - Título: branco, 1.25rem, bold
  - Descrição: branco puro (#F9FAFB), 0.875rem, line-clamp-3
  - CTA: vermelho, "Ler artigo →", opacity 0 → 1 on hover

**3 Artigos:**
1. "A Ilusão da IA Generativa na Indústria: Por que a base de dados importa mais que o modelo"
   - Badge: Digital
   - Data: 15 JAN 2026 • 5 MIN READ
   - Descrição: "Enquanto todos olham para o ChatGPT, as verdadeiras revoluções industriais estão acontecendo na estruturação de dados legados e na governança de informações críticas."

2. "O Fim dos Projetos de 'Go-Live': Focando em Adoção Sustentável"
   - Badge: Strategy
   - Data: 10 JAN 2026 • 7 MIN READ
   - Descrição: "Por que 70% das transformações digitais falham não na tecnologia, mas na incapacidade de mudar comportamentos e processos operacionais no longo prazo."

3. "PMO 4.0: De Controlador de Prazos a Viabilizador de Valor"
   - Badge: Execution
   - Data: 05 JAN 2026 • 4 MIN READ
   - Descrição: "Como os escritórios de projetos modernos estão abandonando a burocracia excessiva para focar em métricas de valor real e desbloqueio de gargalos estratégicos."

#### Seção CTA Final
- **Background**: Industrial Graphite (#0B0D10)
- **Texto**: "Transformação que funciona. Vamos conversar?" (branco, 2.25rem)
- **Botão**: Vermelho fundo, branco texto, "INICIAR CONVERSA"

### 2. Página Solutions (Detalhada)

- **Background**: Technical Light (#F9FAFB)
- **Hero**: Industrial Graphite com título "Nossas Soluções"
- **Conteúdo**: 4 seções, cada uma com:
  - Título (preto, 2rem)
  - Descrição longa (cinza escuro, 1rem)
  - Imagem ou ícone
  - Lista de benefícios
  - CTA: "Saiba mais"

### 3. Página Industries (Indústrias)

- **Background**: Technical Light (#F9FAFB)
- **Hero**: Industrial Graphite
- **Conteúdo**: 4 cards de indústrias:
  1. Manufatura e Industrial
  2. Utilities e Energia
  3. Serviços Financeiros
  4. Saúde e Regulação

Cada card com:
  - Imagem de fundo
  - Título branco
  - Descrição branca
  - Overlay escuro (opacity: 0.6)

### 4. Página Insights (Blog Completo)

- **Background**: Technical Light (#F9FAFB)
- **Hero**: Industrial Graphite
- **Filtros**: Strategy, Digital, Execution
- **Grid**: 3 colunas de artigos
- **Paginação**: Números ou "Load More"

### 5. Página About (Sobre Nós)

- **Hero**: Industrial Graphite com título "Sobre a CollabZ"
- **Seção Manifesto**: Technical Dark Gray
  - Citação: "A estratégia sem execução é alucinação. A execução sem estratégia é pesadelo."
  - Texto descritivo (branco)

- **Seção Valores**: Technical Light
  - 6 valores em grid 3 colunas
  - Cada valor com ícone, título, descrição e "motto"

- **Seção Liderança**: Technical Light
  - 3 perfis de líderes com foto, nome, título, bio

- **Seção Diferenciais**: Technical Dark Gray
  - 4 diferenciais em grid 2 colunas
  - Títulos e descrições em branco

- **CTA Final**: Industrial Graphite

### 6. Página Contact (Contato)

- **Hero**: Industrial Graphite
- **Formulário**: 
  - Campos: Nome, Email, Empresa, Telefone, Mensagem
  - Botão: Vermelho
  - Validação: feedback visual
  
- **Informações de Contato**:
  - Email
  - Telefone
  - Endereço
  - Redes sociais

---

## 🧭 Navegação

### Header (Sticky)
- **Background**: Branco (#F9FAFB)
- **Logo**: CollabZ (CB em quadrado vermelho + texto preto)
- **Menu**: SOLUÇÕES, INDÚSTRIAS, INSIGHTS, SOBRE, CONTATO
- **Ícone**: Busca
- **Top bar**: CARREIRAS, INVESTIDORES, 🌐 BRASIL (PT)

### Footer
- **Background**: Industrial Graphite (#0B0D10)
- **Texto**: branco
- **Colunas**: 
  - Sobre
  - Soluções
  - Recursos
  - Contato
- **Copyright**: "© 2026 CollabZ. Todos os direitos reservados."

---

## ✨ Animações e Interações

- **Hover em cards**: `-translate-y-1` + shadow increase
- **Hover em links**: `text-primary` (vermelho)
- **Fade-in ao scroll**: Entrada suave de elementos
- **Transições**: `transition-all duration-300`
- **Micro-animações**: Sutil, não distrativa

---

## 📱 Responsividade

- **Mobile-first approach**
- **Breakpoints**: 640px (sm), 1024px (lg)
- **Grid**: 1 coluna mobile, 2-3 desktop
- **Tipografia**: Reduzida em mobile (1.5rem → 1.125rem)
- **Padding**: 1.5rem mobile, 2rem desktop

---

## 🔧 Stack Técnico Recomendado

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Routing**: Wouter
- **Hosting**: Manus (ou similar)

---

## 📝 Conteúdo Estratégico

### Mensagem-chave
"A CollabZ não vende frameworks. Nós entregamos transformação que funciona no mundo real."

### Tom de Voz
- Profissional, direto, sem jargão excessivo
- Foco em resultados mensuráveis
- Confiança baseada em expertise
- Honestidade e transparência

### Diferencial
- Advisor + Executor (não apenas consultoria)
- Expertise em contextos regulados
- Integração Strategy-Technology-Operations
- Equipe multidisciplinar

---

## 📊 SEO Básico

- **Meta Title**: "CollabZ | Consultoria de Transformação e Execução"
- **Meta Description**: "Consultoria boutique enterprise em Strategy, Digital, PMO e Change Management. Transformação que funciona no mundo real."
- **Keywords**: transformação digital, consultoria, PMO, automação, IA aplicada
- **Open Graph**: Imagens para compartilhamento social

---

## ✅ Checklist de Implementação

- [ ] Setup inicial do projeto
- [ ] Paleta de cores configurada
- [ ] Tipografia importada
- [ ] Layout base (Header, Footer, Container)
- [ ] Página Home completa
- [ ] Página Solutions
- [ ] Página Industries
- [ ] Página Insights
- [ ] Página About
- [ ] Página Contact
- [ ] Responsividade testada
- [ ] Performance otimizada
- [ ] SEO implementado
- [ ] Deploy realizado

---

## 🎯 Resultado Esperado

Um site corporativo moderno, profissional e visualmente impactante que:
- Transmite solidez e expertise
- Comunica claramente os serviços
- Converte visitantes em leads
- Funciona perfeitamente em mobile
- Carrega rápido
- Segue as melhores práticas de UX/UI
