import React from 'react';
import { EventoProps } from './types';
import { DocumentIcon } from './icons';
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

  return (
    <a href={downloadHref} target="_blank" rel="noopener noreferrer" className="glass-card p-4 flex items-center gap-4 group hover:bg-[var(--glass-bg-hover)] hover:border-[var(--color-primary)] transition-all w-full cursor-pointer">
      <div className="w-10 h-10 rounded bg-[var(--color-surface-container-high)] border border-[var(--color-outline-variant)] flex items-center justify-center text-[var(--color-on-surface)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors shrink-0">
        <DocumentIcon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-[var(--color-on-surface)] truncate group-hover:text-[var(--color-primary)] transition-colors">
          {data.titulo}
        </h4>
        <div className="flex gap-2 text-xs font-bold text-[var(--color-outline)] mt-1 flex-wrap">
          {data.subtipoDocumento && <span className="text-[var(--color-primary)] font-bold">{subtipoLabel[data.subtipoDocumento] ?? data.subtipoDocumento}</span>}
          {dataDisplay && <><span>•</span><span>{dataDisplay}</span></>}
          {data.tamanhoArquivo && <><span>•</span><span>{data.tamanhoArquivo}</span></>}
        </div>
      </div>
      <div className="shrink-0 hidden sm:block">
        <span className="badge-tipo bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors border border-[var(--color-outline-variant)] group-hover:border-[var(--color-primary)]">
          Baixar ↓
        </span>
      </div>
    </a>
  );
}
