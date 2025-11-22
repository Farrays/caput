import { describe, it, expect, vi } from 'vitest';
import { render } from '../../../../test/test-utils';
import DanceScheduleSection from '../DanceScheduleSection';

describe('DanceScheduleSection', () => {
  const mockProps = {
    t: vi.fn((key: string) => key),
    schedules: [
      {
        id: '1',
        dayKey: 'monday',
        className: 'Test Class',
        time: '10:00 AM',
        teacher: 'Test Teacher',
        levelKey: 'beginner',
      },
    ],
    logosTitleKey: 'logosTitleKey',
    logosIntlFestivalsTextKey: 'logosIntlFestivalsTextKey',
    teachersTitleKey: 'teachersTitleKey',
    teachersSubtitleKey: 'teachersSubtitleKey',
    teachersClosingKey: 'teachersClosingKey',
    scheduleTitleKey: 'scheduleTitleKey',
    scheduleSubtitleKey: 'scheduleSubtitleKey',
  };

  it('renders section', () => {
    const { container } = render(<DanceScheduleSection {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<DanceScheduleSection {...mockProps} />);
    expect(container.querySelector('section, div')).toBeInTheDocument();
  });
});
