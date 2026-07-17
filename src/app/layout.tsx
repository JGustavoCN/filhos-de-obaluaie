import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Script from "next/script";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OPEN_GRAPH_DESCRIPTION,
  DEFAULT_OPEN_GRAPH_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
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

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
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
    title: DEFAULT_TITLE,
    description: DEFAULT_OPEN_GRAPH_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OPEN_GRAPH_IMAGE, alt: SITE_NAME }],
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_OPEN_GRAPH_DESCRIPTION,
    images: [DEFAULT_OPEN_GRAPH_IMAGE],
  },
  alternates: {
    canonical: "/",
  },
};

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
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var theme = localStorage.getItem('filhos-obaluaie-theme');
                if (theme === 'dark' || (theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            })();
          `}
        </Script>
      </head>
      <body>
        {children}
        <SanityLive />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
