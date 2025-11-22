import { describe, it, expect } from 'vitest';
import { render } from '../../../test/test-utils';
import CategoriesSchemaMarkup from '../CategoriesSchemaMarkup';

describe('CategoriesSchemaMarkup', () => {
  it('renders without errors', () => {
    expect(() => render(<CategoriesSchemaMarkup />)).not.toThrow();
  });

  it('renders component', () => {
    const { container } = render(<CategoriesSchemaMarkup />);
    expect(container).toBeTruthy();
  });

  it('component exists in DOM', () => {
    const { container } = render(<CategoriesSchemaMarkup />);
    expect(container).toBeInTheDocument();
  });
});
