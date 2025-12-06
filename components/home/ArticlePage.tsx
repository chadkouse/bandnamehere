'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { ArticleModal } from './ArticleModal';

type ArticlePageProps = {
  title: string;
  children: ReactNode;
};

export default function ArticlePage({ title, children }: ArticlePageProps) {
  const [loading, setLoading] = useState('is-loading');
  const router = useRouter();

  // Loading state removal
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading('');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className={`body ${loading} is-article-visible`}>
      <div id="wrapper" className="flex flex-col min-h-screen items-center justify-center text-center relative p-4 sm:p-8 xl:p-16 w-full max-w-full" style={{ zIndex: 3 }}>
        <Header />
        <Footer />
      </div>
      <AnimatedBackground isLoading={loading === 'is-loading'} />
      <ArticleModal title={title} onClose={handleClose}>
        {children}
      </ArticleModal>
    </div>
  );
}
