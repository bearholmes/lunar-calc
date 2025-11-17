import type { DateComponents } from '@/types';

export const parseDateString = (dateString: string): DateComponents => {
  const parts = dateString.split('-');
  if (parts.length !== 3) {
    throw new Error('Invalid date format. Expected YYYY-MM-DD');
  }

  const year = Number.parseInt(parts[0], 10);
  const month = Number.parseInt(parts[1], 10);
  const day = Number.parseInt(parts[2], 10);

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    throw new Error('Invalid date components');
  }

  return { year, month, day };
};
