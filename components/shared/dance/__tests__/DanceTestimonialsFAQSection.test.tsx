import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import DanceTestimonialsFAQSection from '../DanceTestimonialsFAQSection';

describe('DanceTestimonialsFAQSection', () => {
  const mockFaqs = [
    { question: 'Q1', answer: 'A1' },
    { question: 'Q2', answer: 'A2' },
  ];

  it('renders section', () => {
    const { container } = render(<DanceTestimonialsFAQSection faqs={mockFaqs} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<DanceTestimonialsFAQSection faqs={mockFaqs} />);
    expect(container.querySelector('section, div')).toBeInTheDocument();
  });
});
