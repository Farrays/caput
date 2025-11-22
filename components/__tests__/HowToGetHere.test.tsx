import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import HowToGetHere from '../HowToGetHere';

describe('HowToGetHere', () => {
  it('renders section', () => {
    const { container } = render(<HowToGetHere />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays heading', () => {
    render(<HowToGetHere />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('has proper structure', () => {
    const { container } = render(<HowToGetHere />);
    expect(container.querySelector('section, div')).toBeInTheDocument();
  });
});
