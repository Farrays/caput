import { describe, it, expect } from 'vitest';
import { render } from '../../../test/test-utils';
import ClassPageHead from '../ClassPageHead';

describe('ClassPageHead', () => {
  const mockProps = {
    categoryKey: 'test-class',
    categoryPath: '/test-class',
    locale: 'en' as const,
    pageTitle: 'Test Class',
    metaDescription: 'Test description',
  };

  it('renders without errors', () => {
    expect(() => render(<ClassPageHead {...mockProps} />)).not.toThrow();
  });

  it('renders component', () => {
    const { container } = render(<ClassPageHead {...mockProps} />);
    expect(container).toBeInTheDocument();
  });
});
