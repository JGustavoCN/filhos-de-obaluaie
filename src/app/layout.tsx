import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://filhos-de-obaluaie.vercel.app"),
  title:
    "Filhos de Obaluaiê — Centro Cultural de Capoeira e Expressões Afro-Brasileiras",
  description:
    "Plataforma institucional do Centro Cultural e de Capoeira Filhos de Obaluaiê, localizado em Tobias Barreto/SE. Portfólio de projetos sociais, acervo documental e registro de expressões afro-brasileiras como capoeira, maculelê, dança afro e samba de coco.",
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
    description:
      "Resistência, arte e ancestralidade desde 2005. Capoeira, maculelê e expressões afro-brasileiras em Tobias Barreto/SE.",
    url: "https://filhos-de-obaluaie.vercel.app",
    siteName: "Filhos de Obaluaiê",
    type: "website",
    locale: "pt_BR",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <body>{children}</body>
    </html>
  );
}
