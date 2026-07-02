import React from 'react';
import { EventoProps } from './types';
import { AtabaqueIcon, MaskIcon, BerimbauIcon } from './icons';

export default function CardOficina({ data }: { data: EventoProps }) {
  const isPercussao = data.subtipoOficina === 'percussao';
  const frameClass = isPercussao ? 'card-9slice-secondary' : 'card-9slice';

  const Icone = data.subtipoOficina === 'percussao'
    ? AtabaqueIcon
    : data.subtipoOficina === 'danca-teatro'
      ? MaskIcon
      : BerimbauIcon;

  const fallbackImg = 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop';
  const imgSrc = data.imagemCapa || fallbackImg;

  return (
    <div className={`${frameClass} relative overflow-hidden flex flex-col group spring-transition hover:-translate-y-2 hover:shadow-xl h-full`}>
      {/* Foto de fundo — fica ATRÁS da moldura 9-slice */}
      <img
        src={imgSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 rounded-[var(--radius-card)]"
      />

      {/* Conteúdo sobre a foto */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Área da imagem visível (topo sem fundo opaco) */}
        <div className="relative w-full aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Badge de modalidade */}
          <div className="glass-card absolute bottom-4 left-5 z-10 flex max-w-[calc(100%-2.5rem)] items-center gap-3 p-2 pr-3">
            <div className="w-11 h-11 flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full shadow-lg">
              <Icone className="w-5 h-5" />
            </div>
            <span className="badge-tipo badge-oficina">
              {isPercussao ? 'Percussão' : data.subtipoOficina === 'danca-teatro' ? 'Dança & Teatro' : 'Capoeira'}
            </span>
          </div>
        </div>

        {/* Área descritiva com fundo semi-transparente */}
        <div className="p-6 flex flex-col flex-1 bg-[var(--glass-bg)] backdrop-blur-sm">
          <h3 className="text-2xl font-headline font-bold text-[var(--color-on-surface)] mb-3 group-hover:text-[var(--color-primary)] transition-colors leading-tight">
            {data.titulo}
          </h3>

          {data.resumo && (
            <p className="text-[var(--color-on-surface-light)] text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
              {data.resumo}
            </p>
          )}

          <div className="meta-row mt-auto border-t border-[var(--color-outline-variant)] pt-4">
            {data.oficineiro && (
              <span className="flex min-w-0 flex-col gap-1">
                <span className="meta-label">Oficineiro</span>
                <span className="meta-value">{data.oficineiro}</span>
              </span>
            )}
            {data.horarios && (
              <span className="flex min-w-0 flex-col gap-1">
                <span className="meta-label">Horários</span>
                <span className="meta-value">{data.horarios}</span>
              </span>
            )}
            {data.faixaEtaria && (
              <span className="meta-tag">
                {data.faixaEtaria}
              </span>
            )}
            {data.vagas && (
              <span className="meta-tag">
                {data.vagas} vagas
              </span>
            )}
            {data.inscricoesAbertas && (
              <span className="badge-tipo badge-oficina">
                Inscrições abertas
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

