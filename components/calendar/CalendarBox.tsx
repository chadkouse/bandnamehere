'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CalendarBoxProps = {
  square?: boolean;
  children?: ReactNode;
  onClick?: () => void;
  dayType?: 'today' | 'past' | 'day' | 'empty' | 'weekdays';
  pad?: 'small' | 'xsmall' | 'medium';
  className?: string;
};

export default function CalendarBox({
  square,
  children,
  onClick,
  dayType,
  pad = 'small',
  className,
}: CalendarBoxProps) {
  const paddingClasses = {
    xsmall: 'p-1',
    small: 'p-2',
    medium: 'p-4',
  };

  const backgroundClasses = {
    today: 'bg-white/25',
    day: 'bg-white/15',
    past: 'bg-white/10',
    empty: 'bg-transparent',
    weekdays: 'bg-white/10',
  };

  const borderClasses = {
    today: 'border-white/40',
    day: 'border-white/30',
    past: 'border-white/20',
    empty: 'border-white/20',
    weekdays: 'border-white/30',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative border',
        'w-full sm:w-[calc(100%/7)]',
        square && 'sm:h-32',
        onClick && 'cursor-pointer',
        paddingClasses[pad],
        dayType && backgroundClasses[dayType],
        dayType && borderClasses[dayType],
        className
      )}
    >
      {children}
    </div>
  );
}
