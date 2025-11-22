import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import DanceScheduleSection from '../DanceScheduleSection';

describe('DanceScheduleSection', () => {
  const mockSchedule = [
    { id: '1', day: 'Monday', className: 'Test', time: '10:00 AM', teacher: 'Teacher', level: 'Beginner' },
  ];

  it('renders section', () => {
    const { container } = render(<DanceScheduleSection schedules={mockSchedule} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has proper structure', () => {
    const { container } = render(<DanceScheduleSection schedules={mockSchedule} />);
    expect(container.querySelector('section, div')).toBeInTheDocument();
  });
});
