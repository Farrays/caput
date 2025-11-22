import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import DanzaBarcelonaPage from '../DanzaBarcelonaPage';

describe('DanzaBarcelonaPage', () => {
  it('renders page title', () => {
    render(<DanzaBarcelonaPage />);
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });

  it('renders page content', () => {
    render(<DanzaBarcelonaPage />);
    const content = screen.getByRole('main');
    expect(content).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    const { container } = render(<DanzaBarcelonaPage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
