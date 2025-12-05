import { NextResponse } from 'next/server';
import { fetchEventsFromSheet } from '@/lib/google-sheets';

export const dynamic = 'force-dynamic'; // Disable caching for fresh data
export const revalidate = 300; // Revalidate every 5 minutes

export async function GET() {
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

    return NextResponse.json(transformedEvents);
  } catch (error) {
    console.error('Error in events API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
