import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Slide1Hero from '../components/landing/Slide1Hero';
import Slide2HowItWorks from '../components/landing/Slide2HowItWorks';
import Slide3ForCreators from '../components/landing/Slide3ForCreators';
import Slide4Platforms from '../components/landing/Slide4Platforms';
import Slide5FinalCTA from '../components/landing/Slide5FinalCTA';
import DotNav from '../components/landing/DotNav';

import { ChevronDown } from 'lucide-react';

export default function LandingPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 5;
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);

  const nextSlide = () => setActiveSlide(prev => Math.min(prev + 1, totalSlides - 1));
  const prevSlide = () => setActiveSlide(prev => Math.max(prev - 1, 0));
  const goToSlide = (index: number) => setActiveSlide(Math.max(0, Math.min(index, totalSlides - 1)));

  // Slides 2 and 5 (index 1 and 4) have pink backgrounds
  const isPinkBg = activeSlide === 1 || activeSlide === 4;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prevSlide();
    };

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 800) return; // Debounce
      
      if (Math.abs(e.deltaY) > 10) {
        lastScrollTime.current = now;
        if (e.deltaY > 0) nextSlide();
        else prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent default to avoid pull-to-refresh or other browser behaviors
    if (e.cancelable) e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    
    // threshold of 50px for a swipe
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <div 
      className={`slideshow-container ${isPinkBg ? 'pink-bg' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Navbar activeSlide={activeSlide} />

      <a 
        href="/join" 
        className="persistent-cta"
        style={{ opacity: activeSlide === 4 ? 0 : 1, pointerEvents: activeSlide === 4 ? 'none' : 'all' }}
      >
        Join the Waitlist →
      </a>

      {activeSlide < totalSlides - 1 && (
        <div className="scroll-indicator" onClick={nextSlide} style={{ cursor: 'pointer' }}>
          <div className="pulsing-arrow" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ChevronDown size={24} strokeWidth={3} />
            <ChevronDown size={24} strokeWidth={3} style={{ marginTop: '-12px' }} />
          </div>
        </div>
      )}

      <div className="slides-wrapper">
        <Slide1Hero active={activeSlide === 0} />
        <Slide2HowItWorks active={activeSlide === 1} />
        <Slide3ForCreators active={activeSlide === 2} />
        <Slide4Platforms active={activeSlide === 3} />
        <Slide5FinalCTA active={activeSlide === 4} />
      </div>

      <DotNav active={activeSlide} total={totalSlides} onChange={goToSlide} />
    </div>
  );
}
