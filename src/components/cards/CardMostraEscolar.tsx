import React from 'react';
import { EventoProps } from './types';
import { MaskIcon, CalendarIcon, LocationIcon } from './icons';
import { formatDateShort } from '@/lib/formatDate';

export default function CardMostraEscolar({ data }: { data: EventoProps }) {
  const fotosGaleria = (data.galeria ?? [])
    .filter((foto): foto is string => Boolean(foto))
    .slice(0, 3);
  const capaUrl = data.imagemCapa || fotosGaleria[0];

  // Rotações para as "polaroids"
  const rotations = ["-rotate-6", "rotate-2", "-rotate-3"];

  return (
    <div className="glass-card bogolan-pattern relative overflow-hidden flex flex-col h-full spring-transition hover:-translate-y-2 hover:shadow-xl border-t-4 border-t-[var(--color-primary)]">
      {/* Background fill com menor opacidade para mostrar o pattern bogolan */}
      <div className="absolute inset-0 bg-[var(--color-surface)] opacity-90 z-0"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Capa Principal Hero (Maior para ver mais da foto) */}
        <div className="relative w-full h-64 sm:h-72 overflow-hidden shadow-inner">
          {capaUrl ? (
            <img src={capaUrl} alt="" aria-hidden="true" className="w-full h-full object-cover" />
          ) : (
            <div aria-hidden="true" className="flex h-full w-full items-center justify-center bg-[var(--color-surface-container-high)] text-[var(--color-primary)]">
              <MaskIcon className="h-16 w-16 opacity-60" />
            </div>
          )}
          {/* Gradiente sutil só para dar acabamento na base da foto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
        
        {/* Mosaico de fotos tipo Polaroids - Sobrepondo a base da capa de forma inteligente */}
        <div className="flex justify-center gap-3 sm:gap-4 -mt-12 mb-5 px-2 z-20">
          {fotosGaleria.map((foto, i) => (
            <div 
              key={i} 
              className={`relative w-24 h-24 sm:w-28 sm:h-28 aspect-square rounded-md overflow-hidden bg-white p-1.5 shadow-lg transition-all duration-500 hover:scale-125 ${rotations[i]} hover:rotate-0 hover:z-30 cursor-pointer`}
              style={{ zIndex: i === 1 ? 25 : 20 }}
            >
              <img src={foto} alt="" className="w-full h-full object-cover rounded-sm" />
            </div>
          ))}
        </div>

        <div className="p-6 pt-2 flex flex-col flex-1">
          <span className="badge-tipo badge-evento mb-4 mx-auto">
            Mostra cultural
          </span>

          {/* Título perfeitamente legível (WCAG garantido) logo abaixo das fotos */}
          <h3 className="text-2xl font-headline font-bold text-[var(--color-primary)] mb-6 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary-container)] flex items-center justify-center text-[var(--color-primary)] shadow-sm">
              <MaskIcon className="w-5 h-5" />
            </div>
            {data.titulo || 'Mostra Cultural'}
          </h3>

          {/* Escolas com cores alternadas (Paleta Intercalada) */}
          {data.escolasParticipantes && data.escolasParticipantes.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {data.escolasParticipantes.map((escola, i) => {
                const isPrimary = i % 2 === 0;
                return (
                  <span 
                    key={i} 
                    className={`text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm transition-colors ${
                      isPrimary 
                        ? 'bg-[var(--color-primary)] text-white' 
                        : 'bg-[var(--color-secondary)] text-[var(--color-on-surface)] border border-[var(--color-outline-variant)]'
                    }`}
                  >
                    {escola}
                  </span>
                );
              })}
            </div>
          )}

          <div className="meta-row justify-between mt-auto border-t border-[var(--color-outline-variant)] pt-4">
            {(data.dataCard ?? data.dataEvento) && (
              <span className="meta-date">
                <CalendarIcon />
                {formatDateShort(data.dataCard ?? data.dataEvento ?? '')}
              </span>
            )}
            {data.quantidadeAlunos && <span className="meta-tag">{data.quantidadeAlunos} alunos</span>}
            {data.local && (
              <span className="meta-value text-right">
                <LocationIcon className="text-[var(--color-primary)]" /> {data.local}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
