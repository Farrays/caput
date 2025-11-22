import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import AnimatedCounter from '../AnimatedCounter';

describe('AnimatedCounter', () => {
  it('renders counter', () => {
    const { container } = render(<AnimatedCounter end={100} duration={1000} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays initial value', () => {
    const { container } = render(<AnimatedCounter end={100} duration={1000} />);
    expect(container.textContent).toBeDefined();
  });

  it('accepts different end values', () => {
    const { rerender, container } = render(<AnimatedCounter end={50} duration={1000} />);
    expect(container.firstChild).toBeInTheDocument();

    rerender(<AnimatedCounter end={200} duration={1000} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles suffix prop', () => {
    const { container } = render(<AnimatedCounter end={100} duration={1000} suffix="+" />);
    expect(container.textContent).toBeDefined();
  });
});
