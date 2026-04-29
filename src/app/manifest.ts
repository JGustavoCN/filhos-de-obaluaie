import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Filhos de Obaluaiê — Centro Cultural',
    short_name: 'Filhos de Obaluaiê',
    description: 'Plataforma institucional do Centro Cultural e de Capoeira Filhos de Obaluaiê, localizado em Tobias Barreto/SE. Portfólio de projetos sociais, acervo documental e registro de expressões afro-brasileiras como capoeira, maculelê, dança afro e samba de coco.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF6F0',
    theme_color: '#7A3123',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
