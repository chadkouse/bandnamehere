'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type AnimatedBackgroundProps = {
  isArticleVisible?: boolean;
  isLoading: boolean;
};

const backgroundImages = [
  '/images/home-0.jpg',
  '/images/home-1.jpg',
  '/images/home-2.jpg',
];

export default function AnimatedBackground({
  isArticleVisible: isArticleVisibleProp = false,
  isLoading,
}: AnimatedBackgroundProps) {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isArticleVisible, setIsArticleVisible] = useState(isArticleVisibleProp);

  useEffect(() => {
    // Randomly select a background image on mount
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomIndex]);
  }, []);

  // Watch for article visibility changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const bodyWrapper = document.querySelector('.body');
      if (bodyWrapper) {
        setIsArticleVisible(bodyWrapper.classList.contains('is-article-visible'));
      }
    });

    const bodyWrapper = document.querySelector('.body');
    if (bodyWrapper) {
      observer.observe(bodyWrapper, {
        attributes: true,
        attributeFilter: ['class'],
      });
      // Set initial state
      setIsArticleVisible(bodyWrapper.classList.contains('is-article-visible'));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      id="bg"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
      }}
      initial={{ scale: 1 }}
      animate={{ scale: isArticleVisible ? 1.0825 : 1 }}
      transition={{ duration: 0.325 }}
    >
      {/* Overlay layer */}
      <motion.div
          className="h-[110vh] md:h-screen"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          backgroundImage:
            'linear-gradient(to top, rgba(19,21,25,0.75), rgba(19,21,25,0.75)), url(/images/overlay.png)',
          backgroundSize: 'auto, 256px 256px',
          backgroundPosition: 'center, center',
          backgroundRepeat: 'no-repeat, repeat',
          zIndex: 2,
        }}
        initial={{ backgroundColor: 'rgba(0,0,0,1)' }}
        animate={{ backgroundColor: 'rgba(0,0,0,0)' }}
        transition={{ duration: 1, delay: 0.75 }}
      />

      {/* Background image layer */}
      {backgroundImage && (
        <motion.div
          className="h-[110vh] md:h-screen"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            // transform: 'scale(1.125)',
            zIndex: 1,
          }}
          // animate={{
          //   transform: isArticleVisible ? 'scale(1.0825)' : 'scale(1)',
          // }}
          transition={{ duration: 0.325 }}
        />
      )}
    </motion.div>
  );
}
