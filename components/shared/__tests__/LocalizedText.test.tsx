import { describe, it, expect } from 'vitest';
import { render } from '../../../test/test-utils';
import LocalizedText from '../LocalizedText';

describe('LocalizedText', () => {
  it('renders text', () => {
    const { container } = render(<LocalizedText lang="es">Test text</LocalizedText>);
    expect(container.textContent).toContain('Test text');
  });

  it('renders with children', () => {
    const { container } = render(
      <LocalizedText lang="es">
        <strong>Bold</strong>
      </LocalizedText>
    );
    expect(container.querySelector('strong')).toBeInTheDocument();
  });

  it('has lang attribute', () => {
    const { container } = render(<LocalizedText lang="es">Test</LocalizedText>);
    expect(container.firstChild).toHaveAttribute('lang', 'es');
  });

  it('applies className', () => {
    const { container } = render(
      <LocalizedText lang="es" className="test-class">
        Test
      </LocalizedText>
    );
    expect(container.firstChild).toHaveClass('test-class');
  });

  it('renders as different elements', () => {
    const { container } = render(
      <LocalizedText lang="es" as="h1">
        Heading
      </LocalizedText>
    );
    expect(container.querySelector('h1')).toBeInTheDocument();
  });
});
