import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import MerchandisingPage from '../MerchandisingPage';

describe('MerchandisingPage', () => {
  it('renders page title', () => {
    render(<MerchandisingPage />);
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });

  it('renders page content', () => {
    render(<MerchandisingPage />);
    const content = screen.getByRole('main');
    expect(content).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    const { container } = render(<MerchandisingPage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
