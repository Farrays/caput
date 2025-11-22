/**
 * Modular lazy-loaded translations
 * Each language is split into modules that are loaded on-demand
 * This reduces initial bundle size and improves performance
 */

import type { Locale } from '../../types';

// Type definition for translations
export type TranslationKeys = Record<string, string>;

// Available translation modules
export type TranslationModule =
  | 'common'
  | 'danceClassesHub'
  | 'home'
  | 'danzaBarcelona'
  | 'salsaBachata'
  | 'danzasUrbanas'
  | 'prepFisica'
  | 'yunaisyFarray'
  | 'contact'
  | 'merchandising'
  | 'notFound'
  | 'regalaBaile'
  | 'particularesPage'
  | 'faq'
  | 'serviciosBaile'
  | 'estudioGrabacion'
  | 'roomRental';

/**
 * Load a specific translation module for a locale
 */
export const loadModule = async (
  locale: Locale,
  module: TranslationModule
): Promise<TranslationKeys> => {
  const path = `./${locale}/${module}.js`;

  switch (locale) {
    case 'en':
      return (await import(/* @vite-ignore */ path))[module];
    case 'es':
      return (await import(/* @vite-ignore */ path))[module];
    case 'ca':
      return (await import(/* @vite-ignore */ path))[module];
    case 'fr':
      return (await import(/* @vite-ignore */ path))[module];
    default:
      return (await import(/* @vite-ignore */ `./${locale}/${module}.js`))[module];
  }
};

/**
 * Load all translations for a locale (for backward compatibility)
 */
export const loadTranslations = async (locale: Locale): Promise<TranslationKeys> => {
  switch (locale) {
    case 'en':
      return (await import('./en/index.js')).en;
    case 'es':
      return (await import('./es/index.js')).es;
    case 'ca':
      return (await import('./ca/index.js')).ca;
    case 'fr':
      return (await import('./fr/index.js')).fr;
    default:
      return (await import('./es/index.js')).es;
  }
};

/**
 * Load common translations + specific modules
 * This is more efficient than loading all translations
 */
export const loadTranslationsWithModules = async (
  locale: Locale,
  modules: TranslationModule[] = ['common']
): Promise<TranslationKeys> => {
  // Always include common module
  const modulesToLoad = ['common', ...modules.filter(m => m !== 'common')];

  const results = await Promise.all(
    modulesToLoad.map(module => loadModule(locale, module as TranslationModule))
  );

  return Object.assign({}, ...results);
};

/**
 * Preload function for critical locales (optional optimization)
 */
export const preloadLocale = (locale: Locale): void => {
  loadTranslations(locale).catch(console.error);
};

/**
 * Preload specific modules for a locale
 */
export const preloadModules = (locale: Locale, modules: TranslationModule[]): void => {
  modules.forEach(module => {
    loadModule(locale, module).catch(console.error);
  });
};
