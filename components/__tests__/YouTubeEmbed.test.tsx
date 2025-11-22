import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import YouTubeEmbed from '../YouTubeEmbed';

describe('YouTubeEmbed', () => {
  it('renders iframe', () => {
    const { container } = render(<YouTubeEmbed videoId="test123" />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });

  it('has correct video URL', () => {
    const { container } = render(<YouTubeEmbed videoId="test123" />);
    const iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('test123');
  });

  it('has proper attributes', () => {
    const { container } = render(<YouTubeEmbed videoId="test123" />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('allowfullscreen');
  });
});
