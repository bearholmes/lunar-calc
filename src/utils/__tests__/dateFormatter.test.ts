import { describe, expect, it } from 'vitest';
import { formatAge, formatLunarDate, formatSolarDate } from '../dateFormatter';

describe('formatSolarDate', () => {
  it('should format solar date correctly', () => {
    const result = formatSolarDate(2024, 3, 15, '금');
    expect(result).toBe('2024년 3월 15일(금)');
  });
});

describe('formatLunarDate', () => {
  it('should format lunar date correctly', () => {
    const result = formatLunarDate(2024, 2, 5);
    expect(result).toBe('2024년 2월 5일');
  });
});

describe('formatAge', () => {
  it('should format age correctly', () => {
    expect(formatAge(1)).toBe('1 세');
    expect(formatAge(25)).toBe('25 세');
    expect(formatAge(100)).toBe('100 세');
  });
});
