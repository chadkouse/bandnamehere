import React from 'react';
import CalendarBox from './CalendarBox';

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export default function Weekdays() {
  return (
    <div className="flex flex-wrap">
      {WEEKDAYS.map((weekday) => (
        <CalendarBox
          dayType="weekdays"
          pad="small"
          key={weekday}
        >
          <p
            className="text-center truncate text-white"
            title={weekday}
          >
            {weekday}
          </p>
        </CalendarBox>
      ))}
    </div>
  );
}
