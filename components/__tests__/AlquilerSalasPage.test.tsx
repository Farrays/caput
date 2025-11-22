import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import AlquilerSalasPage from '../AlquilerSalasPage';

describe('AlquilerSalasPage', () => {
  it('renders page title', () => {
    render(<AlquilerSalasPage />);
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });

  it('renders rental information', () => {
    render(<AlquilerSalasPage />);
    const content = screen.getByRole('main');
    expect(content).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    const { container } = render(<AlquilerSalasPage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
