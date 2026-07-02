import React from 'react';
import { EventoProps } from './types';
import { CalendarIcon, DocumentIcon } from './icons';
import { formatDateShort } from '@/lib/formatDate';

export default function CardDocumento({ data }: { data: EventoProps }) {
  const downloadHref = data.arquivo ?? data.linkExterno ?? '#'
  const dataDisplay = formatDateShort(data.dataCard ?? data.dataPublicacao ?? data.dataEvento ?? '')

  const subtipoLabel: Record<string, string> = {
    edital: 'Edital',
    relatorio: 'Relatório',
    estatuto: 'Estatuto',
    ata: 'Ata',
    convenio: 'Convênio',
    'plano-trabalho': 'Plano de Trabalho',
    'prestacao-contas': 'Prestação de Contas',
  }
  const documentoLabel = data.subtipoDocumento
    ? subtipoLabel[data.subtipoDocumento] ?? data.subtipoDocumento
    : 'Documento'

  return (
    <a href={downloadHref} target="_blank" rel="noopener noreferrer" className="glass-card p-4 flex items-center gap-4 group hover:bg-[var(--glass-bg-hover)] hover:border-[var(--color-primary)] transition-all w-full cursor-pointer">
      <div className="w-10 h-10 rounded bg-[var(--color-surface-container-high)] border border-[var(--color-outline-variant)] flex items-center justify-center text-[var(--color-on-surface)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors shrink-0">
        <DocumentIcon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-[var(--color-on-surface)] truncate group-hover:text-[var(--color-primary)] transition-colors">
          {data.titulo}
        </h4>
        <div className="meta-row mt-2">
          <span className="badge-tipo badge-documento">{documentoLabel}</span>
          {dataDisplay && (
            <span className="meta-date">
              <CalendarIcon /> {dataDisplay}
            </span>
          )}
          {data.tamanhoArquivo && <span className="meta-tag">{data.tamanhoArquivo}</span>}
        </div>
      </div>
      <div className="shrink-0 hidden sm:block">
        <span className="badge-tipo badge-surface group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-[var(--color-primary)]">
          Baixar ↓
        </span>
      </div>
    </a>
  );
}
