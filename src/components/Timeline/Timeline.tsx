import type { BirthdayItem } from '@/types';
import { TimelineItem } from './TimelineItem';

interface TimelineProps {
  items: BirthdayItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex mt-9 justify-center">
      <div className="w-full">
        <h2 className="text-xl border-b border-gray-300 pb-1">타임라인</h2>
        <div className="mb-4">
          <div className="mt-3">
            <div className="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
              {items.map((item, idx) => (
                <TimelineItem key={`${item.year}-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
