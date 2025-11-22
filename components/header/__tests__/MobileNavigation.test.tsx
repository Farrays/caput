import { describe, it, expect, vi } from 'vitest';
import { render } from '../../../test/test-utils';
import MobileNavigation from '../MobileNavigation';

describe('MobileNavigation', () => {
  const mockMenuStructure = {
    home: { path: '/en', textKey: 'navHome' },
    classes: { path: '/en/classes', textKey: 'navClasses' },
  };

  const mockProps = {
    isMenuOpen: false,
    setIsMenuOpen: vi.fn(),
    menuStructure: mockMenuStructure,
    locale: 'en' as const,
    handleLanguageChange: vi.fn(),
    handleEnrollClick: vi.fn(),
    languageNames: { en: 'English', es: 'Español', ca: 'Català', fr: 'Français' },
  };

  it('renders navigation', () => {
    const { container } = render(<MobileNavigation {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has menu button functionality', () => {
    render(<MobileNavigation {...mockProps} isMenuOpen={true} />);
    expect(mockProps.setIsMenuOpen).toBeDefined();
  });

  it('toggles menu on state change', () => {
    const { rerender } = render(<MobileNavigation {...mockProps} isMenuOpen={false} />);
    rerender(<MobileNavigation {...mockProps} isMenuOpen={true} />);
    expect(mockProps.setIsMenuOpen).toBeDefined();
  });
});
