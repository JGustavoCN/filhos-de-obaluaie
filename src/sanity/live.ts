import { defineLive } from 'next-sanity/live'
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: '2026-06-28',
  }),
  // We only enable browserToken for Stega if there's a token, but for this project we might not even need it for basic Draft Mode. 
  // Let's pass the token if available.
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
})
