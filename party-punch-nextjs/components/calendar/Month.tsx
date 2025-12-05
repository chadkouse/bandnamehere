import React from 'react';
import { getDaysInMonth, getISODay, format } from 'date-fns';
import Day from './Day';
import EmptyDays from './EmptyDays';
import Weekdays from './Weekdays';
import buildDaysWithEvents from '@/lib/buildDaysWithEvents';
import { MonthInfo, ModalData } from '@/types';

type Props = MonthInfo & {
  openModal: (modalData: ModalData) => void;
};

export default function Month({ events, startDate, openModal }: Props) {
  const dayNumber = getISODay(startDate);
  const days = getDaysInMonth(startDate);
  const emptyDays = 7 - ((dayNumber + days) % 7);

  const daysWithEvents = buildDaysWithEvents(startDate, events);

  return (
    <div className="m-4">
      <h2
        className="text-3xl font-semibold mb-4"
        style={{ color: 'var(--color-fg)' }}
        title={`Month of ${format(startDate, 'MMMM yyyy')}`}
      >
        <strong className="font-bold">{format(startDate, 'MMMM')} </strong>
        {format(startDate, 'yyyy')}
      </h2>

      <div
        className="rounded-xl"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Hide weekdays on small screens */}
        <div className="hidden sm:block">
          <Weekdays />
        </div>

        <div className="flex flex-wrap">
          {dayNumber !== 7 && <EmptyDays amount={dayNumber} />}

          {daysWithEvents.map((modalData) => {
            const onClick =
              modalData.events.length > 0
                ? () => openModal(modalData)
                : undefined;

            return (
              <Day
                key={format(modalData.date, 'dd')}
                onClick={onClick}
                {...modalData}
              />
            );
          })}

          {emptyDays !== 7 && <EmptyDays amount={emptyDays} />}
        </div>
      </div>
    </div>
  );
}
