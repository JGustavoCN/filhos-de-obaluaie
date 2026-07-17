export type HistoriaTextMark = 'strong' | 'em'

export interface HistoriaTextSegment {
  text: string
  mark?: HistoriaTextMark
}

export type HistoriaRichText = HistoriaTextSegment[]

export interface HistoriaTitle {
  prefix: string
  highlight: string
  suffix?: string
}

export interface HistoriaImage {
  src: string
  alt: string
}

export interface HistoriaTimelineItem {
  id: string
  ano: string
  titulo: string
  descricao: string
}

export interface HistoriaMestre {
  id: string
  nome: string
  imagem: HistoriaImage
  periodo: string
  descricao: string
}

export interface HistoriaLinguagem {
  id: string
  titulo: string
  paragrafos: HistoriaRichText[]
  itens?: HistoriaRichText[]
}

export interface HistoriaEvento {
  id: string
  titulo: string
  descricao: string
  destaque?: string
}

export interface HistoriaContent {
  hero: {
    logo: HistoriaImage
    eyebrow: string
    titulo: HistoriaTitle
    descricao: string
    scrollLabel: string
  }
  origem: {
    eyebrow: string
    titulo: HistoriaTitle
    paragrafos: HistoriaRichText[]
    destaque: {
      titulo: string
      paragrafos: HistoriaRichText[]
    }
  }
  trajetoria: {
    eyebrow: string
    titulo: HistoriaTitle
    introducao: string
    significado: {
      titulo: string
      texto: HistoriaRichText
    }
  }
  linhaDoTempo: {
    eyebrow: string
    titulo: HistoriaTitle
    descricao: string
    itens: HistoriaTimelineItem[]
  }
  mestres: HistoriaMestre[]
  linguagensCulturais: {
    eyebrow: string
    titulo: HistoriaTitle
    introducao: HistoriaRichText[]
    linguagens: HistoriaLinguagem[]
  }
  eventos: {
    eyebrow: string
    titulo: HistoriaTitle
    introducao: string
    listaTitulo: string
    itens: HistoriaEvento[]
    apoios: {
      titulo: string
      texto: string
      projetoTitulo: string
      projetoTexto: HistoriaRichText
    }
    impacto: {
      titulo: string
      texto: string
    }
    acessibilidade: {
      titulo: string
      texto: string
    }
    ctaTexto: string
  }
  legado: {
    sede: {
      eyebrow: string
      titulo: HistoriaTitle
      introducao: string
      cardTitulo: string
      itens: HistoriaRichText[]
    }
    equipe: {
      eyebrow: string
      titulo: HistoriaTitle
      introducao: string
      cardTitulo: string
      paragrafos: HistoriaRichText[]
    }
  }
}

