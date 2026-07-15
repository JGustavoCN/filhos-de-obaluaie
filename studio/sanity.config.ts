import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './src/structure'
import {theme} from './src/theme'
import {Logo} from './src/components/Logo'
import {Icon} from './src/components/Icon'

import {dashboard} from './src/dashboard'

export default defineConfig([
  {
    name: 'production',
    title: 'Produção (Oficial)',
    projectId: '1lha6jrn',
    dataset: 'production',
    basePath: '/production',
    theme,
    icon: Icon,
    studio: {
      components: {
        logo: Logo
      }
    },
    plugins: [
      dashboard,
      presentationTool({
        previewUrl: {
          origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
          previewMode: {
            enable: '/api/draft-mode/enable',
          },
        },
      }),
      structureTool({ structure }),
      visionTool(),
    ],
    schema: {
      types: schemaTypes,
    },
  },
  {
    name: 'development',
    title: 'Desenvolvimento (Testes)',
    projectId: '1lha6jrn',
    dataset: 'development',
    basePath: '/development',
    theme,
    icon: Icon,
    studio: {
      components: {
        logo: Logo
      }
    },
    plugins: [
      dashboard,
      presentationTool({
        previewUrl: {
          origin: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
          previewMode: {
            enable: '/api/draft-mode/enable',
          },
        },
      }),
      structureTool({ structure }),
      visionTool(),
    ],
    schema: {
      types: schemaTypes,
    },
  },
])
