import { describe, it, expect, vi } from 'vitest';
import { render } from '../../../../test/test-utils';
import DanceBenefitsSection from '../DanceBenefitsSection';

describe('DanceBenefitsSection', () => {
  const mockProps = {
    t: vi.fn((key: string) => key),
    keys: {
      whatIsTitle: 'whatIsTitle',
      whatIsP1: 'whatIsP1',
      whatIsP2: 'whatIsP2',
      whatIsP3: 'whatIsP3',
    },
    image: '/test-image.jpg',
    imageAlt: 'Test Image Alt',
  };

  it('renders section', () => {
    const { container } = render(<DanceBenefitsSection {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<DanceBenefitsSection {...mockProps} />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});
