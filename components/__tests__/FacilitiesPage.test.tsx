import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import FacilitiesPage from '../FacilitiesPage';

describe('FacilitiesPage', () => {
  it('renders page title', () => {
    render(<FacilitiesPage />);
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });

  it('renders facilities content', () => {
    render(<FacilitiesPage />);
    const content = screen.getByRole('main');
    expect(content).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    const { container } = render(<FacilitiesPage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
