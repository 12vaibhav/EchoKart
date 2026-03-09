import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Truck, Shield, RotateCcw, ChevronRight, Minus, Plus, ShoppingBag, Headset, ShieldCheck, Undo2, ThumbsUp } from 'lucide-react';
import { TRENDING_PRODUCTS } from '../data';
import { useWishlist } from '../contexts/WishlistContext';
import { ProductCard } from '../components/ProductCard';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const ProductDetailPage = ({ productId, onNavigate }: { productId: number | null, onNavigate?: (path: string, id?: number | null) => void }) => {
  const product = TRENDING_PRODUCTS.find(p => p.id === productId) || TRENDING_PRODUCTS[0];
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const [quantity, setQuantity] = useState(1);
  const [selectedSwatch, setSelectedSwatch] = useState(product.swatches?.[0] || null);

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-sm text-gray-500">
          <button onClick={() => onNavigate?.('home')} className="hover:text-[#e31c3d]">Home</button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <button onClick={() => onNavigate?.('category', null)} className="hover:text-[#e31c3d]">Products</button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium truncate">{product.title}</span>
        </div>
      </div>

      <motion.div {...fadeInUpProps} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square bg-[#f8f9fb] rounded-3xl overflow-hidden flex items-center justify-center p-8 group">
              {product.badges && product.badges.length > 0 && (
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                  <span className={`${product.badges[0].color} text-white text-xs uppercase font-bold px-3 py-1.5 rounded-lg shadow-sm`}>
                    {product.badges[0].text}
                  </span>
                </div>
              )}
              <button 
                onClick={() => toggleWishlist(product)}
                className={`absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md transition-all z-10 hover:scale-110 ${isWishlisted ? 'text-[#e31c3d]' : 'text-gray-400 hover:text-[#e31c3d]'}`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
              />
            </div>
            {/* Thumbnails placeholder (since we only have 1 image per product in data) */}
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`aspect-square rounded-xl bg-[#f8f9fb] p-2 cursor-pointer border-2 ${i === 0 ? 'border-[#e31c3d]' : 'border-transparent hover:border-gray-200'} transition-all`}>
                  <img src={product.image} alt="" className="w-full h-full object-contain mix-blend-multiply opacity-80" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <div className="mb-2 text-sm font-bold text-gray-500 uppercase tracking-wider">{product.brand}</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < product.rating ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'fill-gray-200 text-gray-200'}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-900">{product.rating.toFixed(1)} Rating</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500 hover:text-[#e31c3d] cursor-pointer transition-colors">{product.reviews} Reviews</span>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-bold text-[#e31c3d]">₹{product.price.toLocaleString('en-IN')}</span>
              {product.oldPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through mb-1">₹{product.oldPrice.toLocaleString('en-IN')}</span>
                  <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded mb-1">{discount}% OFF</span>
                </>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Experience the perfect blend of innovation and style with the {product.title}. Designed for modern living, this premium product delivers exceptional performance and unmatched reliability. Upgrade your lifestyle today.
            </p>

            {/* Swatches */}
            {product.swatches && product.swatches.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Select Color</h3>
                <div className="flex gap-3">
                  {product.swatches.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSwatch(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedSwatch === color ? 'border-[#e31c3d] scale-110 shadow-md' : 'border-transparent hover:scale-105 shadow-sm'}`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-full h-14 w-full sm:w-32">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-[#e31c3d] transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center font-bold text-gray-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-[#e31c3d] transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button className="flex-1 bg-white border-2 border-[#e31c3d] text-[#e31c3d] font-bold h-14 rounded-full flex items-center justify-center gap-2 hover:bg-red-50 transition-all">
                  <ShoppingBag className="w-5 h-5" /> Add to Cart
                </button>
                <button className="flex-1 bg-[#e31c3d] text-white font-bold h-14 rounded-full hover:bg-red-700 hover:shadow-lg transition-all">
                  Buy It Now
                </button>
              </div>
              <button className="w-full bg-green-600 text-white font-bold h-14 rounded-full hover:bg-green-700 hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Truck className="w-5 h-5" /> Order via Cash on Delivery (COD)
              </button>
            </div>


          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <ProductTabs product={product} />
        </div>

        {/* Related Products Section */}
        <div className="mt-24 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
            <button 
              onClick={() => onNavigate?.('category', null)}
              className="text-[#e31c3d] font-medium hover:text-red-700 transition-colors flex items-center gap-1"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRENDING_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map((relatedProduct) => (
              <ProductCard 
                key={relatedProduct.id} 
                product={relatedProduct} 
                onNavigate={onNavigate || (() => {})} 
                className="h-full"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProductTabs = ({ product }: { product: any }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('reviews');

  return (
    <div className="flex flex-col">
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('description')}
          className={`pb-4 px-6 text-lg font-medium transition-colors relative ${activeTab === 'description' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Description
          {activeTab === 'description' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e31c3d]" />}
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-4 px-6 text-lg font-medium transition-colors relative ${activeTab === 'reviews' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Reviews
          {activeTab === 'reviews' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e31c3d]" />}
        </button>
      </div>

      <div className="min-h-[300px]">
        {activeTab === 'description' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="prose max-w-none text-gray-600 leading-relaxed"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <p className="mb-6 text-lg">
                  The Languages differ in their grammar, their and their the common. Everyone a new common language.
                </p>
                <p className="mb-6">
                  Elevate your daily routine with the <strong>{product.title}</strong>. Meticulously crafted to combine style, functionality, and durability, this product is the ultimate solution for modern needs. Whether you're at home, in the office, or on the go, it delivers consistent performance that you can rely on.
                </p>
                <p className="mb-6">
                  Featuring advanced technology and premium materials, the {product.title} stands out in its category. The ergonomic design ensures comfort during extended use, while the sleek aesthetic adds a touch of sophistication to any setting. It's not just a product; it's an investment in quality and convenience.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Key Features</h3>
                <ul className="space-y-3 mb-8">
                   {[
                     'Premium Build Quality: Made with high-grade materials.',
                     'Innovative Design: Sleek, modern, and user-friendly.',
                     'High Performance: Optimized for efficiency and speed.',
                     'Versatile Usage: Perfect for various applications.',
                     'Eco-Friendly: Designed with sustainability in mind.'
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#e31c3d] mt-2 flex-shrink-0" />
                       <span>{item}</span>
                     </li>
                   ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl h-fit">
                <h3 className="font-bold text-gray-900 mb-4">Specifications</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Brand', value: product.brand },
                    { label: 'Model', value: `EK-${product.id}00${product.id}` },
                    { label: 'Material', value: 'Premium Composite' },
                    { label: 'Weight', value: '450g' },
                    { label: 'Warranty', value: '1 Year' },
                    { label: 'Origin', value: 'India' },
                  ].map((spec, idx) => (
                    <div key={idx} className="flex justify-between text-sm border-b border-gray-200 pb-2 last:border-0">
                      <span className="text-gray-500">{spec.label}</span>
                      <span className="font-medium text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'reviews' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Reviews List (Left) */}
              <div className="flex-1 space-y-8">
                {[
                  { name: "Chirstina Perry", date: "14 Apr, 2023", rating: 5, likes: 234, comment: "The Languages differ in their grammar, their and their the common. Everyone a new common language." },
                  { name: "Esther Howard", date: "23 May, 2023", rating: 5, likes: 824, comment: "The Languages differ in their grammar, their and their the common. Everyone a new common language." },
                  { name: "Rahul Sharma", date: "2 days ago", rating: 4, likes: 12, comment: "Great value for money. Works exactly as described. One star less only because the packaging could be slightly better." },
                ].map((review, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-8 last:border-0">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        <img src={`https://picsum.photos/seed/${review.name}/200`} alt={review.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'fill-gray-200 text-gray-200'}`} />
                          ))}
                        </div>
                        <p className="text-gray-600 mb-3 leading-relaxed">{review.comment}</p>
                        
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 text-blue-600 font-medium text-sm hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            Thank ({review.likes})
                          </button>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <div className="font-bold text-gray-900">{review.name}</div>
                        <div className="text-xs text-gray-400">{review.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rating Summary (Right) */}
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="text-center mb-8">
                    <div className="text-lg font-medium text-gray-900 mb-2">Average rating</div>
                    <div className="text-5xl font-bold text-gray-900 mb-3">4/5</div>
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { stars: 5, count: '70K', percent: '70%' },
                      { stars: 4, count: '55K', percent: '55%' },
                      { stars: 3, count: '45K', percent: '45%' },
                      { stars: 2, count: '32K', percent: '32%' },
                    ].map((row) => (
                      <div key={row.stars} className="flex items-center gap-3 text-sm">
                        <span className="w-12 font-medium text-gray-600">{row.stars} star</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full" 
                            style={{ width: row.percent }}
                          />
                        </div>
                        <span className="w-8 text-right text-gray-400 text-xs">{row.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
