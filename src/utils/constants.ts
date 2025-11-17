/**
 * Application-wide constants
 */

/** 날짜 유효성 검증 범위 */
export const YEAR_RANGE = {
  MIN: 1800,
  MAX: 2101,
} as const;

/** 타임라인 생성 연도 수 */
export const TIMELINE_YEARS = 100;

/**
 * 실제 계산 가능한 최대 타임라인 연도 수
 * 출생년도 + 이 값이 YEAR_RANGE.MAX를 초과하면 안 됨
 */
export const getMaxTimelineYears = (birthYear: number): number => {
  const maxPossibleYears = YEAR_RANGE.MAX - birthYear;
  return Math.min(TIMELINE_YEARS, maxPossibleYears);
};

/**
 * 타임라인이 제한되었는지 확인
 */
export const isTimelineLimited = (birthYear: number): boolean => {
  return birthYear + TIMELINE_YEARS > YEAR_RANGE.MAX;
};

/** 날짜 입력 필드 최대값 */
export const MAX_DATE = '2999-12-31';

/** 에러 메시지 */
export const ERROR_MESSAGES = {
  INVALID_DATE_FORMAT: '올바른 날짜 형식이 아닙니다 (YYYY-MM-DD)',
  INVALID_DATE_COMPONENTS: '유효하지 않은 날짜입니다',
  YEAR_OUT_OF_RANGE: `${YEAR_RANGE.MIN}년부터 ${YEAR_RANGE.MAX}년까지만 확인 가능합니다.`,
  INVALID_MONTH: '월은 1부터 12 사이여야 합니다',
  INVALID_DAY: '일은 1부터 31 사이여야 합니다',
  INVALID_LEAP_MONTH: '윤달이 아닌 것 같네요',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다',
  TIMELINE_LIMITED: (birthYear: number, maxYears: number) =>
    `${birthYear}년생의 경우 음력 계산 제한(~2101년)으로 인해 ${maxYears}년치 타임라인만 표시됩니다.`,
} as const;
