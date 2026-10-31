# Decade Studio — Portfolio + Freebies

Website portofolio dan aset gratis, dibangun dengan **Astro** (tampilan) dan **Keystatic** (dashboard admin).
Konten disimpan sebagai file di repo GitHub-mu, jadi tidak ada database dan tidak ada biaya server.

> **Catatan jujur:** project ini ditulis tanpa bisa dijalankan di lingkungan tempat dia dibuat, jadi belum pernah di-build.
> Kalau ada error saat `npm install`, `npm run dev`, atau di Vercel, salin teks error-nya dan kirim ke Claude.

## Isi folder

| File | Fungsi |
|---|---|
| `keystatic.config.ts` | Mendefinisikan isi dashboard: Site settings, Projects, Freebies |
| `src/pages/index.astro` | Halaman utama: hero, portofolio (filter + pop-up), freebies, kontak |
| `src/pages/freebies/[slug].astro` | Halaman tersendiri untuk tiap freebie (tombol download ke Gumroad) |
| `src/layouts/Base.astro` | Kerangka halaman + seluruh CSS (warna, font, dark mode) |
| `astro.config.mjs` | Pengaturan Astro dan hosting |

## Langkah 1: Persiapan di komputermu (sekali saja)

1. Pasang **Node.js** versi LTS dari nodejs.org.
2. Buka `keystatic.config.ts`, ganti `YOUR_GITHUB_USERNAME` dan `YOUR_REPO_NAME` dengan milikmu.
3. Buka `astro.config.mjs`, ganti `https://YOUR-DOMAIN.com` dengan domainmu.

## Langkah 2: Coba di komputer

Buka terminal di folder project, lalu:

```
npm install
npm run dev
```

- Website: http://localhost:4321
- Dashboard: http://localhost:4321/keystatic

Di mode ini dashboard tidak butuh login dan menyimpan ke file lokal. Isi dulu **Site settings**, lalu tambah satu Project dan satu Freebie untuk mencoba.

## Langkah 3: Taruh di GitHub dan Vercel

1. Buat repo baru di GitHub (namanya harus sama dengan `YOUR_REPO_NAME` tadi), lalu unggah seluruh isi folder ini. Pemula bisa memakai aplikasi **GitHub Desktop**.
2. Di Vercel: **Add New Project** → pilih repo itu → Vercel otomatis mengenali Astro → **Deploy**.
3. Pasang domainmu di Vercel: **Settings → Domains**.

## Langkah 4: Aktifkan dashboard di website online

Dashboard online menyimpan konten dengan cara "commit" ke repo GitHub-mu, jadi perlu sebuah **GitHub App** (izin akses). Keystatic membantu membuatnya:

1. Di folder project, salin `.env.example` menjadi `.env` (nilai lainnya biarkan kosong dulu).
2. Jalankan `npm run dev`, buka http://localhost:4321/keystatic. Keystatic akan menawarkan **membuat GitHub App**. Ikuti langkahnya sampai selesai. Keystatic mengisi `.env` otomatis dengan empat nilai.
3. Di GitHub, buka pengaturan App yang baru dibuat. Pastikan **Homepage URL** dan **Callback URL** memakai domain onlinemu (callback biasanya berakhir dengan `/api/keystatic/github/oauth/callback`; cocokkan dengan yang tertulis di dokumentasi Keystatic). Lalu **install App** itu ke repo portofoliomu.
4. Di Vercel: **Settings → Environment Variables**, tambahkan keempat nilai dari `.env` (`KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`). Lalu **Redeploy**.
5. Buka `https://domainmu.com/keystatic`, login dengan GitHub, dan dashboard siap dipakai. Tiap kali kamu menekan simpan, website diperbarui dalam 1–2 menit.

Jangan pernah meng-upload file `.env` ke GitHub (sudah dicegah oleh `.gitignore`).

## Cara memakai sehari-hari

- **Tambah proyek / freebie:** dashboard → Projects atau Freebies → Create.
- **Tombol Download CV:** dashboard → Site settings → centang "Show Download CV button" dan unggah PDF-nya. Hapus centang untuk menyembunyikannya.
- **Urutan tampilan:** isi kolom "Order" (angka kecil tampil lebih dulu).
- **Kategori baru:** tambahkan di daftar `options` pada `keystatic.config.ts`.

## Tips ukuran gambar

Gambar disimpan di repo GitHub. Kecilkan dulu sebelum diunggah (lebar sekitar 1600 px, format JPG/WebP, di bawah 500 KB) supaya repo tidak cepat membengkak.
