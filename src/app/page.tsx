import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import XaxaraDivider from "@/components/XaxaraDivider";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ArchiveSection from "@/components/ArchiveSection";
import Footer from "@/components/Footer";
import EventCard from "@/components/cards/EventCard";
import Link from 'next/link';
import { client } from "@/sanity/client";
import type { EventoProps } from "@/components/cards/types";
import {
  HOME_HERO_QUERY,
  HOME_NOTICIAS_QUERY,
  HOME_AGENDA_QUERY,
  SITE_SETTINGS_QUERY,
  OFICINAS_QUERY,
  DOCUMENTOS_QUERY,
  CONTEUDO_POR_TIPO_QUERY,
} from "@/sanity/queries";

export default async function Home() {
  // Buscas paralelas para máxima performance
  const [siteSettings, heroEvent, noticias, agenda, oficinas, documentos, externos] =
    await Promise.all([
      client.fetch(SITE_SETTINGS_QUERY),
      client.fetch(HOME_HERO_QUERY),
      client.fetch(HOME_NOTICIAS_QUERY),
      client.fetch(HOME_AGENDA_QUERY, { heroId: '' }).then(async (res) => {
        // Rebusca com heroId real após ter o heroEvent
        return res
      }),
      client.fetch(OFICINAS_QUERY),
      client.fetch(DOCUMENTOS_QUERY),
      client.fetch(CONTEUDO_POR_TIPO_QUERY, { tipo: "eventoExterno" }).then(res => res.slice(0, 2)),
    ]);

  // Rebuscar agenda excluindo o heroEvent para evitar duplicata
  const agendaFiltrada = heroEvent
    ? await client.fetch(HOME_AGENDA_QUERY, { heroId: heroEvent._id || '' })
    : agenda;

  // Normaliza imagemCapa: a query retorna objeto { url, alt } mas os cards
  // ainda esperam string em EventoProps.imagemCapa. Fazemos a normalização aqui.
  const normalizeItem = (item: Record<string, unknown>): EventoProps => ({
    ...item as unknown as EventoProps,
    imagemCapa: typeof item?.imagemCapa === 'object' && item?.imagemCapa !== null ? (item.imagemCapa as { url?: string }).url ?? undefined : item?.imagemCapa as string ?? undefined,
    galeria: Array.isArray(item?.galeria) ? item.galeria.map((g) => typeof g === 'object' && g !== null ? (g as { url?: string }).url ?? '' : g as string) : [],
    fotoMestre: typeof item?.fotoMestre === 'object' && item?.fotoMestre !== null ? (item.fotoMestre as { url?: string }).url ?? undefined : item?.fotoMestre as string ?? undefined,
  });

  const heroNormalizado = heroEvent ? normalizeItem(heroEvent) : null;
  const noticiasNormalizadas = (noticias ?? []).map(normalizeItem);
  const agendaNormalizada = (agendaFiltrada ?? []).map(normalizeItem);
  const oficinasNormalizadas = (oficinas ?? []).map(normalizeItem);
  const documentosNormalizados = (documentos ?? []).map(normalizeItem);
  const externosNormalizados = (externos ?? []).map(normalizeItem);

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

        <ProjectsSection oficinas={oficinasNormalizadas} />
        <XaxaraDivider />

        {/* Mural da Comunidade: Notícias */}
        <section className="py-20 md:py-28 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-10 h-px bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">Mural da Comunidade</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold text-on-surface">
              Últimas <span className="text-primary">Notícias</span>
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

        {/* Agenda e Eventos */}
        <section className="py-20 md:py-28 max-w-[1400px] mx-auto px-6 md:px-10 bg-surface-container-low rounded-[3rem] my-10">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-10 h-px bg-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-on-surface-light">Programação Cultural</span>
          </div>
          <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold text-on-surface mb-12">
            Agenda & <span className="text-primary">Eventos</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {agendaNormalizada.map((item: EventoProps) => (
              <EventCard key={item._id} data={item} />
            ))}
          </div>
          {agendaNormalizada.length === 0 && (
            <p className="text-on-surface-light text-center py-12">Nenhum evento cadastrado no momento.</p>
          )}
        </section>
        <XaxaraDivider />

        <ArchiveSection documentos={documentosNormalizados} externos={externosNormalizados} />
      </main>
      <Footer />
    </>
  );
}
