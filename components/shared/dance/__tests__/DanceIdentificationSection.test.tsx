import { describe, it, expect, vi } from 'vitest';
import { render } from '../../../../test/test-utils';
import DanceIdentificationSection from '../DanceIdentificationSection';

describe('DanceIdentificationSection', () => {
  const mockKeys = {
    heroTitle: 'heroTitle',
    heroSubtitle: 'heroSubtitle',
    heroDesc: 'heroDesc',
    heroLocation: 'heroLocation',
    cta1: 'cta1',
    cta1Subtext: 'cta1Subtext',
    cta2: 'cta2',
    cta2Subtext: 'cta2Subtext',
    whatIsTitle: 'whatIsTitle',
    whatIsP1: 'whatIsP1',
    whatIsP2: 'whatIsP2',
    whatIsP3: 'whatIsP3',
    whatIsP4: 'whatIsP4',
    whatIsQuestionTitle: 'whatIsQuestionTitle',
    whatIsQuestionAnswer: 'whatIsQuestionAnswer',
    identifyTitle: 'identifyTitle',
    identify1: 'identify1',
    identify2: 'identify2',
    identify3: 'identify3',
    identify4: 'identify4',
    identify5: 'identify5',
    identify6: 'identify6',
    identifyTransition: 'identifyTransition',
    needEnrollTitle: 'needEnrollTitle',
    needEnrollP1: 'needEnrollP1',
    needEnrollP2: 'needEnrollP2',
    culturalTitle: 'culturalTitle',
    culturalShort: 'culturalShort',
    culturalFull: 'culturalFull',
    transformationTitle: 'transformationTitle',
    transformationSubtitle: 'transformationSubtitle',
    transformation1: 'transformation1',
    transformation2: 'transformation2',
    transformation3: 'transformation3',
    transformation4: 'transformation4',
    transformation5: 'transformation5',
    transformation6: 'transformation6',
    transformation7: 'transformation7',
    logosTitle: 'logosTitle',
    logosIntlFestivalsText: 'logosIntlFestivalsText',
    teachersTitle: 'teachersTitle',
    teachersSubtitle: 'teachersSubtitle',
    teachersClosing: 'teachersClosing',
    scheduleTitle: 'scheduleTitle',
    scheduleSubtitle: 'scheduleSubtitle',
    pageTitle: 'pageTitle',
    metaDescription: 'metaDescription',
    videoTitle: 'videoTitle',
    videoDesc: 'videoDesc',
    courseSchemaName: 'courseSchemaName',
    courseSchemaDesc: 'courseSchemaDesc',
    breadcrumbHome: 'breadcrumbHome',
    breadcrumbClasses: 'breadcrumbClasses',
    breadcrumbCurrent: 'breadcrumbCurrent',
  };

  const mockProps = {
    t: vi.fn((key: string) => key),
    keys: mockKeys,
  };

  it('renders section', () => {
    const { container } = render(<DanceIdentificationSection {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<DanceIdentificationSection {...mockProps} />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});
