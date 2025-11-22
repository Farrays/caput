#!/usr/bin/env node

/**
 * 🚀 Advanced Class Page Generator v2.0
 *
 * Crea páginas de clases con validación exhaustiva, backups automáticos,
 * actualización inteligente de i18n y rollback en caso de error.
 *
 * Features:
 * - ✅ Validación completa antes de ejecutar
 * - 📦 Backups automáticos con rollback
 * - 🎯 Actualización automática de archivos i18n
 * - 🔍 Dry-run mode para previsualizar cambios
 * - 🎨 Clonación desde cualquier página existente
 * - 📊 Progress bar y verbose logging
 * - 🧪 Verificación de sintaxis post-generación
 * - 📝 Checklist de TODOs al finalizar
 *
 * Uso:
 *   npm run create:class:v2 -- --name=bachata --from=dancehall --instructor="Carlos" --dry-run
 *   npm run create:class:v2 -- --name=salsa --auto-i18n
 *
 * Opciones:
 *   --name        Nombre de la clase (required)
 *   --from        Página base para clonar (default: dancehall)
 *   --instructor  Nombre del instructor
 *   --specialty   Especialidad del instructor
 *   --dry-run     Previsualiza cambios sin ejecutar
 *   --verbose     Logs detallados
 *   --auto-i18n   Actualiza archivos i18n automáticamente
 *   --skip-backup No crear backups
 *   --no-routes   No actualizar App.tsx
 *   --no-images   No crear estructura de imágenes
 */

import { readFile, writeFile, mkdir, access, copyFile, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import readline from 'node:readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// ============================================================================
// CONFIGURATION & CONSTANTS
// ============================================================================

const CONFIG = {
  backupDir: join(rootDir, '.claude/backups'),
  templatesDir: join(rootDir, '.claude/templates'),
  supportedLocales: ['es', 'en', 'ca', 'fr'],
  defaultSourcePage: 'dancehall',
};

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
  step: (msg) => console.log(`${colors.magenta}▸${colors.reset} ${msg}`),
  verbose: (msg, verbose) => verbose && console.log(`${colors.dim}  ${msg}${colors.reset}`),
  dryRun: (msg) => console.log(`${colors.cyan}[DRY RUN]${colors.reset} ${msg}`),
};

// ============================================================================
// CLASS TEMPLATES WITH METADATA
// ============================================================================

