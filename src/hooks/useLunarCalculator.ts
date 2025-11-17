import type { DateForm, LunarDate } from '@/types';
import {
  ERROR_MESSAGES,
  convertSolarToLunar,
  parseDateString,
  validateDateString,
  validateYearRange,
  verifyLeapMonth,
} from '@/utils';
import { useCallback, useState } from 'react';

interface UseLunarCalculatorReturn {
  form: DateForm;
  lunar: LunarDate | null;
  error: string | null;
  isShowLunarDay: boolean;
  hasSubmitted: boolean;
  updateForm: (updates: Partial<DateForm>) => void;
  calculateLunar: () => boolean;
  reset: () => void;
}

const initialFormState: DateForm = {
  date: null,
  type: 'solar',
  leapMonth: false,
};

export const useLunarCalculator = (): UseLunarCalculatorReturn => {
  const [form, setForm] = useState<DateForm>(initialFormState);
  const [lunar, setLunar] = useState<LunarDate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isShowLunarDay, setIsShowLunarDay] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const updateForm = useCallback((updates: Partial<DateForm>) => {
    setForm((prev) => ({ ...prev, ...updates }));
    setHasSubmitted(false);
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setLunar(null);
    setIsShowLunarDay(false);
    setError(null);
  }, []);

  const calculateLunar = useCallback((): boolean => {
    reset();
    setHasSubmitted(true);

    const dateValidation = validateDateString(form.date);
    if (!dateValidation.isValid) {
      setError(dateValidation.error || null);
      return false;
    }

    const { year, month, day } = parseDateString(form.date as string);

    const yearValidation = validateYearRange(year);
    if (!yearValidation.isValid) {
      setError(yearValidation.error || null);
      return false;
    }

    try {
      if (form.type === 'solar') {
        const lunarResult = convertSolarToLunar(year, month, day);
        setLunar(lunarResult);
        setIsShowLunarDay(true);
        return true;
      }

      const isValidLeapMonth = verifyLeapMonth(year, month, day, form.leapMonth);
      if (!isValidLeapMonth) {
        setError(ERROR_MESSAGES.INVALID_LEAP_MONTH);
        return false;
      }

      setLunar({
        year,
        month,
        day,
        dayOfWeek: '일',
        leapMonth: form.leapMonth,
      });
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.UNKNOWN_ERROR);
      return false;
    }
  }, [form, reset]);

  return {
    form,
    lunar,
    error,
    isShowLunarDay,
    hasSubmitted,
    updateForm,
    calculateLunar,
    reset,
  };
};
