import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import Breadcrumb from '../shared/Breadcrumb';

describe('Breadcrumb', () => {
  const items = [
    { name: 'Home', url: '/' },
    { name: 'Classes', url: '/classes' },
    { name: 'Dancehall', url: '/classes/dancehall' },
  ];

  it('renders breadcrumb navigation', () => {
    render(<Breadcrumb items={items} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('displays all breadcrumb items', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Classes')).toBeInTheDocument();
    expect(screen.getByText('Dancehall')).toBeInTheDocument();
  });

  it('has correct aria-label', () => {
    render(<Breadcrumb items={items} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
  });
});
