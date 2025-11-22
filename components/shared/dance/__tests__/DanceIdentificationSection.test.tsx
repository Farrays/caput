import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import DanceIdentificationSection from '../DanceIdentificationSection';

describe('DanceIdentificationSection', () => {
  const mockProps = {
    painPointsKeys: ['pain1', 'pain2'],
    aspirationsKeys: ['asp1', 'asp2'],
    objectionsKeys: ['obj1', 'obj2'],
  };

  it('renders section', () => {
    const { container } = render(<DanceIdentificationSection {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<DanceIdentificationSection {...mockProps} />);
    expect(container.querySelector('section, div')).toBeInTheDocument();
  });
});
