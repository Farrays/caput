import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import BackToTop from '../BackToTop';

describe('BackToTop', () => {
  it('renders the button', () => {
    render(<BackToTop />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('has correct aria-label', () => {
    render(<BackToTop />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
  });

  it('handles click event', () => {
    const scrollToSpy = vi.fn();
    window.scrollTo = scrollToSpy;

    render(<BackToTop />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(scrollToSpy).toHaveBeenCalled();
  });
});
