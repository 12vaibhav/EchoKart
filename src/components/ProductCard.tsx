import { useWishlist } from '../contexts/WishlistContext';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

export const ProductCard = ({ 
  product, 
  onNavigate, 
  onQuickView, 
  className,
  variant = 'default'
}: { 
  key?: React.Key, 
  product: any, 
  onNavigate: (path: string, id?: any, categoryName?: string | null) => void, 
  onQuickView?: (product: any) => void, 
  className?: string,
  variant?: 'default' | 'category'
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Validation: Check stock if available
    if (product.stock === 0) return;

    setIsAdding(true);
    
    // Simulate a brief delay for a better premium feel and to handle "Adding" state
    await new Promise(resolve => setTimeout(resolve, 600));
    
    addToCart(product);
    
    setIsAdding(false);
    setShowSuccess(true);
    
    // Reset success state after 2 seconds
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const itemPrice = Number(product.price || 0);
  const itemOldPrice = product.oldPrice ? Number(product.oldPrice) : null;
  const isOutOfStock = product.stock === 0;

  return (
    <div 
      onClick={() => onNavigate('product', product.id)} 
      className={`bg-white rounded-[1.2rem] md:rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 group hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col cursor-pointer h-full relative overflow-hidden ${className || 'w-full'}`}
    >
      <div className="relative aspect-square bg-[#f8f9fb] overflow-hidden group/img">
        {/* Wishlist Button - Only for Category Variant */}
        {variant === 'category' && (
          <button 
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
            className="absolute top-2 right-2 md:top-3 md:right-3 z-30 p-1.5 md:p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all active:scale-90"
          >
            <Heart 
              className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isInWishlist(product.id) ? 'fill-[#e31c3d] text-[#e31c3d]' : 'text-slate-400'}`} 
            />
          </button>
        )}

        {/* Product Tags/Badges */}
        <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col gap-1 z-20">
          {isOutOfStock && (
            <span className="bg-slate-800 text-white text-[7px] md:text-[8px] font-black uppercase tracking-wider px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm md:rounded shadow-lg">Out of Stock</span>
          )}
          {(product.badges || product.tags) ? (
            <>
              {product.badges && product.badges.slice(0, 1).map((badge: any, i: number) => (
                <span key={i} className={`bg-black text-white text-[7px] md:text-[8px] font-black uppercase tracking-wider px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm md:rounded shadow-lg`}>
                  {badge.text}
                </span>
              ))}
              {product.tags && product.tags.slice(0, 1).map((tag: string, i: number) => (
                <span key={`tag-${i}`} className="bg-[#e31c3d] text-white text-[7px] md:text-[8px] font-black uppercase tracking-wider px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm md:rounded shadow-lg">
                  {tag}
                </span>
              ))}
            </>
          ) : (
            product.sale && !isOutOfStock && (
               <span className="bg-[#e31c3d] text-white text-[7px] md:text-[8px] font-black uppercase tracking-wider px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm md:rounded shadow-lg">Sale</span>
            )
          )}
        </div>

        <img 
          src={product.image} 
          alt={product.title} 
          className={`w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105 ${isOutOfStock ? 'grayscale opacity-60' : ''}`}
          loading="lazy"
        />

        {/* Quick Add Overlay - Only for Default Variant */}
        {variant === 'default' && (
          <div className="absolute inset-x-2 bottom-2 md:inset-x-3 md:bottom-3 z-30 md:translate-y-4 md:opacity-0 md:group-hover/img:translate-y-0 md:group-hover/img:opacity-100 transition-all duration-300">
            <button 
              disabled={isAdding || isOutOfStock || showSuccess}
              onClick={handleAddToCart}
              className={`w-full font-black py-2 md:py-2.5 rounded md:rounded-lg text-[9px] md:text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all shadow-xl relative overflow-hidden
                ${showSuccess 
                  ? 'bg-green-500 text-white' 
                  : isOutOfStock 
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed opacity-80' 
                    : 'bg-white/95 md:bg-white text-black hover:bg-[#e31c3d] hover:text-white'
                }`}
            >
              <AnimatePresence mode="wait">
                {isAdding ? (
                  <motion.div
                    key="adding"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-1.5"
                  >
                    <Loader2 className="w-3 h-3 animate-spin" /> Adding
                  </motion.div>
                ) : showSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="w-3 h-3" /> Added!
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <ShoppingBag size={11} /> {isOutOfStock ? 'Sold Out' : 'Quick Add'}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-1 p-2.5 md:p-4">
        <h3 className="font-bold text-slate-800 text-[11px] md:text-base mb-1 md:mb-1.5 line-clamp-1 group-hover:text-[#e31c3d] transition-colors leading-tight uppercase tracking-tight">
          {product.title || product.name || 'Product'}
        </h3>
        
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <div className="flex flex-col">
            <span className="text-[#e31c3d] font-black text-sm md:text-lg">
              ₹{itemPrice.toLocaleString('en-IN')}
            </span>
            {itemOldPrice && (
              <span className="text-slate-400 text-[8px] md:text-[10px] line-through font-medium">
                ₹{itemOldPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-0.5 md:gap-1 bg-amber-50/50 px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-lg border border-amber-100/50">
             <Star className="w-2 md:w-3 h-2 md:h-3 fill-amber-400 text-amber-400" />
             <span className="text-[8px] md:text-[10px] font-black text-slate-900">
                {Number(product.rating || 5).toFixed(1)}
             </span>
          </div>
        </div>

        {/* Category Page Specific Actions */}
        {variant === 'category' && (
          <div className="mt-auto pt-3 border-t border-slate-50 flex flex-col gap-1.5">
            <div className="grid grid-cols-2 gap-1.5">
              <button 
                disabled={isAdding || isOutOfStock || showSuccess}
                onClick={handleAddToCart}
                className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-tight flex items-center justify-center gap-1 transition-all
                  ${showSuccess 
                    ? 'bg-green-500 text-white' 
                    : isOutOfStock 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                      : 'bg-black text-white hover:bg-[#e31c3d]'
                  }`}
              >
                {isAdding ? <Loader2 className="w-3 h-3 animate-spin" /> : showSuccess ? <Check className="w-3 h-3" /> : <ShoppingBag size={12} />}
                {showSuccess ? 'Added' : 'Cart'}
              </button>
              <button 
                disabled={isOutOfStock}
                onClick={(e) => { e.stopPropagation(); if(!isOutOfStock) onNavigate('checkout', product.id); }}
                className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-tight flex items-center justify-center gap-1 transition-all
                  ${isOutOfStock 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-[#e31c3d] text-white hover:bg-black shadow-md shadow-red-50'
                  }`}
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
