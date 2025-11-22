import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';

describe('NotFoundPage', () => {
  it('renders 404 title', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders page heading and description', () => {
    render(<NotFoundPage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<NotFoundPage />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('has link to home page', () => {
    render(<NotFoundPage />);
    const homeLink = screen.getByRole('link', { name: /home|inicio/i });
    expect(homeLink).toHaveAttribute('href');
  });
});
