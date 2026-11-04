'use client';

import { useState, useEffect } from 'react';

export interface ScrollState {
  scrollY: number;
  scrollYProgress: number; // 0 to 1
  activeSection: string;
}

export function useScrollProgress(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollYProgress: 0,
    activeSection: 'hero',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, currentY / docHeight)) : 0;

      // Section detection
      const sections = ['hero', 'profile', 'audio-lab', 'projects', 'github-vault', 'contact'];
      let currentSection = 'hero';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= 0) {
            currentSection = sectionId;
          }
        }
      }

      setScrollState({
        scrollY: currentY,
        scrollYProgress: progress,
        activeSection: currentSection,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollState;
}
