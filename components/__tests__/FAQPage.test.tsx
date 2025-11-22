import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import FAQPage from '../FAQPage';

describe('FAQPage', () => {
  it('renders page title', () => {
    render(<FAQPage />);
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });

  it('renders FAQ content', () => {
    render(<FAQPage />);
    const content = screen.getByRole('main');
    expect(content).toBeInTheDocument();
  });

  it('has proper document structure', () => {
    const { container } = render(<FAQPage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
