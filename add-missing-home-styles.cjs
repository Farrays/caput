/**
 * Add 4 missing home_categories_urbano_styles keys to EN, CA, FR
 */

const fs = require('fs');

const TRANSLATIONS = {
  en: {
    home_categories_urbano_styles_reggaeton_cubano: 'Cuban Reggaeton (Reparto)',
    home_categories_urbano_styles_sexy_reggaeton: 'Sexy Reggaeton',
    home_categories_urbano_styles_sexy_style: 'Sexy Style',
    home_categories_urbano_styles_twerk: 'Twerk',
  },
  ca: {
    home_categories_urbano_styles_reggaeton_cubano: 'Reggaeton Cubà (Reparto)',
    home_categories_urbano_styles_sexy_reggaeton: 'Sexy Reggaeton',
    home_categories_urbano_styles_sexy_style: 'Sexy Style',
    home_categories_urbano_styles_twerk: 'Twerk',
  },
  fr: {
    home_categories_urbano_styles_reggaeton_cubano: 'Reggaeton Cubain (Reparto)',
    home_categories_urbano_styles_sexy_reggaeton: 'Sexy Reggaeton',
    home_categories_urbano_styles_sexy_style: 'Sexy Style',
    home_categories_urbano_styles_twerk: 'Twerk',
  }
};

function addKeys(locale, keys) {
  const filePath = `i18n/locales/${locale}.ts`;
  let content = fs.readFileSync(filePath, 'utf-8');

  // Find the home_categories_urbano_styles_kpop line to insert after
  const lines = content.split('\n');
  let insertIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('home_categories_urbano_styles_kpop:')) {
      insertIndex = i + 1;
      break;
    }
  }

  if (insertIndex === -1) {
    console.error(`Could not find insertion point in ${locale}.ts`);
    return;
  }

  // Build new keys
  let newKeys = '';
  Object.entries(keys).forEach(([key, value]) => {
    newKeys += `  ${key}: '${value}',\n`;
  });

  lines.splice(insertIndex, 0, newKeys);
  content = lines.join('\n');
  fs.writeFileSync(filePath, content, 'utf-8');

  console.log(`✓ Added ${Object.keys(keys).length} keys to ${locale}.ts`);
}

// Execute
console.log('Adding 4 missing home_categories_urbano_styles keys...\n');
['en', 'ca', 'fr'].forEach(locale => {
  addKeys(locale, TRANSLATIONS[locale]);
});

console.log('\n✅ Completed! 12 translations added (4 keys × 3 languages)');
