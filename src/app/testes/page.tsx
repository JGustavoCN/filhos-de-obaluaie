import React from 'react';
import EventCard from '@/components/cards/EventCard';
import { EventoProps } from '@/components/cards/types';
import ThemeToggle from '@/components/ThemeToggle';

export const eventosMock: EventoProps[] = [
    {
      id: "1",
      tipo: "aniversario",
      titulo: "Aniversariantes de Julho",
      resumo: "Vamos celebrar a vida de nossa comunidade com muita roda, bolo e alegria. Traga sua família!",
      dataEvento: "25/07/2026",
      aniversariantes: ["Mestre Zé", "João Pedro", "Maria Eduarda", "Aline Santos", "Roberto Carlos", "Juliana Silva", "José", "Mario", "Ana", "Carlos", "Edward", "Rodrigo", "Fernando", "Lucas", "Gabriel", "Rafael", "Pedro", "Mateus", "Lucas", "Gabriel", "Rafael", "Pedro", "Mateus", "Lucas", "Gabriel", "Rafael", "Pedro", "Mateus"]
    },
    {
      id: "2",
      tipo: "consciencia-negra",
      titulo: "Encontro Internacional da Consciência Negra",
      resumo: "Um momento de afirmação, história, palestras internacionais, grandes rodas de capoeira e culinária ancestral.",
      dataEvento: "20/11/2026",
      local: "Centro Cultural / Praça Central",
      edicao: 17,
    },
    {
      id: "3",
      tipo: "roda-consciencia",
      titulo: "A Ancestralidade no Jogo de Angola",
      resumo: "Nesta Roda-Consciência focada no Jogo de Angola, receberemos o Mestre Cobra Mansa para uma jornada de autoconhecimento e conexão histórica. Exploraremos como os fundamentos, a musicalidade e a vadiagem da capoeira atuam há séculos como instrumentos de resistência, libertação e cura.",
      dataEvento: "15/09/2026",
      mestreConvidado: "Mestre Cobra Mansa",
    },
    {
      id: "4",
      tipo: "mostra-escolar",
      titulo: "Mostra Cultural 2026",
      dataEvento: "12/12/2026",
      local: "Quadra da Escola Municipal",
      escolasParticipantes: ["EM Iraildes", "EM Nicodemos", "EM Telma"],
    },
    {
      id: "5",
      tipo: "oficina",
      titulo: "Oficina de Percussão",
      resumo: "Aprenda toques de atabaque, agogô e pandeiro.",
      dataEvento: "Segundas e Quartas, 18h",
      local: "Crianças de 8 a 14 anos",
      subtipoOficina: "percussao",
    },
    {
      id: "6",
      tipo: "oficina",
      titulo: "Aulas de Capoeira",
      resumo: "Movimentação, história, canto e disciplina para jovens e adultos.",
      dataEvento: "Terças e Quintas, 19h",
      local: "Jovens e Adultos",
      subtipoOficina: "capoeira",
    },
    {
      id: "7",
      tipo: "evento-externo",
      titulo: "Sarau 'Tobias, sou Eu!'",
      resumo: "Apresentação Musical",
      dataEvento: "10/08/2026",
      local: "Praça do Cruzeiro",
    },
    {
      id: "8",
      tipo: "noticia",
      titulo: "Inscrições abertas para as oficinas de 2027",
      resumo: "Não perca o prazo para garantir sua vaga nas oficinas de percussão, capoeira e teatro. Vagas limitadas para novos alunos.",
      dataEvento: "01/12/2026",
    },
    {
      id: "9",
      tipo: "documento",
      titulo: "Edital de Seleção Cultural 2026",
      dataEvento: "15/01/2026",
      tamanhoArquivo: "2.4 MB",
      arquivo: "#",
    },
    {
      id: "10",
      tipo: "documento",
      titulo: "Relatório Anual de Atividades 2025",
      dataEvento: "10/02/2026",
      tamanhoArquivo: "5.1 MB",
      arquivo: "#",
    },
    {
      id: "11",
      tipo: "noticia",
      titulo: "Terreiro inaugura nova biblioteca",
      resumo: "Um novo espaço de leitura comunitária voltado para obras sobre cultura afro, romance e poesia negra.",
      dataEvento: "12/08/2026",
    },
    {
      id: "12",
      tipo: "noticia",
      titulo: "Doação de Cestas Básicas",
      resumo: "No último fim de semana, a campanha solidária arrecadou toneladas de alimentos para as famílias da comunidade.",
      dataEvento: "05/08/2026",
    },
    {
      id: "13",
      tipo: "aniversario",
      titulo: "Batizado da Capoeira Angola",
      resumo: "Dia de graduação e troca de cordões para os nossos novos capoeiristas.",
      dataEvento: "22/10/2026",
    }
];

