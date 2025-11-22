import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import About from '../About';

describe('About', () => {
  it('renders about section', () => {
    const { container } = render(<About />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays heading', () => {
    render(<About />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('has proper structure', () => {
    const { container } = render(<About />);
    expect(container.querySelector('section, div')).toBeInTheDocument();
  });
});
