'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { ArticleModal } from '@/components/home/ArticleModal';
import {
  IntroContent,
  EventsContent,
  AboutContent,
  ContactContent,
  PromoContent,
} from '@/components/home/ArticleContent';

type ModalType = 'intro' | 'events' | 'about' | 'contact' | 'promo' | null;

export default function HomePage() {
  const [loading, setLoading] = useState('is-loading');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const modalOpenedRef = useRef(false);

  // Loading state removal
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading('');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (activeModal) {
        setActiveModal(null);
        modalOpenedRef.current = false;
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeModal]);

  const openModal = (modal: ModalType) => {
    setActiveModal(modal);
    // Push a new history entry when opening modal
    if (!modalOpenedRef.current) {
      window.history.pushState({ modal }, '');
      modalOpenedRef.current = true;
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    // Go back in history if we pushed a state
    if (modalOpenedRef.current) {
      window.history.back();
      modalOpenedRef.current = false;
    }
  };

  const modalConfig = {
    intro: { title: 'Intro', content: <IntroContent /> },
    events: { title: 'Events', content: <EventsContent /> },
    about: { title: 'Pics/Vids', content: <AboutContent /> },
    contact: { title: 'Contact', content: <ContactContent /> },
    promo: { title: 'Promo/Tech', content: <PromoContent /> },
  };

  return (
    <div className={`body ${loading} ${activeModal ? 'is-article-visible' : ''}`}>
      <div id="wrapper" className="flex flex-col min-h-screen items-center justify-center text-center relative p-4 sm:p-8 xl:p-16 w-full max-w-full" style={{ zIndex: 3 }}>
        <Header onOpenModal={openModal} />
        <Footer />
      </div>
      <AnimatedBackground isLoading={loading === 'is-loading'} />
      {activeModal && (
        <ArticleModal
          title={modalConfig[activeModal].title}
          onClose={closeModal}
        >
          {modalConfig[activeModal].content}
        </ArticleModal>
      )}
    </div>
  );
}
