import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

const REEL_VIDEOS = [
  {
    id: 1,
    title: "Sunset Lamp Magic",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    product: "Sunset Projection Lamp"
  },
  {
    id: 2,
    title: "Fresh Juice Anywhere",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    product: "Portable Blender"
  },
  {
    id: 3,
    title: "Galaxy in your Room",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    product: "Astronaut Projector"
  }
];

export const VideoShowcase = () => {
  return (
    <motion.section {...fadeInUpProps} className="py-20 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Trending on Socials</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Watch our top trending products in action. Experience the viral sensations before you buy.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {REEL_VIDEOS.map((video) => (
            <div key={video.id} className="relative rounded-3xl overflow-hidden aspect-[9/16] shadow-2xl group border border-gray-800 bg-gray-900">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                src={video.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300">
                <div className="transform transition-transform duration-500 group-hover:translate-y-0 translate-y-4">
                  <div className="w-12 h-12 bg-[#e31c3d]/90 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-red-500/30 backdrop-blur-sm cursor-pointer hover:bg-red-600 transition-colors">
                    <Play className="w-5 h-5 text-white ml-1" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{video.title}</h3>
                  <p className="text-sm text-gray-200 mb-4">{video.product}</p>
                  <button className="w-full bg-white hover:bg-gray-100 text-black font-bold py-3 px-6 rounded-full transition-colors shadow-lg text-sm">
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
