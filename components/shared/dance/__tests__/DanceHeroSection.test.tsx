import { describe, it, expect, vi } from 'vitest';
import { render } from '../../../../test/test-utils';
import DanceHeroSection from '../DanceHeroSection';

describe('DanceHeroSection', () => {
  const mockProps = {
    t: vi.fn((key: string) => key),
    breadcrumbItems: [
      { name: 'Home', url: '/en' },
      { name: 'Classes', url: '/en/classes', isActive: true },
    ],
    keys: {
      heroTitle: 'heroTitle',
      heroSubtitle: 'heroSubtitle',
      heroCta: 'heroCta',
    },
    sectionId: 'hero-section',
  };

  it('renders section', () => {
    const { container } = render(<DanceHeroSection {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<DanceHeroSection {...mockProps} />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});
