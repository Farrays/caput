import { GOOGLE_REVIEWS_TESTIMONIALS } from './testimonials';
import type { Testimonial } from '../types';
import type { FAQ } from '../components/templates/ClassPageTemplate';

// FAQs configuration for Hip Hop page
export const HIP_HOP_FAQS_CONFIG: FAQ[] = [
  { id: 'hiphop-1', questionKey: 'hipHopFaqQ1', answerKey: 'hipHopFaqA1' },
  { id: 'hiphop-2', questionKey: 'hipHopFaqQ2', answerKey: 'hipHopFaqA2' },
  { id: 'hiphop-3', questionKey: 'hipHopFaqQ3', answerKey: 'hipHopFaqA3' },
  { id: 'hiphop-4', questionKey: 'hipHopFaqQ4', answerKey: 'hipHopFaqA4' },
  { id: 'hiphop-5', questionKey: 'hipHopFaqQ5', answerKey: 'hipHopFaqA5' },
  { id: 'hiphop-6', questionKey: 'hipHopFaqQ6', answerKey: 'hipHopFaqA6' },
  { id: 'hiphop-7', questionKey: 'hipHopFaqQ7', answerKey: 'hipHopFaqA7' },
];

// Testimonials for Hip Hop page (uses Google reviews)
export const HIP_HOP_TESTIMONIALS: Testimonial[] = GOOGLE_REVIEWS_TESTIMONIALS;

// Course schema configuration
export const HIP_HOP_COURSE_CONFIG = {
  teaches: 'Hip Hop, Old School, New Style, Locking, Popping, House Dance',
  prerequisites: 'Ninguno',
  lessons: 'Clases semanales',
  duration: 'PT1H',
};

// Schedule data for Hip Hop classes
export const HIP_HOP_SCHEDULE_KEYS = [
  {
    id: '1',
    dayKey: 'monday',
    className: 'Hip Hop Principiantes',
    time: '19:00 - 20:00',
    teacher: "Equipo Farray's",
    levelKey: 'beginnerLevel',
  },
  {
    id: '2',
    dayKey: 'wednesday',
    className: 'Hip Hop Intermedio',
    time: '20:00 - 21:00',
    teacher: "Equipo Farray's",
    levelKey: 'intermediateLevel',
  },
  {
    id: '3',
    dayKey: 'friday',
    className: 'Hip Hop Avanzado',
    time: '21:00 - 22:00',
    teacher: "Equipo Farray's",
    levelKey: 'advancedLevel',
  },
];

// Breadcrumb custom keys for Hip Hop
export const HIP_HOP_BREADCRUMB_KEYS = {
  home: 'hipHopBreadcrumbHome',
  classes: 'hipHopBreadcrumbClasses',
  urban: 'hipHopBreadcrumbUrban',
  current: 'hipHopBreadcrumbCurrent',
};
