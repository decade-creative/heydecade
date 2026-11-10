import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://heydecade.com',
  integrations: [
    react(),
    keystatic(),
    sitemap({ filter: (page) => !page.includes('/keystatic') && !page.includes('/api/') }),
  ],
  output: 'static',
  adapter: vercel(),
  security: { allowedDomains: [
    { hostname: 'heydecade.com', protocol: 'https' },
    { hostname: 'www.heydecade.com', protocol: 'https' },
  ] },
  vite: { optimizeDeps: { include: ['lodash/debounce'] } },
});
