import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import SchemaMarkup from '../SchemaMarkup';

describe('SchemaMarkup', () => {
  const mockSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Test Org',
  };

  it('renders script tag', () => {
    const { container } = render(<SchemaMarkup schema={mockSchema} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
  });

  it('contains schema data', () => {
    const { container } = render(<SchemaMarkup schema={mockSchema} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.textContent).toContain('Test Org');
  });

  it('has correct type attribute', () => {
    const { container } = render(<SchemaMarkup schema={mockSchema} />);
    const script = container.querySelector('script');
    expect(script).toHaveAttribute('type', 'application/ld+json');
  });
});
