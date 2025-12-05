'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { EventInfo } from '@/types';

type EventsContextType = {
  events: EventInfo[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({
  children,
  initialEvents = []
}: {
  children: ReactNode;
  initialEvents?: EventInfo[];
}) {
  const [events, setEvents] = useState<EventInfo[]>(initialEvents);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/events', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch on mount if no initial events
    if (initialEvents.length === 0) {
      fetchEvents();
    }
  }, []);

  return (
    <EventsContext.Provider value={{ events, isLoading, error, refetch: fetchEvents }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within EventsProvider');
  }
  return context;
}
