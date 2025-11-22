import { GOOGLE_REVIEWS_TESTIMONIALS } from './testimonials';
import type { Testimonial } from '../types';
import type { FAQ } from '../components/templates/ClassPageTemplate';

// FAQs configuration for Twerk page
export const TWERK_FAQS_CONFIG: FAQ[] = [
  { id: 'twk-1', questionKey: 'twkFaqQ1', answerKey: 'twkFaqA1' },
  { id: 'twk-2', questionKey: 'twkFaqQ2', answerKey: 'twkFaqA2' },
  { id: 'twk-3', questionKey: 'twkFaqQ3', answerKey: 'twkFaqA3' },
  { id: 'twk-4', questionKey: 'twkFaqQ4', answerKey: 'twkFaqA4' },
  { id: 'twk-5', questionKey: 'twkFaqQ5', answerKey: 'twkFaqA5' },
  { id: 'twk-6', questionKey: 'twkFaqQ6', answerKey: 'twkFaqA6' },
  { id: 'twk-7', questionKey: 'twkFaqQ7', answerKey: 'twkFaqA7' },
  { id: 'twk-8', questionKey: 'twkFaqQ8', answerKey: 'twkFaqA8' },
  { id: 'twk-9', questionKey: 'twkFaqQ9', answerKey: 'twkFaqA9' },
  { id: 'twk-10', questionKey: 'twkFaqQ10', answerKey: 'twkFaqA10' },
  { id: 'twk-11', questionKey: 'twkFaqQ11', answerKey: 'twkFaqA11' },
  { id: 'twk-12', questionKey: 'twkFaqQ12', answerKey: 'twkFaqA12' },
  { id: 'twk-13', questionKey: 'twkFaqQ13', answerKey: 'twkFaqA13' },
  { id: 'twk-14', questionKey: 'twkFaqQ14', answerKey: 'twkFaqA14' },
  { id: 'twk-15', questionKey: 'twkFaqQ15', answerKey: 'twkFaqA15' },
  { id: 'twk-16', questionKey: 'twkFaqQ16', answerKey: 'twkFaqA16' },
];

// Testimonials for Twerk page (extends Google reviews with specific testimonial)
export const TWERK_TESTIMONIALS: Testimonial[] = [
  ...GOOGLE_REVIEWS_TESTIMONIALS,
  {
    id: 4,
    name: 'María Fernández',
    image: '/images/testimonials/placeholder-f.jpg',
    rating: 5,
    city: {
      en: 'Barcelona, Spain',
      es: 'Barcelona, España',
      ca: 'Barcelona, Espanya',
      fr: 'Barcelone, Espagne',
    },
    quote: {
      en: 'The Twerk classes are amazing! I have gained confidence and strength. The best academy in Barcelona.',
      es: 'Las clases de Twerk son increíbles! He ganado confianza y fuerza. La mejor academia de Barcelona.',
      ca: 'Les classes de Twerk són increïbles! He guanyat confiança i força. La millor acadèmia de Barcelona.',
      fr: 'Les cours de Twerk sont incroyables! J\'ai gagné en confiance et en force. La meilleure académie de Barcelone.',
    },
  },
];

// Course schema configuration
export const TWERK_COURSE_CONFIG = {
  teaches: 'Twerking Dance, bootydance, técnica de disociación corporal, movimientos de caderas y glúteos',
  prerequisites: 'Ninguno',
  lessons: '5 clases semanales',
  duration: 'PT1H',
};

// Schedule data for Twerk classes
export const TWERK_SCHEDULE_KEYS = [
  {
    id: '1',
    dayKey: 'monday',
    className: 'Twerk Principiantes',
    time: '20:00 - 21:00',
    teacher: 'Isabel López',
    levelKey: 'beginnerLevel',
  },
  {
    id: '2',
    dayKey: 'wednesday',
    className: 'Twerk Bootydance Intermedio',
    time: '21:00 - 22:00',
    teacher: 'Isabel López',
    levelKey: 'intermediateLevel',
  },
  {
    id: '3',
    dayKey: 'thursday',
    className: 'Twerk Avanzado',
    time: '20:00 - 21:00',
    teacher: 'Sandra Gómez',
    levelKey: 'advancedLevel',
  },
  {
    id: '4',
    dayKey: 'friday',
    className: 'Twerk Básico',
    time: '19:00 - 20:00',
    teacher: 'Sandra Gómez',
    levelKey: 'basicLevel',
  },
  {
    id: '5',
    dayKey: 'saturday',
    className: 'Twerk & Reggaeton',
    time: '11:00 - 12:00',
    teacher: 'Isabel López',
    levelKey: 'beginnerLevel',
  },
];

// Breadcrumb custom keys for Twerk
export const TWERK_BREADCRUMB_KEYS = {
  home: 'twkBreadcrumbHome',
  classes: 'twkBreadcrumbClasses',
  current: 'twkBreadcrumbCurrent',
};
