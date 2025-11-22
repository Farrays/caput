import { describe, it, expect } from 'vitest';
import { render } from '../../../test/test-utils';
import CategoriesSchemaMarkup from '../CategoriesSchemaMarkup';

describe('CategoriesSchemaMarkup', () => {
  it('renders schema script', () => {
    const { container } = render(<CategoriesSchemaMarkup />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
  });

  it('contains schema data', () => {
    const { container } = render(<CategoriesSchemaMarkup />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.textContent).toBeDefined();
  });

  it('has correct type attribute', () => {
    const { container } = render(<CategoriesSchemaMarkup />);
    const script = container.querySelector('script');
    expect(script).toHaveAttribute('type', 'application/ld+json');
  });
});
