import type { LunarDate } from '@/types';

interface LunarDisplayProps {
  lunar: LunarDate;
}

export const LunarDisplay = ({ lunar }: LunarDisplayProps) => {
  return (
    <div className="flex mt-9 justify-center">
      <div className="w-full">
        <h2 className="text-xl border-b border-gray-300 pb-1">음력</h2>
        <p className="text-base/9">
          {lunar.year}년 {lunar.month}월 {lunar.day}일 {lunar.leapMonth ? '윤달' : '평달'}
        </p>
      </div>
    </div>
  );
};
