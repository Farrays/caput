import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import EstudioGrabacionPage from '../EstudioGrabacionPage';

describe('EstudioGrabacionPage', () => {
  it('renders page title', () => {
    render(<EstudioGrabacionPage />);
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });

  it('renders page content', () => {
    render(<EstudioGrabacionPage />);
    const content = screen.getByRole('main');
    expect(content).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    const { container } = render(<EstudioGrabacionPage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
