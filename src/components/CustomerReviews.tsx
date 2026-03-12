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
    <motion.section {...fadeInUpProps} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">Loved by Thousands</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">See what our customers are saying about their trending finds from echokart.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayReviews.map((review: any) => (
            <motion.div
              key={review.id}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-1 mb-6 text-[#e31c3d]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 italic leading-relaxed">"{review.text}"</p>
              </div>
              <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
                {review.avatar ? (
                  <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#e31c3d]/10 text-[#e31c3d] flex items-center justify-center font-black">
                    {review.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-black">{review.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">Verified Buyer • {review.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
