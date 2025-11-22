#!/usr/bin/env node

/**
 * Bundle Size Checker
 * 
 * Verifies that bundle sizes don't exceed defined limits.
 * This prevents performance regressions from large bundles.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '..', 'dist', 'assets');

// Size limits in KB
const LIMITS = {
  'react-vendor': 250,      // React is naturally heavy
  'locale-es': 300,         // TODO: Reduce to 100KB after splitting
  'locale-en': 300,         // TODO: Reduce to 100KB after splitting
  'locale-ca': 300,         // TODO: Reduce to 100KB after splitting
  'locale-fr': 300,         // TODO: Reduce to 100KB after splitting
  'index': 80,              // Main bundle
  'shared-components': 40,  // Shared components
  'dance-configs': 30,      // Dance configurations
  'dompurify-vendor': 30,   // DOMPurify
  'router-vendor': 50,      // React Router
  'sentry-vendor': 30,      // Sentry
};

// Warning thresholds (% of limit)
const WARNING_THRESHOLD = 0.8;

console.log('📦 Checking bundle sizes...\n');

if (!fs.existsSync(distPath)) {
  console.error('❌ dist/assets folder not found. Run "npm run build" first.');
  process.exit(1);
}

const files = fs.readdirSync(distPath);
const jsFiles = files.filter(f => f.endsWith('.js'));

let hasError = false;
let hasWarning = false;
const stats = {
  total: 0,
  totalGzip: 0,
  files: [],
};

console.log('File'.padEnd(45) + 'Size'.padEnd(15) + 'Status');
console.log('='.repeat(75));

jsFiles.forEach(file => {
  const filePath = path.join(distPath, file);
  const size = fs.statSync(filePath).size;
  const sizeKB = size / 1024;
  
  stats.total += size;
  stats.files.push({ name: file, size: sizeKB });
  
  let status = '✅ OK';
  
  // Check against limits
  for (const [pattern, limit] of Object.entries(LIMITS)) {
    if (file.includes(pattern)) {
      if (sizeKB > limit) {
        status = `🔴 EXCEEDS LIMIT (${limit}KB)`;
        hasError = true;
      } else if (sizeKB > limit * WARNING_THRESHOLD) {
        status = `⚠️  WARNING (>${Math.round(limit * WARNING_THRESHOLD)}KB)`;
        hasWarning = true;
      } else {
        status = `✅ OK (limit: ${limit}KB)`;
      }
      
      break;
    }
  }
  
  console.log(
    file.substring(0, 44).padEnd(45) + 
    `${sizeKB.toFixed(2)}KB`.padEnd(15) + 
    status
  );
});

console.log('='.repeat(75));
console.log(`Total: ${(stats.total / 1024).toFixed(2)}KB\n`);

// Estimate gzipped size (typically 30-40% of original)
const estimatedGzip = stats.total * 0.35;
console.log(`📊 Summary:`);
console.log(`   Total JS:        ${(stats.total / 1024).toFixed(2)}KB`);
console.log(`   Estimated Gzip:  ${(estimatedGzip / 1024).toFixed(2)}KB`);
console.log(`   Files checked:   ${jsFiles.length}`);

// Top 5 largest files
console.log(`\n🏆 Largest bundles:`);
const sorted = stats.files.sort((a, b) => b.size - a.size).slice(0, 5);
sorted.forEach((f, i) => {
  console.log(`   ${i + 1}. ${f.name}: ${f.size.toFixed(2)}KB`);
});

// Recommendations
if (hasError || hasWarning) {
  console.log(`\n💡 Recommendations:`);
  
  if (stats.files.some(f => f.name.includes('locale-') && f.size > 100)) {
    console.log(`   🔴 CRITICAL: Locale bundles are too large (>280KB each)`);
    console.log(`      → Implement lazy loading of translations per page`);
    console.log(`      → Split locale files by route/component`);
    console.log(`      → Expected reduction: 280KB → <100KB per locale`);
  }
  
  if (stats.files.some(f => f.name.includes('react-vendor') && f.size > 220)) {
    console.log(`   ⚠️  React vendor bundle could be optimized`);
    console.log(`      → Check for duplicate React instances`);
    console.log(`      → Ensure React DevTools are not bundled in production`);
  }
  
  console.log();
}

if (hasError) {
  console.log('❌ Bundle size check FAILED\n');
  process.exit(1);
} else if (hasWarning) {
  console.log('⚠️  Bundle size check passed with warnings\n');
  process.exit(0);
} else {
  console.log('✅ Bundle size check PASSED\n');
  process.exit(0);
}
