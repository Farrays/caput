import { describe, it, expect } from 'vitest';
import { render } from '../../../test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import ClassPageHead from '../ClassPageHead';

describe('ClassPageHead', () => {
  const mockProps = {
    title: 'Test Class',
    description: 'Test description',
    image: '/test.jpg',
    url: '/test',
  };

  it('renders head section', () => {
    const { container } = render(<ClassPageHead {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<ClassPageHead {...mockProps} />);
    expect(container.querySelector('div, section')).toBeInTheDocument();
  });
});
