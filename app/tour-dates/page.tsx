import { fetchEventsFromSheet } from '@/lib/google-sheets';
import { EventInfo } from '@/types';
import TourDatesClient from './TourDatesClient';

async function getEvents(): Promise<EventInfo[]> {
  try {
    const events = await fetchEventsFromSheet();

    // Transform to EventInfo type with IDs
    const transformedEvents = events.map((event, index) => ({
      id: `event_${index}_${Date.now()}`,
      eventName: event.eventName,
      eventDesc: event.description,
      date: event.date,
      hour: event.time,
      eventLink: event.facebookEventURL,
      place: event.location,
      price: event.price
    }));

    return transformedEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export default async function TourDatesPage() {
  const events = await getEvents();

  return <TourDatesClient initialEvents={events} />;
}
