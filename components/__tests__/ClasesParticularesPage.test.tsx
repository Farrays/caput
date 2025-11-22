import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import ClasesParticularesPage from '../ClasesParticularesPage';

describe('ClasesParticularesPage', () => {
  it('renders page title', () => {
    render(<ClasesParticularesPage />);
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });

  it('renders page content', () => {
    render(<ClasesParticularesPage />);
    const content = screen.getByRole('main');
    expect(content).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    const { container } = render(<ClasesParticularesPage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
