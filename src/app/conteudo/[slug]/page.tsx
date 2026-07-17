import React from 'react';
import { client } from '@/sanity/client';
import { CONTEUDO_POR_SLUG_QUERY } from '@/sanity/queries';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { CalendarIcon, LocationIcon } from '@/components/cards/icons';
import { formatDate } from '@/lib/formatDate';

type ImageField = string | { url?: string | null; alt?: string | null } | null | undefined
type PortableTextValue = React.ComponentProps<typeof PortableText>['value']

type BaseConteudo = {
  _id: string;
  titulo: string;
  resumo?: string;
  local?: string;
  imagemCapa?: ImageField;
  galeria?: ImageField[];
  body?: PortableTextValue;
  dataCard?: string;
}

type OficinaDetalhe = BaseConteudo & {
  _type: 'oficina';
  subtipoOficina?: string;
  oficineiro?: string;
  horarios?: string;
  faixaEtaria?: string;
  vagas?: number;
  inscricoesAbertas?: boolean;
}

type RodaAniversariantesDetalhe = BaseConteudo & {
  _type: 'rodaAniversariantes';
  dataEvento?: string;
  mesReferencia?: string;
  anoReferencia?: number;
  aniversariantes?: string[];
}

type RodaConscienciaDetalhe = BaseConteudo & {
  _type: 'rodaConsciencia';
  dataEvento?: string;
  mestreConvidado?: string;
  fotoMestre?: ImageField;
  origemMestre?: string;
  temaRoda?: string;
  abertoAoPublico?: boolean;
}

type EncontroConscienciaNegraDetalhe = BaseConteudo & {
  _type: 'encontroConscienciaNegra';
  dataInicio?: string;
  dataFim?: string;
  edicao?: number;
  edicaoRomano?: string;
  subtemaPrincipal?: string;
  mestresConvidados?: string[];
  gruposConvidados?: string[];
  parceiros?: string[];
}

type MostraCulturalDetalhe = BaseConteudo & {
  _type: 'mostraCultural';
  dataEvento?: string;
  escolasParticipantes?: string[];
  quantidadeAlunos?: number;
}

type EventoExternoDetalhe = BaseConteudo & {
  _type: 'eventoExterno';
  dataEvento?: string;
  organizador?: string;
  tipoParticipacao?: string;
  linkEvento?: string;
}

type DocumentoDetalhe = BaseConteudo & {
  _type: 'documento';
  subtipoDocumento?: string;
  dataPublicacao?: string;
  dataVigencia?: string;
  tamanhoArquivo?: string;
  arquivo?: string;
  linkExterno?: string;
}

type NoticiaDetalhe = BaseConteudo & {
  _type: 'noticia';
  categoriaNoticia?: string;
  dataPublicacao?: string;
}

type ConteudoDetalhe = 
  | OficinaDetalhe 
  | RodaAniversariantesDetalhe 
  | RodaConscienciaDetalhe 
  | EncontroConscienciaNegraDetalhe 
  | MostraCulturalDetalhe 
  | EventoExternoDetalhe 
  | DocumentoDetalhe 
  | NoticiaDetalhe;

const badgeClassByType: Record<string, string> = {
  rodaAniversariantes: 'badge-celebracao',
  encontroConscienciaNegra: 'badge-evento',
  rodaConsciencia: 'badge-evento',
  mostraCultural: 'badge-evento',
  eventoExterno: 'badge-evento',
  oficina: 'badge-oficina',
  documento: 'badge-documento',
  noticia: 'badge-noticia',
}

const labelByType: Record<string, string> = {
  rodaAniversariantes: 'Celebração',
  encontroConscienciaNegra: 'Evento',
  rodaConsciencia: 'Evento',
  mostraCultural: 'Evento',
  eventoExterno: 'Evento',
  oficina: 'Oficina',
  documento: 'Documento',
  noticia: 'Notícia',
}

function imageUrl(image: ImageField) {
  return typeof image === 'string' ? image : image?.url ?? ''
}

function imageAlt(image: ImageField, fallback: string) {
  return typeof image === 'object' && image?.alt ? image.alt : fallback
}

function DetailItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="meta-label">{label}</span>
      <span className="meta-value text-lg">{children}</span>
    </div>
  )
}

function getDataPrincipal(conteudo: ConteudoDetalhe): string | undefined {
  if ('dataInicio' in conteudo && conteudo.dataInicio) return conteudo.dataInicio;
  if ('dataEvento' in conteudo && conteudo.dataEvento) return conteudo.dataEvento;
  if ('dataPublicacao' in conteudo && conteudo.dataPublicacao) return conteudo.dataPublicacao;
  return undefined;
}

