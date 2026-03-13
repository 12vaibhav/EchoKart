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
      className="w-full bg-white pb-4 md:pb-8 pt-0 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          onClick={handleSlideClick}
          className="relative w-full h-[380px] md:h-[580px] lg:h-[680px] rounded-[1.5rem] sm:rounded-[3.5rem] overflow-hidden group shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 cursor-pointer will-change-transform"
        >
          {/* Slides Container */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div 
              key={currentSlide}
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url(${current.image})` }}
            >
              {/* Complex Overlay System */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Noble Noise Texture */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} />
            </motion.div>
          </AnimatePresence>

          {/* Staggered Content Area */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-28 text-center px-6 sm:px-12 pointer-events-none">
            <div className="max-w-4xl flex flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentSlide}`}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={{
                    animate: { transition: { staggerChildren: 0.1 } }
                  }}
                  className="flex flex-col items-center"
                >
                  {current.badge && (
                    <motion.span 
                      variants={itemVariants}
                      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-[10px] md:text-xs tracking-[0.25em] mb-6 py-2 px-6 rounded-full uppercase shadow-xl"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e31c3d] animate-pulse" />
                      {current.badge}
                    </motion.span>
                  )}

                  <motion.h1 
                    variants={itemVariants}
                    className="text-white text-3xl sm:text-6xl md:text-7xl lg:text-[90px] font-black tracking-tight mb-6 md:mb-10 drop-shadow-[0_10px_35px_rgba(0,0,0,0.5)] leading-[0.95] md:leading-[1]"
                  >
                    {current.title.split(' ').map((word: string, i: number) => (
                      <span key={i} className="inline-block mr-[0.2em] last:mr-0">
                        {word}
                      </span>
                    ))}
                  </motion.h1>

                  <motion.div variants={itemVariants} className="pointer-events-auto">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleSlideClick(); }}
                      className="group/btn relative overflow-hidden bg-white text-black hover:text-white font-black py-3 px-8 md:py-4 md:px-12 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)] text-xs md:text-base tracking-widest uppercase flex items-center justify-center gap-3"
                    >
                      <span className="relative z-10">Explore Collection</span>
                      <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-[#e31c3d] -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                    </button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Premium Navigation Controls */}
          {SLIDES.length > 1 && (
            <>
              {/* Desktop Side Controls */}
              <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button 
                  onClick={handlePrev}
                  className="p-5 bg-white/5 hover:bg-white backdrop-blur-md rounded-full transition-all duration-500 border border-white/10 hover:border-white text-white hover:text-black pointer-events-auto hover:scale-110 shadow-2xl group/nav"
                >
                  <ChevronLeft className="w-7 h-7 group-hover/nav:-translate-x-0.5 transition-transform" />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-5 bg-white/5 hover:bg-white backdrop-blur-md rounded-full transition-all duration-500 border border-white/10 hover:border-white text-white hover:text-black pointer-events-auto hover:scale-110 shadow-2xl group/nav"
                >
                  <ChevronRight className="w-7 h-7 group-hover/nav:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Progress Indicators */}
              <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center space-x-4 text-white pointer-events-none z-30">
                {SLIDES.map((_, i) => (
                  <button 
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
                    className="group/dot relative h-1.5 pointer-events-auto transition-all duration-500 overflow-hidden rounded-full"
                    style={{ width: currentSlide === i ? '60px' : '12px', backgroundColor: 'rgba(255,255,255,0.2)' }}
                  >
                    {currentSlide === i && (
                      <motion.div 
                        key={`progress-${i}-${isPaused}`} // Reset on pause/resume to stay synced or just use slide key
                        initial={{ width: "0%" }}
                        animate={isPaused ? { width: "0%" } : { width: "100%" }}
                        transition={{ 
                          duration: isPaused ? 0 : 6, 
                          ease: "linear"
                        }}
                        onAnimationComplete={() => {
                          if (!isPaused) handleNext();
                        }}
                        className="absolute inset-0 bg-[#e31c3d]"
                      />
                    )}
                    <div className={`absolute inset-0 transition-colors duration-500 ${currentSlide === i ? 'opacity-0' : 'bg-white/40 group-hover/dot:bg-white'}`} />
                  </button>
                ))}
              </div>
            </>
          )}
          
          {/* Mobile Quick Nav */}
          {SLIDES.length > 1 && (
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between md:hidden pointer-events-none z-20">
               <button onClick={handlePrev} className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full pointer-events-auto active:scale-90 transition-transform"><ChevronLeft className="w-5 h-5 text-white" /></button>
               <button onClick={handleNext} className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full pointer-events-auto active:scale-90 transition-transform"><ChevronRight className="w-5 h-5 text-white" /></button>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

