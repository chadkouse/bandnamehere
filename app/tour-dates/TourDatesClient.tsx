'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Month from '@/components/calendar/Month';
import ModalEvent from '@/components/calendar/ModalEvent';
import groupEventsByMonth from '@/lib/groupEventsByMonth';
import { ModalData, EventInfo } from '@/types';
import { appConfig } from '@/config/app';
import Bandname from '@/components/home/Bandname';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

const backgroundImages = [
  '/images/home-0.jpg',
  '/images/home-1.jpg',
  '/images/home-2.jpg',
];

type TourDatesClientProps = {
  initialEvents: EventInfo[];
};

export default function TourDatesClient({ initialEvents }: TourDatesClientProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    // Randomly select a background image on mount
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomIndex]);
  }, []);

  const months = useMemo(
    () => groupEventsByMonth(initialEvents, appConfig.limitMonthInTheFuture),
    [initialEvents]
  );

  const openModal = useCallback((data: ModalData) => {
    setModalData(data);
    setShowModal(true);
  }, []);

  const [loading, setLoading] = useState('is-loading');

  // Loading state removal
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading('');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Background image layer */}
      <AnimatedBackground isLoading={loading === 'is-loading'} />

      {/* Overlay */}
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: 'linear-gradient(to top, rgba(19,21,25,0.75), rgba(19,21,25,0.75)), url(/images/overlay.png)',
          backgroundSize: 'auto, 256px 256px',
          backgroundPosition: 'center, center',
          backgroundRepeat: 'no-repeat, repeat',
          zIndex: 2,
        }}
      />

      <div
        id="calendars"
        className="min-h-screen relative"
        style={{
          zIndex: 3,
        }}
      >
        <div className="relative">
          <Link href="/">
            <header className="flex flex-col items-center py-8 md:py-12 text-center">
              <div
                className="mb-6"
                style={{
                  backgroundImage:
                    'radial-gradient(rgba(0, 0, 0, 0.25) 25%, rgba(0, 0, 0, 0) 55%)',
                }}
              >
                <Bandname className="text-9xl" />
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold uppercase tracking-[0.5rem] text-white"
              >
                Events
              </h1>
            </header>
          </Link>

        <div className="p-4 md:p-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-white transition-colors mb-4 w-fit hover:text-[var(--color-secondary)]"
        >
          <ArrowLeft size={20} />
          Back home
        </Link>

        <div className="rounded p-4 md:p-8 mb-8" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', border: '2px solid rgba(255, 255, 255, 0.3)' }}>
          <span>
            We&apos;d love to bring the party to YOU!{' '}
            <Link
              href="/contact"
              className="border-b border-dotted no-underline border-white/50 text-white"
            >
              Contact us
            </Link>{' '}
            to book your Wedding, Event, or any kind of party you want to make EPIC and
            UNFORGETTABLE!
          </span>
        </div>

        {months.map((month) => (
          <Month
            key={format(month.startDate, 'MM-yyyy')}
            openModal={openModal}
            {...month}
          />
        ))}
        </div>

        {showModal && modalData && (
          <ModalEvent onClose={() => setShowModal(false)} {...modalData} />
        )}
        </div>
      </div>
    </>
  );
}
