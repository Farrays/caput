#!/usr/bin/env node

/**
 * Check OG Images Availability
 * 
 * This script verifies that all OG images referenced in SEO.tsx
 * actually exist in the public/images folder.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicImagesDir = path.join(__dirname, '..', 'public', 'images');

// OG images that should exist (from components/SEO.tsx)
const requiredOGImages = [
  'og-home.jpg',
  'og-classes-hub.jpg',
  'og-danza-barcelona.jpg',
  'og-salsa-bachata-barcelona.jpg',
  'og-danzas-urbanas-barcelona.jpg',
  'og-dancehall.jpg',
  'og-prep-fisica.jpg',
  'og-clases-particulares.jpg',
  'og-about.jpg',
  'og-contact.jpg',
  'og-merchandising.jpg',
  'og-yunaisy-farray.jpg',
  'og-regala-baile.jpg',
  'og-facilities.jpg',
  'og-estudio-grabacion.jpg',
  'og-alquiler-salas.jpg',
  'og-servicios-baile.jpg',
  'og-hip-hop.jpg',
  'og-twerk.jpg',
  'og-afrobeats.jpg',
];

console.log('🔍 Checking OG images availability...\n');

let missingCount = 0;
let existingCount = 0;
const missingImages = [];

requiredOGImages.forEach((image) => {
  const imagePath = path.join(publicImagesDir, image);
  const exists = fs.existsSync(imagePath);
  
  if (exists) {
    const stats = fs.statSync(imagePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`✅ ${image} (${sizeKB} KB)`);
    
    // Check if size is reasonable (< 200KB recommended)
    if (stats.size > 200 * 1024) {
      console.log(`   ⚠️  Warning: File size > 200KB. Recommended: < 100KB`);
    }
    
    existingCount++;
  } else {
    console.log(`❌ ${image} - MISSING`);
    missingImages.push(image);
    missingCount++;
  }
});

console.log('\n' + '='.repeat(60));
console.log(`\n📊 Summary:`);
console.log(`   Existing: ${existingCount}/${requiredOGImages.length}`);
console.log(`   Missing:  ${missingCount}/${requiredOGImages.length}`);

if (missingCount > 0) {
  console.log(`\n🚨 Missing OG images (${missingCount}):`);
  console.log('\n```bash');
  console.log('# Images to create (1200x630px, < 100KB):');
  missingImages.forEach(img => {
    console.log(`#   public/images/${img}`);
  });
  console.log('```');
  
  console.log(`\n💡 Recommendations:`);
  console.log(`   - Dimensions: 1200x630px (ratio 1.91:1)`);
  console.log(`   - Format: JPG optimized or WebP`);
  console.log(`   - Size: < 100KB per image`);
  console.log(`   - Content: Logo + Page title + Branded background`);
  console.log(`   - Typography: Sans-serif bold, legible on mobile`);
  
  process.exit(1);
} else {
  console.log(`\n✅ All OG images present!\n`);
  process.exit(0);
}
