import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

const ORIGINAL_REVIEWS: any[] = [];

export const CustomerReviews = ({ reviews: propReviews }: { reviews?: any[] }) => {
  const displayReviews = propReviews && propReviews.length > 0 ? propReviews : ORIGINAL_REVIEWS;
  return (
    <motion.section {...fadeInUpProps} className="pt-10 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">Loved by Thousands</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">See what our customers are saying about their trending finds from echokart.</p>
        </div>
        <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {displayReviews.map((review: any) => (
            <motion.div
              key={review.id}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gray-50 rounded-lg p-6 md:p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100 flex flex-col justify-between shrink-0 w-[280px] md:w-auto snap-start"
            >
              <div>
                <div className="flex items-center space-x-1 mb-6 text-[#e31c3d]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 md:w-5 md:h-5 ${i < review.rating ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-gray-700 text-sm md:text-base mb-8 italic leading-relaxed line-clamp-4 md:line-clamp-none">"{review.text}"</p>
              </div>
              <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
                {review.avatar ? (
                  <img src={review.avatar} alt={review.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#e31c3d]/10 text-[#e31c3d] flex items-center justify-center font-black text-sm md:text-base">
                    {review.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="font-bold text-black text-sm md:text-base truncate">{review.name}</h4>
                  <p className="text-[10px] md:text-xs text-gray-500 font-medium truncate">Verified Buyer • {review.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
