interface LeapMonthCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const LeapMonthCheckbox = ({ checked, onChange }: LeapMonthCheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
        type="checkbox"
        id="leapMonth"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className="ml-2 text-sm font-medium text-foreground" htmlFor="leapMonth">
        윤달
      </label>
    </div>
  );
};
