import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ScheduleSection from '../ScheduleSection';

const mockT = vi.fn((key: string) => key);

const mockSchedules = [
  {
    id: '1',
    day: 'Lunes',
    className: 'Dancehall Beginner',
    time: '19:00',
    teacher: 'Isabel López',
    level: 'Principiante',
  },
  {
    id: '2',
    day: 'Miércoles',
    className: 'Dancehall Advanced',
    time: '20:00',
    teacher: 'Sandra Gómez',
    level: 'Avanzado',
  },
];

describe('ScheduleSection', () => {
  it('renders section title', () => {
    render(
      <ScheduleSection
        titleKey="schedule.title"
        subtitleKey="schedule.subtitle"
        schedules={mockSchedules}
        t={mockT}
      />
    );

    expect(screen.getByText('schedule.title')).toBeInTheDocument();
  });

  it('renders all schedule items', () => {
    render(
      <ScheduleSection
        titleKey="schedule.title"
        subtitleKey="schedule.subtitle"
        schedules={mockSchedules}
        t={mockT}
      />
    );

    expect(screen.getByText('Dancehall Beginner')).toBeInTheDocument();
    expect(screen.getByText('Dancehall Advanced')).toBeInTheDocument();
  });

  it('renders schedule details correctly', () => {
    render(
      <ScheduleSection
        titleKey="schedule.title"
        subtitleKey="schedule.subtitle"
        schedules={mockSchedules}
        t={mockT}
      />
    );

    expect(screen.getByText('Lunes')).toBeInTheDocument();
    expect(screen.getByText('19:00')).toBeInTheDocument();
    expect(screen.getByText('Isabel López')).toBeInTheDocument();
    expect(screen.getByText('Principiante')).toBeInTheDocument();
  });

  it('renders empty when no schedules provided', () => {
    const { container } = render(
      <ScheduleSection
        titleKey="schedule.title"
        subtitleKey="schedule.subtitle"
        schedules={[]}
        t={mockT}
      />
    );

    const scheduleItems = container.querySelectorAll('[class*="group"]');
    expect(scheduleItems.length).toBe(0);
  });
});
