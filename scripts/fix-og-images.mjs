import sharp from 'sharp';
import { readdir, access } from 'fs/promises';
import { join } from 'path';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const IMAGE_DIR = 'public/images';

// Imágenes que necesitan ser redimensionadas (1440x960 -> 1200x630)
const imagesToResize = [
  'og-home.jpg',
  'og-classes.jpg',
  'og-classes-hub.jpg',
  'og-dancehall.jpg',
  'og-image.jpg',
  'og-yunaisy-farray.jpg'
];

// Imágenes OG que faltan (usaremos og-classes.jpg como base)
const imagesToCreate = [
  'og-danza-barcelona.jpg',
  'og-salsa-bachata-barcelona.jpg',
  'og-danzas-urbanas-barcelona.jpg',
  'og-prep-fisica.jpg',
  'og-clases-particulares.jpg'
];

async function resizeImage(filename) {
  const inputPath = join(IMAGE_DIR, filename);
  const tempPath = join(IMAGE_DIR, `temp_${filename}`);
  const outputPath = join(IMAGE_DIR, filename);

  try {
    // Check if file exists
    await access(inputPath);

    console.log(`Redimensionando ${filename}...`);

    // Resize to temp file
    await sharp(inputPath)
      .resize(OG_WIDTH, OG_HEIGHT, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 85 })
      .toFile(tempPath);

    // Replace original with temp
    const { rename, unlink } = await import('fs/promises');
    try {
      await unlink(outputPath);
    } catch {
      // Ignore if file doesn't exist
    }
    await rename(tempPath, outputPath);

    console.log(`✓ ${filename} redimensionada a ${OG_WIDTH}x${OG_HEIGHT}`);
  } catch (error) {
    console.error(`✗ Error redimensionando ${filename}:`, error.message);
    // Clean up temp file if it exists
    try {
      const { unlink } = await import('fs/promises');
      await unlink(tempPath);
    } catch {
      // Ignore cleanup errors
    }
  }
}

async function createMissingImage(filename) {
  const basePath = join(IMAGE_DIR, 'og-classes.jpg');
  const outputPath = join(IMAGE_DIR, filename);

  try {
    // Check if output already exists
    try {
      await access(outputPath);
      console.log(`⊘ ${filename} ya existe, omitiendo...`);
      return;
    } catch {
      // File doesn't exist, proceed to create it
    }

    console.log(`Creando ${filename} desde og-classes.jpg...`);

    await sharp(basePath)
      .resize(OG_WIDTH, OG_HEIGHT, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    console.log(`✓ ${filename} creada (${OG_WIDTH}x${OG_HEIGHT})`);
  } catch (error) {
    console.error(`✗ Error creando ${filename}:`, error.message);
  }
}

async function main() {
  console.log('=== Corrección de Imágenes OG ===\n');

  console.log('1. Redimensionando imágenes existentes a 1200x630...\n');
  for (const image of imagesToResize) {
    await resizeImage(image);
  }

  console.log('\n2. Creando imágenes OG faltantes...\n');
  for (const image of imagesToCreate) {
    await createMissingImage(image);
  }

  console.log('\n=== Proceso completado ===');
  console.log('\nNOTA: Las imágenes creadas desde og-classes.jpg son temporales.');
  console.log('Considera crear imágenes únicas para cada página en el futuro.');
}

main().catch(console.error);
