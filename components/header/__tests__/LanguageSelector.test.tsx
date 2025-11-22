import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import LanguageSelector from '../LanguageSelector';

describe('LanguageSelector', () => {
  const mockProps = {
    locale: 'en' as const,
    isLangDropdownOpen: false,
    setIsLangDropdownOpen: vi.fn(),
    handleLanguageChange: vi.fn(),
    languageNames: { en: 'English', es: 'Español', ca: 'Català', fr: 'Français' },
  };

  it('renders language selector', () => {
    const { container } = render(<LanguageSelector {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays language options', () => {
    render(<LanguageSelector {...mockProps} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('has proper structure', () => {
    const { container } = render(<LanguageSelector {...mockProps} />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
