import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig, type Plugin } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
import {
  SITE_BASE_URL,
  STATIC_ROUTES,
  SERVICE_SLUGS,
  INSIGHT_SLUGS,
} from "./scripts/seoData";

function seoFilesPlugin(): Plugin {
  const today = new Date().toISOString().split("T")[0];
  return {
    name: "clbz-seo-files",
    apply: "build",
    generateBundle() {
      const urls: Array<{
        loc: string;
        lastmod: string;
        changefreq?: string;
        priority: number;
      }> = [];

      for (const r of STATIC_ROUTES) {
        urls.push({
          loc: `${SITE_BASE_URL}${r.path}`,
          lastmod: today,
          changefreq: r.changefreq,
          priority: r.priority,
        });
      }
      for (const slug of SERVICE_SLUGS) {
        urls.push({
          loc: `${SITE_BASE_URL}/servicos/${slug}`,
          lastmod: today,
          changefreq: "monthly",
          priority: 0.8,
        });
      }
      for (const item of INSIGHT_SLUGS) {
        urls.push({
          loc: `${SITE_BASE_URL}/insights/${item.slug}`,
          lastmod: item.lastmod,
          changefreq: "monthly",
          priority: 0.7,
        });
      }

      const sitemap =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        urls
          .map(
            (u) =>
              `  <url>\n` +
              `    <loc>${u.loc}</loc>\n` +
              `    <lastmod>${u.lastmod}</lastmod>\n` +
              (u.changefreq
                ? `    <changefreq>${u.changefreq}</changefreq>\n`
                : "") +
              `    <priority>${u.priority.toFixed(1)}</priority>\n` +
              `  </url>`,
          )
          .join("\n") +
        `\n</urlset>\n`;

      const robots =
        `# robots.txt for ${SITE_BASE_URL}\n` +
        `User-agent: *\n` +
        `Allow: /\n` +
        `Disallow: /api/\n\n` +
        `Sitemap: ${SITE_BASE_URL}/sitemap.xml\n`;

      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
    },
  };
}

const plugins = [
  react(),
  tailwindcss(),
  jsxLocPlugin(),
  vitePluginManusRuntime(),
  seoFilesPlugin(),
];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
