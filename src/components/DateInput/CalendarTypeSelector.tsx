import type { CalendarType } from '@/types';
import type React from 'react';

interface CalendarTypeSelectorProps {
  value: CalendarType;
  onChange: (type: CalendarType) => void;
}

export const CalendarTypeSelector = ({ value, onChange }: CalendarTypeSelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value as CalendarType);
  };

  return (
    <div className="mb-3 text-left" role="radiogroup" aria-label="달력 유형 선택">
      <div className="inline-flex items-center mr-4">
        <input
          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
          type="radio"
          id="radio-solar"
          name="calendar-type"
          value="solar"
          checked={value === 'solar'}
          onChange={handleChange}
          aria-checked={value === 'solar'}
        />
        <label className="ml-2 text-sm font-medium text-foreground" htmlFor="radio-solar">
          양력
        </label>
      </div>

      <div className="inline-flex items-center">
        <input
          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
          type="radio"
          id="radio-lunar"
          name="calendar-type"
          value="lunar"
          checked={value === 'lunar'}
          onChange={handleChange}
          aria-checked={value === 'lunar'}
        />
        <label className="ml-2 text-sm font-medium text-foreground" htmlFor="radio-lunar">
          음력
        </label>
      </div>
    </div>
  );
};
