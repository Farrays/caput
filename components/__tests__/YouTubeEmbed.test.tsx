import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import YouTubeEmbed from '../YouTubeEmbed';

describe('YouTubeEmbed', () => {
  const mockProps = {
    videoId: 'test123',
    title: 'Test Video Title',
  };

  it('renders thumbnail initially, then iframe after click', () => {
    const { container } = render(<YouTubeEmbed {...mockProps} />);

    // Initially shows thumbnail, not iframe
    let iframe = container.querySelector('iframe');
    expect(iframe).not.toBeInTheDocument();

    // Click thumbnail to load video
    const thumbnail = screen.getByRole('button', { name: /Load video/i });
    fireEvent.click(thumbnail);

    // Now iframe should be loaded
    iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });

  it('has correct video URL after loading', () => {
    const { container } = render(<YouTubeEmbed {...mockProps} />);

    // Click to load video
    const thumbnail = screen.getByRole('button', { name: /Load video/i });
    fireEvent.click(thumbnail);

    const iframe = container.querySelector('iframe');
    expect(iframe?.src).toContain('test123');
  });

  it('has proper attributes after loading', () => {
    const { container } = render(<YouTubeEmbed {...mockProps} />);

    // Click to load video
    const thumbnail = screen.getByRole('button', { name: /Load video/i });
    fireEvent.click(thumbnail);

    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('allowfullscreen');
  });
});
