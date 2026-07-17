export const SITE_NAME = "Filhos de Obaluaiê";

export const DEFAULT_TITLE =
  "Filhos de Obaluaiê — Centro Cultural de Capoeira e Expressões Afro-Brasileiras";

export const DEFAULT_DESCRIPTION =
  "Plataforma institucional do Centro Cultural e de Capoeira Filhos de Obaluaiê, localizado em Tobias Barreto/SE. Portfólio de projetos sociais, acervo documental e registro de expressões afro-brasileiras como capoeira, maculelê, dança afro e samba de coco.";

export const DEFAULT_OPEN_GRAPH_DESCRIPTION =
  "Resistência, arte e ancestralidade desde 2005. Capoeira, maculelê e expressões afro-brasileiras em Tobias Barreto/SE.";

export const DEFAULT_OPEN_GRAPH_IMAGE = "/opengraph-image.png";

const LOCAL_SITE_URL = new URL("http://localhost:3000");

function resolveSiteUrl(): URL {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    return LOCAL_SITE_URL;
  }

  try {
    const url = new URL(
      configuredUrl.includes("://")
        ? configuredUrl
        : `https://${configuredUrl}`,
    );

    return url.protocol === "http:" || url.protocol === "https:"
      ? url
      : LOCAL_SITE_URL;
  } catch {
    return LOCAL_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl();

export function absoluteUrl(pathOrUrl: string): string {
  try {
    return new URL(pathOrUrl, SITE_URL).toString();
  } catch {
    return SITE_URL.toString();
  }
}
