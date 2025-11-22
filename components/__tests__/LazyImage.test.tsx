import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import LazyImage from '../LazyImage';

describe('LazyImage', () => {
  it('renders image with src', () => {
    render(<LazyImage src="/test.jpg" alt="Test image" />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('has alt text', () => {
    render(<LazyImage src="/test.jpg" alt="Test image" />);
    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
  });

  it('applies className', () => {
    render(<LazyImage src="/test.jpg" alt="Test" className="custom-class" />);
    const img = screen.getByRole('img');
    expect(img).toHaveClass('custom-class');
  });
});
