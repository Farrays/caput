import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import DancehallPage from '../DancehallPage';

describe('DancehallPage', () => {
  it('renders the page', () => {
    const { container } = render(<DancehallPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<DancehallPage />);
    expect(container.querySelector('main')).toBeInTheDocument();
  });
});
