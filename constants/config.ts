/**
 * Configuración centralizada de la aplicación
 * Este archivo contiene todas las constantes globales (URLs, emails, etc.)
 */

// URLs del sitio
export const SITE_URL = 'https://www.farrayscenter.com';
export const LOGO_URL = `${SITE_URL}/logo.png`;

// Información de contacto
export const CONTACT_EMAIL = 'info@farrayscenter.com';
export const SUPPORT_EMAIL = 'support@momence.com';

// URLs de schemas
export const SCHEMA_CONTEXT = 'https://schema.org';

// URLs de recursos externos
export const EXTERNAL_RESOURCES = {
  transparentTextures: 'https://www.transparenttextures.com/patterns/stardust.png',
  googleMapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.7083603486235!2d2.148014315104171!3d41.38042057926481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49882fa7aaaa9%3A0x47a79ab582164caf!2sFarray%E2%80%99s+International+Dance+Center+-+Escuela+de+Salsa+Cubana%2C+Bailes+Sociales+y+Danza!5e1!3m2!1ses!2ses!4v1504633190526',
} as const;

// URLs de Unsplash (fallback images)
export const UNSPLASH_IMAGES = {
  salsa:
    'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=800&h=600&fit=crop&q=80&auto=format',
  bachata:
    'https://images.unsplash.com/photo-1547153760-18fc9c88c1c8?w=800&h=600&fit=crop&q=80&auto=format',
  danzaContemporanea:
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&h=600&fit=crop&q=80&auto=format',
  default:
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop&q=80&auto=format',
} as const;

// Configuración de Schema.org
export const SCHEMA_AVAILABILITY = 'https://schema.org/InStock';

// Información de la empresa (para Schema.org)
export const BUSINESS_INFO = {
  name: "Farray's International Dance Center",
  email: CONTACT_EMAIL,
  url: SITE_URL,
  logo: LOGO_URL,
} as const;

// Videos
export const VIDEOS = {
  yunaisyPerformance: `${SITE_URL}/videos/yunaisy-farray-performance.mp4`,
} as const;
