import { describe, it, expect, vi } from 'vitest';
import { render } from '../../../../test/test-utils';
import DanceTestimonialsFAQSection from '../DanceTestimonialsFAQSection';

describe('DanceTestimonialsFAQSection', () => {
  const mockProps = {
    t: vi.fn((key: string) => key),
    locale: 'en',
    videoId: 'test123',
    testimonials: [],
    faqs: [],
    pageUrl: '/en/test-page',
    keys: {
      videoTitle: 'videoTitle',
      videoDesc: 'videoDesc',
      whyTodayFullTitle: 'whyTodayFullTitle',
      whyToday1: 'whyToday1',
      whyToday2: 'whyToday2',
      whyToday3: 'whyToday3',
      whyTodayClosing1: 'whyTodayClosing1',
      whyTodayClosing2: 'whyTodayClosing2',
      finalCTATitle: 'finalCTATitle',
      finalCTASubtitle: 'finalCTASubtitle',
      finalCTADesc: 'finalCTADesc',
      finalCTAFunny: 'finalCTAFunny',
      cta1: 'cta1',
      cta1Subtext: 'cta1Subtext',
      cta2: 'cta2',
      cta2Subtext: 'cta2Subtext',
      faqTitle: 'faqTitle',
    },
  };

  it('renders section', () => {
    const { container } = render(<DanceTestimonialsFAQSection {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<DanceTestimonialsFAQSection {...mockProps} />);
    expect(container.querySelector('section, div')).toBeInTheDocument();
  });
});
