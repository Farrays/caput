import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import Teachers from '../Teachers';

describe('Teachers', () => {
  it('renders teachers section', () => {
    const { container } = render(<Teachers />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays teacher information', () => {
    render(<Teachers />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('has proper structure', () => {
    const { container } = render(<Teachers />);
    expect(container.querySelector('section, div')).toBeInTheDocument();
  });
});
