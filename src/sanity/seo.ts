import { cache } from "react";

import { client } from "@/sanity/client";
import {
  CONTEUDO_POR_SLUG_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/queries";

const seoClient = client.withConfig({ stega: false });

export const getContentBySlug = cache((slug: string) =>
  seoClient.fetch(CONTEUDO_POR_SLUG_QUERY, { slug }),
);

export const getSiteSettings = cache(async () => {
  try {
    return await seoClient.fetch(SITE_SETTINGS_QUERY);
  } catch {
    return null;
  }
});
