import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import { Experience } from '../types';
import { getExperiences } from '../data';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  activeIndex?: number;
  setActiveIndex?: (index: number) => void;
  onExploreClick: (experience: Experience) => void;
  onBookNowClick: () => void;
  onViewDetails?: (experienceId: string) => void;
  onViewPackagesClick?: () => void;
}

// Curated Nusa Penida Slides using official high-resolution Cloudinary assets
const NUSA_PENIDA_SLIDES = [
  {
    id: 'nusa-penida-main',
    name: 'Nusa Penida',
    tagline: 'Nusa Penida & Bali Trip',
    scriptText: 'Natural beauty',
    title: 'Discover the most engaging places',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1790768104/antonia-nicoletta-irawan-V0cOEHVx1cE-unsplash_cfm3nz.webp',
  },
  {
    id: 'bali-lempuyang-temple',
    name: 'Lempuyang Temple Gates',
    tagline: 'Bali Heritage & Highlands Trip',
    scriptText: 'Natural beauty',
    title: 'Discover the most engaging places',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1790767054/young-woman-standing-temple-gates-lempuyang-luhur-temple-bali-indonesia-vintage-tone-scaled_n7cmrt.webp',
  },
  {
    id: 'nusa-penida-kelingking',
    name: 'Kelingking Beach',
    tagline: 'Nusa Penida West Trip',
    scriptText: 'Natural beauty',
    title: 'Discover the most engaging places',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_1920/v1783323538/52232f7d-759e-40de-a9ce-a8aa0fcde84d.png',
  },
  {
    id: 'nusa-penida-broken',
    name: 'Broken Beach',
    tagline: 'Nusa Penida West Trip',
    scriptText: 'Natural beauty',
    title: 'Discover the most engaging places',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_1920/v1786187369/3d0b750a-87f1-4374-a71b-d3f58a6e31b7.png',
  },
];

