import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import ServiciosBailePage from '../ServiciosBailePage';

describe('ServiciosBailePage', () => {
  it('renders page title', () => {
    render(<ServiciosBailePage />);
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });

  it('renders page content', () => {
    render(<ServiciosBailePage />);
    const content = screen.getByRole('main');
    expect(content).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    const { container } = render(<ServiciosBailePage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
