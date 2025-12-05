'use client';

import { Fragment } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';
import { ModalData, EventInfo } from '@/types';

type Props = ModalData & {
  onClose: () => void;
};

export default function ModalEvent({ onClose, date, events }: Props) {
  const parseTime = (time?: string) => {
    if (!time) return;
    const parts = time.split(' ');
    if (parts.length < 2) return;
    const timeParts = parts[0].split(':');
    if (timeParts.length < 2) return;
    return `${timeParts[0]}:${timeParts[1]} ${parts[1]}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-bg-overlay)' }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="rounded-lg shadow-2xl max-w-lg w-full mx-4 overflow-hidden"
          style={{ backgroundColor: 'var(--color-calendar-modal-bg)' }}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h3
              className="font-bold text-lg"
              style={{ color: 'var(--color-calendar-modal-text)' }}
            >
              {format(date, 'cccc d, MMMM')}
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-200"
              style={{ color: 'var(--color-calendar-modal-text)' }}
              aria-label="Close popup"
            >
              <X size={24} />
            </button>
          </div>

          {/* Events */}
          <div className="p-4">
            {events.map((event, i, arr) => (
              <Fragment key={event.id}>
                <EventDescription event={event} parseTime={parseTime} />
                {i !== arr.length - 1 && (
                  <div
                    className="my-4 h-[3px] rounded-full"
                    style={{ backgroundColor: 'var(--color-calendar-modal-separator)' }}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function EventDescription({
  event,
  parseTime,
}: {
  event: EventInfo;
  parseTime: (time?: string) => string | undefined;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full">
        {event.hour && (
          <p
            className="text-md mb-2"
            style={{ color: 'var(--color-calendar-modal-text)' }}
          >
            {parseTime(event.hour)}
          </p>
        )}

        <h4
          className="font-bold text-xl mb-2"
          style={{ color: 'var(--color-calendar-modal-text)' }}
        >
          {event.eventName}
        </h4>

        {event.eventDesc && (
          <p
            className="whitespace-pre-wrap my-4"
            style={{ color: 'var(--color-calendar-modal-text)' }}
          >
            {event.eventDesc}
          </p>
        )}

        {event.place && (
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(event.place)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:underline mb-2"
            style={{ color: 'var(--color-calendar-modal-text)' }}
          >
            <MapPin size={16} className="mr-1" />
            {event.place}
          </a>
        )}

        {event.price && (
          <p
            className="whitespace-pre-wrap my-4"
            style={{ color: 'var(--color-calendar-modal-text)' }}
          >
            {event.price}
          </p>
        )}

        {event.eventLink && (
          <a
            href={event.eventLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-4 py-2 rounded transition-colors self-end text-white"
            style={{ backgroundColor: 'var(--color-brand)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-focus)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-brand)';
            }}
          >
            Event Link
          </a>
        )}
      </div>
    </div>
  );
}
