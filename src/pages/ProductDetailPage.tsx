import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Truck, Shield, RotateCcw, ChevronRight, ChevronLeft, Minus, Plus, ShoppingBag, Headset, ShieldCheck, Lock, Undo2, ThumbsUp, Flame, Award, Users, X, Upload, Play } from 'lucide-react';

import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { ProductCard } from '../components/ProductCard';
import upiIcon from '../Image Assets/UPI Icon.png';
import paytmIcon from '../Image Assets/Paytm icon.png';
import gpayIcon from '../Image Assets/google pay icon.png';
import codIcon from '../Image Assets/COD Icon.png';
import paymentBadge from '../Image Assets/Trust Badges/payment badge.png';
import qualityBadge from '../Image Assets/Trust Badges/quality badge.png';
import shippingBadge from '../Image Assets/Trust Badges/shipping badge.png';

const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const ProductDetailPage = ({ productId, products = [], onNavigate }: { productId: any, products: any[], onNavigate: (path: string, id?: any) => void }) => {
  const product = products.find(p => String(p.id) === String(productId)) || products[0];
  
  // Adaptive mapping for dashboard data vs static data
  const title = product.name || product.title || 'Product Details';
  const price = product.price || 0;
  const oldPrice = product.oldPrice || (price * 1.5); // Fallback for newly added ones
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const tags = product.tags || (product.badges ? product.badges.map((b: any) => b.text) : []);
  const shortDesc = product.shortDescription || '';
  const fullCopy = product.description || '';
  const swatches = product.swatches || [];
  const swatchesVisible = product.swatches_visible !== false;
  const packOptions = product.pack_options || [];
  const packsVisible = product.packs_visible || false;
  const videoUrls = product.video_urls || [];

  // Combine media: videos first, then images
  const media = [
    ...videoUrls.map((url: string) => ({ type: 'video', url })),
    ...images.map((url: string) => ({ type: 'image', url }))
  ];

  // Helper to parse "Name|Color" swatches
  const parseSwatch = (swatchStr: string) => {
    if (!swatchStr) return { name: '', color: '' };
    if (swatchStr.includes('|')) {
      const [name, color] = swatchStr.split('|');
      return { name: name.trim(), color: color.trim() };
    }
    // Fallback for legacy data or simple names
    return { name: swatchStr, color: swatchStr };
  };

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(product.id);
  const [quantity, setQuantity] = useState(1);
  const [selectedSwatch, setSelectedSwatch] = useState<string | null>(null);
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(0);

  // Sync selection states when product loads or changes
  React.useEffect(() => {
    if (product) {
      if (swatches.length > 0) {
        setSelectedSwatch(swatches[0]);
      } else {
        setSelectedSwatch(null);
      }
      if (packOptions.length > 0) {
        setSelectedPack(packOptions[0]);
      } else {
        setSelectedPack(null);
      }
      setActiveImage(0);
    }
  }, [product?.id, swatches.length, packOptions.length]);

  const galleryRef = useRef<HTMLDivElement>(null);
  const fbtScrollRef = useRef<HTMLDivElement>(null);

  const scrollToImage = (index: number) => {
    setActiveImage(index);
    if (galleryRef.current) {
      const scrollAmount = galleryRef.current.offsetWidth * index;
      galleryRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleGalleryScroll = () => {
    if (galleryRef.current) {
      const index = Math.round(galleryRef.current.scrollLeft / galleryRef.current.offsetWidth);
      if (index !== activeImage) {
        setActiveImage(index);
      }
    }
  };

  const scrollFBT = (direction: 'left' | 'right') => {
    if (fbtScrollRef.current) {
      fbtScrollRef.current.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-20">
      {/* Breadcrumbs */}
      <div className="hidden md:block bg-white py-4 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-sm text-gray-500 font-medium">
          <button onClick={() => onNavigate?.('home')} className="hover:text-gray-900 transition-colors">Home</button>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <button onClick={() => onNavigate?.('category', null)} className="hover:text-gray-900 transition-colors">Products</button>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <span className="text-gray-900 truncate">{title}</span>
        </div>
      </div>

      <motion.div {...fadeInUpProps} className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-2 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-20">
          
          {/* Left: Image Gallery (Side-by-Side Reference Design) */}
          <div className="flex flex-col-reverse md:flex-row gap-4 lg:gap-6 lg:h-[600px] h-auto">
            {/* Vertical Thumbnails (Bottom on mobile, Left on desktop) */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto gap-2 md:gap-3 w-[calc(100%+2rem)] -mx-4 px-4 md:w-20 lg:w-24 shrink-0 pb-2 md:pb-0 pr-2 md:pr-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory scroll-px-4 scroll-smooth overscroll-x-contain">
              {media.map((item: any, i: number) => (
                <div 
                  key={i} 
                  onClick={() => scrollToImage(i)}
                  className={`aspect-square w-16 md:w-full rounded-md md:rounded-lg p-0 cursor-pointer flex items-center justify-center shrink-0 overflow-hidden box-border snap-start transition-all duration-300 relative ${i === activeImage ? 'bg-white border-2 border-[#e31c3d] shadow-sm scale-[1.02]' : 'bg-gray-50 border border-transparent hover:border-gray-200 hover:bg-white'}`}
                >
                  {item.type === 'video' ? (
                    <>
                      <video src={item.url} className="w-full h-full object-cover grayscale-[0.2]" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="w-4 h-4 text-white fill-current" />
                      </div>
                    </>
                  ) : (
                    <img src={item.url} alt="" className="w-full h-full object-cover drop-shadow-sm" />
                  )}
                </div>
              ))}
            </div>

            {/* Main Image Viewport (Now Swipeable) */}
            <div className="relative w-full h-[320px] md:h-auto md:flex-1 bg-gradient-to-br from-gray-50 to-white rounded-lg md:rounded-xl border border-gray-100 shadow-sm group overflow-hidden md:min-h-[400px]">
              {tags && tags.length > 0 && (
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                  {tags.map((tag: any, idx: number) => (
                    <span key={idx} className={`${idx === 0 ? 'bg-[#e31c3d]' : 'bg-purple-700'} text-white text-xs uppercase font-bold px-3 py-1.5 rounded-lg shadow-sm tracking-wide`}>
                      {typeof tag === 'string' ? tag : tag.text}
                    </span>
                  ))}
                </div>
              )}
              
              <button 
                onClick={() => toggleWishlist(product)}
                className={`absolute top-6 right-6 w-11 h-11 bg-white rounded-full flex items-center justify-center border border-gray-100 transition-all z-20 hover:scale-110 ${isWishlisted ? 'text-[#e31c3d] shadow-md' : 'text-gray-400 hover:text-[#e31c3d] hover:shadow-md'}`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              <div 
                ref={galleryRef}
                onScroll={handleGalleryScroll}
                className="w-full h-full flex overflow-x-auto snap-x snap-mandatory overscroll-x-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
              >
                {media.map((item: any, i: number) => (
                  <div key={i} className="min-w-full h-full snap-center snap-normal flex items-center justify-center">
                    {item.type === 'video' ? (
                      <video 
                        src={item.url} 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <img 
                        src={item.url} 
                        alt={`${title} - image ${i + 1}`} 
                        className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105 select-none" 
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Progress Indicator for Mobile */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10 md:hidden">
                {media.map((_: any, i: number) => (
                  <div 
                    key={i} 
                    className={`h-1 rounded-full transition-all duration-300 ${i === activeImage ? 'w-6 bg-[#e31c3d]' : 'w-2 bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <div className="mb-1 md:mb-3 text-xs font-black text-[#e31c3d] uppercase tracking-[0.2em] order-1 md:order-0">{product.brand}</div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-[1.1] mb-2 md:mb-4 tracking-tight drop-shadow-sm order-2 md:order-0">
                  {title}
                </h1>
                <div className="flex items-center gap-3 mb-3 md:mb-6 order-3 md:order-0">
                  <div className="flex items-center bg-green-50 px-3 py-1.5 rounded-md border border-green-100">
                    <div className="flex gap-0.5 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(Number(product.rating || 5)) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-green-700">
                      {Number(product.rating || 5).toFixed(1)} ({product.reviewsCount !== undefined ? product.reviewsCount : (Array.isArray(product.reviews) ? product.reviews.length : (product.reviews || 0))} Reviews)
                    </span>
                  </div>
                  <div className="size-1.5 rounded-full bg-gray-300"></div>
                  <span className={`text-sm font-bold uppercase tracking-wider ${product.status === 'Out of Stock' ? 'text-gray-400' : 'text-[#e31c3d]'}`}>
                    {product.status || 'In Stock'}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 md:gap-4 mb-3 md:mb-8 p-3 md:p-6 rounded-lg md:rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm relative overflow-hidden group max-w-md order-4 md:order-0">
                   <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#e31c3d] opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.05] transition-opacity"></div>
                    <span className="text-2xl md:text-4xl font-black text-[#e31c3d] tracking-tighter">₹{price.toLocaleString('en-IN')}</span>
                   {oldPrice && (
                     <span className="text-lg md:text-xl text-gray-400 line-through decoration-[1.5px] font-medium decoration-gray-300">₹{oldPrice.toLocaleString('en-IN')}</span>
                   )}
                   {oldPrice && (
                     <div className="bg-red-50 text-[#e31c3d] text-[10px] md:text-xs font-extrabold px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-red-100 shadow-sm">
                       SAVE {Math.round(((oldPrice - price) / oldPrice) * 100)}%
                     </div>
                   )}
                </div>

                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-3 md:mb-6 order-5 md:order-0">
                  {shortDesc}
                </p>

            {/* ONLY X PIECES LEFT INDICATOR */}
            {(product.stock > 0 && product.stock <= 20) && (
              <div className="mb-4 md:mb-8 bg-orange-50/50 border border-orange-100 p-3 md:p-4 rounded-xl order-6 md:order-0">
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                  <span className="font-bold text-orange-700">High Demand!</span>
                  <span className="text-gray-700 font-medium ml-1">Only <span className="font-extrabold text-gray-900">{product.stock} pieces</span> left in stock.</span>
                </div>
                <div className="w-full bg-orange-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-orange-500 h-full rounded-full animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" style={{ width: `${Math.max(10, 100 - (product.stock * 5))}%` }}></div>
                </div>
              </div>
            )}


            {/* Delivery Trust Line — All screens, centered */}
            <div className="inline-flex items-center gap-1.5 mb-3 order-9 md:order-0 bg-gray-50 border border-gray-100 rounded-md px-2.5 py-1.5 mx-auto">
              <Star className="w-3 h-3 fill-[#e31c3d] text-[#e31c3d] shrink-0" />
              <span className="text-[10px] font-bold text-gray-600">Delivered by <span className="text-[#e31c3d]">Meesho Partners</span></span>
            </div>



            {/* Important Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-10 order-10 md:order-0">
              <div className="flex flex-row items-center text-left gap-2 md:gap-4 p-2 md:p-4 rounded-lg md:bg-gradient-to-br md:from-white md:to-gray-50 md:border md:border-gray-100 md:shadow-sm group relative overflow-hidden">
                <div className="hidden md:block absolute -right-6 -top-6 w-24 h-24 bg-[#e31c3d] opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.06] transition-opacity"></div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-red-50 flex items-center justify-center text-[#e31c3d] group-hover:scale-110 transition-transform z-10 shrink-0">
                  <Truck className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="z-10 w-full">
                  <h4 className="font-bold text-gray-900 text-xs md:text-sm">Express Delivery</h4>
                  <p className="text-[9px] md:text-xs text-gray-500 leading-snug hidden md:block">Free shipping on all prepaid orders across the country.</p>
                </div>
              </div>

              <div className="flex flex-row items-center text-left gap-2 md:gap-4 p-2 md:p-4 rounded-lg md:bg-gradient-to-br md:from-white md:to-gray-50 md:border md:border-gray-100 md:shadow-sm group relative overflow-hidden">
                <div className="hidden md:block absolute -right-6 -top-6 w-24 h-24 bg-blue-500 opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.06] transition-opacity"></div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform z-10 shrink-0">
                  <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="z-10 w-full">
                  <h4 className="font-bold text-gray-900 text-xs md:text-sm">7-Day Exchanges</h4>
                  <p className="text-[9px] md:text-xs text-gray-500 leading-snug hidden md:block">Easy replacement policy for defective items.</p>
                </div>
              </div>

              <div className="flex flex-row items-center text-left gap-2 md:gap-4 p-2 md:p-4 rounded-lg md:bg-gradient-to-br md:from-white md:to-gray-50 md:border md:border-gray-100 md:shadow-sm group relative overflow-hidden">
                <div className="hidden md:block absolute -right-6 -top-6 w-24 h-24 bg-amber-500 opacity-[0.04] rounded-full blur-2xl group-hover:opacity-[0.08] transition-opacity"></div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform z-10 shrink-0">
                  <Award className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="z-10 w-full">
                  <h4 className="font-bold text-gray-900 text-xs md:text-sm">Top-Rated Quality</h4>
                  <p className="text-[9px] md:text-xs text-gray-500 leading-snug hidden md:block">Crafted from premium durable materials and finishes.</p>
                </div>
              </div>

              <div className="flex flex-row items-center text-left gap-2 md:gap-4 p-2 md:p-4 rounded-lg md:bg-gradient-to-br md:from-white md:to-gray-50 md:border md:border-gray-100 md:shadow-sm group relative overflow-hidden">
                <div className="hidden md:block absolute -right-6 -top-6 w-24 h-24 bg-green-500 opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.06] transition-opacity"></div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform z-10 shrink-0">
                  <Shield className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="z-10 w-full">
                  <h4 className="font-bold text-gray-900 text-xs md:text-sm">100% Genuine</h4>
                  <p className="text-[9px] md:text-xs text-gray-500 leading-snug hidden md:block">Verified and authenticated direct from the manufacturer.</p>
                </div>
              </div>
            </div>

            {/* Product Options (Swatches & Packs) */}
            <div className="flex flex-col gap-3 md:gap-6 mb-3 md:mb-6 order-7 md:order-0">
              {/* Swatches */}
              {swatchesVisible && swatches.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                    Select Color
                    {selectedSwatch && <span className="text-[10px] font-black text-[#e31c3d] bg-red-50 px-2 py-0.5 rounded">{parseSwatch(selectedSwatch).name}</span>}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {swatches.map((colorStr: string, idx: number) => {
                      const { name, color } = parseSwatch(colorStr);
                      const isHexOrRgb = color.toLowerCase().includes('#') || color.toLowerCase().includes('rgb');
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedSwatch(colorStr)}
                          className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${selectedSwatch === colorStr ? 'border-[#e31c3d] scale-110 shadow-md ring-4 ring-red-50' : 'border-transparent hover:scale-105 shadow-sm bg-gray-50'}`}
                          aria-label={`Select color ${name}`}
                        >
                          <div 
                            className={`w-full h-full rounded-full border border-gray-100 ${!isHexOrRgb ? 'flex items-center justify-center' : ''}`}
                            style={{ backgroundColor: isHexOrRgb ? color : undefined }}
                          >
                            {!isHexOrRgb && <span className="text-[8px] font-black uppercase text-center leading-tight px-1">{name.slice(0, 2)}</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pack Options */}
              {packsVisible && packOptions.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Select Pack</h3>
                  <div className="flex md:grid md:grid-cols-3 gap-2 md:gap-3 overflow-x-auto -mx-4 px-4 pb-2 md:pb-0 hide-scrollbar snap-x snap-mandatory scroll-px-4 scroll-smooth overscroll-x-contain">
                    {packOptions.map((pack: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedPack(pack);
                        }}
                        className={`flex-shrink-0 md:flex-shrink p-2.5 px-4 md:p-3 rounded-full md:rounded-xl border-2 transition-all flex flex-row md:flex-col items-center md:items-start gap-2.5 md:gap-1 snap-start ${selectedPack?.label === pack.label ? 'border-[#e31c3d] bg-red-50 shadow-md ring-2 ring-red-50' : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'}`}
                      >
                        <span className={`text-[10px] font-black uppercase tracking-wider whitespace-nowrap ${selectedPack?.label === pack.label ? 'text-[#e31c3d]' : 'text-gray-500'}`}>{pack.label}</span>
                        <div className="flex items-center gap-1.5 md:flex-col md:items-start md:gap-0.5">
                          {pack.price && (
                            <span className="text-xs md:text-sm font-black text-gray-900 whitespace-nowrap">₹{pack.price.toLocaleString('en-IN')}</span>
                          )}
                          {pack.savings && (
                            <span className="text-[8px] md:text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full whitespace-nowrap">Save {pack.savings}</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions (Product Unit Element) */}
            <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-100 p-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] md:relative md:bg-transparent md:border-0 md:p-0 md:shadow-none md:z-0 flex flex-col gap-2 md:gap-4 mb-0 md:mb-8 order-8 md:order-0">
              <div className="bg-gray-50 md:p-2 rounded-lg md:border md:border-gray-100 flex flex-col gap-3">
                <div className="hidden md:flex items-center justify-between px-2 py-1">
                  <span className="text-sm font-bold text-gray-900 uppercase tracking-tight">Quantity</span>
                  <div className="flex items-center bg-white border border-gray-200 rounded-md h-11 w-32 overflow-hidden shadow-sm">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="flex-1 text-center font-bold text-gray-900 h-full flex items-center justify-center border-x border-gray-200 text-sm">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-2 divide-x divide-gray-200 md:divide-x-0 md:gap-3">
                  <button 
                    onClick={() => {
                      const swatchParts = parseSwatch(selectedSwatch || '');
                      const variant = [swatchParts.name, selectedPack?.label].filter(Boolean).join(' / ');
                      const itemPrice = selectedPack?.price || product.price;
                      addToCart({ ...product, price: itemPrice }, quantity, variant || undefined);
                    }}
                    className="flex-1 bg-white border border-gray-200 md:border-gray-200 text-gray-900 font-bold h-12 md:h-12 rounded-lg md:rounded-md flex items-center justify-center gap-2 hover:border-gray-300 hover:shadow-sm transition-all text-xs uppercase tracking-widest"
                  >
                    <ShoppingBag className="w-4 h-4" /> <span className="hidden md:inline">Cart</span>
                  </button>
                  <button 
                    onClick={() => {
                      const swatchParts = parseSwatch(selectedSwatch || '');
                      const variant = [swatchParts.name, selectedPack?.label].filter(Boolean).join(' / ');
                      const itemPrice = selectedPack?.price || product.price;
                      addToCart({ ...product, price: itemPrice }, quantity, variant || undefined);
                      onNavigate?.('checkout');
                    }}
                    className="flex-[2] bg-slate-900 text-white font-black h-12 md:h-12 rounded-lg md:rounded-md hover:bg-black transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-lg"
                  >
                    Buy Now
                  </button>
                  <button 
                    onClick={() => {
                      const swatchParts = parseSwatch(selectedSwatch || '');
                      const variant = [swatchParts.name, selectedPack?.label].filter(Boolean).join(' / ');
                      const itemPrice = selectedPack?.price || product.price;
                      addToCart({ ...product, price: itemPrice }, quantity, variant || undefined);
                      onNavigate?.('checkout', 'cod');
                    }}
                    className="flex-[2] bg-[#e31c3d] text-white font-black h-12 md:h-12 rounded-lg md:rounded-md hover:bg-red-700 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-lg md:hidden"
                  >
                    COD
                  </button>
                </div>
              </div>
              <button 
                onClick={() => {
                  const swatchParts = parseSwatch(selectedSwatch || '');
                  const variant = [swatchParts.name, selectedPack?.label].filter(Boolean).join(' / ');
                  const itemPrice = selectedPack?.price || product.price;
                  addToCart({ ...product, price: itemPrice }, quantity, variant || undefined);
                  onNavigate?.('checkout', 'cod');
                }}
                className="hidden md:flex relative w-full overflow-hidden h-14 rounded-md items-center justify-center gap-3 shadow-[0_8px_30px_rgba(255,152,0,0.3)] hover:shadow-[0_8px_40px_rgba(255,152,0,0.5)] transition-all duration-300 hover:-translate-y-1 border border-orange-400"
              >
                <style>{`
                  @keyframes shimmer {
                    0% { transform: translateX(-150%) skewX(-12deg); }
                    100% { transform: translateX(250%) skewX(-12deg); }
                  }
                `}</style>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-[length:200%_auto] animate-[pulse_2.5s_ease-in-out_infinite]"></div>
                
                {/* Continuous Shimmer effect wrapper */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12" style={{ animation: 'shimmer 2s infinite linear' }}></div>
                </div>

                <div className="relative z-10 flex items-center gap-3">
                  <div className="relative">
                    <img src={codIcon} alt="COD" className="w-6 h-6 object-contain filter brightness-0 invert drop-shadow" />
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-100 opacity-100"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-sm"></span>
                    </span>
                  </div>
                  <span className="text-white font-extrabold text-[17px] tracking-wide drop-shadow-md">Book COD Order</span>
                </div>
              </button>
            </div>



          </div>
        </div>

        {/* Product Details & Reviews Section */}
        <div className="mt-8 md:mt-16">
          <ProductDetailsAndReviews product={product} />
        </div>

        {/* Frequently Bought Together Section */}
        <div className="mt-8 md:mt-20 relative group/fbt">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Frequently Bought Together</h2>
            <div className="hidden md:flex items-center gap-2">
              <button aria-label="Scroll left" onClick={() => scrollFBT('left')} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-300 hover:shadow-sm transition-all shadow-sm">
                <ChevronLeft className="w-5 h-5 pointer-events-none" />
              </button>
              <button aria-label="Scroll right" onClick={() => scrollFBT('right')} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-300 hover:shadow-sm transition-all shadow-sm">
                <ChevronRight className="w-5 h-5 pointer-events-none" />
              </button>
            </div>
          </div>
          <div ref={fbtScrollRef} className="flex gap-2 md:gap-6 pb-6 md:pb-4 overflow-x-auto -mx-4 px-4 snap-x snap-mandatory scroll-px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth overscroll-x-contain">
            {products.filter(p => p.id !== product.id).slice(-8).map((fbtProduct) => (
              <div key={fbtProduct.id} className="w-[180px] md:w-[300px] snap-start shrink-0">
                <ProductCard 
                  product={fbtProduct} 
                  onNavigate={onNavigate || (() => {})} 
                  className="h-full bg-white shadow-sm hover:shadow-md transition-shadow"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-8 md:mt-20 mb-0 md:mb-12">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Related Products</h2>
            <button 
              onClick={() => onNavigate?.('category', null)}
              className="text-[#e31c3d] font-bold hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-1.5 px-4 py-2 rounded-xl border border-transparent hover:border-red-100"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex md:grid md:grid-cols-4 gap-2 md:gap-6 overflow-x-auto md:overflow-visible -mx-4 px-4 pb-6 md:pb-0 snap-x snap-mandatory scroll-px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth overscroll-x-contain">
            {products.filter(p => p.id !== product.id).slice(0, 8).map((relatedProduct) => (
              <div key={relatedProduct.id} className="w-[180px] md:w-auto snap-start shrink-0">
                <ProductCard 
                  product={relatedProduct} 
                  onNavigate={onNavigate || (() => {})} 
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProductDetailsAndReviews = ({ product }: { product: any }) => {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewImages, setNewReviewImages] = useState<string[]>([]);

  const reviewsCount = product.reviewsCount !== undefined ? product.reviewsCount : (Array.isArray(product.reviews) ? product.reviews.length : (product.reviews || 0));
  
  const reviews = Array.isArray(product.reviews) ? product.reviews : [];

  const fullCopy = product.description || null;
  const featureImages = product.featureImages || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-12 lg:gap-16">
      {/* Description Left Side (Larger Space) */}
      <div className="lg:col-span-3">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
        <div className="prose max-w-none text-gray-600 leading-relaxed">
          {fullCopy ? (
            <div 
              className="text-gray-700 leading-relaxed mb-8 rich-text-content"
              dangerouslySetInnerHTML={{ __html: fullCopy }}
            />
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
              <p className="font-medium">Product description is coming soon.</p>
            </div>
          )}

          {featureImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
              {featureImages.map((img: string, i: number) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <img src={img} alt={`Feature ${i+1}`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
          )}
          
        </div>
      </div>

      {/* Reviews Right Side */}
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <button 
            onClick={() => setShowReviewModal(true)}
            className="flex items-center gap-1.5 text-[#e31c3d] font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-red-50 px-3 py-2 rounded-lg transition-all border border-red-100"
          >
            <Upload className="w-3.5 h-3.5" />
            Write Review
          </button>
        </div>
        
        {/* Rating Summary */}
        <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-100 shadow-sm mb-6 md:mb-8">
          <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-gray-900 mb-1 md:mb-2">4.0</div>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {[
                { stars: 5, percent: '70%' },
                { stars: 4, percent: '55%' },
                { stars: 3, percent: '45%' },
                { stars: 2, percent: '32%' },
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-2 text-xs">
                  <span className="w-8 font-medium text-gray-600">{row.stars} ★</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: row.percent }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-3 md:space-y-4">
          {reviews.slice(0, visibleReviews).map((review: any, idx: number) => (
            <div key={idx} className="bg-gray-50 p-3.5 md:p-5 rounded-lg border border-gray-100 transition-all hover:bg-white hover:shadow-sm">
              {/* Enlarged Review Image Gallery */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 md:gap-3 mb-3 md:mb-4 overflow-x-auto scroll-smooth snap-x snap-mandatory overscroll-x-contain hide-scrollbar">
                  {review.images.map((img: string, i: number) => (
                    <div 
                      key={i} 
                      className="size-14 md:size-20 rounded-lg md:rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white cursor-pointer hover:scale-105 transition-transform hover:border-[#e31c3d]"
                      onClick={() => setExpandedImage(img)}
                    >
                      <img src={img} alt="Review" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed font-medium">
                {review.text || review.comment}
              </p>
              
              <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 pt-3 md:pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-50 flex items-center justify-center text-[#e31c3d] font-bold text-xs md:text-sm border border-red-100 shrink-0">
                    {(review.author || review.name || 'U').charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 md:gap-2 mb-1 flex-wrap">
                      <div className="font-bold text-xs md:text-sm text-gray-900 leading-none">{review.author || review.name}</div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'fill-gray-200 text-gray-200'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      <span>{review.date || 'Verified Buyer'}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-green-600">Verified Purchase</span>
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-1.5 text-gray-500 font-bold text-[10px] uppercase tracking-widest hover:text-[#e31c3d] hover:bg-red-50 px-3 py-2 rounded-lg transition-all border border-gray-200 hover:border-red-100">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Helpful ({review.likes || 0})
                </button>
              </div>
            </div>
          ))}
          {visibleReviews < reviews.length && (
            <button 
              onClick={() => setVisibleReviews(prev => prev + 3)}
              className="w-full mt-4 py-3.5 border-2 border-dashed border-gray-200 rounded-md text-gray-600 font-bold hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2"
            >
              Load More Reviews
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
          )}
        </div>
      </div>

      {/* Review Upload Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowReviewModal(false)}
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Write a Review</h3>
              <button onClick={() => setShowReviewModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Rating Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-8 h-8 ${star <= newReviewRating ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Text */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Your Feedback</label>
                <textarea 
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Tell others what you think about this product..."
                  className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#e31c3d] focus:border-transparent transition-all outline-none text-sm resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Upload Photos</label>
                <div className="flex flex-wrap gap-3">
                  {newReviewImages.map((img, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 group">
                      <img src={img} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setNewReviewImages(prev => prev.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <label className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-400">
                    <Plus className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Add Photo</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setNewReviewImages(prev => [...prev, reader.result as string]);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-4">
              <button 
                onClick={() => setShowReviewModal(false)}
                className="flex-1 px-6 py-3 font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // In a real app, this would send data to Supabase
                  alert('Thank you for your review!');
                  setShowReviewModal(false);
                  setNewReviewText('');
                  setNewReviewImages([]);
                  setNewReviewRating(5);
                }}
                disabled={!newReviewText}
                className="flex-[2] px-6 py-3 bg-[#e31c3d] text-white font-black rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
              >
                Submit Review
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Image Modal/Lightbox */}
      {expandedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 sm:p-10"
          onClick={() => setExpandedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            onClick={() => setExpandedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={expandedImage} 
            alt="Expanded view" 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
