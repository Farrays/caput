/**
 * Testimonial type definition
 */
export interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  city: {
    en: string;
    es: string;
    ca: string;
    fr: string;
  };
  quote: {
    en: string;
    es: string;
    ca: string;
    fr: string;
  };
}

/**
 * Supported dance types
 */
export type DanceType = 'dancehall' | 'hip-hop' | 'twerk';

/**
 * FAQ configuration structure
 */
export interface FAQ {
  id: string;
  questionKey: string;
  answerKey: string;
}

/**
 * Schedule item structure (before translation)
 */
export interface ScheduleConfig {
  id: string;
  dayKey: string;
  className: string;
  time: string;
  teacher: string;
  levelKey: string;
}

/**
 * Schedule item structure (after translation)
 */
export interface Schedule {
  id: string;
  day: string;
  className: string;
  time: string;
  teacher: string;
  level: string;
}

/**
 * Course configuration for Schema Markup
 */
export interface CourseConfig {
  teaches: string;
  prerequisites: string;
  lessons: string;
  duration: string;
}

/**
 * Breadcrumb configuration keys
 */
export interface BreadcrumbKeys {
  home: string;
  classes: string;
  urban?: string;
  current: string;
}

/**
 * Teacher information
 */
export interface TeacherInfo {
  name: string;
  image: string;
  specialtyKey: string;
  bioKey: string;
}

/**
 * Translation key prefixes for each dance type
 */
export interface TranslationKeyPrefixes {
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  heroDesc: string;
  heroLocation: string;
  cta1: string;
  cta1Subtext: string;
  cta2: string;
  cta2Subtext: string;

  // Benefits section ("What is X?" section)
  whatIsTitle: string;
  whatIsP1: string;
  whatIsP2: string;
  whatIsP3: string;
  whatIsP4: string;
  whatIsQuestionTitle: string;
  whatIsQuestionAnswer: string;

  // Identification section
  identifyTitle: string;
  identify1: string;
  identify2: string;
  identify3: string;
  identify4: string;
  identify5: string;
  identify6: string;
  identifyTransition: string;
  needEnrollTitle: string;
  needEnrollP1: string;
  needEnrollP2: string;

  // Cultural history section
  culturalTitle: string;
  culturalShort: string;
  culturalFull: string;

  // Transformation section
  transformationTitle: string;
  transformationSubtitle: string;
  transformation1: string;
  transformation2: string;
  transformation3: string;
  transformation4: string;
  transformation5: string;
  transformation6: string;
  transformation7: string;

  // Schedule/Teachers section
  logosTitle: string;
  logosIntlFestivalsText: string;
  teachersTitle: string;
  teachersSubtitle: string;
  teachersClosing: string;
  scheduleTitle: string;
  scheduleSubtitle: string;

  // Meta & Schema
  pageTitle: string;
  metaDescription: string;
  videoTitle: string;
  videoDesc: string;
  courseSchemaName: string;
  courseSchemaDesc: string;

  // Breadcrumbs
  breadcrumbHome: string;
  breadcrumbClasses: string;
  breadcrumbUrban?: string;
  breadcrumbCurrent: string;
}

/**
 * Complete configuration for a dance type
 */
export interface DanceConfig {
  // Basic info
  type: DanceType;
  slug: string; // e.g., 'dancehall-barcelona', 'hip-hop-barcelona'
  ogImage: string; // e.g., 'og-dancehall.jpg'

  // Translation key prefixes
  keys: TranslationKeyPrefixes;

  // Data sources
  faqs: FAQ[];
  testimonials: Testimonial[];
  schedules: ScheduleConfig[];
  course: CourseConfig;
  breadcrumbKeys: BreadcrumbKeys;

  // Teachers (optional, can be added later if needed)
  teachers?: TeacherInfo[];

  // Images
  heroImage?: string;
  benefitsImage: string;
  culturalBackgroundImage?: string;

  // Additional optional keys for generic components
  transformPrefix?: string; // e.g., 'dhV3Transform', defaults to '${type}Transform'
  whyChoosePrefix?: string; // e.g., 'dhV3WhyChoose', defaults to '${type}WhyChoose'
  videoId?: string; // YouTube video ID
  faqTitleKey?: string; // defaults to '${type}FaqTitle'

  // Optional grouped keys for TestimonialsFAQSection
  whyTodayKeys?: {
    fullTitle: string;
    why1: string;
    why2: string;
    why3: string;
    closing1: string;
    closing2: string;
  };

  finalCTAKeys?: {
    title: string;
    subtitle: string;
    desc: string;
    funny: string;
  };
}
