'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Month from '@/components/calendar/Month';
import ModalEvent from '@/components/calendar/ModalEvent';
import groupEventsByMonth from '@/lib/groupEventsByMonth';
import { ModalData, EventInfo } from '@/types';
import { appConfig } from '@/config/app';
import Bandname from '@/components/home/Bandname';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

const TIMEZONE = 'America/New_York';

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
  const [currentDate, setCurrentDate] = useState(new Date());
  const modalOpenedRef = useRef(false);

  useEffect(() => {
    // Randomly select a background image on mount
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomIndex]);
  }, []);

  // Update current date on mount and daily (using EST)
  useEffect(() => {
    const getESTDate = () => toZonedTime(new Date(), TIMEZONE);

    // Set the current date on mount (EST)
    setCurrentDate(getESTDate());

    // Calculate time until EST midnight
    const now = new Date();
    const estNow = toZonedTime(now, TIMEZONE);
    const estTomorrow = new Date(estNow);
    estTomorrow.setDate(estTomorrow.getDate() + 1);
    estTomorrow.setHours(0, 0, 0, 0);

    // Convert EST midnight back to local time to get correct timeout
    const msUntilMidnight = estTomorrow.getTime() - estNow.getTime();

    const midnightTimeout = setTimeout(() => {
      setCurrentDate(getESTDate());

      // Set up daily interval after first midnight
      const dailyInterval = setInterval(() => {
        setCurrentDate(getESTDate());
      }, 24 * 60 * 60 * 1000);

      return () => clearInterval(dailyInterval);
    }, msUntilMidnight);

    return () => clearTimeout(midnightTimeout);
  }, []);

  const months = useMemo(
    () => groupEventsByMonth(initialEvents, appConfig.limitMonthInTheFuture, currentDate),
    [initialEvents, currentDate]
  );

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (showModal) {
        setShowModal(false);
        modalOpenedRef.current = false;
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [showModal]);

  const openModal = useCallback((data: ModalData) => {
    setModalData(data);
    setShowModal(true);
    // Push a new history entry when opening modal
    if (!modalOpenedRef.current) {
      window.history.pushState({ modal: 'event' }, '');
      modalOpenedRef.current = true;
    }
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    // Go back in history if we pushed a state
    if (modalOpenedRef.current) {
      window.history.back();
      modalOpenedRef.current = false;
    }
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
          className="flex items-center gap-2 text-white transition-colors mb-4 w-fit hover:text-[#41a7b3]"
        >
          <ArrowLeft size={20} />
          Back home
        </Link>

        <div className="rounded p-4 md:p-8 mb-8" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', border: '2px solid rgba(255, 255, 255, 0.3)' }}>
          <span>
            We&apos;d love to bring the party to YOU!{' '}
            <Link
              href="/contact"
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
            currentDate={currentDate}
            {...month}
          />
        ))}
        </div>

        {showModal && modalData && (
          <ModalEvent onClose={closeModal} {...modalData} />
        )}
        </div>
      </div>
    </>
  );
}
