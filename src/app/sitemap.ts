import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { client } from "@/sanity/client";
import { SITEMAP_QUERY } from "@/sanity/queries";

const STATIC_PATHS = [
  "/",
  "/historia",
  "/tipo/noticia",
  "/tipo/documento",
  "/tipo/oficina",
  "/tipo/roda-aniversariantes",
  "/tipo/encontro-consciencia-negra",
  "/tipo/roda-consciencia",
  "/tipo/mostra-cultural",
  "/tipo/evento-externo",
] as const;

function parseLastModified(value: string | null): Date | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
  }));

  try {
    const documents = await client
      .withConfig({ perspective: "published", stega: false, useCdn: false })
      .fetch(SITEMAP_QUERY);
    const seenSlugs = new Set<string>();
    const dynamicEntries: MetadataRoute.Sitemap = [];

    for (const document of documents) {
      if (!document.slug || seenSlugs.has(document.slug)) {
        continue;
      }

      seenSlugs.add(document.slug);
      const lastModified = parseLastModified(document.lastModified);

      dynamicEntries.push({
        url: absoluteUrl(`/conteudo/${encodeURIComponent(document.slug)}`),
        ...(lastModified ? { lastModified } : {}),
      });
    }

    return [...staticEntries, ...dynamicEntries];
  } catch {
    return staticEntries;
  }
}