export default function TestesPage() {


  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-4xl font-headline font-bold text-[var(--color-primary)] mb-4">
            Testes Visuais: Cards Tipados
          </h1>
          <ThemeToggle />
        </div>
        <p className="text-[var(--color-on-surface-light)] max-w-2xl text-lg">
          Esta página serve exclusivamente para visualizar os novos modelos de cards 
          antes da integração final com o banco de dados. Os dados exibidos aqui são mocks (dados falsos) 
          que simulam os tipos de conteúdo do planejamento.
        </p>
      </div>

      <div className="space-y-20">
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 1. Hero Card: Consciência Negra (largura completa)        */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-1 h-12 rounded-full bg-[var(--color-primary)]" />
            <div>
              <h2 className="text-xl font-bold text-[var(--color-on-surface)]">
                Card &quot;Hero&quot; — Maior Destaque
              </h2>
              <p className="text-sm text-[var(--color-on-surface-light)]">
                Layout único, largura máxima centralizada. Para o evento principal do ano.
              </p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <EventCard data={eventosMock.find(e => e.tipo === 'consciencia-negra')!} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 2. Cards de Formato Especial (2 colunas)                  */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-1 h-12 rounded-full bg-[var(--color-primary)]" />
            <div>
              <h2 className="text-xl font-bold text-[var(--color-on-surface)]">
                Cards de Formato Especial
              </h2>
              <p className="text-sm text-[var(--color-on-surface-light)]">
                Aniversariantes (horizontal) e Roda da Consciência (borda-citação). Grid de 2 colunas.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EventCard data={eventosMock.find(e => e.tipo === 'aniversario')!} />
            <EventCard data={eventosMock.find(e => e.tipo === 'roda-consciencia')!} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 3. Oficinas (2 colunas — mesmo porte de ProjectsSection)  */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-1 h-12 rounded-full bg-[var(--color-primary)]" />
            <div>
              <h2 className="text-xl font-bold text-[var(--color-on-surface)]">
                Oficinas e Aulas Permanentes
              </h2>
              <p className="text-sm text-[var(--color-on-surface-light)]">
                Cards com imagem hero, ícone de modalidade e dados de horário/público. Grid de 2 colunas.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EventCard data={eventosMock.find(e => e.id === '5')!} />
            <EventCard data={eventosMock.find(e => e.id === '6')!} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 4. Mostra Escolar + Notícias (2 colunas)                  */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-1 h-12 rounded-full bg-[var(--color-primary)]" />
            <div>
              <h2 className="text-xl font-bold text-[var(--color-on-surface)]">
                Mostra Escolar e Notícias
              </h2>
              <p className="text-sm text-[var(--color-on-surface-light)]">
                Mostra com mosaico de fotos e tags de escolas. Notícia com layout vertical padrão.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EventCard data={eventosMock.find(e => e.tipo === 'mostra-escolar')!} />
            <EventCard data={eventosMock.find(e => e.tipo === 'noticia')!} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 5. Layouts Compactos (Eventos Externos + Documentos)      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-1 h-12 rounded-full bg-[var(--color-primary)]" />
            <div>
              <h2 className="text-xl font-bold text-[var(--color-on-surface)]">
                Layouts Compactos — Eventos Externos e Documentos
              </h2>
              <p className="text-sm text-[var(--color-on-surface-light)]">
                Cards horizontais e minimalistas. Grid de 2 colunas com subgrupos.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-outline)] mb-2 flex items-center gap-2">
                <span className="w-8 h-px bg-[var(--color-primary)]" />
                Eventos Externos
              </h3>
              <EventCard data={eventosMock.find(e => e.tipo === 'evento-externo')!} />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-outline)] mb-2 flex items-center gap-2">
                <span className="w-8 h-px bg-[var(--color-primary)]" />
                Documentos
              </h3>
              <EventCard data={eventosMock.find(e => e.id === '9')!} />
              <EventCard data={eventosMock.find(e => e.id === '10')!} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

