import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig, type Plugin } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
import {
  SITE_BASE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  STATIC_ROUTES,
  SERVICE_SLUGS,
  INSIGHT_SLUGS,
  INSIGHT_ITEMS,
} from "./scripts/seoData";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  return date.toUTCString();
}

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

      // RSS 2.0 feed for the Insights section
      const sortedInsights = [...INSIGHT_ITEMS].sort((a, b) =>
        a.publishedAt < b.publishedAt ? 1 : -1,
      );
      const newest = sortedInsights[0]?.publishedAt ?? today;
      const rss =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">\n` +
        `  <channel>\n` +
        `    <title>${escapeXml(SITE_NAME)} — Insights</title>\n` +
        `    <link>${SITE_BASE_URL}/insights</link>\n` +
        `    <atom:link href="${SITE_BASE_URL}/insights/rss.xml" rel="self" type="application/rss+xml" />\n` +
        `    <description>${escapeXml(SITE_DESCRIPTION)}</description>\n` +
        `    <language>pt-BR</language>\n` +
        `    <lastBuildDate>${toRfc822(newest)}</lastBuildDate>\n` +
        `    <image>\n` +
        `      <url>${SITE_BASE_URL}/logo-512.svg</url>\n` +
        `      <title>${escapeXml(SITE_NAME)}</title>\n` +
        `      <link>${SITE_BASE_URL}</link>\n` +
        `    </image>\n` +
        sortedInsights
          .map(
            (item) =>
              `    <item>\n` +
              `      <title>${escapeXml(item.title)}</title>\n` +
              `      <link>${SITE_BASE_URL}/insights/${item.slug}</link>\n` +
              `      <guid isPermaLink="true">${SITE_BASE_URL}/insights/${item.slug}</guid>\n` +
              `      <description>${escapeXml(item.description)}</description>\n` +
              `      <category>${escapeXml(item.category)}</category>\n` +
              `      <dc:creator>${escapeXml(item.author)}</dc:creator>\n` +
              `      <pubDate>${toRfc822(item.publishedAt)}</pubDate>\n` +
              `    </item>`,
          )
          .join("\n") +
        `\n  </channel>\n</rss>\n`;

      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
      this.emitFile({
        type: "asset",
        fileName: "insights/rss.xml",
        source: rss,
      });
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
