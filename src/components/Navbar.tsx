"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

const defaultNavLinks: NavLink[] = [
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Acervo", href: "#acervo" },
  { label: "Contato", href: "#contato" },
  { label: "Estúdio", href: "https://filhos-de-obaluaie.sanity.studio", external: true },
];

export default function Navbar({ menuLinks }: { menuLinks?: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = menuLinks && menuLinks.length > 0 ? menuLinks : defaultNavLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-500 ${
        scrolled
          ? "navbar-scrolled bg-[rgba(250,246,240,0.78)] backdrop-blur-2xl border-b border-[rgba(232,197,140,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" aria-label="Página inicial">
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
        </a>

        {/* Desktop links + Theme Toggle */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`px-5 py-2 text-sm font-medium transition-colors rounded-pill flex items-center gap-1.5 ${
                link.external 
                  ? "text-primary/90 hover:text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20" 
                  : "text-on-surface/80 hover:text-primary"
              }`}
            >
              {link.label}
              {link.external && (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M12 8.5V12a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h3.5m5.5 0v3.5m0-3.5L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </a>
          ))}
          <a
            href="#acervo"
            className="ml-4 px-6 py-2.5 bg-primary text-on-primary text-sm font-semibold rounded-pill hover:bg-primary-hover transition-colors"
          >
            Acesse o Acervo
          </a>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile: Theme Toggle + burger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2"
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
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } navbar-mobile-menu bg-surface/95 dark:bg-surface/95 backdrop-blur-2xl shadow-2xl border-b border-outline-variant/30`}
      >
        <div className="px-6 pb-8 pt-2 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              onClick={() => !link.external && setMenuOpen(false)}
              className={`py-4 border-b border-outline-variant/20 transition-colors flex items-center justify-between text-base ${
                link.external ? "text-primary font-bold" : "text-on-surface/90 hover:text-primary font-medium"
              }`}
            >
              {link.label}
              {link.external && (
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M12 8.5V12a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h3.5m5.5 0v3.5m0-3.5L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </a>
          ))}
          <a
            href="#acervo"
            onClick={() => setMenuOpen(false)}
            className="mt-6 px-6 py-4 bg-primary text-on-primary text-center font-bold text-base rounded-pill hover:bg-primary-hover transition-colors shadow-lg active:scale-95"
          >
            Acesse o Acervo
          </a>
        </div>
      </div>
    </nav>
  );
}
