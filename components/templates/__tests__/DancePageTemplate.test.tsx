import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import DancePageTemplate from '../DancePageTemplate';
import type { DanceConfig } from '../../../types/dance-config';

describe('DancePageTemplate', () => {
  const mockConfig: DanceConfig = {
    slug: 'test-dance',
    title: 'Test Dance',
    subtitle: 'Test subtitle',
    metaDescription: 'Test meta',
    videoId: 'test123',
    schedules: [
      {
        id: '1',
        dayKey: 'monday',
        className: 'Test Class',
        time: '10:00 AM',
        teacher: 'Test Teacher',
        levelKey: 'beginner',
      },
    ],
    faqs: [
      { questionKey: 'faq1_q', answerKey: 'faq1_a' },
    ],
    benefits: [],
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
