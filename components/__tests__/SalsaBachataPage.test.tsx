import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import SalsaBachataPage from '../SalsaBachataPage';

describe('SalsaBachataPage', () => {
  it('renders page title', () => {
    render(<SalsaBachataPage />);
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });

  it('renders page content', () => {
    render(<SalsaBachataPage />);
    const content = screen.getByRole('main');
    expect(content).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    const { container } = render(<SalsaBachataPage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
