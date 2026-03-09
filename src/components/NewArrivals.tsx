import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star, ShoppingBag } from 'lucide-react';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const NewArrivals = ({ onNavigate }: { onNavigate: (path: string, id?: number | null) => void }) => {
  return (
    <motion.section {...fadeInUpProps} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-black mb-2">New Arrivals</h2>
          <p className="text-gray-600">Fresh trends just in. Upgrade your daily routine with these viral hits.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Large Promo Card */}
          <div onClick={() => onNavigate('category', null)} className="lg:col-span-1 relative rounded-2xl overflow-hidden group cursor-pointer min-h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1550009158-9effb64fda70?w=800&q=80" 
              alt="Promo" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <span className="text-white text-xs font-bold uppercase tracking-wider">Flash Sale</span>
              <div>
                <h3 className="text-white text-3xl font-bold mb-6 leading-tight">Smart Home<br/>Upgrades</h3>
                <button className="bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Smaller Cards Grid/Scroll */}
          <div className="lg:col-span-3 flex overflow-x-auto hide-scrollbar space-x-6 pb-4 snap-x">
            {[
              { id: 1, title: 'LED Strip Lights', category: 'DECOR', price: 1499, oldPrice: 2499, img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80', sale: true, rating: 4.8, reviews: 342 },
              { id: 2, title: 'Smart Neck Massager', category: 'WELLNESS', price: 2999, oldPrice: null, img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', sale: false, rating: 4.5, reviews: 128 },
              { id: 3, title: 'Volcano Humidifier', category: 'HOME', price: 1999, oldPrice: null, img: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&q=80', sale: false, rating: 4.9, reviews: 567 },
              { id: 4, title: 'Wireless Car Charger', category: 'AUTO', price: 1799, oldPrice: 3499, img: 'https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?w=800&q=80', sale: true, rating: 4.7, reviews: 215 },
            ].map((item, idx) => (
              <div key={idx} onClick={() => onNavigate('product', item.id)} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer min-w-[280px] snap-start h-full">
                <div className="relative aspect-square mb-4 bg-[#f8f9fb] rounded-xl overflow-hidden flex items-center justify-center p-6">
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-[#e31c3d] transition-all z-10">
                    <Heart className="w-4 h-4" />
                  </button>
                  {item.sale && (
                    <span className="absolute top-3 left-3 bg-[#e31c3d] text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md z-10">Sale</span>
                  )}
                  <img src={item.img} alt={item.title} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                
                <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-1">{item.title}</h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#e31c3d] font-semibold text-sm">₹{item.price.toLocaleString('en-IN')}</span>
                  {item.oldPrice && (
                    <span className="text-gray-400 text-xs line-through">₹{item.oldPrice.toLocaleString('en-IN')}</span>
                  )}
                  {item.oldPrice && (
                    <span className="text-[#e31c3d] text-xs">
                      {Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}% off
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < item.rating ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'fill-gray-200 text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-900 font-medium">{item.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-400">{item.reviews} Reviews</span>
                </div>

                <div className="flex gap-2 mt-auto">
                  <button 
                    onClick={(e) => { e.stopPropagation(); /* add to cart */ }} 
                    className="flex-1 bg-white border border-gray-200 text-gray-600 font-medium py-2 rounded-lg text-xs hover:bg-gray-50 transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Add To Cart
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onNavigate('product', item.id); }}
                    className="flex-1 bg-[#e31c3d] text-white font-medium py-2 rounded-lg text-xs hover:bg-red-700 transition-all"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
