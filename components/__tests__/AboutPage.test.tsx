import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import AboutPage from '../AboutPage';

describe('AboutPage', () => {
  it('renders page title', () => {
    render(<AboutPage />);
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });

  it('renders page content', () => {
    render(<AboutPage />);
    const content = screen.getByRole('main');
    expect(content).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<AboutPage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
