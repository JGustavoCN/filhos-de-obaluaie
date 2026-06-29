import React from 'react';
import { EventoProps } from './types';
import { PartyIcon, CalendarIcon, CakeIcon } from './icons';

export default function CardAniversario({ data }: { data: EventoProps }) {
  const imgCapa = data.imagemCapa || "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=400&q=80";
  const aniversariantes = data.aniversariantes || [];

  return (
    <div className="glass-card card-aniversario flex flex-col items-center relative overflow-hidden group border-t-4 border-t-[var(--color-primary)] h-full">
      
      {/* Fundo Animado Festivo (Sutil para respeitar os 4 estados do glass-card) */}
      <div className="absolute inset-0 bg-aniversario-gradient opacity-30 dark:opacity-15 pointer-events-none z-0 transition-opacity duration-300 group-hover:opacity-40 dark:group-hover:opacity-25"></div>

      {/* Marca d'água de Bolo - Usando cor primária com opacidade para aparecer bem no Light e Dark mode */}
      <div className="absolute -right-4 -top-4 text-[var(--color-primary)] opacity-10 dark:opacity-20 z-0 rotate-12 transition-all duration-1000 group-hover:rotate-0 group-hover:scale-125 group-hover:opacity-20 dark:group-hover:opacity-30">
        <CakeIcon className="w-48 h-48 drop-shadow-sm" />
      </div>

      <div className="relative z-10 w-full p-6 flex flex-col flex-1 items-center">
        
        {/* Avatar Centralizado no Topo */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border-4 border-white dark:border-[var(--color-surface)] shadow-xl mb-4 transition-transform duration-500 group-hover:scale-110">
          <img src={imgCapa} alt={data.titulo} className="w-full h-full object-cover" />
        </div>

        <span className="badge-tipo bg-[var(--color-secondary)] text-[var(--color-on-surface)] mb-3 shadow-md flex items-center gap-2">
          <PartyIcon className="w-4 h-4 text-[var(--color-primary)]" /> Celebração do Mês
        </span>
        
        <h3 className="text-2xl font-headline font-bold text-[var(--color-on-surface)] mb-4 text-center">
          {data.titulo}
        </h3>
        
        {/* Lista COMPLETA de Aniversariantes */}
        {aniversariantes.length > 0 && (
          <div className="w-full bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-lg p-3.5 mb-5 shadow-inner border border-[var(--color-outline-variant)]/50">
            <h4 className="text-xs font-bold text-[var(--color-on-surface-light)] uppercase tracking-wider mb-3 flex items-center justify-center gap-1.5 border-b border-[var(--color-outline-variant)]/50 pb-2">
              <CakeIcon className="w-3.5 h-3.5 text-[var(--color-primary)]" /> Lista de Celebrantes
            </h4>
            <div className="flex flex-wrap gap-2 justify-center max-h-[110px] overflow-y-auto pr-1 custom-scrollbar">
              {aniversariantes.map((nome, i) => (
                <span key={i} className="text-xs font-bold px-3 py-1.5 bg-[var(--color-surface)] text-[var(--color-on-surface)] rounded-md shadow-sm border border-[var(--color-secondary)] transition-colors hover:bg-[var(--color-secondary-hover)] cursor-default">
                  {nome}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Resumo com max-w-full para não quebrar no grid */}
        {data.resumo && (
          <p className="text-[var(--color-on-surface-light)] text-sm mb-6 leading-relaxed text-center w-full">
            {data.resumo}
          </p>
        )}
        
        <div className="mt-auto w-full flex justify-center">
          {data.dataEvento && (
            <p className="inline-flex text-sm font-bold text-[var(--color-primary)] items-center gap-1.5 bg-[var(--color-secondary)] px-4 py-2 rounded-full shadow-md">
              <CalendarIcon className="w-4 h-4" /> {data.dataEvento}
            </p>
          )}
        </div>
      </div>
      
      {/* CSS Injetado para Animação e Scroll */}
      <style>{`
        .bg-aniversario-gradient {
          background: linear-gradient(-45deg, var(--color-surface), var(--color-secondary-container), var(--color-surface), var(--color-primary-container));
          background-size: 400% 400%;
          animation: gradientBG 8s ease infinite;
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--color-outline-variant);
          border-radius: 5px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: var(--color-primary);
        }
      `}</style>
    </div>
  );
}
