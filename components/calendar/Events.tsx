'use client';

import React from 'react';
import { EventInfo } from '@/types';

const MAX_AMOUNT_EVENTS = 2;

type Props = {
  events: EventInfo[];
  hasPast: boolean;
};

// Format time to remove seconds
const formatTime = (time: string) => {
  // If time contains seconds (e.g., "7:00:00 PM"), remove them
  return time.replace(/(\d{1,2}:\d{2}):\d{2}/, '$1');
};

export default function Events({ events, hasPast }: Props) {
  // Check if we're on a small screen (similar to Grommet's ResponsiveContext)
  const [isPhone, setIsPhone] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsPhone(window.innerWidth <= 736);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const displayEvents = events.slice(0, isPhone ? 99 : MAX_AMOUNT_EVENTS);

  return (
    <div className="flex flex-col gap-1 sm:gap-0.5 w-full">
      {displayEvents.map((event) => (
        <div key={event.id}>
          <div
            className={`rounded-sm px-1 py-1 transition-all duration-200 hover:brightness-110 hover:scale-[1.02] cursor-pointer ${
              hasPast ? 'bg-gray-600/80' : 'bg-pink-700/95 hover:bg-sky-500/85 transition duration-300 ease-in-out'
            }`}
          >
            <p
              className="text-base font-bold truncate text-white"
              title={event.eventName}
            >
              {event.eventName}
            </p>
            {event.hour && (
              <p
                className="text-sm truncate text-white"
                title={event.hour}
              >
                {formatTime(event.hour)}
              </p>
            )}
            {event.place && (
              <p
                className="text-sm truncate text-white"
                title={event.place}
              >
                {event.place}
              </p>
            )}
          </div>
        </div>
      ))}

      {!isPhone && events.length > MAX_AMOUNT_EVENTS && (
        <p className="text-sm truncate font-bold">
          {`And ${events.length - MAX_AMOUNT_EVENTS} more ...`}
        </p>
      )}
    </div>
  );
}
