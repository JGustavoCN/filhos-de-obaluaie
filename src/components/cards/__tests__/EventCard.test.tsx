import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import EventCard from '../EventCard';
import { EventoProps, EventoType } from '../types';

describe('EventCard Accessibility - Auditoria Completa', () => {
  // Lista exata com todos os tipos disponíveis no EventCard
  const tiposDeCards: EventoType[] = [
    'aniversario',
    'consciencia-negra',
    'roda-consciencia',
    'mostra-escolar',
    'oficina',
    'evento-externo',
    'documento',
    'noticia'
  ];

  // Base padrão para gerar propriedades fictícias de sucesso
  const mockBaseData: Partial<EventoProps> = {
    id: 'test-auto',
    titulo: 'Título do Evento de Teste',
    resumo: 'Descrição simulada para forçar o preenchimento da tag e testar o contraste da cor do texto secundário.',
    dataEvento: '10 Nov 2026',
    local: 'Centro Cultural',
    linkArquivo: '#',
    tamanhoArquivo: '1MB'
  };

  describe.each(tiposDeCards)('Scanner WCAG no tipo: %s', (tipo) => {
    it(`não deve possuir violações de acessibilidade visual no card ${tipo}`, async () => {
      // Mesclamos o tipo atual com os dados base
      const mockData = { ...mockBaseData, tipo } as EventoProps;

      const { container } = render(<EventCard data={mockData} />);
      
      // O jest-axe fará o scanner completo buscando falhas de contraste (cores)
      const results = await axe(container);
      
      // Asserção
      expect(results).toHaveNoViolations();
    });
  });

  // TESTE PROPOSITAMENTE DEFEITUOSO (Desativado)
  it.skip('teste FALHO: deve ser pego no flagra pelo jest-axe', async () => {
    // Renderizamos uma violação que o jsdom pega (imagens sem texto alternativo e botão inacessível)
    const { container } = render(
      <div>
        <h2>Imagem Ilegível para Cegos</h2>
        <img src="https://example.com/imagem-sem-alt.jpg" />
        <button></button>
      </div>
    );
    
    const results = await axe(container);
    
    // Vai falhar de propósito com um log vermelho sobre a tag ALT e o Botão!
    expect(results).toHaveNoViolations();
  });
});
