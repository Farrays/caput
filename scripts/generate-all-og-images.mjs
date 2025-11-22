#!/usr/bin/env node
/**
 * Generate ALL OG Images for the website
 * Creates 1200x630 JPG images for all pages
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
 * Escape XML special characters
 */
const escapeXML = (str) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

/**
 * Create SVG text overlay with multi-line support
 */
const createSVGOverlay = (title, subtitle, bgColor, accentColor, titleSize = 72) => {
  const escapedTitle = escapeXML(title);
  const escapedSubtitle = escapeXML(subtitle);

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

      <!-- Accent bars -->
      <rect x="0" y="0" width="${OG_WIDTH}" height="8" fill="${accentColor}"/>
      <rect x="0" y="${OG_HEIGHT - 8}" width="${OG_WIDTH}" height="8" fill="${accentColor}"/>

      <!-- Logo/Brand -->
      <text x="60" y="90" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#FFFFFF">
        Farray's Center
      </text>

      <!-- Main Title -->
      <text x="60" y="280" font-family="Arial, sans-serif" font-size="${titleSize}" font-weight="900" fill="${accentColor}">
        ${escapedTitle}
      </text>

      <!-- Subtitle -->
      <text x="60" y="360" font-family="Arial, sans-serif" font-size="40" font-weight="400" fill="#FFFFFF" opacity="0.9">
        ${escapedSubtitle}
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
 */
const generateOGImage = async (filename, config) => {
  console.log(`🎨 Generando ${filename}...`);

  try {
    const svgOverlay = createSVGOverlay(
      config.title,
      config.subtitle,
      config.bgColor,
      config.accentColor,
      config.titleSize || 72
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
    console.log(`✅ ${filename} (${(stats.size / 1024).toFixed(1)} KB)`);

  } catch (error) {
    console.error(`❌ Error generando ${filename}:`, error.message);
    throw error;
  }
};

// Complete OG Images configuration for ALL pages
const ogConfigs = {
  // Home
  'og-home.jpg': {
    title: "FARRAY'S CENTER",
    subtitle: 'Academia de Baile en Barcelona',
    bgColor: '#0a0e1a',
    accentColor: '#c82260',
    titleSize: 60
  },

  // Dance Classes Hub
  'og-classes-hub.jpg': {
    title: 'CLASES DE BAILE',
    subtitle: '25+ Estilos Disponibles',
    bgColor: '#0f0517',
    accentColor: '#c82260'
  },

  // Danza Barcelona
  'og-danza-barcelona.jpg': {
    title: 'DANZA CLÁSICA',
    subtitle: 'Ballet & Contemporáneo',
    bgColor: '#1a0520',
    accentColor: '#ff6b9d'
  },

  // Salsa Bachata
  'og-salsa-bachata-barcelona.jpg': {
    title: 'SALSA & BACHATA',
    subtitle: 'Método Cubano Auténtico',
    bgColor: '#2d0320',
    accentColor: '#ff4757'
  },

  // Danzas Urbanas
  'og-danzas-urbanas-barcelona.jpg': {
    title: 'DANZAS URBANAS',
    subtitle: 'Hip Hop, Dancehall & Más',
    bgColor: '#0a1128',
    accentColor: '#ffa500'
  },

  // Dancehall
  'og-dancehall.jpg': {
    title: 'DANCEHALL',
    subtitle: 'Energía Jamaicana Auténtica',
    bgColor: '#1a0f2e',
    accentColor: '#ffed4e'
  },

  // Hip Hop
  'og-hip-hop.jpg': {
    title: 'HIP HOP',
    subtitle: 'Cultura Urbana Original',
    bgColor: '#1a0a2e',
    accentColor: '#ff6b35'
  },

  // Twerk
  'og-twerk.jpg': {
    title: 'TWERK',
    subtitle: 'Empoderamiento & Técnica',
    bgColor: '#2d0320',
    accentColor: '#ff10f0'
  },

  // Preparación Física
  'og-prep-fisica.jpg': {
    title: 'PREP. FÍSICA',
    subtitle: 'Entrenamiento para Bailarines',
    bgColor: '#0a1a0f',
    accentColor: '#00ff88'
  },

  // Clases Particulares
  'og-clases-particulares.jpg': {
    title: 'CLASES PARTICULARES',
    subtitle: 'Atención Personalizada',
    bgColor: '#1a0e0a',
    accentColor: '#ff9a3c'
  },

  // Facilities
  'og-facilities.jpg': {
    title: 'INSTALACIONES',
    subtitle: 'Centro Premium de 300m²',
    bgColor: '#0a1128',
    accentColor: '#c82260'
  },

  // Sobre Nosotros
  'og-about.jpg': {
    title: 'SOBRE NOSOTROS',
    subtitle: 'Academia Acreditada CID-UNESCO',
    bgColor: '#0f0a1a',
    accentColor: '#8b5cf6'
  },

  // Yunaisy Farray
  'og-yunaisy-farray.jpg': {
    title: 'YUNAISY FARRAY',
    subtitle: 'Fundadora & Icono Mundial',
    bgColor: '#1a0520',
    accentColor: '#ff6b9d'
  },

  // Merchandising
  'og-merchandising.jpg': {
    title: 'MERCHANDISING',
    subtitle: 'Productos Oficiales FIDC',
    bgColor: '#0a0e1a',
    accentColor: '#c82260'
  },

  // Regala Baile
  'og-regala-baile.jpg': {
    title: 'REGALA BAILE',
    subtitle: 'Gift Cards & Bonos',
    bgColor: '#1a0f0a',
    accentColor: '#ffd700'
  },

  // Contacto
  'og-contact.jpg': {
    title: 'CONTACTO',
    subtitle: 'Ven a Conocernos',
    bgColor: '#0a1a1a',
    accentColor: '#00d9ff'
  },

  // FAQ
  'og-faq.jpg': {
    title: 'PREGUNTAS',
    subtitle: 'Todo lo que Necesitas Saber',
    bgColor: '#0f0a1a',
    accentColor: '#a78bfa'
  },

  // Alquiler Salas
  'og-alquiler-salas.jpg': {
    title: 'ALQUILER DE SALAS',
    subtitle: 'Espacios Profesionales',
    bgColor: '#0a1520',
    accentColor: '#00bfff'
  },

  // Estudio Grabación
  'og-estudio-grabacion.jpg': {
    title: 'ESTUDIO GRABACIÓN',
    subtitle: 'Producción Profesional',
    bgColor: '#1a0a0f',
    accentColor: '#ff1744'
  },

  // Services
  'og-services.jpg': {
    title: 'SERVICIOS',
    subtitle: 'Soluciones Integrales',
    bgColor: '#0a0f1a',
    accentColor: '#00e5ff'
  },

  // Generic fallback
  'og-image.jpg': {
    title: "FARRAY'S CENTER",
    subtitle: 'Academia de Baile Barcelona',
    bgColor: '#0a0e1a',
    accentColor: '#c82260',
    titleSize: 60
  }
};

// Main execution
const main = async () => {
  console.log('🚀 Generando TODAS las OG Images\n');
  console.log(`📐 Dimensiones: ${OG_WIDTH}×${OG_HEIGHT} px`);
  console.log(`🎯 Calidad: ${QUALITY}%`);
  console.log(`📂 Directorio: ${publicDir}\n`);

  let successCount = 0;
  let errorCount = 0;

  try {
    // Generate all OG images
    for (const [filename, config] of Object.entries(ogConfigs)) {
      try {
        await generateOGImage(filename, config);
        successCount++;
      } catch (error) {
        errorCount++;
        console.error(`❌ Error en ${filename}:`, error.message);
      }
    }

    console.log(`\n✨ Generación completada!`);
    console.log(`   ✅ Exitosas: ${successCount}`);
    console.log(`   ❌ Errores: ${errorCount}`);

    console.log('\n📋 Próximos pasos:');
    console.log('   1. Verificar imágenes: npm run verify:og-images');
    console.log('   2. Build: npm run build');
    console.log('   3. Validar: https://www.opengraph.xyz/');

  } catch (error) {
    console.error('\n❌ Error fatal:', error.message);
    process.exit(1);
  }
};

main();
