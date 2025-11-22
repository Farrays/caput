import { describe, it, expect, vi } from 'vitest';
import { debounce } from '../debounce';

describe('debounce', () => {
  it('creates a debounced function', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    expect(typeof debounced).toBe('function');
  });

  it('delays function execution', async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    await new Promise(resolve => setTimeout(resolve, 150));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('cancels previous calls', async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();

    await new Promise(resolve => setTimeout(resolve, 150));
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
