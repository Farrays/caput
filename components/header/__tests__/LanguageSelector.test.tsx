import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector';

describe('LanguageSelector', () => {
  it('renders language selector', () => {
    const { container } = render(<LanguageSelector />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays language options', () => {
    render(<LanguageSelector />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('has proper structure', () => {
    const { container } = render(<LanguageSelector />);
    expect(container.querySelector('nav, div')).toBeInTheDocument();
  });
});
