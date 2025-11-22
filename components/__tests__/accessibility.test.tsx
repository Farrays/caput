import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import Header from '../Header';
import Footer from '../Footer';
import Breadcrumb from '../shared/Breadcrumb';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

/**
 * Accessibility Tests with jest-axe
 * Tests critical components for WCAG 2.1 AA compliance
 */

describe('Accessibility - Header', () => {
  it('should not have any automatically detectable accessibility issues', async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Accessibility - Footer', () => {
  it('should not have any automatically detectable accessibility issues', async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Accessibility - Breadcrumb', () => {
  it('should not have any automatically detectable accessibility issues', async () => {
    const breadcrumbItems = [
      { name: 'Home', url: '/es' },
      { name: 'Clases', url: '/es/clases' },
      { name: 'Dancehall', url: '/es/clases/dancehall-barcelona', isActive: true },
    ];

    const { container } = render(<Breadcrumb items={breadcrumbItems} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    const breadcrumbItems = [
      { name: 'Home', url: '/es' },
      { name: 'Clases', url: '/es/clases', isActive: true },
    ];

    const { container } = render(<Breadcrumb items={breadcrumbItems} />);
    const nav = container.querySelector('nav');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
  });
});
