import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import DanceTransformationSection from '../DanceTransformationSection';

describe('DanceTransformationSection', () => {
  const mockProps = {
    beforeStatesKeys: ['before1', 'before2'],
    afterStatesKeys: ['after1', 'after2'],
    emotionalTriggersKeys: ['trigger1', 'trigger2'],
  };

  it('renders section', () => {
    const { container} = render(<DanceTransformationSection {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<DanceTransformationSection {...mockProps} />);
    expect(container.querySelector('section, div')).toBeInTheDocument();
  });
});
