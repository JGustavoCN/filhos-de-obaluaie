import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig([
  {
    name: 'production',
    title: 'Produção (Oficial)',
    projectId: '1lha6jrn',
    dataset: 'production',
    basePath: '/production',
    plugins: [structureTool(), visionTool()],
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
    plugins: [structureTool(), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
])
