import { describe, it, expect } from 'vitest';

describe('sentry', () => {
  it('exports Sentry configuration', async () => {
    const sentry = await import('../sentry');
    expect(sentry).toBeDefined();
  });

  it('has init function', async () => {
    const sentry = await import('../sentry');
    expect(sentry.initSentry).toBeDefined();
    expect(typeof sentry.initSentry).toBe('function');
  });

  it('can call init without errors', async () => {
    const sentry = await import('../sentry');
    expect(() => sentry.initSentry()).not.toThrow();
  });
});
