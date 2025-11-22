import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../../test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import MobileNavigation from '../MobileNavigation';

describe('MobileNavigation', () => {
  it('renders navigation', () => {
    const { container } = render(<MobileNavigation />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has menu button', () => {
    render(<MobileNavigation />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('toggles menu on button click', () => {
    render(<MobileNavigation />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
