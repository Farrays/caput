import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import FinalCTA from '../FinalCTA';

describe('FinalCTA', () => {
  it('renders CTA section', () => {
    const { container } = render(<FinalCTA />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays CTA button', () => {
    render(<FinalCTA />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('has proper structure', () => {
    render(<FinalCTA />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });
});
