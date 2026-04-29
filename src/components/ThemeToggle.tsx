"use client";

import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "filhos-obaluaie-theme";

/* ── Ícones SVG inline (sem dependência externa) ── */

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={20}
      height={20}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={20}
      height={20}
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={20}
      height={20}
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

/* ── Helpers ── */

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  const root = document.documentElement;

  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

/* ── Componente ── */

const themes: { value: Theme; label: string; Icon: typeof SunIcon }[] = [
  { value: "light", label: "Modo Claro", Icon: SunIcon },
  { value: "dark", label: "Modo Ancestral", Icon: MoonIcon },
  { value: "system", label: "Seguir Sistema", Icon: MonitorIcon },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  /* Inicialização: ler do localStorage */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored ?? "system";
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  /* Escutar mudanças do SO quando theme === "system" */
  useEffect(() => {
    if (theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [theme]);

  const cycleTheme = useCallback(() => {
    const currentIndex = themes.findIndex((t) => t.value === theme);
    const next = themes[(currentIndex + 1) % themes.length];
    setTheme(next.value);
    applyTheme(next.value);
    localStorage.setItem(STORAGE_KEY, next.value);
  }, [theme]);

  /* Placeholder durante SSR para evitar layout shift */
  if (!mounted) {
    return (
      <div
        style={{ width: 40, height: 40, borderRadius: 9999 }}
        aria-hidden="true"
      />
    );
  }

  const current = themes.find((t) => t.value === theme)!;

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={cycleTheme}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        border: "none",
        borderRadius: 9999,
        backgroundColor: "var(--color-surface-container-high)",
        color: "var(--color-on-surface)",
        cursor: "pointer",
        transition: "all 0.35s ease-in-out",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.backgroundColor = "var(--color-secondary)";
        el.style.transform = "rotate(15deg) scale(1.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.backgroundColor = "var(--color-surface-container-high)";
        el.style.transform = "rotate(0deg) scale(1)";
      }}
      aria-label={`Tema atual: ${current.label}. Clique para alternar.`}
      title={current.label}
    >
      <current.Icon />
    </button>
  );
}
