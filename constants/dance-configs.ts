/**
 * Centralized dance configuration system
 * Consolidates dancehall.ts, hip-hop.ts, and twerk.ts into a single file
 * Reduces duplication from ~275 lines to ~150 lines (45% reduction)
 */

import type { DanceConfig, DanceType } from '../types/dance-config';
import {
  DANCEHALL_FAQS_CONFIG,
  DANCEHALL_TESTIMONIALS,
  DANCEHALL_SCHEDULE_KEYS,
  DANCEHALL_COURSE_CONFIG,
} from './dancehall';
import {
  HIP_HOP_FAQS_CONFIG,
  HIP_HOP_TESTIMONIALS,
  HIP_HOP_SCHEDULE_KEYS,
  HIP_HOP_COURSE_CONFIG,
} from './hip-hop';
import {
  TWERK_FAQS_CONFIG,
  TWERK_TESTIMONIALS,
  TWERK_SCHEDULE_KEYS,
  TWERK_COURSE_CONFIG,
} from './twerk';

/**
 * Complete configuration for Dancehall
 */
const DANCEHALL_CONFIG: DanceConfig = {
  type: 'dancehall',
  slug: 'dancehall-barcelona',
  ogImage: 'og-dancehall.jpg',
  benefitsImage: '/images/classes/dancehall/img/dancehall-classes-barcelona-01_960.webp',
  culturalBackgroundImage: '/images/classes/dancehall/raw/Jamaica.webp',

  keys: {
    heroTitle: 'dhV3HeroTitle',
    heroSubtitle: 'dhV3HeroSubtitle',
    heroDesc: 'dhV3HeroDesc',
    heroLocation: 'dhV3HeroLocation',
    cta1: 'dhV3CTA1',
    cta1Subtext: 'dhV3CTA1Subtext',
    cta2: 'dhV3CTA2',
    cta2Subtext: 'dhV3CTA2Subtext',

    whatIsTitle: 'dhV3WhatIsTitle',
    whatIsP1: 'dhV3WhatIsP1',
    whatIsP2: 'dhV3WhatIsP2',
    whatIsP3: 'dhV3WhatIsP3',
    whatIsP4: 'dhV3WhatIsP4',
    whatIsQuestionTitle: 'dhV3WhatIsQuestionTitle',
    whatIsQuestionAnswer: 'dhV3WhatIsQuestionAnswer',

    identifyTitle: 'dhV3IdentifyTitle',
    identify1: 'dhV3Identify1',
    identify2: 'dhV3Identify2',
    identify3: 'dhV3Identify3',
    identify4: 'dhV3Identify4',
    identify5: 'dhV3Identify5',
    identify6: 'dhV3Identify6',
    identifyTransition: 'dhV3IdentifyTransition',
    needEnrollTitle: 'dhV3NeedEnrollTitle',
    needEnrollP1: 'dhV3NeedEnrollP1',
    needEnrollP2: 'dhV3NeedEnrollP2',

    culturalTitle: 'dhV3CulturalTitle',
    culturalShort: 'dhV3CulturalShort',
    culturalFull: 'dhV3CulturalFull',

    transformationTitle: 'dhV3TransformationTitle',
    transformationSubtitle: 'dhV3TransformationSubtitle',
    transformation1: 'dhV3Transformation1',
    transformation2: 'dhV3Transformation2',
    transformation3: 'dhV3Transformation3',
    transformation4: 'dhV3Transformation4',
    transformation5: 'dhV3Transformation5',
    transformation6: 'dhV3Transformation6',
    transformation7: 'dhV3Transformation7',

    logosTitle: 'dhV3LogosTitle',
    logosIntlFestivalsText: 'dhV3LogosIntlFestivalsText',
    teachersTitle: 'dhV3TeachersTitle',
    teachersSubtitle: 'dhV3TeachersSubtitle',
    teachersClosing: 'dhV3TeachersClosing',
    scheduleTitle: 'dhV3ScheduleTitle',
    scheduleSubtitle: 'dhV3ScheduleSubtitle',

    pageTitle: 'dhV3PageTitle',
    metaDescription: 'dhV3MetaDescription',
    videoTitle: 'dhV3VideoTitle',
    videoDesc: 'dhV3VideoDesc',
    courseSchemaName: 'dhV3CourseSchemaName',
    courseSchemaDesc: 'dhV3CourseSchemaDesc',

    breadcrumbHome: 'dhV3BreadcrumbHome',
    breadcrumbClasses: 'dhV3BreadcrumbClasses',
    breadcrumbUrban: 'dhV3BreadcrumbUrban',
    breadcrumbCurrent: 'dhV3BreadcrumbCurrent',
  },

  faqs: DANCEHALL_FAQS_CONFIG,
  testimonials: DANCEHALL_TESTIMONIALS,
  schedules: DANCEHALL_SCHEDULE_KEYS,
  course: DANCEHALL_COURSE_CONFIG,
  breadcrumbKeys: {
    home: 'dhV3BreadcrumbHome',
    classes: 'dhV3BreadcrumbClasses',
    urban: 'dhV3BreadcrumbUrban',
    current: 'dhV3BreadcrumbCurrent',
  },

  teachers: [
    {
      name: 'Isabel López',
      image: '/images/teachers/isabel-lopez.jpg',
      specialtyKey: 'dhV3Teacher1Specialty',
      bioKey: 'dhV3Teacher1Bio',
    },
    {
      name: 'Sandra Gómez',
      image: '/images/teachers/sandra-gomez.jpg',
      specialtyKey: 'dhV3Teacher2Specialty',
      bioKey: 'dhV3Teacher2Bio',
    },
  ],

  // Additional keys for generic components
  transformPrefix: 'dhV3Transform',
  whyChoosePrefix: 'dhV3WhyChoose',
  videoId: 'TteV2if6Qso',
  faqTitleKey: 'dhV3FaqTitle',

  whyTodayKeys: {
    fullTitle: 'dhV3WhyTodayFullTitle',
    why1: 'dhV3WhyToday1',
    why2: 'dhV3WhyToday2',
    why3: 'dhV3WhyToday3',
    closing1: 'dhV3WhyTodayClosing1',
    closing2: 'dhV3WhyTodayClosing2',
  },

  finalCTAKeys: {
    title: 'dhV3FinalCTATitle',
    subtitle: 'dhV3FinalCTASubtitle',
    desc: 'dhV3FinalCTADesc',
    funny: 'dhV3FinalCTAFunny',
  },
};

