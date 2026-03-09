import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: "Priya S.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
    text: "I was skeptical about buying the viral sunset lamp, but the quality from echokart is incredible. It completely transformed my bedroom vibe! Shipping was surprisingly fast too.",
    product: "Sunset Projection Lamp"
  },
  {
    id: 2,
    name: "Rahul M.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    rating: 5,
    text: "Fast shipping and great customer service. The smart posture corrector actually works and is super comfortable to wear under my shirt.",
    product: "Smart Posture Corrector"
  },
  {
    id: 3,
    name: "Ananya R.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    rating: 5,
    text: "Got the portable blender for my morning smoothies. It's surprisingly powerful for its size and super easy to clean. Definitely a helpful find!",
    product: "Portable Fresh Blender"
  },
  {
    id: 4,
    name: "Vikram K.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
    text: "The crystal hair eraser is pure magic! Painless and leaves my skin so smooth. I've recommended it to all my friends.",
    product: "Crystal Hair Eraser"
  },
  {
    id: 5,
    name: "Neha P.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    rating: 4,
    text: "This neck massager is a lifesaver after long hours at the desk. The heat function is amazing. Worth every penny!",
    product: "Smart Neck Massager"
  },
  {
    id: 6,
    name: "Arjun D.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80",
    rating: 5,
    text: "Bought the galaxy projector for my kids' room, but I ended up using it in the living room. The nebula effects are mesmerizing.",
    product: "Astronaut Galaxy Projector"
  }
];

export const CustomerReviews = () => {
  return (
    <motion.section {...fadeInUpProps} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">Loved by Thousands</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">See what our customers are saying about their trending finds from echokart.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CUSTOMER_REVIEWS.map((review) => (
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
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover shadow-sm" referrerPolicy="no-referrer" />
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
