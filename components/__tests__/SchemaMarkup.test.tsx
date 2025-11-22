import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { LocalBusinessSchema } from '../SchemaMarkup';

describe('SchemaMarkup', () => {
  const mockProps = {
    name: 'Test Business',
    description: 'Test Description',
    url: 'https://example.com',
    telephone: '+1234567890',
    email: 'test@example.com',
    address: {
      streetAddress: '123 Test St',
      addressLocality: 'Test City',
      postalCode: '12345',
      addressCountry: 'US',
    },
    geo: {
      latitude: '40.7128',
      longitude: '-74.0060',
    },
  };

  it('renders script tag', () => {
    const { container } = render(<LocalBusinessSchema {...mockProps} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
  });

  it('contains schema data', () => {
    const { container } = render(<LocalBusinessSchema {...mockProps} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.textContent).toContain('Test Business');
  });

  it('has correct type attribute', () => {
    const { container } = render(<LocalBusinessSchema {...mockProps} />);
    const script = container.querySelector('script');
    expect(script).toHaveAttribute('type', 'application/ld+json');
  });
});
