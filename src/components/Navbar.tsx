"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

interface NavLink {
  label: string;
  href?: string;
  external?: boolean;
  subLinks?: NavLink[];
}

const defaultNavLinks: NavLink[] = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Nossa História", href: "/historia" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Agenda", href: "/#agenda" },
  { 
    label: "Explore", 
    subLinks: [
      { label: "Notícias", href: "/tipo/noticia" },
      { label: "Aulas e Oficinas", href: "/tipo/oficina" },
      { label: "Rodas de Aniversariantes", href: "/tipo/roda-aniversariantes" },
      { label: "Rodas da Consciência", href: "/tipo/roda-consciencia" },
      { label: "Mostra Cultural", href: "/tipo/mostra-cultural" },
      { label: "Eventos Externos", href: "/tipo/evento-externo" },
      { label: "Documentos", href: "/tipo/documento" },
    ]
  },
  { label: "Contato", href: "/#contato" },
  { label: "Estúdio", href: "https://filhos-de-obaluaie.sanity.studio", external: true },
];

export default function Navbar({ menuLinks }: { menuLinks?: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const validSanityLinks = Array.isArray(menuLinks)
    ? menuLinks.filter((link) => Boolean(link?.label?.trim() && (link?.href?.trim() || link?.subLinks)))
    : [];
  const navLinks = validSanityLinks.length > 0 ? validSanityLinks : defaultNavLinks;
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-[9990] min-h-[72px] transition-all duration-500 ${
        scrolled
          ? "navbar-scrolled bg-[rgba(250,246,240,0.78)] backdrop-blur-2xl border-b border-[rgba(232,197,140,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Página inicial">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-secondary/40 group-hover:border-secondary transition-colors">
            <img
              src="/logo.svg"
              alt="Logo Filhos de Obaluaiê"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="font-[var(--font-headline)] font-bold text-on-surface text-lg tracking-tight hidden sm:block">
            Filhos de Obaluaiê
          </span>
        </Link>

        {/* Desktop links + Theme Toggle */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 min-w-0">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              {link.subLinks ? (
                <>
                  <button className="px-3 xl:px-5 py-2 text-sm font-medium transition-colors rounded-pill flex items-center gap-1.5 whitespace-nowrap text-on-surface/80 hover:text-on-surface hover:bg-surface-container">
                    {link.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <div className="absolute left-0 top-full mt-1 min-w-[240px] bg-surface border border-outline/20 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col py-2 z-50">
                    {link.subLinks.map(sub => (
                      <Link key={sub.label} href={sub.href!} className="px-5 py-2.5 text-sm text-on-surface/80 hover:text-on-surface hover:bg-surface-container transition-colors">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href!}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`px-3 xl:px-5 py-2 text-sm font-medium transition-colors rounded-pill flex items-center gap-1.5 whitespace-nowrap ${
                    link.external 
                      ? "text-on-surface hover:text-on-surface bg-surface-container-high border border-outline/40" 
                      : "text-on-surface/80 hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  {link.label}
                  {link.external && (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M12 8.5V12a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h3.5m5.5 0v3.5m0-3.5L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </Link>
              )}
            </div>
          ))}
          <div className="ml-1 xl:ml-2">
            <ThemeToggle id="theme-toggle-desktop" />
          </div>
        </div>

        {/* Mobile: Theme Toggle + burger */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle id="theme-toggle-mobile" />
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center gap-1.5 p-2 min-w-[40px] min-h-[40px]"
            aria-label="Abrir menu de navegação"
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-on-surface transition-transform ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-on-surface transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-on-surface transition-transform ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } navbar-mobile-menu bg-surface/95 dark:bg-surface/95 backdrop-blur-2xl shadow-2xl border-b border-outline-variant/30`}
      >
        <div className="px-6 pb-8 pt-2 flex flex-col gap-1 overflow-y-auto max-h-[80vh]">
          {navLinks.map((link) => (
            <div key={link.label} className="flex flex-col">
              {link.subLinks ? (
                <div className="flex flex-col">
                  <span className="py-4 border-b border-outline-variant/20 text-on-surface/90 font-bold text-base">
                    {link.label}
                  </span>
                  <div className="flex flex-col pl-4 border-l-2 border-primary/20 ml-2 mt-2 mb-2 gap-2">
                    {link.subLinks.map(sub => (
                      <Link 
                        key={sub.label} 
                        href={sub.href!} 
                        onClick={() => setMenuOpen(false)} 
                        className="py-2.5 text-on-surface/80 hover:text-on-surface text-base"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={link.href!}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => !link.external && setMenuOpen(false)}
                  className={`py-4 border-b border-outline-variant/20 transition-colors flex items-center justify-between text-base ${
                    link.external ? "text-on-surface underline decoration-primary decoration-2 underline-offset-4 font-bold" : "text-on-surface/90 hover:text-on-surface hover:underline font-medium"
                  }`}
                >
                  {link.label}
                  {link.external && (
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M12 8.5V12a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h3.5m5.5 0v3.5m0-3.5L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
