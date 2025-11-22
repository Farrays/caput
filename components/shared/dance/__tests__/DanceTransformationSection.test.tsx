import { describe, it, expect, vi } from 'vitest';
import { render } from '../../../../test/test-utils';
import DanceTransformationSection from '../DanceTransformationSection';

describe('DanceTransformationSection', () => {
  const mockProps = {
    t: vi.fn((key: string) => key),
    transformTitleKey: 'transformTitleKey',
    transformCTAKey: 'transformCTAKey',
    transformPrefix: 'testTransform',
    whyChoosePrefix: 'testWhyChoose',
  };

  it('renders section', () => {
    const { container } = render(<DanceTransformationSection {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<DanceTransformationSection {...mockProps} />);
    expect(container.querySelector('section, div')).toBeInTheDocument();
  });
});
