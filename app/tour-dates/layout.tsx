import { ReactNode } from 'react';

export default function CalendarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-y-scroll" style={{ scrollBehavior: 'smooth' }}>
      {children}
    </div>
  );
}
