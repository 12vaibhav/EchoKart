import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const Hero = ({ onNavigate }: { onNavigate: (path: string, id?: number | null) => void }) => {
  return (
    <motion.section {...fadeInUpProps} className="w-full bg-white pb-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-xl overflow-hidden group">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1920&q=80)' }}
          />
          {/* Subtle Overlay for text readability */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Centered Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="text-white font-bold text-sm md:text-base tracking-wide mb-2 drop-shadow-md uppercase">
              TikTok Made Me Buy It
            </span>
            <h1 className="text-white text-5xl md:text-7xl lg:text-[80px] font-extrabold tracking-tight mb-6 drop-shadow-lg max-w-4xl leading-tight">
              Viral Finds You Didn't Know You Needed
            </h1>
            <button onClick={() => onNavigate('category', null)} className="bg-[#e31c3d] hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-colors shadow-lg text-sm md:text-base">
              Shop Trending Now
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center space-x-6 text-white">
            <button className="p-1 hover:bg-white/20 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2.5">
              <div className="w-2 h-2 rounded-full bg-white/60 cursor-pointer hover:bg-white transition-colors" />
              <div className="w-8 h-2 rounded-full bg-white cursor-pointer shadow-sm" />
              <div className="w-2 h-2 rounded-full bg-white/60 cursor-pointer hover:bg-white transition-colors" />
            </div>
            <button className="p-1 hover:bg-white/20 rounded-full transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
