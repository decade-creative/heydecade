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
    ? { kind: 'github', repo: { owner: GITHUB_OWNER, name: GITHUB_REPO } }
    : { kind: 'local' },

  ui: { brand: { name: 'Decade Studio' } },

  singletons: {
    settings: singleton({
      label: 'Site settings',
      path: 'src/content/settings',
      schema: {
        siteName: fields.text({ label: 'Studio name', defaultValue: 'Decade Studio' }),
        seoTitle: fields.text({
          label: 'Page title (browser tab & link preview)',
          description: 'Judul di tab browser dan saat link dibagikan. Usahakan di bawah 60 karakter.',
          defaultValue: 'Decade Studio — Branding, Mockups & Free Design Assets',
        }),
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
    // Daftar kategori portofolio. Tambah, ganti nama, atau atur urutannya di sini.
    projectCategories: collection({
      label: 'Project categories',
      slugField: 'name',
      path: 'src/content/project-categories/*',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        order: fields.integer({
          label: 'Order (1 = first in the filter bar)',
          defaultValue: 100,
        }),
      },
    }),

    // Daftar kategori freebies (aset gratis).
    freebieCategories: collection({
      label: 'Freebie categories',
      slugField: 'name',
      path: 'src/content/freebie-categories/*',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        order: fields.integer({
          label: 'Order (1 = first)',
          defaultValue: 100,
        }),
      },
    }),

    // Portofolio
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.relationship({
          label: 'Category',
          collection: 'projectCategories',
          validation: { isRequired: true },
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
        category: fields.relationship({
          label: 'Category',
          collection: 'freebieCategories',
          validation: { isRequired: true },
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
