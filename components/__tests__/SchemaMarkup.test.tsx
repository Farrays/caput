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

  it('renders without errors', () => {
    expect(() => render(<LocalBusinessSchema {...mockProps} />)).not.toThrow();
  });

  it('renders component', () => {
    const { container } = render(<LocalBusinessSchema {...mockProps} />);
    expect(container).toBeTruthy();
  });

  it('accepts all required props', () => {
    const { container } = render(<LocalBusinessSchema {...mockProps} />);
    expect(container).toBeInTheDocument();
  });
});
