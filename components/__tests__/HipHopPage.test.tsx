import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import HipHopPage from '../HipHopPage';

describe('HipHopPage', () => {
  it('renders the page', () => {
    const { container } = render(<HipHopPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<HipHopPage />);
    expect(container.querySelector('main')).toBeInTheDocument();
  });
});
