import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import CategoryCard from '../CategoryCard';

describe('CategoryCard', () => {
  const mockProps = {
    title: 'Test Category',
    description: 'Test description',
    image: '/test.jpg',
    link: '/test',
  };

  it('renders card', () => {
    const { container } = render(<CategoryCard {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays title', () => {
    render(<CategoryCard {...mockProps} />);
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('has link to category', () => {
    render(<CategoryCard {...mockProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
  });
});
