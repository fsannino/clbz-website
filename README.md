# clbz-website

Site institucional da **collab:Z** — consultoria em transformação organizacional,
gestão de mudanças, estratégia, PMO e tecnologia aplicada.

Publicado em:
- https://www.clbz.com.br
- https://www.collabz.com.br

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 19, Vite 7, TypeScript (strict), Tailwind CSS 4, Radix UI + shadcn/ui, Framer Motion, Wouter |
| Backend | Express + tRPC v11, Drizzle ORM + MySQL, Zod, `jose` (JWT) |
| Deploy | Vercel (SPA + serverless function via `api/index.ts`) |
| Testes | Vitest |
| Pacote | pnpm 10.4.x |

## Estrutura

```
api/                              Vercel serverless entrypoint
client/
  index.html                      Meta tags, JSON-LD Organization, OG
  public/                         favicon, og-image, logo, imagens
  src/
    App.tsx                       Roteamento + code splitting (React.lazy)
    main.tsx                      Providers + Plausible Analytics
    content/
      insights/*.tsx              Artigos do blog (1 arquivo por post)
      services/*.tsx              Páginas de solução (1 arquivo por serviço)
      resources/                  Dados dos recursos (checklist etc.)
    lib/seo.ts                    Hook useSeo + JSON-LD builders
    pages/                        Páginas de rota
    components/                   Layout, UI (shadcn), ErrorBoundary
server/
  _core/
    app.ts                        createApiApp() — Express sem listen
    contactRouter.ts              tRPC: contact.send, subscribeNewsletter, requestResource
    index.ts                      Dev server (Vite + listen)
scripts/seoData.ts                Fonte única de rotas/slugs (sitemap + rss)
shared/const.ts                   CONTACT + buildWhatsAppLink (e-mail, WhatsApp)
.github/workflows/ci.yml          typecheck + test + build + verify SEO
```

## Desenvolvimento local

```bash
pnpm install
cp .env.example .env   # preencher as variáveis necessárias
pnpm dev               # http://localhost:3000
```

O `pnpm dev` sobe o Express em `server/_core/index.ts`, que embute o Vite em
middleware — tudo (client + API) na mesma porta.

## Scripts

| Comando | O que faz |
|---|---|
| `pnpm dev` | Dev server (client + API) na mesma porta |
| `pnpm check` | `tsc --noEmit` — type-check |
| `pnpm test` | Vitest |
| `pnpm build` | Build de produção (client + sitemap/robots/rss) |
| `pnpm start` | Roda o build de produção localmente |
| `pnpm format` | Prettier em tudo |
| `pnpm db:push` | Drizzle migrate |

## Variáveis de ambiente

Ver `.env.example`. O arquivo produtivo vive no painel da Vercel
(Project → Settings → Environment Variables), nunca commitado.

| Variável | Obrigatória | Descrição |
|---|---|---|
| `JWT_SECRET` | sim | Assina cookies de sessão (HS256) |
| `DATABASE_URL` | sim | Conexão MySQL (Drizzle) |
| `OAUTH_SERVER_URL` | sim | Endpoint do OAuth provider |
| `VITE_APP_ID` | sim | App ID público (OAuth) |
| `OWNER_OPEN_ID` | sim | openId do owner para notificações |
| `BUILT_IN_FORGE_API_URL` | sim | URL do serviço de notificação |
| `BUILT_IN_FORGE_API_KEY` | sim | Bearer do serviço de notificação |
| `VITE_PLAUSIBLE_DOMAIN` | não | Ativa analytics (ex.: `clbz.com.br`) |
| `VITE_PLAUSIBLE_HOST` | não | Host custom do Plausible (default: plausible.io) |

**Sem `BUILT_IN_FORGE_*`**, o formulário de contato e a newsletter retornam erro
amigável e caem nos fallbacks (WhatsApp, mailto).

## Conteúdo

### Artigos (`/insights/:slug`)
Um arquivo `.tsx` por artigo em `client/src/content/insights/`, exportando
`meta` + `default` (componente React). Registrar em `index.ts` para listar
na página `/insights` e registrar o slug em `scripts/seoData.ts` (sitemap + RSS).

### Soluções (`/servicos/:slug`)
Um arquivo `.tsx` por serviço em `client/src/content/services/`. Meta inclui
`benefits`, `methodology`, `applications`, `differentials`, `guideQuestions`
e (opcional) `cases`. Template renderiza seções uniformes.

## SEO

Gerados a cada `pnpm build` no diretório `dist/public/`:

- `sitemap.xml` — 25 URLs (páginas estáticas + serviços + artigos)
- `robots.txt` — libera tudo, bloqueia `/api/`, aponta sitemap
- `insights/rss.xml` — feed RSS 2.0 do blog

Cada página aplica meta tags dinâmicas (title, description, canonical, OG,
Twitter, JSON-LD) via o hook `useSeo` em `lib/seo.ts`.

## Deploy

Merge em `main` → Vercel promove automaticamente a produção (ambos
domínios `clbz.com.br` e `collabz.com.br`). Deploys de branch servem como
preview (URLs `*.vercel.app`).

Funções serverless: `api/index.ts` re-exporta o Express app, e o
`vercel.json` rewrite `/api/:path*` → `/api/index` preserva o URL original
para o Express rotear normalmente em `/api/trpc/*` e `/api/oauth/callback`.

## CI

GitHub Actions em `.github/workflows/ci.yml` roda em cada PR:
`pnpm check` → `pnpm test` → `pnpm build` → verificação dos artefatos de SEO.

## Licença

MIT. Código-fonte aberto para referência. Marca e conteúdo editorial
(artigos, logos, textos) são de propriedade da collab:Z — Collaborazione
Assessoria.
