import { describe, it, expect } from 'vitest';
import { imageUrls, getImageUrl } from '../imageConfig';

describe('imageConfig', () => {
  describe('imageUrls', () => {
    it('exports imageUrls object', () => {
      expect(imageUrls).toBeDefined();
      expect(typeof imageUrls).toBe('object');
    });

    it('has classes category', () => {
      expect(imageUrls.classes).toBeDefined();
      expect(imageUrls.classes.latin).toContain('unsplash.com');
    });
  });

  describe('getImageUrl', () => {
    it('returns image URL for valid category and name', () => {
      const result = getImageUrl('classes', 'latin');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('returns empty string for invalid name', () => {
      const result = getImageUrl('classes', 'nonexistent');
      expect(result).toBe('');
    });
  });
});
