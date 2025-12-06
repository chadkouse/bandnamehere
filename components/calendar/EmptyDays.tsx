import React from 'react';
import CalendarBox from './CalendarBox';

type Props = {
  amount: number;
};

export default function EmptyDays({ amount = 0 }: Props) {
  return (
    <>
      {/* Hidden on small screens */}
      {Array(amount)
        .fill(null)
        .map((_, index) => (
          <CalendarBox
            dayType="empty"
            key={`empty-${index}`}
            square
            className="hidden sm:block"
          />
        ))}
    </>
  );
}
