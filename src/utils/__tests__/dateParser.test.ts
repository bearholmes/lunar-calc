import { describe, expect, it } from 'vitest';
import { parseDateString } from '../dateParser';

describe('parseDateString', () => {
  it('should parse valid date string correctly', () => {
    const result = parseDateString('2024-03-15');
    expect(result).toEqual({ year: 2024, month: 3, day: 15 });
  });

  it('should handle single digit month and day', () => {
    const result = parseDateString('2024-01-05');
    expect(result).toEqual({ year: 2024, month: 1, day: 5 });
  });

  it('should throw error for invalid format', () => {
    expect(() => parseDateString('2024/03/15')).toThrow();
    expect(() => parseDateString('2024-03')).toThrow();
    expect(() => parseDateString('invalid')).toThrow();
  });

  it('should throw error for invalid date components', () => {
    expect(() => parseDateString('abc-03-15')).toThrow();
    expect(() => parseDateString('2024-ab-15')).toThrow();
    expect(() => parseDateString('2024-03-ab')).toThrow();
  });
});
