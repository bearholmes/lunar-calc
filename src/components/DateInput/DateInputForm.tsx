import type { DateForm } from '@/types';
import { MAX_DATE } from '@/utils';
import type React from 'react';
import { CalendarTypeSelector } from './CalendarTypeSelector';
import { LeapMonthCheckbox } from './LeapMonthCheckbox';

interface DateInputFormProps {
  form: DateForm;
  onFormChange: (updates: Partial<DateForm>) => void;
  onSubmit: () => void;
}

export const DateInputForm = ({ form, onFormChange, onSubmit }: DateInputFormProps) => {
  const isSubmitDisabled = !form.date;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isSubmitDisabled) {
      onSubmit();
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <h2 className="text-xl border-b border-gray-300 pb-1 mb-3">태어난 날을 입력해주세요.</h2>

        <CalendarTypeSelector value={form.type} onChange={(type) => onFormChange({ type })} />

        {form.type === 'lunar' && (
          <LeapMonthCheckbox
            checked={form.leapMonth}
            onChange={(leapMonth) => onFormChange({ leapMonth })}
          />
        )}

        <div className="flex mt-3 gap-2">
          <input
            type="date"
            value={form.date || ''}
            onChange={(e) => onFormChange({ date: e.target.value })}
            onKeyDown={handleKeyDown}
            aria-label="생년월일"
            aria-required="true"
            className="flex-1 px-4 py-3 text-lg border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            max={MAX_DATE}
            required
          />
          <button
            type="button"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            disabled={isSubmitDisabled}
            onClick={onSubmit}
            aria-label="날짜 확인"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
