import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useI18n } from '../useI18n';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('useI18n - Extended Coverage', () => {
  it('returns translation function', () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    expect(result.current.t).toBeDefined();
    expect(typeof result.current.t).toBe('function');
  });

  it('returns current locale', () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    expect(result.current.locale).toBeDefined();
    expect(['es', 'en', 'ca', 'fr']).toContain(result.current.locale);
  });

  it('translates keys', () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    const translated = result.current.t('home_title');
    expect(typeof translated).toBe('string');
  });
});
