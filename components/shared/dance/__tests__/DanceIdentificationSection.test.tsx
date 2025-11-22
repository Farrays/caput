import { describe, it, expect, vi } from 'vitest';
import { render } from '../../../../test/test-utils';
import DanceIdentificationSection from '../DanceIdentificationSection';

describe('DanceIdentificationSection', () => {
  const mockProps = {
    t: vi.fn((key: string) => key),
    keys: {
      identifyTitle: 'identifyTitle',
      painPoint1: 'painPoint1',
      painPoint2: 'painPoint2',
      aspiration1: 'aspiration1',
      aspiration2: 'aspiration2',
    },
  };

  it('renders section', () => {
    const { container } = render(<DanceIdentificationSection {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<DanceIdentificationSection {...mockProps} />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});
