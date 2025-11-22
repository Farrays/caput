import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import PreparacionFisicaBailarinesPage from '../PreparacionFisicaBailarinesPage';

describe('PreparacionFisicaBailarinesPage', () => {
  it('renders page title', () => {
    render(<PreparacionFisicaBailarinesPage />);
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });

  it('renders page content', () => {
    render(<PreparacionFisicaBailarinesPage />);
    const content = screen.getByRole('main');
    expect(content).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    const { container } = render(<PreparacionFisicaBailarinesPage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
