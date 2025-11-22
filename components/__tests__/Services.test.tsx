import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import Services from '../Services';

describe('Services', () => {
  it('renders services section', () => {
    const { container } = render(<Services />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays service links', () => {
    render(<Services />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('has proper structure', () => {
    render(<Services />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });
});
