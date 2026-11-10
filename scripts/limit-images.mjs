// Membatasi lebar gambar saat build (sebelum website dibuat).
// - Gambar yang lebarnya DI BAWAH batas dibiarkan persis seperti aslinya.
// - Gambar yang LEBIH BESAR dari batas diperkecil otomatis (tidak pernah diperbesar).
// File asli di GitHub tidak diubah; yang diperkecil hanya salinan di website yang online.
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// ====== ATUR BATAS LEBAR (dalam piksel) DI SINI ======
const LIMITS = [
  { folder: 'public/images/projects', maxWidth: 1600 },
  { folder: 'public/images/freebies', maxWidth: 1200 },
];
const DEFAULT_MAX_WIDTH = 1600; // untuk folder gambar lain di bawah public/images
// =====================================================

const ROOT = process.argv[2] || 'public/images';
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('[limit-images] sharp tidak ditemukan, langkah ini dilewati.');
  process.exit(0);
}

async function walk(dir) {
  let out = [];
  let entries = [];
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(await walk(p));
    else if (EXT.has(path.extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}

function limitFor(file) {
  const norm = file.split(path.sep).join('/');
  const hit = LIMITS.find((l) => norm.includes(l.folder.replace(/^public\//, '')));
  return hit ? hit.maxWidth : DEFAULT_MAX_WIDTH;
}

const files = await walk(ROOT);
let shrunk = 0;
for (const file of files) {
  try {
    const input = await readFile(file);
    const meta = await sharp(input).metadata();
    const max = limitFor(file);
    if (!meta.width || meta.width <= max) continue; // sudah kecil, biarkan
    const ext = path.extname(file).toLowerCase();
    let pipeline = sharp(input).rotate().resize({ width: max, withoutEnlargement: true });
    if (ext === '.png') pipeline = pipeline.png({ compressionLevel: 9 });
    else if (ext === '.webp') pipeline = pipeline.webp({ quality: 82 });
    else pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
    const output = await pipeline.toBuffer();
    if (output.length < input.length) {
      await writeFile(file, output);
      shrunk++;
      console.log(`[limit-images] ${file}: ${meta.width}px -> ${max}px (${Math.round(input.length / 1024)} KB -> ${Math.round(output.length / 1024)} KB)`);
    }
  } catch (err) {
    console.warn(`[limit-images] gagal memproses ${file}: ${err.message}`);
  }
}
console.log(`[limit-images] selesai. ${shrunk} gambar diperkecil dari ${files.length}.`);
