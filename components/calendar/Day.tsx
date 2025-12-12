'use client';

import React from 'react';
import { isBefore, isSameDay, format } from 'date-fns';
import Events from './Events';
import CalendarBox from './CalendarBox';
import { ModalData } from '@/types';

type Props = ModalData & {
  onClick?: () => void;
};

export default function Day({ date, events, onClick }: Props) {
  const [isPhone, setIsPhone] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsPhone(window.innerWidth <= 736);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const today = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
  );
  const isToday = isSameDay(date, today);
  const hasPast = isBefore(date, today) && !isToday;
  const dayType = (isToday && 'today') || (hasPast && 'past') || 'day';

  // On phone: hide past days without events, and empty future days
  if (isPhone && (hasPast || events.length === 0) && !isToday) {
    return null;
  }

  const textColorClasses = {
    today: 'text-white',
    day: 'text-white',
    past: 'text-white/60',
  };

  return (
    <CalendarBox
      dayType={dayType}
      pad={isPhone ? 'small' : 'xsmall'}
      onClick={onClick}
      square
    >
      <div className="flex flex-row h-full">
        {/* Mobile view - show date on left */}
        {isPhone && (
          <div className="w-20">
            <p
              className={`text-lg ${textColorClasses[dayType]}`}
              title="Day number"
            >
              {format(date, 'dd')}
            </p>
            <p
              className={`text-sm ${textColorClasses[dayType]}`}
              title="Day"
            >
              {format(date, 'cccc')}
            </p>
          </div>
        )}

        {/* Events */}
        <Events events={events} hasPast={hasPast} />

        {/* Desktop view - show date in bottom-right corner */}
        {!isPhone && (
          <p
            className={`absolute bottom-1 right-2 text-lg text-right ${textColorClasses[dayType]} ${dayType === 'past' ? 'line-through' : ''}`}
            title="Day number"
          >
            {format(date, 'dd')}
          </p>
        )}
      </div>
    </CalendarBox>
  );
}
