import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import DanceBenefitsSection from '../DanceBenefitsSection';

describe('DanceBenefitsSection', () => {
  const mockBenefits = ['Benefit 1', 'Benefit 2'];

  it('renders section', () => {
    const { container } = render(<DanceBenefitsSection titleKey="benefits" benefitsKeys={mockBenefits} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<DanceBenefitsSection titleKey="benefits" benefitsKeys={mockBenefits} />);
    expect(container.querySelector('section, div')).toBeInTheDocument();
  });
});
