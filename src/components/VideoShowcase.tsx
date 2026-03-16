import React from 'react';
import { motion } from 'motion/react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

const ORIGINAL_VIDEOS: any[] = [];

export const VideoShowcase = ({ videos: propVideos, onNavigate }: { videos?: any[], onNavigate: (path: string, id?: any, categoryName?: string | null) => void }) => {
  const displayVideos = propVideos && propVideos.length > 0 ? propVideos : ORIGINAL_VIDEOS;
  if (displayVideos.length === 0) return null;
  return (
    <motion.section {...fadeInUpProps} className="py-12 md:py-16 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Trending on Socials</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Watch our top trending products in action. Experience the viral sensations before you buy.</p>
        </div>
        
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto -mx-3 px-3 md:mx-auto md:px-0 pb-6 md:pb-0 snap-x snap-mandatory scroll-smooth overscroll-x-contain hide-scrollbar pl-6 pr-4 md:pl-0 md:pr-0">
          {displayVideos.map((video: any) => (
            <div key={video.id} className="relative rounded-xl overflow-hidden aspect-[9/16] shadow-2xl group border border-gray-800 bg-gray-900 shrink-0 w-[140px] md:w-auto snap-start">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                src={video.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-3 md:p-6 transition-opacity duration-300">
                <div className="transform transition-transform duration-500 group-hover:translate-y-0 translate-y-4">
                  <h3 className="text-sm md:text-xl font-bold text-white mb-0.5 md:mb-1 drop-shadow-md truncate">{video.title}</h3>
                  <p className="text-[10px] md:text-sm text-gray-200 mb-2 md:mb-4 truncate">{video.product}</p>
                  <button 
                    onClick={() => onNavigate('category-products', null, 'Sale Item')}
                    className="w-full bg-white hover:bg-[#e31c3d] hover:text-white text-black font-black py-2 md:py-3.5 px-3 md:px-6 rounded-md transition-all shadow-lg text-[10px] md:text-sm uppercase tracking-widest active:scale-95"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#e31c3d] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-blob animation-delay-2000" />
      </div>
    </motion.section>
  );
};
