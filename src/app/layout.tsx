import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Script from "next/script";
import { client } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "700"],
});

const defaultDescription =
  "Plataforma institucional do Centro Cultural e de Capoeira Filhos de Obaluaiê, localizado em Tobias Barreto/SE. Portfólio de projetos sociais, acervo documental e registro de expressões afro-brasileiras como capoeira, maculelê, dança afro e samba de coco.";

export async function generateMetadata(): Promise<Metadata> {
  let seoDescription: string | null = null;
  let seoImage: string | null = null;

  try {
    const settings = await client.fetch(SITE_SETTINGS_QUERY);
    seoDescription = settings?.seoDescription ?? null;
    seoImage = settings?.seoImage ?? null;
  } catch {
    // Mantém metadados válidos quando o CMS estiver temporariamente indisponível.
  }

  const description = seoDescription || defaultDescription;
  const image = seoImage || "/opengraph-image.png";

  return {
    metadataBase: new URL("https://filhos-de-obaluaie.vercel.app"),
    title:
      "Filhos de Obaluaiê — Centro Cultural de Capoeira e Expressões Afro-Brasileiras",
    description,
    keywords: [
      "centro cultural",
      "capoeira",
      "maculelê",
      "dança afro",
      "samba de coco",
      "Tobias Barreto",
      "Sergipe",
      "cultura afro-brasileira",
      "Obaluaiê",
      "Lei Paulo Gustavo",
    ],
    authors: [{ name: "Centro Cultural Filhos de Obaluaiê" }],
    openGraph: {
      title: "Filhos de Obaluaiê — Centro Cultural",
      description,
      url: "https://filhos-de-obaluaie.vercel.app",
      siteName: "Filhos de Obaluaiê",
      images: [{ url: image, alt: "Centro Cultural Filhos de Obaluaiê" }],
      type: "website",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Filhos de Obaluaiê — Centro Cultural",
      description,
      images: [image],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF6F0" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1110" },
  ],
};

import { SanityLive } from '@/sanity/live'
import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script
          id="theme-script"
          src="/theme-script.js"
          strategy="beforeInteractive"
        />
        {children}
        <SanityLive />
        <VisualEditing />
      </body>
    </html>
  );
}