export default async function DetalhePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const conteudo = await client.fetch(CONTEUDO_POR_SLUG_QUERY, { slug: resolvedParams.slug }) as ConteudoDetalhe | null;
  
  if (!conteudo) {
    notFound();
  }

  const dataPrincipal = getDataPrincipal(conteudo)
  const tipoLabel = labelByType[conteudo._type] ?? conteudo._type ?? 'Registro'
  const tipoBadgeClass = badgeClassByType[conteudo._type] ?? 'badge-memoria'
  const galeriaFotos = (conteudo.galeria ?? [])
    .map((foto, idx) => ({
      url: imageUrl(foto),
      alt: imageAlt(foto, `Registro ${idx + 1}`),
    }))
    .filter((foto) => foto.url)
  const fotoMestreUrl = conteudo._type === 'rodaConsciencia'
    ? imageUrl(conteudo.fotoMestre)
    : ''
  const imagemPrincipalUrl = imageUrl(conteudo.imagemCapa) || fotoMestreUrl || galeriaFotos[0]?.url || ''

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <Navbar />
      {/* CABEÇALHO HERO - COM A IMAGEM DE CAPA DE FUNDO */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-end">
        {imagemPrincipalUrl && (
          <img
            src={imagemPrincipalUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-surface via-surface/90 to-transparent" />
        
        <div className="relative z-20 max-w-4xl mx-auto w-full px-6 pb-12 pt-24">
          <div className={imagemPrincipalUrl ? 'glass-card p-5 md:p-8' : ''}>
            <div className="meta-row mb-4">
              <span className={`badge-tipo ${tipoBadgeClass}`}>
                {tipoLabel}
              </span>
              {dataPrincipal && (
                <span className="meta-date">
                  <CalendarIcon /> {formatDate(dataPrincipal)}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-[var(--font-headline)] font-bold mb-4 leading-tight text-on-surface">
              {conteudo.titulo}
            </h1>
            {conteudo.resumo && (
              <p className="text-xl text-on-surface/80 max-w-2xl">
                {conteudo.resumo}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* INFORMAÇÕES ESPECÍFICAS DEPENDENDO DO TIPO */}
      <section className="max-w-4xl mx-auto w-full px-6 py-10 border-b border-outline-variant/30">
        <div className="bg-surface-container p-6 md:p-8 rounded-[12px] border border-outline-variant/50 shadow-sm">
          <h3 className="text-primary text-sm font-bold tracking-widest uppercase mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-primary/50"></span>
            Ficha de Detalhes
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">
            
            {dataPrincipal && (
              <DetailItem label="Data">
                <span className="inline-flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[var(--color-primary)]" /> {formatDate(dataPrincipal)}
                </span>
              </DetailItem>
            )}

            {conteudo.local && (
              <DetailItem label="Local">
                <span className="inline-flex items-center gap-2">
                  <LocationIcon className="w-4 h-4 text-[var(--color-primary)]" /> {conteudo.local}
                </span>
              </DetailItem>
            )}

            {/* RENDERIZAÇÃO CONDICIONAL BASEADA NO _TYPE */}
            
            {conteudo._type === 'oficina' && (
              <>
                {conteudo.horarios && <DetailItem label="Horários">{conteudo.horarios}</DetailItem>}
                {conteudo.oficineiro && <DetailItem label="Instrutor / Mestre">{conteudo.oficineiro}</DetailItem>}
                {conteudo.faixaEtaria && <DetailItem label="Público-Alvo">{conteudo.faixaEtaria}</DetailItem>}
                {conteudo.vagas && <DetailItem label="Vagas Ofertadas">{conteudo.vagas}</DetailItem>}
              </>
            )}

            {conteudo._type === 'rodaAniversariantes' && (
              <>
                {conteudo.mesReferencia && <DetailItem label="Mês de Celebração">{conteudo.mesReferencia}</DetailItem>}
                {conteudo.anoReferencia && <DetailItem label="Ano">{conteudo.anoReferencia}</DetailItem>}
              </>
            )}

            {conteudo._type === 'rodaConsciencia' && (
              <>
                {conteudo.mestreConvidado && <DetailItem label="Mestre Convidado">{conteudo.mestreConvidado}</DetailItem>}
                {conteudo.origemMestre && <DetailItem label="Origem / Grupo">{conteudo.origemMestre}</DetailItem>}
                {conteudo.temaRoda && <DetailItem label="Tema da Roda">{conteudo.temaRoda}</DetailItem>}
              </>
            )}

            {conteudo._type === 'encontroConscienciaNegra' && (
              <>
                {conteudo.edicao && <DetailItem label="Edição">{conteudo.edicao}ª Edição {conteudo.edicaoRomano ? `(${conteudo.edicaoRomano})` : ''}</DetailItem>}
                {conteudo.subtemaPrincipal && <DetailItem label="Subtema">{conteudo.subtemaPrincipal}</DetailItem>}
              </>
            )}

            {conteudo._type === 'mostraCultural' && (
              <>
                {conteudo.quantidadeAlunos && <DetailItem label="Nº de Participantes Estimado">{conteudo.quantidadeAlunos}</DetailItem>}
              </>
            )}

            {conteudo._type === 'eventoExterno' && (
              <>
                {conteudo.organizador && <DetailItem label="Organizador">{conteudo.organizador}</DetailItem>}
                {conteudo.tipoParticipacao && <DetailItem label="Participação">{conteudo.tipoParticipacao.replace('-', ' ')}</DetailItem>}
                {conteudo.linkEvento && <DetailItem label="Link do Evento"><a href={conteudo.linkEvento} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Acessar</a></DetailItem>}
              </>
            )}

            {conteudo._type === 'documento' && (
              <>
                {conteudo.tamanhoArquivo && <DetailItem label="Tamanho do Arquivo">{conteudo.tamanhoArquivo}</DetailItem>}
                {conteudo.dataVigencia && <DetailItem label="Vigência até">{formatDate(conteudo.dataVigencia)}</DetailItem>}
              </>
            )}

            {conteudo._type === 'noticia' && (
              <>
                {conteudo.categoriaNoticia && <DetailItem label="Categoria">{conteudo.categoriaNoticia.replace('-', ' ')}</DetailItem>}
              </>
            )}

            {/* LISTAS EXTENSAS (Ocupam linha inteira dependendo do tipo) */}

            {conteudo._type === 'mostraCultural' && conteudo.escolasParticipantes && conteudo.escolasParticipantes.length > 0 && (
              <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-3 mt-2">
                <span className="meta-label">Escolas Participantes</span>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                  {conteudo.escolasParticipantes.map((escola: string) => (
                    <span key={escola} className="badge-tipo badge-memoria">
                      {escola}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {conteudo._type === 'rodaAniversariantes' && conteudo.aniversariantes && conteudo.aniversariantes.length > 0 && (
              <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-3 mt-2">
                <span className="meta-label">Aniversariantes Homenageados</span>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                  {conteudo.aniversariantes.map((nome: string) => (
                    <span key={nome} className="badge-tipo badge-celebracao">
                      {nome}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {conteudo._type === 'encontroConscienciaNegra' && conteudo.mestresConvidados && conteudo.mestresConvidados.length > 0 && (
              <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-3 mt-2">
                <span className="meta-label">Mestres Convidados</span>
                <div className="flex flex-wrap gap-2">
                  {conteudo.mestresConvidados.map((nome: string) => (
                    <span key={nome} className="badge-tipo badge-oficina">
                      {nome}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {conteudo._type === 'documento' && 'arquivo' in conteudo && conteudo.arquivo && (
             <div className="mt-8 pt-8 border-t border-outline-variant/30 flex justify-start">
               <a 
                 href={`${conteudo.arquivo}?dl=`} 
                 className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-surface font-bold rounded-pill hover:bg-primary-hover hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
               >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                 BAIXAR ARQUIVO COMPLETO
               </a>
             </div>
          )}
        </div>
      </section>

      {/* CORPO DO TEXTO */}
      <article className="max-w-3xl mx-auto w-full px-6 py-12 prose max-w-none text-on-surface overflow-x-auto custom-scrollbar [&_p]:text-on-surface/80 [&_h1]:text-primary [&_h2]:text-primary [&_h3]:text-primary [&_strong]:text-primary">
        {conteudo.body ? (
          <PortableText value={conteudo.body} />
        ) : (
          <p className="text-on-surface/50 italic">Nenhum detalhe adicional fornecido para este evento.</p>
        )}
      </article>

      {/* GALERIA DE FOTOS COMPLETAS (MEMÓRIA) */}
      {galeriaFotos.length > 0 && (
        <section className="max-w-7xl mx-auto w-full px-6 py-16 border-t border-outline-variant/30">
          <header className="mb-10 text-center">
            <h2 className="text-3xl font-[var(--font-headline)] font-bold mb-3 text-on-surface">Galeria e Memória</h2>
            <p className="text-on-surface/70">Registros fotográficos e documentais</p>
          </header>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {galeriaFotos.map((foto, idx: number) => (
              <div 
                key={idx} 
                className="aspect-square bg-surface-container rounded-[12px] overflow-hidden group cursor-pointer border border-outline/10 hover:border-primary transition-colors shadow-sm"
              >
                <img
                  src={foto.url}
                  alt={foto.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