export const historiaContent: HistoriaContent = {
  hero: {
    logo: {
      src: '/logo.svg',
      alt: 'Logo Filhos de Obaluaiê',
    },
    eyebrow: 'Nossa História',
    titulo: {
      prefix: 'Mestre Bahia e ',
      highlight: 'Filhos de Obaluaiê',
    },
    descricao:
      'Conheça a trajetória de Josafá Alves dos Santos, o Mestre Bahia, e a construção de um espaço comunitário dedicado à capoeira, à cultura afro-brasileira, à educação e à formação cidadã em Tobias Barreto.',
    scrollLabel: 'Role para descobrir',
  },
  origem: {
    eyebrow: 'Origem e Formação',
    titulo: {
      prefix: 'O início de uma ',
      highlight: 'trajetória',
    },
    paragrafos: [
      [
        {
          text: 'Em 1987, Antônio Jorge da Conceição, conhecido como Mestre Nhô, chegou a Tobias Barreto para trabalhar na Endagro. Percebendo o interesse da juventude pela prática esportiva, começou a ministrar aulas na Associação Atlética Tobias Barreto e posteriormente criou a Academia J. J. Modelagem Física e o Grupo de Capoeira Novos Irmãos.',
        },
      ],
      [
        {
          text: 'Entre os jovens que participaram desse movimento estava ',
        },
        { text: 'Josafá Alves dos Santos, o Mestre Bahia', mark: 'strong' },
        {
          text: '. Sua dedicação o levou a auxiliar Mestre Nhô nas aulas para iniciantes e, mais tarde, a dar continuidade ao trabalho desenvolvido na academia.',
        },
      ],
    ],
    destaque: {
      titulo: 'De Tobias Barreto para São Paulo',
      paragrafos: [
        [
          {
            text: 'Natural de Tucano, na Bahia, e criado em Tobias Barreto, Mestre Bahia mudou-se para São Paulo em 1994 para aprofundar sua formação na capoeira. ',
          },
          { text: 'Mestre Zezinho', mark: 'strong' },
          {
            text: ' tornou-se uma referência importante nessa etapa de sua trajetória.',
          },
        ],
        [
          {
            text: 'Nesse período, Mestre Bahia também teve experiências formativas com ',
          },
          { text: 'Mestre Beiçola', mark: 'strong' },
          {
            text: ', em vivências ligadas ao grupo Dobrão de Ouro. No bairro do Glicério, reuniu jovens para atividades gratuitas de capoeira, aproximando formação cultural e trabalho social.',
          },
        ],
      ],
    },
  },
  trajetoria: {
    eyebrow: 'Trajetória e Identidade',
    titulo: {
      prefix: 'Da experiência de Mestre Bahia ao ',
      highlight: 'Centro Cultural',
    },
    introducao:
      'Em São Paulo, Mestre Bahia fortaleceu sua compreensão da capoeira como prática cultural, educativa e comunitária. A experiência do projeto "Capoeira - Uma Cultura de Paz" alimentou o sonho de retornar a Tobias Barreto e construir um espaço aberto à comunidade.',
    significado: {
      titulo: 'O que significa Obaluaiê?',
      texto: [
        {
          text: 'O grupo, inicialmente chamado Berimbau de Ouro, passou a se chamar Filhos de Obaluaiê em homenagem a Mestre Zezinho. ',
        },
        { text: 'Obaluaiê', mark: 'strong' },
        {
          text: ' é um nome de matriz iorubá associado ao senhor ou dono da terra. Sua adoção aproximou a identidade do grupo de referências da ancestralidade ',
        },
        { text: 'afro-brasileira', mark: 'em' },
        {
          text: ' que orientam seu trabalho cultural e comunitário.',
        },
      ],
    },
  },
  linhaDoTempo: {
    eyebrow: 'Linha do Tempo',
    titulo: {
      prefix: 'Nossa ',
      highlight: 'Jornada',
    },
    descricao:
      'Marcos documentados da caminhada de Mestre Bahia e da construção do Centro Cultural Filhos de Obaluaiê.',
    itens: [
      {
        id: 'semente-tobias-barreto',
        ano: '1987',
        titulo: 'A Semente em Tobias Barreto',
        descricao:
          'Mestre Nhô inicia uma atuação organizada de capoeira em Tobias Barreto. Mestre Bahia começa sua formação e passa a auxiliar as aulas para iniciantes.',
      },
      {
        id: 'aperfeicoamento-sao-paulo',
        ano: '1994',
        titulo: 'Aperfeiçoamento em São Paulo',
        descricao:
          'Mestre Bahia muda-se para São Paulo, amplia sua formação com diferentes referências e desenvolve atividades gratuitas de capoeira com jovens no bairro do Glicério.',
      },
      {
        id: 'retorno-renascimento',
        ano: '2005 - 2007',
        titulo: 'Retorno e construção do Centro',
        descricao:
          'Em 2005, Mestre Bahia retorna a Tobias Barreto e retoma, com apoio da comunidade, o antigo Centro de Interação Humana no bairro Santa Rita. O trabalho se consolida como Centro Cultural Filhos de Obaluaiê em 2007.',
      },
      {
        id: 'reconhecimento-nacional',
        ano: 'Ao longo dos anos',
        titulo: 'Cultura e vida comunitária',
        descricao:
          'O Centro amplia suas ações com capoeira, musicalidade, percussão, teatro, dança e manifestações afro-brasileiras, além de encontros, rodas e atividades abertas à comunidade.',
      },
      {
        id: 'expansao-acessibilidade',
        ano: '2022 - 2024',
        titulo: 'Projeto Bairro Cidadania',
        descricao:
          'O projeto Bairro Cidadania fortalece a oferta gratuita de atividades de capoeira, percussão e expressões cênicas, dando continuidade à atuação cultural e educativa da instituição.',
      },
    ],
  },
  mestres: [
    {
      id: 'mestre-nho',
      nome: 'Mestre Nhô',
      imagem: {
        src: '/images/mestre-nho.png',
        alt: 'Mestre Nhô',
      },
      periodo: '1987',
      descricao:
        'Antônio Jorge da Conceição, o Mestre Nhô, é uma referência fundamental na formação inicial de Mestre Bahia. Em 1987, iniciou uma atuação organizada de capoeira em Tobias Barreto, criou a Academia J. J. Modelagem Física e o Grupo de Capoeira Novos Irmãos.',
    },
    {
      id: 'mestre-zezinho',
      nome: 'Mestre Zezinho',
      imagem: {
        src: '/images/mestre-zezinho.png',
        alt: 'Mestre Zezinho',
      },
      periodo: 'São Paulo',
      descricao:
        'José Alípio Pureza, o Mestre Zezinho, foi uma referência importante na trajetória de Mestre Bahia em São Paulo. Sua memória também inspirou a adoção do nome Filhos de Obaluaiê.',
    },
    {
      id: 'mestre-bahia',
      nome: 'Mestre Bahia',
      imagem: {
        src: '/images/capoeira-master.png',
        alt: 'Mestre Bahia',
      },
      periodo: 'Década de 1980 - Atual',
      descricao:
        'Josafá Alves dos Santos, o Mestre Bahia, nasceu em Tucano, na Bahia, e foi criado em Tobias Barreto. Iniciou sua formação com Mestre Nhô, ampliou sua experiência em São Paulo e retornou para construir, junto à comunidade, um espaço de cultura, educação e valorização afro-brasileira.',
    },
  ],
  linguagensCulturais: {
    eyebrow: 'Linguagens Culturais',
    titulo: {
      prefix: 'Corpo, ritmo, memória e ',
      highlight: 'expressão',
    },
    introducao: [
      [
        {
          text: 'O Centro Cultural organiza sua atuação a partir da integração entre ',
        },
        { text: 'capoeira contemporânea, musicalidade, percussão e expressões cênicas afro-brasileiras', mark: 'strong' },
        { text: '. Essas linguagens articulam corpo, ritmo, memória, convivência e identidade cultural.' },
      ],
      [
        {
          text: 'As atividades são oferecidas gratuitamente à comunidade e atendem diferentes faixas etárias. Em projetos específicos, o trabalho prioriza crianças e adolescentes, fortalecendo convivência, autoestima, participação comunitária e valorização da cultura negra.',
        },
      ],
    ],
    linguagens: [
      {
        id: 'capoeira-contemporanea',
        titulo: 'Capoeira Contemporânea',
        paragrafos: [
          [
            {
              text: 'Manifestação cultural brasileira, prática corporal e linguagem educativa. As aulas abordam história, fundamentos, movimentos, instrumentos, códigos e ritmos, promovendo coordenação motora, equilíbrio, disciplina, respeito mútuo e consciência cultural.',
            },
          ],
        ],
      },
      {
        id: 'musicalidade-percussao',
        titulo: 'Musicalidade e Percussão',
        paragrafos: [
          [
            {
              text: 'As oficinas trabalham ritmo, escuta, coordenação, criatividade e improvisação por meio de instrumentos como ',
            },
            {
              text: 'berimbau, agogô, xequerê, atabaque, pandeiro, timbal e djembe',
              mark: 'strong',
            },
            { text: '.' },
          ],
          [
            { text: 'O repertório inclui ritmos ligados às expressões culturais negras, como ' },
            { text: 'ijexá, congo, nagô, cabula e barravento', mark: 'em' },
            { text: '.' },
          ],
        ],
      },
      {
        id: 'expressoes-cenicas-danca',
        titulo: 'Expressões Cênicas e Dança',
        paragrafos: [
          [
            {
              text: 'Teatro, dança e manifestações tradicionais trabalham expressão, movimento, memória, sincronia e criação coletiva. ',
            },
          ],
        ],
        itens: [
          [
            { text: 'Teatro e Dança Afro:', mark: 'strong' },
            { text: ' práticas de expressão cênica, presença corporal e afirmação cultural.' },
          ],
          [
            { text: 'Puxada de Rede e Samba de Coco:', mark: 'strong' },
            { text: ' manifestações que articulam música, dança, narrativa e participação coletiva.' },
          ],
          [
            { text: 'Maculelê:', mark: 'strong' },
            { text: ' prática afro-brasileira marcada pelo ritmo, pela coordenação e pelo uso de bastões.' },
          ],
        ],
      },
    ],
  },
  eventos: {
    eyebrow: 'Eventos e Vida Comunitária',
    titulo: {
      prefix: 'Cultura que se constrói em ',
      highlight: 'comunidade',
    },
    introducao:
      'O Centro Cultural recebe a comunidade em sua sede e também participa de ações em escolas, praças e outros espaços de Tobias Barreto, ampliando o contato do público com a cultura afro-brasileira.',
    listaTitulo: 'Mostras e Celebrações',
    itens: [
      {
        id: 'encontro-consciencia-negra',
        destaque: 'Encontro',
        titulo: 'Encontro da Consciência Negra',
        descricao:
          'O Encontro Internacional da Consciência Negra é uma das principais ações culturais da instituição. Realizado no período da Consciência Negra, promove apresentações, rodas, formação e intercâmbio entre participantes e mestres convidados.',
      },
      {
        id: 'rodas-aniversariantes',
        titulo: 'Rodas de Aniversariantes',
        descricao:
          'As Rodas de Aniversariantes são momentos de convivência com alunos e famílias, reunindo capoeira, brincadeiras, música, apresentações e partilha de alimentos.',
      },
      {
        id: 'mostra-cultural-escolas',
        titulo: 'Mostra Cultural nas Escolas',
        descricao:
          'As mostras culturais aproximam as atividades do Centro das escolas e da comunidade, reunindo capoeira, percussão, dança, teatro e outras expressões trabalhadas ao longo das oficinas.',
      },
    ],
    apoios: {
      titulo: 'Apoios Institucionais',
      texto:
        'Ao longo de sua trajetória, o Centro estabeleceu relações com a comunidade, escolas, poder público, redes culturais, comércio local e apoiadores. Editais e parcerias contribuíram para a continuidade de projetos e para melhorias no espaço do bairro Santa Rita.',
      projetoTitulo: 'O Projeto Bairro Cidadania',
      projetoTexto: [
        {
          text: 'Realizado entre 2022 e 2024, o Bairro Cidadania fortaleceu a oferta gratuita de atividades culturais e educativas. Sua execução contou, em diferentes períodos, com apoio público, articulação com entidades da capoeira e parcerias privadas, entre elas ',
        },
        { text: 'Honda, Grupo Ágape e Minas Calçados', mark: 'strong' },
        { text: '.' },
      ],
    },
    impacto: {
      titulo: 'Impacto Direto na Vida dos Jovens',
      texto:
        'Depoimentos registrados ao longo da trajetória do grupo associam a capoeira ao respeito, ao autocontrole, à convivência e à valorização da cultura afro-brasileira. As rodas de conversa conduzidas por Mestre Bahia também aparecem como momentos importantes de orientação, escuta e formação cidadã.',
    },
    acessibilidade: {
      titulo: 'Compromisso com a Acessibilidade',
      texto:
        'O Centro afirma o compromisso de acolher diferentes públicos e busca ampliar continuamente as condições de acessibilidade. Os documentos institucionais registram metas relacionadas à estrutura física, à comunicação acessível e à preparação da equipe para atender pessoas com deficiência.',
    },
    ctaTexto: 'Voltar para a Página Inicial',
  },
  legado: {
    sede: {
      eyebrow: 'Nossa Sede',
      titulo: {
        prefix: 'Um espaço de ',
        highlight: 'cultura e convivência',
      },
      introducao:
        'Localizada no bairro Santa Rita, a sede reúne ambientes e materiais destinados às atividades culturais, aos encontros da comunidade e à preservação da memória da instituição.',
      cardTitulo: 'Estrutura e Acervo Material',
      itens: [
        [{ text: 'Salão e materiais destinados às atividades culturais e corporais.' }],
        [
          { text: 'Sala de instrumentos com ' },
          { text: 'acervo bibliográfico', mark: 'strong' },
          { text: ' em processo de organização.' },
        ],
        [{ text: 'Cozinha e área de apoio utilizadas nas atividades e celebrações comunitárias.' }],
        [
          { text: 'Acervo de indumentárias e materiais de apresentação, incluindo ' },
          {
            text: 'redes de pesca, facões para maculelê, saias de palha, arreios, gibões e jalecos',
            mark: 'em',
          },
          { text: ' para as apresentações.' },
        ],
      ],
    },
    equipe: {
      eyebrow: 'Quem Faz Acontecer',
      titulo: {
        prefix: 'Uma construção ',
        highlight: 'coletiva',
      },
      introducao:
        'A trajetória iniciada por Mestre Bahia é sustentada pela participação de educadores, oficineiros, alunos, famílias, parceiros e moradores que contribuem para a continuidade das ações do Centro.',
      cardTitulo: 'Pessoas e Parcerias',
      paragrafos: [
        [
          {
            text: 'Os documentos institucionais registram a atuação de profissionais em diferentes linguagens culturais, entre eles ',
          },
          { text: 'Josafá Alves dos Santos', mark: 'strong' },
          { text: ' e ' },
          { text: 'José Fernando Araújo Freitas', mark: 'strong' },
          { text: ' (Capoeira); ' },
          { text: 'Rafael Araújo Santos', mark: 'strong' },
          { text: ' e ' },
          { text: 'Emanoel de Jesus', mark: 'strong' },
          { text: ' (Percussão); ' },
          { text: 'João Paulo Marciel Santos', mark: 'strong' },
          { text: ' e ' },
          { text: 'Olívia de Souza', mark: 'strong' },
          { text: ' (Dança e Teatro), em diferentes períodos e projetos.' },
        ],
        [
          { text: 'A atuação do Centro também se articula com escolas, coletivos culturais, instituições públicas e comunidades como o ' },
          { text: 'Povoado Jabiberi', mark: 'em' },
          { text: ', ampliando o alcance das atividades para além da sede.' },
        ],
      ],
    },
  },
}
