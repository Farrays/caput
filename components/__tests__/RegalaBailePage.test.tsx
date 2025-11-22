import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import RegalaBailePage from '../RegalaBailePage';

describe('RegalaBailePage', () => {
  it('renders page title', () => {
    render(<RegalaBailePage />);
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });

  it('renders page content', () => {
    render(<RegalaBailePage />);
    const content = screen.getByRole('main');
    expect(content).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    const { container } = render(<RegalaBailePage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
