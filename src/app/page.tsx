import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import XaxaraDivider from "@/components/XaxaraDivider";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArchiveSection from "@/components/ArchiveSection";
import RecentUpdatesSection from "@/components/RecentUpdatesSection";
import Footer from "@/components/Footer";
import EventCard from "@/components/cards/EventCard";
import Link from 'next/link';
import { client } from "@/sanity/client";
import type { EventoProps } from "@/components/cards/types";
import {
  HOME_HERO_QUERY,
  HOME_NOTICIAS_QUERY,
  RECENT_UPDATES_QUERY,
  SITE_SETTINGS_QUERY,
  OFICINAS_QUERY,
  DOCUMENTOS_QUERY,
  CONTEUDO_POR_TIPO_QUERY,
} from "@/sanity/queries";

// Helper para sub-seções da Agenda
function EventSubSection({ title, items, href }: { title: string, items: EventoProps[], href: string }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mb-12 last:mb-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-on-surface border-l-4 border-primary pl-4">{title}</h3>
        <Link href={href} className="text-primary text-sm font-bold uppercase tracking-wider hover:underline flex items-center gap-2">
          Ver histórico <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8h8m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {items.map((item) => (
          <EventCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
}

export default async function Home() {
  // Buscas paralelas para máxima performance
  const [
    siteSettings,
    heroEvent,
    recentUpdates,
    noticias,
    oficinas,
    documentos,
    externos,
    mostras,
    encontros,
    rodasConsciencia,
    rodasAniversario
  ] = await Promise.all([
      client.fetch(SITE_SETTINGS_QUERY),
      client.fetch(HOME_HERO_QUERY),
      client.fetch(RECENT_UPDATES_QUERY),
      client.fetch(HOME_NOTICIAS_QUERY),
      client.fetch(OFICINAS_QUERY),
      client.fetch(DOCUMENTOS_QUERY),
      client.fetch(CONTEUDO_POR_TIPO_QUERY, { tipo: "eventoExterno" }).then(res => res.slice(0, 2)),
      client.fetch(CONTEUDO_POR_TIPO_QUERY, { tipo: "mostraCultural" }).then(res => res.slice(0, 2)),
      client.fetch(CONTEUDO_POR_TIPO_QUERY, { tipo: "encontroConscienciaNegra" }).then(res => res.slice(0, 2)),
      client.fetch(CONTEUDO_POR_TIPO_QUERY, { tipo: "rodaConsciencia" }).then(res => res.slice(0, 2)),
      client.fetch(CONTEUDO_POR_TIPO_QUERY, { tipo: "rodaAniversariantes" }).then(res => res.slice(0, 2)),
    ]);

  // Normaliza imagemCapa: a query retorna objeto { url, alt } mas os cards
  // ainda esperam string em EventoProps.imagemCapa. Fazemos a normalização aqui.
  const normalizeItem = (item: Record<string, unknown>): EventoProps => ({
    ...item as unknown as EventoProps,
    imagemCapa: typeof item?.imagemCapa === 'object' && item?.imagemCapa !== null ? (item.imagemCapa as { url?: string }).url ?? undefined : item?.imagemCapa as string ?? undefined,
    galeria: Array.isArray(item?.galeria) ? item.galeria.map((g) => typeof g === 'object' && g !== null ? (g as { url?: string }).url ?? '' : g as string) : [],
    fotoMestre: typeof item?.fotoMestre === 'object' && item?.fotoMestre !== null ? (item.fotoMestre as { url?: string }).url ?? undefined : item?.fotoMestre as string ?? undefined,
  });

  const heroNormalizado = heroEvent ? normalizeItem(heroEvent) : null;
  const heroId = heroNormalizado?._id;

  // Aplica normalização e remove duplicata do hero se estiver nas listas
  const norm = (arr: any[]) => (arr || []).filter(item => item._id !== heroId).map(normalizeItem);

  const recentUpdatesNormalizados = norm(recentUpdates);
  const noticiasNormalizadas = norm(noticias);
  const oficinasNormalizadas = norm(oficinas);
  const documentosNormalizados = norm(documentos);
  const externosNormalizados = norm(externos);
  const mostrasNormalizadas = norm(mostras);
  const encontrosNormalizados = norm(encontros);
  const rodasConscienciaNormalizadas = norm(rodasConsciencia);
  const rodasAniversarioNormalizadas = norm(rodasAniversario);

  const hasAnyEvent = 
    mostrasNormalizadas.length > 0 || 
    encontrosNormalizados.length > 0 || 
    rodasConscienciaNormalizadas.length > 0 || 
    rodasAniversarioNormalizadas.length > 0;

  return (
    <>
      <Navbar menuLinks={siteSettings?.menuLinks} />
      <main>
        <HeroSection />

        {/* Destaque Principal Dinâmico do Sanity */}
        {heroNormalizado && (
          <section className="relative z-20 -mt-16 md:mt-20 max-w-[1400px] mx-auto px-6 md:px-10 mb-20">
            <EventCard data={heroNormalizado} />
          </section>
        )}

        <AboutSection />
        <XaxaraDivider />

        {/* Feed do Terreiro — Últimas atualizações de TODOS os tipos */}
        <RecentUpdatesSection updates={recentUpdatesNormalizados} />
        <XaxaraDivider />

        <ProjectsSection oficinas={oficinasNormalizadas} />
        <XaxaraDivider />

        {/* Mural da Comunidade: Notícias */}
        <section className="py-20 md:py-28 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-10 h-px bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">Mural da Comunidade</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
            <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold text-on-surface">
              Últimas <span className="text-primary block sm:inline">Notícias</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {noticiasNormalizadas.map((noticia: EventoProps) => (
              <EventCard key={noticia._id} data={noticia} />
            ))}
          </div>
          {noticiasNormalizadas.length > 0 && (
            <div className="mt-12 text-center">
              <Link
                href="/tipo/noticia"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-on-primary transition-colors"
              >
                Ler todas as notícias
              </Link>
            </div>
          )}
        </section>
        <XaxaraDivider />

        {/* Agenda e Eventos (Segmentados por Tipo) */}
        <section className="py-20 md:py-28 max-w-[1400px] mx-auto px-6 md:px-10 bg-surface-container-low rounded-[3rem] my-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-10 h-px bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">Programação Cultural</span>
          </div>
          <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold text-on-surface mb-16">
            Agenda & <span className="text-primary block sm:inline">Eventos</span>
          </h2>
          
          <div className="flex flex-col gap-8 md:gap-12">
            <EventSubSection title="Rodas da Consciência" items={rodasConscienciaNormalizadas} href="/tipo/rodaConsciencia" />
            <EventSubSection title="Rodas de Aniversariantes" items={rodasAniversarioNormalizadas} href="/tipo/rodaAniversariantes" />
            <EventSubSection title="Mostras Culturais Escolares" items={mostrasNormalizadas} href="/tipo/mostraCultural" />
            <EventSubSection title="Encontros de Consciência Negra" items={encontrosNormalizados} href="/tipo/encontroConscienciaNegra" />
          </div>

          {!hasAnyEvent && (
            <p className="text-on-surface-light text-center py-12">Nenhuma atividade cultural cadastrada no momento.</p>
          )}
        </section>
        <XaxaraDivider />

        <ArchiveSection documentos={documentosNormalizados} externos={externosNormalizados} />
      </main>
      <Footer />
    </>
  );
}
