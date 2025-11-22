import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import DancePageTemplate from '../DancePageTemplate';
import type { DanceConfig } from '../../../types/dance-config';

describe('DancePageTemplate', () => {
  const mockConfig: DanceConfig = {
    slug: 'test-dance',
    type: 'dancehall',
    ogImage: 'og-test.jpg',
    schedules: [],
    faqs: [],
    testimonials: [],
    benefitsImage: '/test-benefits.jpg',
    keys: {
      pageTitle: 'Test Page Title',
      metaDescription: 'Test Meta Description',
      videoTitle: 'Test Video Title',
      videoDesc: 'Test Video Description',
      heroTitle: 'Hero Title',
      heroSubtitle: 'Hero Subtitle',
      heroDesc: 'Hero Description',
      heroLocation: 'Hero Location',
      courseSchemaName: 'Test Course',
      courseSchemaDesc: 'Test Course Description',
      culturalTitle: 'Cultural Title',
      culturalShort: 'Cultural Short',
      culturalFull: 'Cultural Full',
      transformationTitle: 'Transformation Title',
      transformationSubtitle: 'Transformation Subtitle',
      transformation1: 'Transformation 1',
      transformation2: 'Transformation 2',
      transformation3: 'Transformation 3',
      transformation4: 'Transformation 4',
      transformation5: 'Transformation 5',
      transformation6: 'Transformation 6',
      transformation7: 'Transformation 7',
      logosTitle: 'Logos Title',
      logosIntlFestivalsText: 'Logos Text',
      teachersTitle: 'Teachers Title',
      teachersSubtitle: 'Teachers Subtitle',
      teachersClosing: 'Teachers Closing',
      scheduleTitle: 'Schedule Title',
      scheduleSubtitle: 'Schedule Subtitle',
      cta1: 'CTA 1',
      cta1Subtext: 'CTA 1 Subtext',
      cta2: 'CTA 2',
      cta2Subtext: 'CTA 2 Subtext',
      whatIsTitle: 'What Is Title',
      whatIsP1: 'What Is P1',
      whatIsP2: 'What Is P2',
      whatIsP3: 'What Is P3',
      whatIsP4: 'What Is P4',
      whatIsQuestionTitle: 'What Is Question Title',
      whatIsQuestionAnswer: 'What Is Question Answer',
      identifyTitle: 'Identify Title',
      identify1: 'Identify 1',
      identify2: 'Identify 2',
      identify3: 'Identify 3',
      identify4: 'Identify 4',
      identify5: 'Identify 5',
      identify6: 'Identify 6',
      identifyTransition: 'Identify Transition',
      needEnrollTitle: 'Need Enroll Title',
      needEnrollP1: 'Need Enroll P1',
      needEnrollP2: 'Need Enroll P2',
      breadcrumbHome: 'Home',
      breadcrumbClasses: 'Classes',
      breadcrumbCurrent: 'Test Dance',
    },
    breadcrumbKeys: {
      home: 'Home',
      classes: 'Classes',
      current: 'Test Dance',
    },
    course: {
      teaches: 'Dance techniques',
      prerequisites: 'None',
      lessons: '12',
      duration: 'P3M',
    },
  };

  it('renders template', () => {
    const { container } = render(<DancePageTemplate config={mockConfig} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays content', () => {
    const { container } = render(<DancePageTemplate config={mockConfig} />);
    expect(container.querySelector('main')).toBeInTheDocument();
  });

  it('has proper structure', () => {
    render(<DancePageTemplate config={mockConfig} />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });
});
