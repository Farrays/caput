import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LocalizedText from '../LocalizedText';

describe('LocalizedText', () => {
  it('renders text content correctly', () => {
    render(<LocalizedText lang="es">Hola Mundo</LocalizedText>);
    expect(screen.getByText('Hola Mundo')).toBeInTheDocument();
  });

  it('applies lang attribute correctly', () => {
    const { container } = render(<LocalizedText lang="fr">Bonjour</LocalizedText>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('lang', 'fr');
  });

  it('renders as span by default', () => {
    const { container } = render(<LocalizedText lang="en">Hello</LocalizedText>);
    expect(container.firstChild?.nodeName).toBe('SPAN');
  });

  it('renders as different HTML elements when specified', () => {
    const { container: containerH1 } = render(
      <LocalizedText lang="es" as="h1">
        Título
      </LocalizedText>
    );
    expect(containerH1.firstChild?.nodeName).toBe('H1');

    const { container: containerP } = render(
      <LocalizedText lang="es" as="p">
        Párrafo
      </LocalizedText>
    );
    expect(containerP.firstChild?.nodeName).toBe('P');
  });

  it('applies custom className', () => {
    const { container } = render(
      <LocalizedText lang="es" className="custom-class">
        Test
      </LocalizedText>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('renders ReactNode children', () => {
    render(
      <LocalizedText lang="es">
        <strong>Bold text</strong>
      </LocalizedText>
    );
    expect(screen.getByText('Bold text')).toBeInTheDocument();
  });
});
