'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type ArticleModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function ArticleModal({ title, children, onClose }: ArticleModalProps) {
  // Handle clicking outside the modal
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    // Check if click is on the backdrop (not the article content)
    if (target.id === 'modal-backdrop') {
      onClose();
    }
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center blur-bg"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      onClick={handleBackdropClick}
    >
      <motion.article
        initial={{ opacity: 0, y: '0.25rem' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '0.25rem' }}
        transition={{ duration: 0.325 }}
        className="relative w-[40rem] max-w-[90vw] rounded p-10 pb-8 max-h-[80vh] overflow-y-auto text-white"
        style={{
          backgroundColor: 'rgba(27, 31, 34, 0.95)',
        }}
      >
        <h2 className="text-2xl font-bold mb-8 pb-2 w-fit font-sans uppercase tracking-[8px]">{title}</h2>
        {children}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 w-16 h-16 cursor-pointer"
          aria-label="Close article"
        >
          <span className="sr-only">Close</span>
          <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-center bg-no-repeat hover:bg-[var(--color-border-bg)] active:bg-[var(--color-border-bg-alt)] transition-colors flex items-center justify-center">
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="white"
              strokeWidth="1"
            >
              <line x1="2" y1="2" x2="18" y2="18" />
              <line x1="18" y1="2" x2="2" y2="18" />
            </svg>
          </div>
        </button>
      </motion.article>
    </div>
  );
}
