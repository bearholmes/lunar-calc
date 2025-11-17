import type { ValidationResult } from '@/types';
import { ERROR_MESSAGES, YEAR_RANGE } from './constants';

export const validateDateString = (dateString: string | null): ValidationResult => {
  if (!dateString) {
    return {
      isValid: false,
      error: '날짜를 입력해주세요.',
    };
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.INVALID_DATE_FORMAT,
    };
  }

  return { isValid: true };
};

export const validateYearRange = (year: number): ValidationResult => {
  if (year < YEAR_RANGE.MIN || year > YEAR_RANGE.MAX) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.YEAR_OUT_OF_RANGE,
    };
  }

  return { isValid: true };
};

export const validateMonthDay = (month: number, day: number): ValidationResult => {
  if (month < 1 || month > 12) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.INVALID_MONTH,
    };
  }

  if (day < 1 || day > 31) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.INVALID_DAY,
    };
  }

  return { isValid: true };
};

export { YEAR_RANGE };
