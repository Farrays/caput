import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import WhyFIDC from '../WhyFIDC';

describe('WhyFIDC', () => {
  it('renders section', () => {
    const { container } = render(<WhyFIDC />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays heading', () => {
    render(<WhyFIDC />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('has proper content structure', () => {
    const { container } = render(<WhyFIDC />);
    expect(container.querySelector('section, div')).toBeInTheDocument();
  });
});
