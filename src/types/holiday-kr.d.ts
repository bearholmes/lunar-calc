declare module 'holiday-kr' {
  export interface LunarResult {
    year: number;
    month: number;
    day: number;
    dayOfWeek: '일' | '월' | '화' | '수' | '목' | '금' | '토';
    leapMonth: boolean;
  }

  export interface SolarResult {
    year: number;
    month: number;
    day: number;
    dayOfWeek: '일' | '월' | '화' | '수' | '목' | '금' | '토';
  }

  export function getLunar(year: number, month: number, day: number): LunarResult;

  export function getSolar(
    year: number,
    month: number,
    day: number,
    leapMonth: boolean,
  ): SolarResult;
}
