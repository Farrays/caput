import { describe, it, expect } from 'vitest';
import { sanitizeString, sanitizeEmail, sanitizePhone, sanitizeTextarea, sanitizeUrl, sanitizeName } from '../inputSanitization';

describe('inputSanitization', () => {
  describe('sanitizeString', () => {
    it('removes HTML tags', () => {
      const result = sanitizeString('Hello <script>alert("xss")</script>');
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });

    it('trims whitespace', () => {
      const result = sanitizeString('  Hello  ');
      expect(result).toBe('Hello');
    });

    it('handles empty string', () => {
      const result = sanitizeString('');
      expect(result).toBe('');
    });
  });

  describe('sanitizeEmail', () => {
    it('validates and sanitizes email', () => {
      const result = sanitizeEmail('test@example.com');
      expect(result).toBe('test@example.com');
    });

    it('returns empty for invalid email', () => {
      const result = sanitizeEmail('invalid-email');
      expect(result).toBe('');
    });

    it('converts to lowercase', () => {
      const result = sanitizeEmail('TEST@EXAMPLE.COM');
      expect(result).toBe('test@example.com');
    });
  });

  describe('sanitizePhone', () => {
    it('keeps only digits and plus', () => {
      const result = sanitizePhone('+34 123-456-789');
      expect(result).toBe('+34123456789');
    });

    it('removes invalid characters', () => {
      const result = sanitizePhone('abc123def');
      expect(result).toBe('123');
    });
  });

  describe('sanitizeTextarea', () => {
    it('removes HTML tags', () => {
      const result = sanitizeTextarea('Hello <b>world</b>');
      expect(result).not.toContain('<');
    });

    it('trims content', () => {
      const result = sanitizeTextarea('  Text  ');
      expect(result).toBe('Text');
    });
  });

  describe('sanitizeUrl', () => {
    it('validates and sanitizes URL', () => {
      const result = sanitizeUrl('https://example.com');
      expect(result).toBe('https://example.com/');
    });

    it('returns empty for invalid URL', () => {
      const result = sanitizeUrl('not-a-url');
      expect(result).toBe('');
    });

    it('rejects javascript protocol', () => {
      const result = sanitizeUrl('javascript:alert(1)');
      expect(result).toBe('');
    });
  });

  describe('sanitizeName', () => {
    it('allows letters and spaces', () => {
      const result = sanitizeName('John Doe');
      expect(result).toBe('John Doe');
    });

    it('removes numbers', () => {
      const result = sanitizeName('John123');
      expect(result).toBe('John');
    });

    it('allows hyphens and apostrophes', () => {
      const result = sanitizeName("Mary-Jane O'Brien");
      expect(result).toBe("Mary-Jane O'Brien");
    });
  });
});