const classTemplates = {
  bachata: {
    displayName: 'Bachata',
    category: 'latin',
    difficulty: 'beginner-friendly',
    pillars: {
      pillar1: { title: 'Sensualidad', desc: 'Aprende a bailar con conexión y elegancia', icon: 'Heart' },
      pillar2: { title: 'Técnica', desc: 'Domina pasos, vueltas y movimientos avanzados', icon: 'Cog' },
      pillar3: { title: 'Musicalidad', desc: 'Baila al ritmo de la guitarra y los bongos', icon: 'MusicalNote' },
    },
    faqs: [
      { q: '¿Necesito pareja para las clases de Bachata?', a: 'No es necesario venir con pareja. Rotamos durante las clases para que todos practiquen.' },
      { q: '¿Qué nivel necesito para empezar?', a: 'Ofrecemos clases para todos los niveles, desde principiantes absolutos hasta avanzados.' },
      { q: '¿Qué estilo de Bachata enseñan?', a: 'Enseñamos Bachata Sensual, Dominicana y Moderna, adaptándonos a las preferencias del grupo.' },
      { q: '¿Cuánto tiempo se tarda en aprender Bachata?', a: 'Con práctica regular, en 3-6 meses puedes bailar cómodamente en sociales.' },
      { q: '¿Las clases incluyen teoría musical?', a: 'Sí, enseñamos a identificar instrumentos y estructuras de la música de bachata.' },
      { q: '¿Hay eventos o sociales de práctica?', a: 'Organizamos sociales mensuales para que practiques en un ambiente relajado.' },
      { q: '¿Puedo recuperar clases perdidas?', a: 'Sí, puedes recuperar clases en otros horarios del mismo nivel.' },
    ],
    relatedStyles: ['salsa', 'kizomba'],
  },
  salsa: {
    displayName: 'Salsa',
    category: 'latin',
    difficulty: 'beginner-friendly',
    pillars: {
      pillar1: { title: 'Ritmo', desc: 'Desarrolla el sentido del ritmo y la clave', icon: 'MusicalNote' },
      pillar2: { title: 'Estilo', desc: 'Aprende On1, On2 y estilo cubano', icon: 'Star' },
      pillar3: { title: 'Shine', desc: 'Domina footwork y movimientos en solitario', icon: 'Bolt' },
    },
    faqs: [
      { q: '¿Qué estilo de Salsa enseñan?', a: 'Enseñamos Salsa en línea (On1 y On2) y estilo cubano (Casino).' },
      { q: '¿Necesito experiencia previa?', a: 'No, tenemos clases para principiantes sin experiencia.' },
      { q: '¿Necesito pareja?', a: 'No es necesario. Rotamos parejas durante las clases.' },
      { q: '¿Hay clases de rueda de casino?', a: 'Sí, ofrecemos clases de rueda para niveles intermedio y avanzado.' },
      { q: '¿Cuál es la diferencia entre On1 y On2?', a: 'On1 sigue el primer beat, On2 el segundo. Ambos son válidos y complementarios.' },
      { q: '¿Hay clases de técnica masculina/femenina?', a: 'Sí, separamos grupos para trabajar técnicas específicas de cada rol.' },
      { q: '¿Organizan salidas a eventos de salsa?', a: 'Sí, coordinamos salidas mensuales a congresos y sociales en Barcelona.' },
    ],
    relatedStyles: ['bachata', 'son-cubano'],
  },
  kizomba: {
    displayName: 'Kizomba',
    category: 'african',
    difficulty: 'intermediate',
    pillars: {
      pillar1: { title: 'Conexión', desc: 'Baila en pareja con conexión profunda', icon: 'Heart' },
      pillar2: { title: 'Movimiento', desc: 'Aprende el flow y los pasos característicos', icon: 'ArrowPath' },
      pillar3: { title: 'Musicalidad', desc: 'Interpreta la música angoleña y africana', icon: 'MusicalNote' },
    },
    faqs: [
      { q: '¿Qué es Kizomba?', a: 'Kizomba es un baile de pareja originario de Angola, caracterizado por movimientos suaves y conexión cercana.' },
      { q: '¿Necesito pareja?', a: 'No es necesario. Rotamos durante las clases.' },
      { q: '¿Es difícil aprender Kizomba?', a: 'Es accesible para principiantes, pero la conexión requiere práctica.' },
      { q: '¿Qué ropa debo usar?', a: 'Ropa cómoda que permita movimiento. Zapatos con suela que permita girar.' },
      { q: '¿Cuál es la diferencia entre Kizomba y Urban Kiz?', a: 'Kizomba es el estilo tradicional, Urban Kiz es más moderno con influencias urbanas.' },
      { q: '¿Se baila descalzo?', a: 'No necesariamente. Usa zapatos que te permitan deslizarte y sentir el suelo.' },
      { q: '¿Hay festivales de Kizomba?', a: 'Sí, te informamos de festivales internacionales y te ayudamos a prepararte.' },
    ],
    relatedStyles: ['semba', 'tarraxinha'],
  },
  'hip-hop': {
    displayName: 'Hip Hop',
    category: 'urban',
    difficulty: 'beginner-friendly',
    pillars: {
      pillar1: { title: 'Flow', desc: 'Desarrolla tu estilo personal y fluidez', icon: 'Bolt' },
      pillar2: { title: 'Técnica', desc: 'Domina los fundamentos del Hip Hop', icon: 'Cog' },
      pillar3: { title: 'Cultura', desc: 'Conecta con las raíces del Hip Hop', icon: 'Heart' },
    },
    faqs: [
      { q: '¿Qué estilos de Hip Hop enseñan?', a: 'Enseñamos Old School, New Style, Locking, Popping y House Dance.' },
      { q: '¿Necesito experiencia previa?', a: 'No, tenemos clases desde nivel iniciación.' },
      { q: '¿Aprenderemos coreografías?', a: 'Sí, combinamos técnica fundamental con coreografías de videoclips actuales.' },
      { q: '¿Hay clases de breakdance?', a: 'Ofrecemos workshops especiales de breaking. Consulta el calendario.' },
      { q: '¿Puedo participar en battles?', a: 'Sí, organizamos cypher sessions y te preparamos para competiciones.' },
      { q: '¿Qué música se usa en clase?', a: 'Usamos clásicos del Hip Hop y música urbana actual.' },
      { q: '¿Hay clases para niños?', a: 'Sí, tenemos grupos específicos para niños y adolescentes.' },
    ],
    relatedStyles: ['dancehall', 'popping', 'locking'],
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function toPascalCase(str) {
  return str
    .split(/[-_\s]/)
    .map(capitalize)
    .join('');
}

function toKebabCase(str) {
  return str.toLowerCase().replace(/\s+/g, '-');
}

function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${colors.cyan}?${colors.reset} ${question}: `, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function parseArgs(args) {
  const parsed = { flags: {} };
  args.forEach((arg) => {
    if (arg.startsWith('--')) {
      const match = arg.match(/--(\w+)(?:=(.*))?/);
      if (match) {
        const key = match[1];
        const value = match[2] ? match[2].replace(/^['"]|['"]$/g, '') : true;
        parsed[key] = value;
        parsed.flags[key] = value;
      }
    }
  });
  return parsed;
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

async function validateEnvironment(options) {
  log.step('Validating environment...');
  const errors = [];
  const warnings = [];

  // Check if component already exists
  const componentPath = join(rootDir, `components/${options.componentName}Page.tsx`);
  if (await fileExists(componentPath)) {
    errors.push(`Component already exists: components/${options.componentName}Page.tsx`);
  }

  // Check if source component exists
  const sourcePath = join(rootDir, `components/${options.sourceComponentName}Page.tsx`);
  if (!(await fileExists(sourcePath))) {
    errors.push(`Source component not found: components/${options.sourceComponentName}Page.tsx`);
  }

  // Check if App.tsx exists
  const appPath = join(rootDir, 'App.tsx');
  if (!(await fileExists(appPath))) {
    errors.push('App.tsx not found');
  } else {
    // Check if routes already exist
    const appContent = await readFile(appPath, 'utf-8');
    if (appContent.includes(`${options.componentName}Page`)) {
      warnings.push(`Routes for ${options.componentName} may already exist in App.tsx`);
    }
  }

  // Check i18n files
  for (const locale of CONFIG.supportedLocales) {
    const i18nPath = join(rootDir, `i18n/locales/${locale}.ts`);
    if (!(await fileExists(i18nPath))) {
      warnings.push(`i18n file not found: i18n/locales/${locale}.ts`);
    }
  }

  // Check if git repo is clean (optional warning)
  try {
    const gitStatus = execSync('git status --porcelain', { cwd: rootDir, encoding: 'utf-8' });
    if (gitStatus.trim()) {
      warnings.push('Git working directory is not clean. Consider committing changes first.');
    }
  } catch {
    warnings.push('Not a git repository or git not available');
  }

  return { errors, warnings };
}

// ============================================================================
// BACKUP & ROLLBACK
// ============================================================================

class BackupManager {
  constructor(backupDir, dryRun = false) {
    this.backupDir = backupDir;
    this.dryRun = dryRun;
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.sessionDir = join(backupDir, `session-${this.timestamp}`);
    this.backedUpFiles = [];
  }

  async init() {
    if (this.dryRun) return;
    await mkdir(this.sessionDir, { recursive: true });
    log.verbose(`Backup directory: ${this.sessionDir}`, true);
  }

  async backup(filePath) {
    if (this.dryRun) {
      log.dryRun(`Would backup: ${filePath}`);
      return;
    }

    if (!(await fileExists(filePath))) {
      return; // File doesn't exist yet, no need to backup
    }

    const relativePath = filePath.replace(rootDir, '').replace(/^[/\\]/, '');
    const backupPath = join(this.sessionDir, relativePath);

    await mkdir(dirname(backupPath), { recursive: true });
    await copyFile(filePath, backupPath);

    this.backedUpFiles.push({ original: filePath, backup: backupPath });
    log.verbose(`Backed up: ${relativePath}`, true);
  }

  async rollback() {
    if (this.dryRun || this.backedUpFiles.length === 0) return;

    log.warning('Rolling back changes...');

    for (const { original, backup } of this.backedUpFiles) {
      try {
        await copyFile(backup, original);
        log.verbose(`Restored: ${original}`, true);
      } catch (err) {
        log.error(`Failed to restore ${original}: ${err.message}`);
      }
    }

    log.success('Rollback completed');
  }

  async cleanup() {
    if (this.dryRun) return;
    // Keep backups for safety - users can delete manually if needed
    log.info(`Backups saved in: ${this.sessionDir}`);
  }
}

// ============================================================================
// COMPONENT GENERATION
// ============================================================================

async function createPageComponent(options, backupManager) {
  log.step(`Creating component ${options.componentName}Page.tsx...`);

  const sourcePath = join(rootDir, `components/${options.sourceComponentName}Page.tsx`);
  const outputPath = join(rootDir, `components/${options.componentName}Page.tsx`);

  if (!options.dryRun) {
    await backupManager.backup(outputPath);
  }

  const template = await readFile(sourcePath, 'utf-8');

  // Smart replacements with proper case handling
  let newContent = template;

  // Replace PascalCase component names
  newContent = newContent.replace(
    new RegExp(`${options.sourceComponentName}Page`, 'g'),
    `${options.componentName}Page`
  );

  // Replace kebab-case (URLs, paths)
  newContent = newContent.replace(
    new RegExp(options.sourceClassName, 'g'),
    options.className
  );

  // Replace camelCase (i18n keys)
  const sourceCamelCase = toCamelCase(options.sourceClassName);
  const targetCamelCase = toCamelCase(options.className);
  newContent = newContent.replace(
    new RegExp(sourceCamelCase, 'g'),
    targetCamelCase
  );

  // Replace UPPERCASE
  newContent = newContent.replace(
    new RegExp(options.sourceClassName.toUpperCase(), 'g'),
    options.className.toUpperCase()
  );

  // Replace display names in strings
  const sourceDisplayName = capitalize(options.sourceClassName);
  const targetDisplayName = options.displayName || capitalize(options.className);
  newContent = newContent.replace(
    new RegExp(sourceDisplayName, 'g'),
    targetDisplayName
  );

  if (options.dryRun) {
    log.dryRun(`Would create: components/${options.componentName}Page.tsx`);
    log.verbose(`Preview (first 500 chars):\n${newContent.substring(0, 500)}...`, options.verbose);
    return outputPath;
  }

  await writeFile(outputPath, newContent, 'utf-8');
  log.success(`Created: components/${options.componentName}Page.tsx`);

  return outputPath;
}

// ============================================================================
// APP.TSX ROUTES UPDATE
// ============================================================================

async function updateAppRoutes(options, backupManager) {
  if (options.flags['no-routes']) {
    log.info('Skipping App.tsx update (--no-routes flag)');
    return;
  }

  log.step('Updating App.tsx routes...');

  const appPath = join(rootDir, 'App.tsx');

  if (!options.dryRun) {
    await backupManager.backup(appPath);
  }

  let appContent = await readFile(appPath, 'utf-8');

  // Check if already added
  if (appContent.includes(`${options.componentName}Page`)) {
    log.warning('Routes appear to already exist in App.tsx, skipping...');
    return;
  }

  // 1. Add lazy import
  const importLine = `const ${options.componentName}Page = lazy(() => import('./components/${options.componentName}Page'));`;

  // Find the last lazy import and add after it
  // Updated regex to handle multi-line lazy imports
  const lazyImportRegex = /const \w+Page = lazy\(\s*\(\) => import\(['"]\.\/components\/\w+Page['"]\)\s*\);?/gs;
  const lazyImports = [...appContent.matchAll(lazyImportRegex)];

  if (lazyImports.length > 0) {
    const lastImport = lazyImports[lazyImports.length - 1];
    const insertPos = lastImport.index + lastImport[0].length;
    appContent = appContent.slice(0, insertPos) + '\n' + importLine + appContent.slice(insertPos);
  } else {
    log.warning('Could not find lazy imports section in App.tsx');
    log.verbose('Tried regex: /const \\w+Page = lazy\\(\\s*\\(\\) => import\\([\'\\"]\\.\\/components\\/\\w+Page[\'\\"]\\)\\s*\\);?/gs', options.verbose);
    return;
  }

  // 2. Add locale-based route
  const routeLine = `            <Route path="/:locale/${options.className}" element={<><LocaleSync /><${options.componentName}Page /></>} />`;

  // Find routes section and add before NotFound
  const notFoundRouteIndex = appContent.indexOf('<Route path="/:locale/*" element={<NotFoundPage />}');
  if (notFoundRouteIndex !== -1) {
    appContent = appContent.slice(0, notFoundRouteIndex) + routeLine + '\n            ' + appContent.slice(notFoundRouteIndex);
  }

  // 3. Add legacy redirect route
  const legacyRouteLine = `            <Route path="/${options.className}" element={<Navigate to={\`/\${locale}/${options.className}\`} replace />} />`;

  // Find legacy routes section
  const legacyNotFoundIndex = appContent.indexOf('<Route path="/*" element={<Navigate to={`/${locale}`} replace />}');
  if (legacyNotFoundIndex !== -1) {
    appContent = appContent.slice(0, legacyNotFoundIndex) + legacyRouteLine + '\n            ' + appContent.slice(legacyNotFoundIndex);
  }

  if (options.dryRun) {
    log.dryRun('Would update: App.tsx');
    log.verbose(`Would add import: ${importLine}`, options.verbose);
    log.verbose(`Would add route: ${routeLine}`, options.verbose);
    log.verbose(`Would add legacy route: ${legacyRouteLine}`, options.verbose);
    return;
  }

  await writeFile(appPath, appContent, 'utf-8');
  log.success('Updated: App.tsx');
}

// ============================================================================
// I18N GENERATION & UPDATE
// ============================================================================

function generateI18nKeys(options) {
  const template = options.template || {};
  const className = options.className;
  const componentName = options.componentName;
  const camelName = toCamelCase(className);
  const displayName = options.displayName || componentName;
  const instructor = options.instructor || 'Instructor Name';
  const specialty = options.specialty || 'Especialidad';

  const faqs = template.faqs || [
    { q: 'Pregunta 1', a: 'Respuesta 1' },
    { q: 'Pregunta 2', a: 'Respuesta 2' },
    { q: 'Pregunta 3', a: 'Respuesta 3' },
    { q: 'Pregunta 4', a: 'Respuesta 4' },
    { q: 'Pregunta 5', a: 'Respuesta 5' },
    { q: 'Pregunta 6', a: 'Respuesta 6' },
    { q: 'Pregunta 7', a: 'Respuesta 7' },
  ];

  const pillars = template.pillars || {
    pillar1: { title: 'Pilar 1', desc: 'Descripción del pilar 1' },
    pillar2: { title: 'Pilar 2', desc: 'Descripción del pilar 2' },
    pillar3: { title: 'Pilar 3', desc: 'Descripción del pilar 3' },
  };

  return {
    [`${camelName}PageTitle`]: `Clases de ${displayName} en Barcelona | Farray's Center`,
    [`${camelName}MetaDescription`]: `Aprende ${displayName} en Barcelona con los mejores instructores. Clases para todos los niveles. ¡Reserva tu plaza!`,
    [`${camelName}HeroTitle`]: displayName,
    [`${camelName}HeroSubtitle`]: `Descubre el ritmo y la pasión del ${displayName} en Farray's Center`,
    [`${camelName}AboutTitle`]: `¿Qué es ${displayName}?`,
    [`${camelName}AboutDesc1`]: `Descripción general del ${displayName}. [TODO: Personalizar]`,
    [`${camelName}AboutDesc2`]: `Descripción adicional sobre el estilo y la cultura. [TODO: Personalizar]`,
    [`${camelName}Pillar1Title`]: pillars.pillar1.title,
    [`${camelName}Pillar1Desc`]: pillars.pillar1.desc,
    [`${camelName}Pillar2Title`]: pillars.pillar2.title,
    [`${camelName}Pillar2Desc`]: pillars.pillar2.desc,
    [`${camelName}Pillar3Title`]: pillars.pillar3.title,
    [`${camelName}Pillar3Desc`]: pillars.pillar3.desc,
    [`${camelName}ClassesTitle`]: `Nuestras Clases de ${displayName}`,
    [`${camelName}ClassesSubtitle`]: 'Clases para todos los niveles',
    [`${camelName}LevelBeginnerTitle`]: 'Principiante',
    [`${camelName}LevelBeginnerDesc`]: `Ideal para quienes empiezan desde cero. Aprende los fundamentos del ${displayName}.`,
    [`${camelName}LevelInterTitle`]: 'Intermedio',
    [`${camelName}LevelInterDesc`]: 'Perfecciona tu técnica y aprende movimientos avanzados.',
    [`${camelName}LevelAdvancedTitle`]: 'Avanzado',
    [`${camelName}LevelAdvancedDesc`]: `Dominación completa del ${displayName} con coreografías y freestyle.`,
    [`${camelName}InstructorTitle`]: 'Tu Instructor',
    [`${camelName}InstructorName`]: instructor,
    [`${camelName}InstructorSpecialty`]: specialty,
    [`${camelName}InstructorBio`]: 'Biografía del instructor. [TODO: Personalizar con experiencia, logros, estilo de enseñanza]',
    [`${camelName}TestimonialsTitle`]: 'Lo que dicen nuestros alumnos',
    [`${camelName}Testimonial1Name`]: 'María G.',
    [`${camelName}Testimonial1Quote`]: `Las clases de ${displayName} son increíbles. El ambiente es genial y el profesor explica muy bien.`,
    [`${camelName}Testimonial2Name`]: 'David L.',
    [`${camelName}Testimonial2Quote`]: 'He mejorado muchísimo en solo 3 meses. Totalmente recomendable.',
    ...faqs.reduce((acc, faq, idx) => {
      acc[`${camelName}FaqQ${idx + 1}`] = faq.q;
      acc[`${camelName}FaqA${idx + 1}`] = faq.a;
      return acc;
    }, {}),
    [`${camelName}Image1Alt`]: `Clases de ${displayName} en Barcelona - Farray's Center`,
    [`${camelName}Image2Alt`]: `Estudiantes practicando ${displayName}`,
    [`${camelName}Image3Alt`]: `${instructor} - Instructor de ${displayName}`,
  };
}

async function updateI18nFile(locale, keys, options, backupManager) {
  const i18nPath = join(rootDir, `i18n/locales/${locale}.ts`);

  if (!(await fileExists(i18nPath))) {
    log.warning(`i18n file not found: ${locale}.ts, skipping...`);
    return;
  }

  if (!options.dryRun) {
    await backupManager.backup(i18nPath);
  }

  let content = await readFile(i18nPath, 'utf-8');

  // Find the end of the object (before the closing brace and semicolon)
  const lastBraceIndex = content.lastIndexOf('};');

  if (lastBraceIndex === -1) {
    log.warning(`Could not find closing brace in ${locale}.ts`);
    return;
  }

  // Check if keys already exist
  const existingKeys = Object.keys(keys).filter(key => content.includes(`${key}:`));
  if (existingKeys.length > 0) {
    log.warning(`Some keys already exist in ${locale}.ts: ${existingKeys.slice(0, 3).join(', ')}...`);
    if (!options.force) {
      log.info('Use --force to overwrite. Skipping i18n update for this locale.');
      return;
    }
  }

  // Generate the new keys section
  const camelName = toCamelCase(options.className);
  const keysSection = `\n  // ===== ${options.componentName} Page =====\n` +
    Object.entries(keys)
      .map(([key, value]) => {
        // Escape single quotes in value
        const escapedValue = String(value).replace(/'/g, "\\'");
        return `  ${key}: '${escapedValue}',`;
      })
      .join('\n') + '\n';

  // Insert before the closing brace
  const updatedContent = content.slice(0, lastBraceIndex) + keysSection + content.slice(lastBraceIndex);

  if (options.dryRun) {
    log.dryRun(`Would update: i18n/locales/${locale}.ts`);
    log.verbose(`Would add ${Object.keys(keys).length} keys`, options.verbose);
    return;
  }

  await writeFile(i18nPath, updatedContent, 'utf-8');
  log.success(`Updated: i18n/locales/${locale}.ts (${Object.keys(keys).length} keys)`);
}

async function handleI18nGeneration(options, backupManager) {
  log.step('Generating i18n keys...');

  const i18nKeys = generateI18nKeys(options);

  if (options.flags['auto-i18n']) {
    // Automatically update all locale files
    log.info('Auto-updating i18n files...');
    for (const locale of CONFIG.supportedLocales) {
      await updateI18nFile(locale, i18nKeys, options, backupManager);
    }
  } else {
    // Save template file for manual copying
    const templateContent = Object.entries(i18nKeys)
      .map(([key, value]) => `  ${key}: '${String(value).replace(/'/g, "\\'")}',`)
      .join('\n');

    const outputPath = join(rootDir, `.claude/i18n-${options.className}-template.txt`);

    if (options.dryRun) {
      log.dryRun(`Would create: .claude/i18n-${options.className}-template.txt`);
      return;
    }

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `// ${options.componentName} Page i18n keys\n\n${templateContent}`, 'utf-8');
    log.success(`Created: .claude/i18n-${options.className}-template.txt`);
    log.info('Copy these keys to i18n/locales/*.ts manually, or use --auto-i18n flag');
  }
}

// ============================================================================
// IMAGE STRUCTURE
// ============================================================================

async function createImageStructure(options, backupManager) {
  if (options.flags['no-images']) {
    log.info('Skipping image structure creation (--no-images flag)');
    return;
  }

  log.step('Creating image directory structure...');

  const rawDir = join(rootDir, `public/images/classes/${options.className}/raw`);
  const imgDir = join(rootDir, `public/images/classes/${options.className}/img`);

  if (options.dryRun) {
    log.dryRun(`Would create: public/images/classes/${options.className}/raw/`);
    log.dryRun(`Would create: public/images/classes/${options.className}/img/`);
    return;
  }

  await mkdir(rawDir, { recursive: true });
  await mkdir(imgDir, { recursive: true });

  // Create README
  const readmeContent = `# Imágenes de ${options.displayName || capitalize(options.className)}

## Instrucciones

1. **Sube aquí tus imágenes originales** (alta resolución, sin optimizar):
   - \`${options.className}-hero.jpg\` → Imagen principal (portada)
   - \`${options.className}-clase-1.jpg\` → Foto de la clase en acción
   - \`${options.className}-profesor.jpg\` → Foto del instructor

2. **Actualiza el script de optimización:**
   \`\`\`javascript
   // scripts/build-images.mjs
   const classes = ["dancehall", "afrobeats", "${options.className}"];
   \`\`\`

3. **Ejecuta la optimización:**
   \`\`\`bash
   npm run build:images
   \`\`\`

4. **Las imágenes optimizadas** (WebP + JPG, múltiples tamaños) se generarán en \`/img\`

---

📐 **Recomendaciones de tamaño:**
- Hero: 1920x1080 o mayor (16:9)
- Clase: 1200x1500 (4:5, vertical)
- Profesor: 800x800 (1:1, cuadrado)

🎨 **Formato:** JPG o PNG (el script generará WebP automáticamente)
`;

  await writeFile(join(rawDir, 'README.md'), readmeContent, 'utf-8');
  log.success(`Created: public/images/classes/${options.className}/raw/`);
  log.success(`Created: public/images/classes/${options.className}/img/`);
}

// ============================================================================
// BUILD IMAGES SCRIPT UPDATE
// ============================================================================

async function updateBuildImagesScript(options, backupManager) {
  if (options.flags['no-images']) {
    return;
  }

  log.step('Updating scripts/build-images.mjs...');

  const scriptPath = join(rootDir, 'scripts/build-images.mjs');

  if (!(await fileExists(scriptPath))) {
    log.warning('scripts/build-images.mjs not found, skipping...');
    return;
  }

  if (!options.dryRun) {
    await backupManager.backup(scriptPath);
  }

  let scriptContent = await readFile(scriptPath, 'utf-8');

  // Find the classes array
  const classesMatch = scriptContent.match(/const classes = \[(.*?)\];/s);

  if (!classesMatch) {
    log.warning('Could not find classes array in build-images.mjs');
    return;
  }

  const currentClasses = classesMatch[1]
    .split(',')
    .map((c) => c.trim().replace(/['"]/g, ''))
    .filter(Boolean);

  if (currentClasses.includes(options.className)) {
    log.info(`${options.className} already exists in build-images.mjs`);
    return;
  }

  currentClasses.push(options.className);
  const newClassesArray = `const classes = [${currentClasses.map((c) => `"${c}"`).join(', ')}];`;
  scriptContent = scriptContent.replace(/const classes = \[.*?\];/s, newClassesArray);

  if (options.dryRun) {
    log.dryRun('Would update: scripts/build-images.mjs');
    log.verbose(`Would add "${options.className}" to classes array`, options.verbose);
    return;
  }

  await writeFile(scriptPath, scriptContent, 'utf-8');
  log.success('Updated: scripts/build-images.mjs');
}

// ============================================================================
// POST-GENERATION VERIFICATION
// ============================================================================

async function verifyGeneration(options) {
  if (options.dryRun) {
    log.info('Skipping verification (dry-run mode)');
    return { success: true };
  }

  log.step('Verifying generated files...');

  const checks = [];

  // Check component exists
  const componentPath = join(rootDir, `components/${options.componentName}Page.tsx`);
  checks.push({
    name: 'Component file',
    pass: await fileExists(componentPath),
    path: componentPath,
  });

  // Check App.tsx was updated (if not skipped)
  if (!options.flags['no-routes']) {
    const appPath = join(rootDir, 'App.tsx');
    const appContent = await readFile(appPath, 'utf-8');
    checks.push({
      name: 'App.tsx import',
      pass: appContent.includes(`${options.componentName}Page`),
      path: appPath,
    });
    checks.push({
      name: 'App.tsx route',
      pass: appContent.includes(`/:locale/${options.className}`),
      path: appPath,
    });
  }

  // Optional: Run typecheck
  if (options.flags.typecheck) {
    log.info('Running TypeScript type check...');
    try {
      execSync('npm run typecheck', { cwd: rootDir, stdio: 'pipe' });
      checks.push({ name: 'TypeScript typecheck', pass: true });
    } catch (err) {
      checks.push({ name: 'TypeScript typecheck', pass: false, error: err.message });
    }
  }

  // Print results
  const failed = checks.filter(c => !c.pass);

  if (failed.length === 0) {
    log.success('All verification checks passed ✓');
    return { success: true, checks };
  } else {
    log.error(`${failed.length} verification check(s) failed:`);
    failed.forEach(check => {
      log.error(`  ✗ ${check.name}`);
      if (check.error) log.verbose(`    ${check.error}`, true);
    });
    return { success: false, checks };
  }
}

// ============================================================================
// SUMMARY & CHECKLIST
// ============================================================================

function printSummary(options) {
  log.title('✅ Class Page Generation Complete!');

  if (options.dryRun) {
    console.log(`${colors.yellow}${colors.bright}DRY RUN MODE - No files were actually modified${colors.reset}\n`);
  }

  console.log(`📦 ${colors.bright}Files that would be created/updated:${colors.reset}`);
  console.log(`   ${colors.green}✓${colors.reset} components/${options.componentName}Page.tsx`);

  if (!options.flags['no-routes']) {
    console.log(`   ${colors.green}✓${colors.reset} App.tsx (routes)`);
  }

  if (!options.flags['no-images']) {
    console.log(`   ${colors.green}✓${colors.reset} public/images/classes/${options.className}/`);
    console.log(`   ${colors.green}✓${colors.reset} scripts/build-images.mjs`);
  }

  if (options.flags['auto-i18n']) {
    CONFIG.supportedLocales.forEach(locale => {
      console.log(`   ${colors.green}✓${colors.reset} i18n/locales/${locale}.ts`);
    });
  } else {
    console.log(`   ${colors.green}✓${colors.reset} .claude/i18n-${options.className}-template.txt`);
  }

  console.log(`\n📋 ${colors.bright}Next Steps:${colors.reset}\n`);

  const todos = [];

  if (!options.flags['auto-i18n']) {
    todos.push({
      num: todos.length + 1,
      title: 'Add i18n translations',
      steps: [
        `Open: .claude/i18n-${options.className}-template.txt`,
        'Copy keys to: i18n/locales/es.ts',
        'Translate to: en.ts, ca.ts, fr.ts',
      ],
    });
  } else {
    todos.push({
      num: todos.length + 1,
      title: 'Review and customize i18n translations',
      steps: [
        'Open: i18n/locales/es.ts',
        `Search for "${toCamelCase(options.className)}" keys`,
        'Replace [TODO] placeholders with actual content',
        'Translate to other locales',
      ],
    });
  }

  if (!options.flags['no-images']) {
    todos.push({
      num: todos.length + 1,
      title: 'Add images',
      steps: [
        `Upload 3 JPG images to: public/images/classes/${options.className}/raw/`,
        `  → ${options.className}-hero.jpg`,
        `  → ${options.className}-clase-1.jpg`,
        `  → ${options.className}-profesor.jpg`,
        'Run: npm run build:images',
      ],
    });
  }

  todos.push({
    num: todos.length + 1,
    title: 'Customize component content',
    steps: [
      `Open: components/${options.componentName}Page.tsx`,
      'Customize: texts, FAQs, testimonials, instructor bio',
      'Update meta descriptions and SEO content',
    ],
  });

  todos.push({
    num: todos.length + 1,
    title: 'Test locally',
    steps: [
      'Run: npm run dev',
      `Open: http://localhost:5173/es/${options.className}`,
      'Verify: layout, images, links, i18n',
    ],
  });

  if (!options.dryRun) {
    todos.push({
      num: todos.length + 1,
      title: 'Deploy',
      steps: [
        `git checkout -b feat/${options.className}-page`,
        'git add .',
        `git commit -m "feat: Add ${options.componentName} class page"`,
        `git push -u origin feat/${options.className}-page`,
        'Create PR and review Vercel preview',
      ],
    });
  }

  todos.forEach(todo => {
    console.log(`${colors.cyan}${todo.num}.${colors.reset} ${colors.bright}${todo.title}${colors.reset}`);
    todo.steps.forEach(step => {
      if (step.startsWith('Run:') || step.startsWith('git ')) {
        console.log(`     ${colors.yellow}${step}${colors.reset}`);
      } else {
        console.log(`     ${step}`);
      }
    });
    console.log();
  });

  if (options.dryRun) {
    console.log(`\n${colors.yellow}${colors.bright}To actually generate the files, run without --dry-run${colors.reset}\n`);
  } else {
    console.log(`🎉 ${colors.green}Ready to work on ${options.componentName}!${colors.reset}\n`);
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  try {
    log.title('🚀 Advanced Class Page Generator v2.0');

    // Parse arguments
    const args = process.argv.slice(2);
    const options = parseArgs(args);

    // Interactive mode if no name provided
    if (!options.name && !options.dryRun) {
      options.name = await promptUser('Class name (e.g., bachata, salsa, kizomba)');
      options.instructor = await promptUser('Instructor name (optional, press Enter to skip)');
      options.specialty = await promptUser('Instructor specialty (optional, press Enter to skip)');
    }

    if (!options.name) {
      log.error('❌ Class name is required');
      console.log('\nUsage:');
      console.log('  npm run create:class:v2 -- --name=bachata --instructor="Carlos" --dry-run');
      console.log('\nOptions:');
      console.log('  --name          Class name (required)');
      console.log('  --from          Source page to clone from (default: dancehall)');
      console.log('  --instructor    Instructor name');
      console.log('  --specialty     Instructor specialty');
      console.log('  --dry-run       Preview changes without executing');
      console.log('  --verbose       Detailed logging');
      console.log('  --auto-i18n     Auto-update i18n files');
      console.log('  --force         Overwrite existing keys in i18n');
      console.log('  --skip-backup   Skip backup creation');
      console.log('  --no-routes     Skip App.tsx update');
      console.log('  --no-images     Skip image structure creation');
      console.log('  --typecheck     Run TypeScript typecheck after generation');
      process.exit(1);
    }

    // Prepare options
    const className = toKebabCase(options.name);
    const componentName = toPascalCase(options.name);
    const sourceClassName = toKebabCase(options.from || CONFIG.defaultSourcePage);
    const sourceComponentName = toPascalCase(options.from || CONFIG.defaultSourcePage);

    const template = classTemplates[className];
    const displayName = template?.displayName || capitalize(className);

    const generationOptions = {
      ...options,
      className,
      componentName,
      sourceClassName,
      sourceComponentName,
      displayName,
      template,
      dryRun: options.flags['dry-run'],
      verbose: options.flags.verbose,
    };

    log.info(`Class: ${displayName} (${className})`);
    log.info(`Source: ${sourceComponentName}Page`);
    if (options.instructor) log.info(`Instructor: ${options.instructor}`);
    if (generationOptions.dryRun) log.warning('DRY RUN MODE - No files will be modified');

    // Validation
    const validation = await validateEnvironment(generationOptions);

    if (validation.warnings.length > 0) {
      validation.warnings.forEach(w => log.warning(w));
    }

    if (validation.errors.length > 0) {
      validation.errors.forEach(e => log.error(e));
      log.error('❌ Validation failed. Fix errors and try again.');
      process.exit(1);
    }

    log.success('Validation passed ✓\n');

    // Initialize backup manager
    const backupManager = new BackupManager(
      CONFIG.backupDir,
      generationOptions.dryRun || options.flags['skip-backup']
    );
    await backupManager.init();

    try {
      // Execute generation steps
      await createPageComponent(generationOptions, backupManager);
      await updateAppRoutes(generationOptions, backupManager);
      await handleI18nGeneration(generationOptions, backupManager);
      await createImageStructure(generationOptions, backupManager);
      await updateBuildImagesScript(generationOptions, backupManager);

      // Verification
      const verification = await verifyGeneration(generationOptions);

      if (!verification.success) {
        log.warning('Some verification checks failed. Review the errors above.');

        if (!generationOptions.dryRun) {
          const answer = await promptUser('Rollback changes? (y/n)');
          if (answer.toLowerCase() === 'y') {
            await backupManager.rollback();
            process.exit(1);
          }
        }
      }

      // Cleanup and summary
      await backupManager.cleanup();
      printSummary(generationOptions);

    } catch (error) {
      log.error(`❌ Error during generation: ${error.message}`);

      if (!generationOptions.dryRun) {
        log.warning('Attempting rollback...');
        await backupManager.rollback();
      }

      throw error;
    }

  } catch (error) {
    log.error(`❌ Fatal error: ${error.message}`);
    if (options?.verbose) {
      console.error(error);
    }
    process.exit(1);
  }
}

main();
