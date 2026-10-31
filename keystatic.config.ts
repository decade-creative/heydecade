import { config, fields, collection, singleton } from '@keystatic/core';

// ====== GANTI DUA BARIS INI ======
const GITHUB_OWNER = 'decade-creative';
const GITHUB_REPO = 'heydecade';
// =================================

// Di website yang sudah online, dashboard menyimpan konten langsung ke GitHub.
// Di komputermu (npm run dev), dashboard menyimpan ke file lokal (praktis untuk uji coba).
const useGithub =
  import.meta.env.PROD || import.meta.env.PUBLIC_KEYSTATIC_STORAGE === 'github';

export default config({
  storage: useGithub
    ? { kind: 'github', repo: { owner: decade-creative, name: heydecade } }
    : { kind: 'local' },

  ui: { brand: { name: 'Decade Studio' } },

  singletons: {
    settings: singleton({
      label: 'Site settings',
      path: 'src/content/settings',
      schema: {
        siteName: fields.text({ label: 'Studio name', defaultValue: 'Decade Studio' }),
        eyebrow: fields.text({ label: 'Small text above the name', defaultValue: 'Hey, We Are' }),
        tagline: fields.text({
          label: 'Tagline',
          multiline: true,
          defaultValue:
            'Visual designer working across apparel, packaging, and corporate identity. Available for new work.',
        }),
        email: fields.text({ label: 'Contact email', defaultValue: 'hello@example.com' }),
        showCv: fields.checkbox({
          label: 'Show "Download CV" button',
          description: 'Centang untuk menampilkan, hapus centang untuk menyembunyikan.',
          defaultValue: false,
        }),
        cv: fields.file({
          label: 'CV file (PDF)',
          directory: 'public/files',
          publicPath: '/files/',
        }),
      },
    }),
  },

  collections: {
    // Portofolio. Untuk menambah kategori baru, tambahkan di daftar "options".
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Apparel', value: 'Apparel' },
            { label: 'Packaging', value: 'Packaging' },
            { label: 'Corporate', value: 'Corporate' },
          ],
          defaultValue: 'Apparel',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        image: fields.image({
          label: 'Cover image',
          directory: 'public/images/projects',
          publicPath: '/images/projects/',
          validation: { isRequired: true },
        }),
        link: fields.url({ label: 'External link (optional, e.g. Behance)' }),
        order: fields.integer({
          label: 'Order (1 = first on the page)',
          defaultValue: 100,
        }),
      },
    }),

    // Aset gratis yang diunduh lewat Gumroad.
    freebies: collection({
      label: 'Freebies',
      slugField: 'title',
      path: 'src/content/freebies/*',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Illustration', value: 'Illustration' },
            { label: 'Mockup', value: 'Mockup' },
            { label: 'Other', value: 'Other' },
          ],
          defaultValue: 'Illustration',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        image: fields.image({
          label: 'Preview image',
          directory: 'public/images/freebies',
          publicPath: '/images/freebies/',
          validation: { isRequired: true },
        }),
        gumroadUrl: fields.url({
          label: 'Gumroad download link',
          validation: { isRequired: true },
        }),
        license: fields.text({
          label: 'License / terms',
          multiline: true,
          defaultValue: 'Free for personal and commercial use. Credit is appreciated.',
        }),
        order: fields.integer({
          label: 'Order (1 = first on the page)',
          defaultValue: 100,
        }),
      },
    }),
  },
});
