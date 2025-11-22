#!/usr/bin/env node
/**
 * Validate SEO Configuration
 * Checks for missing meta descriptions, OG images, and canonical URLs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const errors = [];
const warnings = [];
const success = [];

// Pages that should have OG images
const requiredOGImages = [
  'og-home.jpg',
  'og-classes-hub.jpg',
  'og-danza-barcelona.jpg',
  'og-salsa-bachata-barcelona.jpg',
  'og-danzas-urbanas-barcelona.jpg',
  'og-dancehall.jpg',
  'og-hip-hop.jpg',
  'og-twerk.jpg',
  'og-prep-fisica.jpg',
  'og-clases-particulares.jpg',
  'og-facilities.jpg',
  'og-about.jpg',
  'og-yunaisy-farray.jpg',
  'og-merchandising.jpg',
  'og-regala-baile.jpg',
  'og-contact.jpg',
  'og-faq.jpg',
  'og-alquiler-salas.jpg',
  'og-estudio-grabacion.jpg',
  'og-services.jpg',
  'og-image.jpg',
];

console.log('🔍 Validando configuración SEO...\n');

// 1. Check OG Images
console.log('📸 Verificando OG Images...');
const publicImagesDir = path.join(__dirname, '..', 'public', 'images');

requiredOGImages.forEach(imageName => {
  const imagePath = path.join(publicImagesDir, imageName);
  if (fs.existsSync(imagePath)) {
    const stats = fs.statSync(imagePath);
    const sizeKB = (stats.size / 1024).toFixed(1);

    if (stats.size < 10000) {
      warnings.push(`⚠️  ${imageName} es muy pequeña (${sizeKB} KB) - debería ser ~30-50 KB`);
    } else if (stats.size > 100000) {
      warnings.push(`⚠️  ${imageName} es muy grande (${sizeKB} KB) - debería ser ~30-50 KB`);
    } else {
      success.push(`✅ ${imageName} (${sizeKB} KB)`);
    }
  } else {
    errors.push(`❌ Falta ${imageName}`);
  }
});

// 2. Check SEO.tsx configuration
console.log('\n📄 Verificando SEO.tsx...');
const seoFilePath = path.join(__dirname, '..', 'components', 'SEO.tsx');
if (fs.existsSync(seoFilePath)) {
  const seoContent = fs.readFileSync(seoFilePath, 'utf8');

  // Check if all pages are configured
  const configuredPages = [
    'home', 'classes', 'danza', 'salsaBachata', 'danzasUrbanas',
    'dancehall', 'hipHop', 'twerk', 'prepFisica', 'clasesParticulares',
    'facilities', 'about', 'yunaisy', 'merchandising', 'regalaBaile',
    'contact', 'faq', 'alquilerSalas', 'estudioGrabacion', 'services'
  ];

  configuredPages.forEach(page => {
    if (seoContent.includes(`${page}:`)) {
      success.push(`✅ Página ${page} configurada en SEO.tsx`);
    } else {
      warnings.push(`⚠️  Página ${page} puede no estar configurada en SEO.tsx`);
    }
  });
} else {
  errors.push('❌ No se encuentra components/SEO.tsx');
}

// 3. Check _headers file
console.log('\n🔒 Verificando headers de seguridad...');
const headersFilePath = path.join(__dirname, '..', 'public', '_headers');
if (fs.existsSync(headersFilePath)) {
  const headersContent = fs.readFileSync(headersFilePath, 'utf8');

  const requiredHeaders = [
    'Content-Security-Policy',
    'X-Frame-Options',
    'X-Content-Type-Options',
    'X-XSS-Protection',
    'Referrer-Policy',
  ];

  requiredHeaders.forEach(header => {
    if (headersContent.includes(header)) {
      success.push(`✅ Header ${header} configurado`);
    } else {
      warnings.push(`⚠️  Header ${header} no encontrado`);
    }
  });
} else {
  warnings.push('⚠️  No se encuentra public/_headers - crear para Netlify/Vercel');
}

// 4. Check sitemap.xml
console.log('\n🗺️  Verificando sitemap.xml...');
const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
  success.push(`✅ Sitemap existe con ${urlCount} URLs`);

  if (urlCount < 20) {
    warnings.push(`⚠️  Sitemap tiene solo ${urlCount} URLs - verificar si están todas las páginas`);
  }
} else {
  errors.push('❌ No se encuentra sitemap.xml');
}

// 5. Check robots.txt
console.log('\n🤖 Verificando robots.txt...');
const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
if (fs.existsSync(robotsPath)) {
  success.push('✅ robots.txt existe');
} else {
  warnings.push('⚠️  No se encuentra public/robots.txt');
}

// Print results
console.log('\n' + '='.repeat(60));
console.log('📊 RESUMEN DE VALIDACIÓN SEO');
console.log('='.repeat(60) + '\n');

if (success.length > 0) {
  console.log('✅ Éxitos:');
  success.slice(0, 5).forEach(s => console.log(`   ${s}`));
  if (success.length > 5) {
    console.log(`   ... y ${success.length - 5} más`);
  }
  console.log();
}

if (warnings.length > 0) {
  console.log('⚠️  Advertencias:');
  warnings.forEach(w => console.log(`   ${w}`));
  console.log();
}

if (errors.length > 0) {
  console.log('❌ Errores críticos:');
  errors.forEach(e => console.log(`   ${e}`));
  console.log();
}

console.log('='.repeat(60));
console.log(`Total: ${success.length} éxitos, ${warnings.length} advertencias, ${errors.length} errores`);
console.log('='.repeat(60) + '\n');

if (errors.length > 0) {
  console.log('❌ Validación FALLIDA - corrige los errores críticos');
  process.exit(1);
} else if (warnings.length > 0) {
  console.log('⚠️  Validación completada con advertencias');
  process.exit(0);
} else {
  console.log('✅ Validación SEO EXITOSA');
  process.exit(0);
}
