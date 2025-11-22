import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { I18nProvider } from '../../../hooks/useI18n';
import CategoryCard from '../CategoryCard';
import type { CategoryCardProps } from '../../../types/categories';

const mockCategory: CategoryCardProps['category'] = {
  key: 'salsa_bachata',
  pillarSlug: '/clases/salsa-bachata-barcelona',
  imageUrl: '/images/salsa-bachata.jpg',
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <I18nProvider>{ui}</I18nProvider>
    </BrowserRouter>
  );
};

describe('CategoryCard', () => {
  it('renders category card correctly', () => {
    renderWithProviders(<CategoryCard category={mockCategory} />);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders article element', () => {
    const { container } = renderWithProviders(<CategoryCard category={mockCategory} />);
    expect(container.querySelector('article')).toBeInTheDocument();
  });

  it('renders image with correct src', () => {
    renderWithProviders(<CategoryCard category={mockCategory} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/images/salsa-bachata.jpg');
  });

  it('applies eager loading for first category', () => {
    renderWithProviders(<CategoryCard category={mockCategory} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('loading', 'eager');
  });

  it('has correct link href', () => {
    renderWithProviders(<CategoryCard category={mockCategory} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/es/clases/salsa-bachata-barcelona');
  });
});
