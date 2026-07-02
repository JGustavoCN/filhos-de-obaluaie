/**
 * Schema Index — Centro Cultural Filhos de Obaluaiê
 * ─────────────────────────────────────────────────────────────
 * Exporta todos os document types para o Sanity Studio.
 * Cada tipo corresponde a um "traje visual" no frontend (Card Variant).
 *
 * Opção B: Document Types Separados (decisão de 29/06/2026)
 * Ref: docs/planejamento-cards-tipados.md §3
 */

// ── Singleton: Configurações do Site ────────────────────────
import { siteSettings } from './documentos/siteSettings'

// ── Eventos e Atividades ─────────────────────────────────────
import { rodaAniversariantes } from './documentos/rodaAniversariantes'
import { encontroConscienciaNegra } from './documentos/encontroConscienciaNegra'
import { rodaConsciencia } from './documentos/rodaConsciencia'
import { mostraCultural } from './documentos/mostraCultural'
import { oficina } from './documentos/oficina'
import { eventoExterno } from './documentos/eventoExterno'

// ── Publicações Institucionais ───────────────────────────────
import { documento } from './documentos/documento'
import { noticia } from './documentos/noticia'

export const schemaTypes = [
  // Singleton primeiro (Sanity Studio convention)
  siteSettings,

  // Eventos e atividades do Centro Cultural
  rodaAniversariantes,
  encontroConscienciaNegra,
  rodaConsciencia,
  mostraCultural,
  oficina,
  eventoExterno,

  // Publicações institucionais
  documento,
  noticia,
]
