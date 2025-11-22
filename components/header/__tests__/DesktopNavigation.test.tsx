import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import DesktopNavigation from '../DesktopNavigation';

describe('DesktopNavigation', () => {
  const mockMenuStructure = {
    home: { path: '/en', textKey: 'navHome' },
    classes: { path: '/en/classes', textKey: 'navClasses' },
  };

  const mockProps = {
    menuStructure: mockMenuStructure,
    locale: 'en' as const,
    isClassesDropdownOpen: false,
    setIsClassesDropdownOpen: vi.fn(),
    isUrbanDropdownOpen: false,
    setIsUrbanDropdownOpen: vi.fn(),
    isServicesDropdownOpen: false,
    setIsServicesDropdownOpen: vi.fn(),
    isAboutUsDropdownOpen: false,
    setIsAboutUsDropdownOpen: vi.fn(),
  };

  it('renders navigation', () => {
    render(<DesktopNavigation {...mockProps} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('displays navigation links', () => {
    render(<DesktopNavigation {...mockProps} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('has proper structure', () => {
    const { container } = render(<DesktopNavigation {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
