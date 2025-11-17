import type { DayOfWeek } from '@/types';

export const formatSolarDate = (
  year: number,
  month: number,
  day: number,
  dayOfWeek: DayOfWeek,
): string => {
  return `${year}년 ${month}월 ${day}일(${dayOfWeek})`;
};

export const formatLunarDate = (year: number, month: number, day: number): string => {
  return `${year}년 ${month}월 ${day}일`;
};

export const formatAge = (age: number): string => {
  return `${age} 세`;
};
