import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// Halaman website di-build statis (cepat & murah).
// Hanya halaman admin (/keystatic) yang berjalan di server, karena butuh login.
export default defineConfig({
  // GANTI dengan domainmu (dipakai untuk link preview di WhatsApp/LinkedIn)
  site: 'https://heydecade.com',
  integrations: [react(), keystatic()],
  output: 'static',
  adapter: vercel(),
  vite: {
    // Memperbaiki dashboard yang putih/kosong di komputer lokal
    // (error "does not provide an export named 'default'" dari lodash).
    optimizeDeps: {
      include: ['lodash/debounce'],
    },
  },
});
