import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import DancePageTemplate from '../DancePageTemplate';
import type { DanceConfig } from '../../../types/dance-config';

describe('DancePageTemplate', () => {
  const mockConfig: DanceConfig = {
    slug: 'test-dance',
    type: 'test',
    title: 'Test Dance',
    subtitle: 'Test subtitle',
    metaDescription: 'Test meta',
    videoId: 'test123',
    schedules: [],
    faqs: [],
    benefits: [],
    testimonials: [],
    identification: {
      painPoints: [],
      aspirations: [],
      objections: [],
    },
    transformation: {
      beforeStates: [],
      afterStates: [],
      emotionalTriggers: [],
    },
    culturalHistory: {
      titleKey: 'history_title',
      sections: [],
    },
    keys: {
      pageTitle: 'Test Page Title',
      metaDescription: 'Test Meta Description',
      videoTitle: 'Test Video Title',
      videoDesc: 'Test Video Description',
      heroTitle: 'Hero Title',
      heroSubtitle: 'Hero Subtitle',
      courseSchemaName: 'Test Course',
      courseSchemaDesc: 'Test Course Description',
      culturalTitle: 'Cultural Title',
      culturalShort: 'Cultural Short',
      culturalFull: 'Cultural Full',
      transformationTitle: 'Transformation Title',
      transformationSubtitle: 'Transformation Subtitle',
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
    },
    breadcrumbKeys: {
      home: 'Home',
      classes: 'Classes',
      currentPage: 'Test Dance',
    },
    course: {
      teaches: 'Dance techniques',
      prerequisites: 'None',
      lessons: '12',
    },
    breadcrumbSchema: { '@type': 'BreadcrumbList', itemListElement: [] },
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
