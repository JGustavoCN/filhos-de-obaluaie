import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './src/structure'

export default defineConfig([
  {
    name: 'production',
    title: 'Produção (Oficial)',
    projectId: '1lha6jrn',
    dataset: 'production',
    basePath: '/production',
    plugins: [structureTool({ structure }), visionTool()],
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
    plugins: [structureTool({ structure }), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
])
