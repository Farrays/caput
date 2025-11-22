#!/usr/bin/env node
/**
 * Generate OG Images for Hip Hop, Twerk, and Facilities pages
 * Uses Sharp to create 1200x630 JPG images with text overlay
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public', 'images');

// OG Image specifications
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const QUALITY = 90;

/**
 * Create SVG text overlay
 * @param {string} title - Main title text
 * @param {string} subtitle - Subtitle text
 * @param {string} bgColor - Background color hex
 * @param {string} accentColor - Accent color hex
 * @returns {Buffer} SVG buffer
 */
const createSVGOverlay = (title, subtitle, bgColor, accentColor) => {
  const svg = `
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${bgColor};stop-opacity:0.95" />
          <stop offset="100%" style="stop-color:#000000;stop-opacity:0.98" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#gradient)"/>

      <!-- Accent bar -->
      <rect x="0" y="0" width="${OG_WIDTH}" height="8" fill="${accentColor}"/>
      <rect x="0" y="${OG_HEIGHT - 8}" width="${OG_WIDTH}" height="8" fill="${accentColor}"/>

      <!-- Logo/Brand -->
      <text x="60" y="90" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#FFFFFF">
        Farray's Center
      </text>

      <!-- Main Title -->
      <text x="60" y="280" font-family="Arial, sans-serif" font-size="72" font-weight="900" fill="${accentColor}">
        ${title}
      </text>

      <!-- Subtitle -->
      <text x="60" y="360" font-family="Arial, sans-serif" font-size="48" font-weight="400" fill="#FFFFFF" opacity="0.9">
        ${subtitle}
      </text>

      <!-- Location -->
      <text x="60" y="540" font-family="Arial, sans-serif" font-size="36" font-weight="400" fill="#FFFFFF" opacity="0.7">
        Barcelona, España
      </text>
    </svg>
  `;

  return Buffer.from(svg);
};

/**
 * Generate OG Image
 * @param {string} filename - Output filename (e.g., 'og-hip-hop.jpg')
 * @param {object} config - Image configuration
 */
const generateOGImage = async (filename, config) => {
  console.log(`🎨 Generando ${filename}...`);

  try {
    const svgOverlay = createSVGOverlay(
      config.title,
      config.subtitle,
      config.bgColor,
      config.accentColor
    );

    const outputPath = join(publicDir, filename);

    await sharp({
      create: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        channels: 3,
        background: config.bgColor
      }
    })
      .composite([
        {
          input: svgOverlay,
          top: 0,
          left: 0
        }
      ])
      .jpeg({ quality: QUALITY })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`✅ ${filename} creado (${(stats.size / 1024).toFixed(1)} KB)`);

  } catch (error) {
    console.error(`❌ Error generando ${filename}:`, error.message);
    throw error;
  }
};

// Configuration for each OG image
const ogConfigs = {
  'og-hip-hop.jpg': {
    title: 'HIP HOP',
    subtitle: 'Clases de Baile Urbano',
    bgColor: '#1a0a2e', // Dark purple
    accentColor: '#ff6b35' // Vibrant orange
  },
  'og-twerk.jpg': {
    title: 'TWERK',
    subtitle: 'Empoderamiento y Técnica',
    bgColor: '#2d0320', // Dark magenta
    accentColor: '#ff10f0' // Hot pink
  },
  'og-facilities.jpg': {
    title: 'INSTALACIONES',
    subtitle: 'Centro Premium de Baile',
    bgColor: '#0a1128', // Dark navy
    accentColor: '#c82260' // Primary accent (from brand)
  }
};

// Main execution
const main = async () => {
  console.log('🚀 Generando OG Images para Hip Hop, Twerk y Facilities\n');
  console.log(`📐 Dimensiones: ${OG_WIDTH}×${OG_HEIGHT} px`);
  console.log(`🎯 Calidad: ${QUALITY}%`);
  console.log(`📂 Directorio: ${publicDir}\n`);

  try {
    // Generate all OG images
    for (const [filename, config] of Object.entries(ogConfigs)) {
      await generateOGImage(filename, config);
    }

    console.log('\n✨ ¡Todas las OG images generadas exitosamente!');
    console.log('\n📋 Próximos pasos:');
    console.log('   1. Verificar las imágenes en public/images/');
    console.log('   2. Ejecutar: npm run build');
    console.log('   3. Verificar en dist/images/');
    console.log('   4. Probar en https://www.opengraph.xyz/');

  } catch (error) {
    console.error('\n❌ Error durante la generación:', error.message);
    process.exit(1);
  }
};

main();