export default function HeroSection({
  activeIndex = 0,
  setActiveIndex,
  onExploreClick,
  onBookNowClick,
  onViewDetails,
  onViewPackagesClick,
}: HeroSectionProps) {
  const { language } = useLanguage();
  const experiences = getExperiences(language);
  
  // Local slide index synced with parent if provided
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync index
  const activeSlide = NUSA_PENIDA_SLIDES[currentSlideIndex] || NUSA_PENIDA_SLIDES[0];

  const handlePrev = () => {
    stopAutoplay();
    const newIdx = currentSlideIndex === 0 ? NUSA_PENIDA_SLIDES.length - 1 : currentSlideIndex - 1;
    setCurrentSlideIndex(newIdx);
    if (setActiveIndex) setActiveIndex(newIdx % experiences.length);
    startAutoplay();
  };

  const handleNext = () => {
    stopAutoplay();
    const newIdx = (currentSlideIndex + 1) % NUSA_PENIDA_SLIDES.length;
    setCurrentSlideIndex(newIdx);
    if (setActiveIndex) setActiveIndex(newIdx % experiences.length);
    startAutoplay();
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimerRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % NUSA_PENIDA_SLIDES.length);
    }, 7000);
  };

  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [currentSlideIndex]);

  const handleCtaClick = () => {
    if (onViewPackagesClick) {
      onViewPackagesClick();
      return;
    }
    const matchingExp = experiences.find((e) => e.id === activeSlide.id) || experiences[0];
    if (matchingExp) {
      onExploreClick(matchingExp);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="hero-top"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-black select-none"
    >
      {/* 1. Fullscreen Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id + currentSlideIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.name}
              loading="eager"
              // @ts-ignore
              fetchPriority="high"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* 2. Seamless Top Vignette (Allows transparent navbar to float invisibly while ensuring readable links) */}
        <div
          className="absolute inset-x-0 top-0 h-36 pointer-events-none z-1"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0) 100%)',
          }}
        />

        {/* 3. Efek Shadow Background Hitam Tinggi: Sangat pekat dan tinggi di bawah, makin ke atas makin tipis */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none z-1"
          style={{
            height: '75%',
            background:
              'linear-gradient(to top, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.88) 32%, rgba(0, 0, 0, 0.52) 65%, rgba(0, 0, 0, 0.18) 88%, rgba(0, 0, 0, 0) 100%)',
          }}
        />

        {/* Subtle ambient tint across whole screen to soften glare */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none z-1" />
      </div>

      {/* 4. Left and Right Navigation Ghost Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-8 md:left-12 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/20 hover:border-white/70 bg-black/25 hover:bg-black/55 text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm cursor-pointer shadow-lg active:scale-90"
      >
        <ChevronLeft size={22} strokeWidth={1.75} />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-4 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/20 hover:border-white/70 bg-black/25 hover:bg-black/55 text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm cursor-pointer shadow-lg active:scale-90"
      >
        <ChevronRight size={22} strokeWidth={1.75} />
      </button>

      {/* 5. Center Hero Content Block */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex-grow flex flex-col justify-center items-center pt-32 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* Cursive yellow script accent */}
            <p
              className="text-[#f6b738] text-2xl sm:text-3xl md:text-4xl italic font-normal tracking-wide drop-shadow-md mb-2 sm:mb-3"
              style={{ fontFamily: '"Dancing Script", cursive, Georgia, serif' }}
            >
              Natural beauty
            </p>

            {/* Bold central headline */}
            <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12] drop-shadow-lg max-w-4xl mx-auto">
              Discover the most engaging places
            </h1>

            {/* Golden CTA button with black text */}
            <button
              onClick={handleCtaClick}
              id="hero-explore-destinations-btn"
              className="mt-7 sm:mt-9 inline-flex items-center justify-center bg-[#e5a93c] hover:bg-[#f3ba52] text-black font-bold text-sm sm:text-base px-8 py-3.5 sm:px-9 sm:py-4 rounded-lg shadow-xl shadow-amber-500/20 hover:shadow-amber-400/35 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Explore Destinations
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 6. Bottom Statistics Counter & Indicators Row */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 pb-10 sm:pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center sm:text-left">
          {/* Stat 1: 100+ Happy Traveler */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-none mb-2">
              100+
            </span>
            <span className="font-sans text-xs sm:text-sm text-neutral-300/80 font-normal tracking-wide">
              Happy Traveler
            </span>
          </div>

          {/* Stat 2: 10+ Total Available Tour */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-none mb-2">
              10+
            </span>
            <span className="font-sans text-xs sm:text-sm text-neutral-300/80 font-normal tracking-wide">
              Total Available Tour
            </span>
          </div>

          {/* Stat 3: 37K Social Follow Likes */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-none mb-2">
              37K
            </span>
            <span className="font-sans text-xs sm:text-sm text-neutral-300/80 font-normal tracking-wide">
              Social Follow Likes
            </span>
          </div>

          {/* Stat 4: 32+ 5 Star Clients Ratings */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-none mb-2">
              32+
            </span>
            <span className="font-sans text-xs sm:text-sm text-neutral-300/80 font-normal tracking-wide">
              5 Star Clients Ratings
            </span>
          </div>
        </div>

        {/* Bottom Pagination Dot Indicator & Scroll to top arrow */}
        <div className="mt-8 flex items-center justify-between">
          <div className="w-8" /> {/* spacer */}

          {/* Carousel dots indicator */}
          <div className="flex items-center gap-2">
            {NUSA_PENIDA_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => {
                  stopAutoplay();
                  setCurrentSlideIndex(idx);
                  startAutoplay();
                }}
                className={`transition-all duration-300 cursor-pointer rounded-full ${
                  idx === currentSlideIndex
                    ? 'w-6 h-2 bg-[#e5a93c]'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Scroll to Top floating arrow */}
          <button
            onClick={handleScrollToTop}
            aria-label="Scroll to top"
            className="w-8 h-8 rounded-full border border-white/20 bg-black/40 hover:border-[#e5a93c] text-[#e5a93c] flex items-center justify-center transition-colors cursor-pointer shadow-md"
          >
            <ArrowUp size={14} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </section>
  );
}
