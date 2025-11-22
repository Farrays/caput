import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import CategoryCard from '../CategoryCard';

describe('CategoryCard', () => {
  const mockCategory = {
    key: 'salsa_bachata',
    pillarSlug: '/clases/salsa-bachata',
    imageUrl: '/images/classes/salsa.jpg',
  };

  it('renders card', () => {
    const { container } = render(<CategoryCard category={mockCategory} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays title', () => {
    render(<CategoryCard category={mockCategory} />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('has link to category', () => {
    render(<CategoryCard category={mockCategory} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining('/clases/salsa-bachata'));
  });
});
