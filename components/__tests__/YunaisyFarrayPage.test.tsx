import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import YunaisyFarrayPage from '../YunaisyFarrayPage';

describe('YunaisyFarrayPage', () => {
  it('renders page title', () => {
    render(<YunaisyFarrayPage />);
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
  });

  it('renders page content', () => {
    render(<YunaisyFarrayPage />);
    const content = screen.getByRole('main');
    expect(content).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    const { container } = render(<YunaisyFarrayPage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
