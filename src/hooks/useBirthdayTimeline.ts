import type { BirthdayItem, LunarDate } from '@/types';
import {
  convertLunarToSolar,
  formatLunarDate,
  formatSolarDate,
  getMaxTimelineYears,
  isTimelineLimited,
} from '@/utils';
import { useMemo } from 'react';

interface TimelineResult {
  timeline: BirthdayItem[];
  isLimited: boolean;
  actualYears: number;
  maxYears: number;
}

export const useBirthdayTimeline = (lunar: LunarDate | null): TimelineResult => {
  return useMemo(() => {
    if (!lunar) {
      return {
        timeline: [],
        isLimited: false,
        actualYears: 0,
        maxYears: 100,
      };
    }

    const maxYears = getMaxTimelineYears(lunar.year);
    const limited = isTimelineLimited(lunar.year);
    const timeline: BirthdayItem[] = [];

    for (let i = 0; i < maxYears; i++) {
      const currentYear = lunar.year + i;

      try {
        const solar = convertLunarToSolar(currentYear, lunar.month, lunar.day, lunar.leapMonth);

        timeline.push({
          year: currentYear,
          age: i + 1,
          solarDate: formatSolarDate(solar.year, solar.month, solar.day, solar.dayOfWeek),
          lunarDate: formatLunarDate(currentYear, lunar.month, lunar.day),
        });
      } catch (error) {
        console.error(`Failed to calculate birthday for year ${currentYear}:`, error);
        // 에러 발생 시 루프 중단 (더 이상 계산 불가)
        break;
      }
    }

    return {
      timeline,
      isLimited: limited,
      actualYears: timeline.length,
      maxYears: 100,
    };
  }, [lunar]);
};