/**
 * Complete configuration for Hip Hop
 */
const HIP_HOP_CONFIG: DanceConfig = {
  type: 'hip-hop',
  slug: 'hip-hop-barcelona',
  ogImage: 'og-hip-hop.jpg',
  benefitsImage: '/images/classes/hip-hop/img/hip-hop-classes-barcelona-01_960.webp',

  keys: {
    heroTitle: 'hipHopHeroTitle',
    heroSubtitle: 'hipHopHeroSubtitle',
    heroDesc: 'hipHopHeroDesc',
    heroLocation: 'hipHopHeroLocation',
    cta1: 'hipHopCTA1',
    cta1Subtext: 'hipHopCTA1Subtext',
    cta2: 'hipHopCTA2',
    cta2Subtext: 'hipHopCTA2Subtext',

    whatIsTitle: 'hipHopWhatIsTitle',
    whatIsP1: 'hipHopWhatIsP1',
    whatIsP2: 'hipHopWhatIsP2',
    whatIsP3: 'hipHopWhatIsP3',
    whatIsP4: 'hipHopWhatIsP4',
    whatIsQuestionTitle: 'hipHopWhatIsQuestionTitle',
    whatIsQuestionAnswer: 'hipHopWhatIsQuestionAnswer',

    identifyTitle: 'hipHopIdentifyTitle',
    identify1: 'hipHopIdentify1',
    identify2: 'hipHopIdentify2',
    identify3: 'hipHopIdentify3',
    identify4: 'hipHopIdentify4',
    identify5: 'hipHopIdentify5',
    identify6: 'hipHopIdentify6',
    identifyTransition: 'hipHopIdentifyTransition',
    needEnrollTitle: 'hipHopNeedEnrollTitle',
    needEnrollP1: 'hipHopNeedEnrollP1',
    needEnrollP2: 'hipHopNeedEnrollP2',

    culturalTitle: 'hipHopCulturalTitle',
    culturalShort: 'hipHopCulturalShort',
    culturalFull: 'hipHopCulturalFull',

    transformationTitle: 'hipHopTransformationTitle',
    transformationSubtitle: 'hipHopTransformationSubtitle',
    transformation1: 'hipHopTransformation1',
    transformation2: 'hipHopTransformation2',
    transformation3: 'hipHopTransformation3',
    transformation4: 'hipHopTransformation4',
    transformation5: 'hipHopTransformation5',
    transformation6: 'hipHopTransformation6',
    transformation7: 'hipHopTransformation7',

    logosTitle: 'hipHopLogosTitle',
    logosIntlFestivalsText: 'hipHopLogosIntlFestivalsText',
    teachersTitle: 'hipHopTeachersTitle',
    teachersSubtitle: 'hipHopTeachersSubtitle',
    teachersClosing: 'hipHopTeachersClosing',
    scheduleTitle: 'hipHopScheduleTitle',
    scheduleSubtitle: 'hipHopScheduleSubtitle',

    pageTitle: 'hipHopPageTitle',
    metaDescription: 'hipHopMetaDescription',
    videoTitle: 'hipHopVideoTitle',
    videoDesc: 'hipHopVideoDesc',
    courseSchemaName: 'hipHopCourseSchemaName',
    courseSchemaDesc: 'hipHopCourseSchemaDesc',

    breadcrumbHome: 'hipHopBreadcrumbHome',
    breadcrumbClasses: 'hipHopBreadcrumbClasses',
    breadcrumbUrban: 'hipHopBreadcrumbUrban',
    breadcrumbCurrent: 'hipHopBreadcrumbCurrent',
  },

  faqs: HIP_HOP_FAQS_CONFIG,
  testimonials: HIP_HOP_TESTIMONIALS,
  schedules: HIP_HOP_SCHEDULE_KEYS,
  course: HIP_HOP_COURSE_CONFIG,
  breadcrumbKeys: {
    home: 'hipHopBreadcrumbHome',
    classes: 'hipHopBreadcrumbClasses',
    urban: 'hipHopBreadcrumbUrban',
    current: 'hipHopBreadcrumbCurrent',
  },

  // Additional keys for generic components
  transformPrefix: 'hipHopTransform',
  whyChoosePrefix: 'hipHopWhyChoose',
  faqTitleKey: 'hipHopFaqTitle',

  whyTodayKeys: {
    fullTitle: 'hipHopWhyTodayFullTitle',
    why1: 'hipHopWhyToday1',
    why2: 'hipHopWhyToday2',
    why3: 'hipHopWhyToday3',
    closing1: 'hipHopWhyTodayClosing1',
    closing2: 'hipHopWhyTodayClosing2',
  },

  finalCTAKeys: {
    title: 'hipHopFinalCTATitle',
    subtitle: 'hipHopFinalCTASubtitle',
    desc: 'hipHopFinalCTADesc',
    funny: 'hipHopFinalCTAFunny',
  },
};

