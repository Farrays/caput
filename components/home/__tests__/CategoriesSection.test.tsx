import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import CategoriesSection from '../CategoriesSection';

describe('CategoriesSection', () => {
  it('renders section', () => {
    const { container } = render(<CategoriesSection />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays categories', () => {
    render(<CategoriesSection />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('has links to category pages', () => {
    render(<CategoriesSection />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});
