// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Hosting: GitHub Pages (project page).
// CAMBIAMI-GH: sostituisci <user> con l'account GitHub che ospita il repo.
//   - Project page  → site: 'https://<user>.github.io', base: '/tinypaws-heaven'
//   - User/org page → site: 'https://<user>.github.io',  base: '/'  (repo <user>.github.io)
//   - Dominio custom → site: 'https://tinypawsheaven.org', base: '/'
const SITE = 'https://CAMBIAMI-GH.github.io';
const BASE = '/tinypaws-heaven';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sq'],
    routing: {
      prefixDefaultLocale: false, // EN alla root, albanese sotto /sq/
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', sq: 'sq' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
