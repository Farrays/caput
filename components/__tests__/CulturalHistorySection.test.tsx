import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CulturalHistorySection from '../CulturalHistorySection';

const mockT = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    'history.title': 'Historia Cultural',
    'history.short': 'Breve descripción',
    'history.full': '### Origen\nTexto sobre el origen\n\n### Evolución\nTexto sobre la evolución',
    readMore: 'Leer más',
    readLess: 'Leer menos',
  };
  return translations[key] || key;
});

describe('CulturalHistorySection', () => {
  it('renders title and short description', () => {
    render(
      <CulturalHistorySection
        titleKey="history.title"
        shortDescKey="history.short"
        fullHistoryKey="history.full"
        readMoreText="Leer más"
        readLessText="Leer menos"
        t={mockT}
      />
    );

    expect(screen.getByText('Historia Cultural')).toBeInTheDocument();
    expect(screen.getByText('Breve descripción')).toBeInTheDocument();
  });

  it('shows read more button initially', () => {
    render(
      <CulturalHistorySection
        titleKey="history.title"
        shortDescKey="history.short"
        fullHistoryKey="history.full"
        readMoreText="Leer más"
        readLessText="Leer menos"
        t={mockT}
      />
    );

    expect(screen.getByText('Leer más')).toBeInTheDocument();
  });

  it('expands content when read more is clicked', () => {
    render(
      <CulturalHistorySection
        titleKey="history.title"
        shortDescKey="history.short"
        fullHistoryKey="history.full"
        readMoreText="Leer más"
        readLessText="Leer menos"
        t={mockT}
      />
    );

    const button = screen.getByText('Leer más');
    fireEvent.click(button);

    expect(screen.getByText('Leer menos')).toBeInTheDocument();
  });

  it('collapses content when read less is clicked', () => {
    render(
      <CulturalHistorySection
        titleKey="history.title"
        shortDescKey="history.short"
        fullHistoryKey="history.full"
        readMoreText="Leer más"
        readLessText="Leer menos"
        t={mockT}
      />
    );

    const readMoreButton = screen.getByText('Leer más');
    fireEvent.click(readMoreButton);

    const readLessButton = screen.getByText('Leer menos');
    fireEvent.click(readLessButton);

    expect(screen.getByText('Leer más')).toBeInTheDocument();
  });
});
