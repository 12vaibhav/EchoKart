import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const ORIGINAL_SLIDES: any[] = [];

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.08 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

export const Hero = ({ slides: propSlides, onNavigate }: { slides?: any[], onNavigate: (path: string, id?: any, categoryName?: string | null) => void }) => {
  const SLIDES = propSlides && propSlides.length > 0 ? propSlides : ORIGINAL_SLIDES;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (SLIDES.length === 0) return;
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, [SLIDES.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    if (SLIDES.length === 0) return;
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, [SLIDES.length]);

  if (SLIDES.length === 0) return null;

  const current = SLIDES[currentSlide] || {};

  const handleSlideClick = () => {
    if (current.category_name) {
      onNavigate('category-products', null, current.category_name);
    } else {
      onNavigate('category', 0);
    }
  };

  return (
    <motion.section 
      initial="initial"
      animate="animate"
      variants={containerVariants}
      className="w-full bg-white pb-3 md:pb-6 pt-0 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Mobile View: Single Banner Animated (Same as before but restricted to mobile) */}
        <div 
          onClick={handleSlideClick}
          className="md:hidden relative w-full h-[240px] rounded-xl overflow-hidden group shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 cursor-pointer will-change-transform"
        >
          {/* Slides Container */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div 
              key={currentSlide}
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${current.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} />
            </motion.div>
          </AnimatePresence>

          {/* Mobile Progress Indicators */}
          {SLIDES.length > 1 && (
            <div className="absolute top-4 left-0 right-0 flex items-center justify-center space-x-2 text-white pointer-events-none z-30">
              {SLIDES.map((_, i) => (
                <div 
                  key={i}
                  className="h-1 rounded-full overflow-hidden transition-all duration-500"
                  style={{ width: currentSlide === i ? '32px' : '8px', backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  {currentSlide === i && (
                    <motion.div 
                      key={`progress-m-${i}-${isPaused}`}
                      initial={{ width: "0%" }}
                      animate={isPaused ? { width: "0%" } : { width: "100%" }}
                      transition={{ duration: isPaused ? 0 : 6, ease: "linear" }}
                      onAnimationComplete={() => { if (!isPaused) handleNext(); }}
                      className="h-full bg-[#e31c3d]"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Mobile Content Area */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-center px-6 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-m-${currentSlide}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="pointer-events-auto"
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); handleSlideClick(); }}
                  className="group/btn relative overflow-hidden bg-transparent text-white border border-white font-black py-2.5 px-8 rounded-full transition-all duration-300 active:scale-95 shadow-lg text-[10px] tracking-widest uppercase flex items-center justify-center gap-2"
                >
                  <span className="relative z-10">Explore Now</span>
                  <ArrowRight className="w-3.5 h-3.5 relative z-10" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop View: Three Banners Consecutive Row (Reduced Size & Scrollable) */}
        <div className="hidden md:flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4">
          {SLIDES.map((slide, index) => (
            <div 
              key={index} 
              onClick={() => {
                if (slide.category_name) onNavigate('category-products', null, slide.category_name);
                else onNavigate('category', 0);
              }}
              className="flex-none w-[calc((100%-32px)/3)] min-w-[320px] h-[360px] lg:h-[400px] relative rounded-[32px] overflow-hidden group shadow-2xl border border-gray-100 cursor-pointer transition-all duration-500 hover:scale-[1.02] snap-start"
            >
              {/* Background with Parallel Zoom */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              
              {/* Premium Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} />
              
              {/* Hover Light Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.05)_100%)]" />

              {/* Desktop Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 text-center px-8 pointer-events-none">
                <button 
                  className="group/btn relative overflow-hidden bg-white text-black font-black py-4 px-10 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.4)] text-[11px] tracking-widest uppercase flex items-center justify-center gap-2 pointer-events-auto"
                >
                  <span className="relative z-10">Explore Now</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-[#e31c3d] -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

