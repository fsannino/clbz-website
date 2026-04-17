import { useEffect } from "react";

export const SITE = {
  baseUrl: "https://www.clbz.com.br",
  name: "collab:Z",
  legalName: "Collaborazione Assessoria",
  tagline: "Transformação que funciona. De verdade.",
  defaultDescription:
    "Consultoria boutique em transformação organizacional, gestão de mudanças, estratégia, PMO e tecnologia aplicada. Atendemos empresas em ambientes complexos e regulados no Brasil e América Latina.",
  ogImage: "https://www.clbz.com.br/og-image.svg",
  logo: "https://www.clbz.com.br/logo-512.svg",
  locale: "pt_BR",
  twitter: "@collabz",
} as const;

export type SeoInput = {
  title?: string;
  description?: string;
  path?: string; // e.g. "/insights/5-erros-fatais-gestao-mudancas"
  image?: string;
  type?: "website" | "article";
  publishedTime?: string; // ISO date, for articles
  modifiedTime?: string;
  author?: string;
  category?: string;
  noIndex?: boolean;
  jsonLd?: object | object[];
};

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string | undefined,
): HTMLMetaElement | null {
  if (typeof document === "undefined") return null;
  const head = document.head;
  let el = head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (content == null) {
    if (el && el.dataset.managed === "seo") el.remove();
    return null;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.dataset.managed = "seo";
    head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

function upsertLinkCanonical(href: string) {
  if (typeof document === "undefined") return;
  const head = document.head;
  let el = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(data: object | object[] | undefined) {
  if (typeof document === "undefined") return;
  // Remove previously managed scripts, keep the static Organization one
  document
    .querySelectorAll('script[type="application/ld+json"][data-managed="seo"]')
    .forEach((n) => n.remove());
  if (!data) return;
  const arr = Array.isArray(data) ? data : [data];
  arr.forEach((obj) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.managed = "seo";
    script.text = JSON.stringify(obj);
    document.head.appendChild(script);
  });
}

export function useSeo(input: SeoInput) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const url = input.path
      ? `${SITE.baseUrl}${input.path.startsWith("/") ? input.path : `/${input.path}`}`
      : SITE.baseUrl;
    const title = input.title
      ? `${input.title} — ${SITE.name}`
      : `${SITE.name} — Consultoria em Transformação Organizacional`;
    const description = input.description ?? SITE.defaultDescription;
    const image = input.image ?? SITE.ogImage;
    const type = input.type ?? "website";

    const prevTitle = document.title;
    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta(
      "name",
      "robots",
      input.noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    );
    upsertLinkCanonical(url);

    // Open Graph
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:locale", SITE.locale);
    upsertMeta("property", "og:site_name", SITE.name);

    if (type === "article") {
      upsertMeta("property", "article:published_time", input.publishedTime);
      upsertMeta("property", "article:modified_time", input.modifiedTime);
      upsertMeta("property", "article:author", input.author);
      upsertMeta("property", "article:section", input.category);
    } else {
      // Clean up article-specific tags if leaving an article
      upsertMeta("property", "article:published_time", undefined);
      upsertMeta("property", "article:modified_time", undefined);
      upsertMeta("property", "article:author", undefined);
      upsertMeta("property", "article:section", undefined);
    }

    // Twitter
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    setJsonLd(input.jsonLd);

    return () => {
      document.title = prevTitle;
    };
    // The input object is consumed as-is; callers pass stable values per page.
  }, [
    input.title,
    input.description,
    input.path,
    input.image,
    input.type,
    input.publishedTime,
    input.modifiedTime,
    input.author,
    input.category,
    input.noIndex,
    JSON.stringify(input.jsonLd ?? null),
  ]);
}

// --- JSON-LD builders -----------------------------------------------------

export function buildArticleJsonLd(opts: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  modifiedAt?: string;
  authorName: string;
  authorRole?: string;
  category: string;
  image?: string;
  readTimeMin?: number;
}) {
  const url = `${SITE.baseUrl}/insights/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url,
    datePublished: opts.publishedAt,
    dateModified: opts.modifiedAt ?? opts.publishedAt,
    articleSection: opts.category,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: opts.image ?? SITE.ogImage,
    author: {
      "@type": "Person",
      name: opts.authorName,
      jobTitle: opts.authorRole,
      worksFor: { "@type": "Organization", name: SITE.name, url: SITE.baseUrl },
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: SITE.logo },
    },
    ...(opts.readTimeMin
      ? { timeRequired: `PT${opts.readTimeMin}M` }
      : {}),
    inLanguage: "pt-BR",
  };
}

export function buildServiceJsonLd(opts: {
  name: string;
  description: string;
  slug: string;
  category: string;
  image?: string;
}) {
  const url = `${SITE.baseUrl}/servicos/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.category,
    url,
    image: opts.image ?? SITE.ogImage,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.baseUrl,
      logo: SITE.logo,
    },
    areaServed: [
      { "@type": "Country", name: "Brasil" },
      { "@type": "Place", name: "América Latina" },
    ],
  };
}

export function buildBreadcrumbJsonLd(trail: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE.baseUrl}${item.url}`,
    })),
  };
}
