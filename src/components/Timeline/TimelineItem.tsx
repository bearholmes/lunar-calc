import iconMoon from '@/assets/img/icon_moon.png';
import iconSun from '@/assets/img/icon_sun.png';
import type { BirthdayItem } from '@/types';
import { memo } from 'react';

interface TimelineItemProps {
  item: BirthdayItem;
}

export const TimelineItem = memo(({ item }: TimelineItemProps) => {
  return (
    <div className="vertical-timeline-item vertical-timeline-element">
      <div>
        <span className="vertical-timeline-element-icon bounce-in">
          <span className="icon" />
        </span>
        <div className="vertical-timeline-element-content bounce-in">
          <strong className="timeline-title">
            <span className="tracking-tight">{item.solarDate}</span>
            <img src={iconSun} width="12px" alt="양력" />
          </strong>
          <p className="age_txt">{item.age}세</p>
          <span className="vertical-timeline-element-date">
            <img src={iconMoon} width="12px" alt="음력" />
            <span className="tracking-tight">{item.lunarDate}</span>
          </span>
        </div>
      </div>
    </div>
  );
});

TimelineItem.displayName = 'TimelineItem';
