import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import DanzasUrbanasBarcelonaPage from '../DanzasUrbanasBarcelonaPage';

describe('DanzasUrbanasBarcelonaPage', () => {
  it('renders page title', () => {
    render(<DanzasUrbanasBarcelonaPage />);
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });

  it('renders page content', () => {
    render(<DanzasUrbanasBarcelonaPage />);
    const content = screen.getByRole('main');
    expect(content).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    const { container } = render(<DanzasUrbanasBarcelonaPage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
