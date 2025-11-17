import type { LunarDate, SolarDate } from '@/types';
import { getLunar, getSolar } from 'holiday-kr';

export const convertSolarToLunar = (year: number, month: number, day: number): LunarDate => {
  try {
    const result = getLunar(year, month, day);
    return {
      year: result.year,
      month: result.month,
      day: result.day,
      dayOfWeek: result.dayOfWeek,
      leapMonth: result.leapMonth,
    };
  } catch (error) {
    throw new Error(
      `음력 변환 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
    );
  }
};

export const convertLunarToSolar = (
  year: number,
  month: number,
  day: number,
  leapMonth: boolean,
): SolarDate => {
  try {
    const result = getSolar(year, month, day, leapMonth);
    return {
      year: result.year,
      month: result.month,
      day: result.day,
      dayOfWeek: result.dayOfWeek,
    };
  } catch (error) {
    throw new Error(
      `양력 변환 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
    );
  }
};

export const verifyLeapMonth = (
  year: number,
  month: number,
  day: number,
  leapMonth: boolean,
): boolean => {
  try {
    const solar = convertLunarToSolar(year, month, day, leapMonth);
    const lunarVerification = convertSolarToLunar(solar.year, solar.month, solar.day);
    return lunarVerification.leapMonth === leapMonth;
  } catch {
    return false;
  }
};
