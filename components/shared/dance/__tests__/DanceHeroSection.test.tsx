import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import { BrowserRouter } from 'react-router-dom';
import DanceHeroSection from '../DanceHeroSection';

describe('DanceHeroSection', () => {
  const mockProps = {
    slug: 'test',
    titleKey: 'test_title',
    subtitleKey: 'test_subtitle',
    videoId: 'test123',
  };

  it('renders hero section', () => {
    const { container } = render(<DanceHeroSection {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<DanceHeroSection {...mockProps} />);
    expect(container.querySelector('section, div')).toBeInTheDocument();
  });
});
