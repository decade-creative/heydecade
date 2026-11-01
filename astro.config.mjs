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
  // Daftar domain yang sah. Tanpa ini, server mengira namanya "localhost"
  // dan login GitHub di dashboard ditolak.
  security: {
    allowedDomains: [
      { hostname: 'heydecade.com', protocol: 'https' },
      { hostname: 'www.heydecade.com', protocol: 'https' },
    ],
  },
  vite: {
    // Memperbaiki dashboard yang putih/kosong di komputer lokal
    // (error "does not provide an export named 'default'" dari lodash).
    optimizeDeps: {
      include: ['lodash/debounce'],
    },
  },
});
