import { describe, expect, it } from 'vitest';
import { ERROR_MESSAGES } from '../constants';
import { validateDateString, validateMonthDay, validateYearRange } from '../dateValidator';

describe('validateDateString', () => {
  it('should return valid for correct date string', () => {
    const result = validateDateString('2024-03-15');
    expect(result.isValid).toBe(true);
  });

  it('should return invalid for null date', () => {
    const result = validateDateString(null);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('날짜를 입력해주세요.');
  });

  it('should return invalid for invalid date format', () => {
    const result = validateDateString('invalid-date');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe(ERROR_MESSAGES.INVALID_DATE_FORMAT);
  });
});

describe('validateYearRange', () => {
  it('should validate years within range', () => {
    expect(validateYearRange(1800).isValid).toBe(true);
    expect(validateYearRange(2000).isValid).toBe(true);
    expect(validateYearRange(2101).isValid).toBe(true);
  });

  it('should invalidate years outside range', () => {
    const belowMin = validateYearRange(1799);
    expect(belowMin.isValid).toBe(false);
    expect(belowMin.error).toContain('1800년부터 2101년까지');

    const aboveMax = validateYearRange(2102);
    expect(aboveMax.isValid).toBe(false);
    expect(aboveMax.error).toContain('1800년부터 2101년까지');
  });
});

describe('validateMonthDay', () => {
  it('should validate correct month and day', () => {
    expect(validateMonthDay(3, 15).isValid).toBe(true);
    expect(validateMonthDay(12, 31).isValid).toBe(true);
    expect(validateMonthDay(1, 1).isValid).toBe(true);
  });

  it('should invalidate invalid month', () => {
    expect(validateMonthDay(0, 15).isValid).toBe(false);
    expect(validateMonthDay(13, 15).isValid).toBe(false);
  });

  it('should invalidate invalid day', () => {
    expect(validateMonthDay(3, 0).isValid).toBe(false);
    expect(validateMonthDay(3, 32).isValid).toBe(false);
  });
});
