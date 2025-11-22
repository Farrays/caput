import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import Icon from '../Icon';

describe('Icon', () => {
  it('renders icon element', () => {
    const { container } = render(<Icon name="dance" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<Icon name="dance" className="custom-icon" />);
    const icon = container.firstChild as HTMLElement;
    expect(icon.className).toContain('custom-icon');
  });

  it('renders with different icon names', () => {
    const { rerender, container } = render(<Icon name="music" />);
    expect(container.firstChild).toBeInTheDocument();

    rerender(<Icon name="star" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
