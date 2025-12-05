'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

export default function HomePage() {
  const [loading, setLoading] = useState('is-loading');

  // Loading state removal
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading('');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`body ${loading}`}>
      <div id="wrapper" className="flex flex-col min-h-screen items-center justify-center text-center relative p-4 sm:p-8 xl:p-16 w-full max-w-full" style={{ zIndex: 3 }}>
        <Header />
        <Footer />
      </div>
      <AnimatedBackground isLoading={loading === 'is-loading'} />
    </div>
  );
}
