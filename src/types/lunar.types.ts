export type CalendarType = 'solar' | 'lunar';

export type DayOfWeek = '일' | '월' | '화' | '수' | '목' | '금' | '토';

export interface LunarDate {
  year: number;
  month: number;
  day: number;
  dayOfWeek: DayOfWeek;
  leapMonth: boolean;
}

export interface SolarDate {
  year: number;
  month: number;
  day: number;
  dayOfWeek: DayOfWeek;
}

export interface DateForm {
  date: string | null;
  type: CalendarType;
  leapMonth: boolean;
}

export interface BirthdayItem {
  year: number;
  age: number;
  solarDate: string;
  lunarDate: string;
}

export interface DateComponents {
  year: number;
  month: number;
  day: number;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