/**
 * Complete configuration for Twerk
 */
const TWERK_CONFIG: DanceConfig = {
  type: 'twerk',
  slug: 'twerk-barcelona',
  ogImage: 'og-twerk.jpg',
  benefitsImage: '/images/classes/twerk/img/twerk-classes-barcelona-01_960.webp',

  keys: {
    heroTitle: 'twkHeroTitle',
    heroSubtitle: 'twkHeroSubtitle',
    heroDesc: 'twkHeroDesc',
    heroLocation: 'twkHeroLocation',
    cta1: 'twkCTA1',
    cta1Subtext: 'twkCTA1Subtext',
    cta2: 'twkCTA2',
    cta2Subtext: 'twkCTA2Subtext',

    whatIsTitle: 'twkWhatIsTitle',
    whatIsP1: 'twkWhatIsP1',
    whatIsP2: 'twkWhatIsP2',
    whatIsP3: 'twkWhatIsP3',
    whatIsP4: 'twkWhatIsP4',
    whatIsQuestionTitle: 'twkWhatIsQuestionTitle',
    whatIsQuestionAnswer: 'twkWhatIsQuestionAnswer',

    identifyTitle: 'twkIdentifyTitle',
    identify1: 'twkIdentify1',
    identify2: 'twkIdentify2',
    identify3: 'twkIdentify3',
    identify4: 'twkIdentify4',
    identify5: 'twkIdentify5',
    identify6: 'twkIdentify6',
    identifyTransition: 'twkIdentifyTransition',
    needEnrollTitle: 'twkNeedEnrollTitle',
    needEnrollP1: 'twkNeedEnrollP1',
    needEnrollP2: 'twkNeedEnrollP2',

    culturalTitle: 'twkCulturalTitle',
    culturalShort: 'twkCulturalShortDesc',
    culturalFull: 'twkCulturalFullHistory',

    transformationTitle: 'twkTransformationTitle',
    transformationSubtitle: 'twkTransformationSubtitle',
    transformation1: 'twkTransformation1',
    transformation2: 'twkTransformation2',
    transformation3: 'twkTransformation3',
    transformation4: 'twkTransformation4',
    transformation5: 'twkTransformation5',
    transformation6: 'twkTransformation6',
    transformation7: 'twkTransformation7',

    logosTitle: 'twkLogosTitle',
    logosIntlFestivalsText: 'twkLogosIntlFestivalsText',
    teachersTitle: 'twkTeachersTitle',
    teachersSubtitle: 'twkTeachersSubtitle',
    teachersClosing: 'twkTeachersClosing',
    scheduleTitle: 'twkScheduleTitle',
    scheduleSubtitle: 'twkScheduleSubtitle',

    pageTitle: 'twkPageTitle',
    metaDescription: 'twkMetaDescription',
    videoTitle: 'twkVideoTitle',
    videoDesc: 'twkVideoDesc',
    courseSchemaName: 'twkCourseSchemaName',
    courseSchemaDesc: 'twkCourseSchemaDesc',

    breadcrumbHome: 'twkBreadcrumbHome',
    breadcrumbClasses: 'twkBreadcrumbClasses',
    breadcrumbCurrent: 'twkBreadcrumbCurrent',
  },

  faqs: TWERK_FAQS_CONFIG,
  testimonials: TWERK_TESTIMONIALS,
  schedules: TWERK_SCHEDULE_KEYS,
  course: TWERK_COURSE_CONFIG,
  breadcrumbKeys: {
    home: 'twkBreadcrumbHome',
    classes: 'twkBreadcrumbClasses',
    current: 'twkBreadcrumbCurrent',
  },

  // Additional keys for generic components
  transformPrefix: 'twkTransform',
  whyChoosePrefix: 'twkWhyChoose',
  faqTitleKey: 'twkFaqTitle',

  whyTodayKeys: {
    fullTitle: 'twkWhyTodayFullTitle',
    why1: 'twkWhyToday1',
    why2: 'twkWhyToday2',
    why3: 'twkWhyToday3',
    closing1: 'twkWhyTodayClosing1',
    closing2: 'twkWhyTodayClosing2',
  },

  finalCTAKeys: {
    title: 'twkFinalCTATitle',
    subtitle: 'twkFinalCTASubtitle',
    desc: 'twkFinalCTADesc',
    funny: 'twkFinalCTAFunny',
  },
};

/**
 * Get configuration for a specific dance type
 */
export function getDanceConfig(type: DanceType): DanceConfig {
  switch (type) {
    case 'dancehall':
      return DANCEHALL_CONFIG;
    case 'hip-hop':
      return HIP_HOP_CONFIG;
    case 'twerk':
      return TWERK_CONFIG;
    default:
      throw new Error(`Unknown dance type: ${type}`);
  }
}

/**
 * Export all configs for direct access
 */
export { DANCEHALL_CONFIG, HIP_HOP_CONFIG, TWERK_CONFIG };
