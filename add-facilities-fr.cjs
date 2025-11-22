/**
 * Add 97 facilities keys to FR locale
 */

const fs = require('fs');

// Load translated facilities
const facilitiesFR = JSON.parse(fs.readFileSync('facilities_fr.json', 'utf-8'));

console.log(`Loaded ${Object.keys(facilitiesFR).length} facilities keys`);

// Add to FR file
const filePath = 'i18n/locales/fr.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// Find insertion point (before closing brace)
const lines = content.split('\n');
let insertIndex = -1;

for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].trim() === '};' || lines[i].trim() === '}') {
    insertIndex = i;
    break;
  }
}

if (insertIndex === -1) {
  console.error('Could not find insertion point in fr.ts');
  process.exit(1);
}

// Build new keys
let newKeys = '\n  // ========== Facilities Section (Installations) ==========\n';
Object.entries(facilitiesFR).forEach(([key, value]) => {
  const escapedValue = (value || '').replace(/'/g, "\\'").replace(/\n/g, '\\n');
  newKeys += `  ${key}: '${escapedValue}',\n`;
});

lines.splice(insertIndex, 0, newKeys);
content = lines.join('\n');
fs.writeFileSync(filePath, content, 'utf-8');

console.log(`✓ Added ${Object.keys(facilitiesFR).length} facilities keys to fr.ts`);
console.log('\n✅ Facilities section fully translated to French!');
