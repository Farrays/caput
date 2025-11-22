import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import TwerkPage from '../TwerkPage';

describe('TwerkPage', () => {
  it('renders the page', () => {
    const { container } = render(<TwerkPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<TwerkPage />);
    expect(container.querySelector('main')).toBeInTheDocument();
  });
});
