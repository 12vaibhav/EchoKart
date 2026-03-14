import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Filter, 
  Search, 
  Grid, 
  List, 
  ChevronDown, 
  Heart, 
  Star, 
  ShoppingBag, 
  X, 
  Check,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';

import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';



const CategoryProductCard = ({ product, onNavigate, viewMode }: { product: any, onNavigate: any, viewMode: 'grid' | 'list', key?: any }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const title = product.name || product.title;
  const image = product.image || (product.images && product.images[0]);
  const oldPrice = product.oldPrice || (product.price * 2);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    onNavigate('product', product.id);
  };

  return (
    <div 
      className={`bg-white rounded-xl md:rounded-2xl p-2.5 md:p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer ${
        viewMode === 'list' ? 'flex gap-3 md:gap-6 items-center' : 'flex flex-col'
      }`}
      onClick={() => onNavigate('product', product.id)}
    >
      {/* Image Container */}
      <div className={`relative bg-[#f8f9fb] rounded-lg md:rounded-xl overflow-hidden flex items-center justify-center p-0 ${
        viewMode === 'list' ? 'w-24 h-24 md:w-48 md:h-48 flex-shrink-0' : 'aspect-square mb-2 md:mb-4'
      }`}>
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className="absolute top-2 right-2 md:top-3 md:right-3 w-7 h-7 md:w-8 md:h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-all z-10 hover:bg-white"
        >
          <Heart className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isWishlisted ? 'fill-[#e31c3d] text-[#e31c3d]' : 'text-gray-400'}`} />
        </button>

        {/* Product Tags/Badges */}
        {(product.badges || product.tags) && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col gap-1 z-10">
            {product.badges && product.badges.slice(0, 1).map((badge: any, i: number) => (
              <span key={i} className={`${badge.color || 'bg-[#e31c3d]'} text-white text-[7px] md:text-[9px] uppercase font-black px-1.5 py-0.5 rounded shadow-sm`}>
                {badge.text}
              </span>
            ))}
            {!product.badges && product.tags && product.tags.slice(0, 1).map((tag: string, i: number) => (
              <span key={`tag-${i}`} className="bg-[#e31c3d] text-white text-[7px] md:text-[9px] uppercase font-black px-1.5 py-0.5 rounded shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className={`flex flex-col ${viewMode === 'list' ? 'flex-1 min-w-0' : ''}`}>
        <h3 className="font-bold text-gray-900 text-xs md:text-lg mb-1 md:mb-2 line-clamp-1 group-hover:text-[#e31c3d] transition-colors">
          {title}
        </h3>

        <div className="flex items-center flex-wrap gap-1.5 md:gap-3 mb-1 md:mb-2">
          <span className="text-[#e31c3d] font-black text-sm md:text-lg">
            ₹{(product.price || 0).toLocaleString('en-IN')}
          </span>
          {product.oldPrice && (
            <div className="flex items-center gap-1">
              <span className="text-gray-400 text-[10px] md:text-sm line-through decoration-gray-300">
                ₹{oldPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[#e31c3d] text-[8px] md:text-sm font-bold bg-red-50 px-1 py-0.5 rounded">
                -{Math.round(((oldPrice - (product.price || 0)) / oldPrice) * 100)}%
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 mb-3 md:mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 ${i < Math.floor(Number(product.rating || 5)) ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'fill-gray-200 text-gray-200'}`} 
              />
            ))}
          </div>
          <span className="text-[10px] md:text-sm text-gray-400 font-bold">
            ({product.reviewsCount !== undefined ? product.reviewsCount : (Array.isArray(product.reviews) ? product.reviews.length : (product.reviews || 0))})
          </span>
        </div>

        {viewMode === 'list' && (
          <p className="text-gray-500 text-[11px] md:text-sm mb-4 line-clamp-2 hidden md:block">
            {product.description || "Experience premium quality with our latest collection. Designed for comfort and style."}
          </p>
        )}

        <div className="flex gap-2 mt-auto">
          <button 
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="flex-1 border border-gray-200 text-gray-600 font-bold py-1.5 md:py-2.5 rounded-lg md:rounded-xl text-[9px] md:text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-1 md:gap-2 active:scale-95"
          >
            <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" /> Add
          </button>
          <button 
            onClick={handleBuyNow}
            className="flex-1 bg-[#e31c3d] text-white font-bold py-1.5 md:py-2.5 rounded-lg md:rounded-xl text-[9px] md:text-sm hover:bg-[#c41835] transition-all shadow-sm hover:shadow-md active:scale-95 uppercase tracking-wider"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};


export const CategoryProductsPage = ({ 
  products: propProducts, 
  categories: propCategories = [], 
  categoryName: propCategoryName, 
  initialSearchQuery = null,
  onNavigate 
}: { 
  products: any[], 
  categories?: any[],
  categoryName?: string, 
  initialSearchQuery?: string | null,
  onNavigate: (path: string, id?: any, categoryName?: string | null) => void 
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(propCategoryName && propCategoryName !== 'All Products' ? propCategoryName : null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery || '');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sync search query from props if it changes
  React.useEffect(() => {
    setSearchQuery(initialSearchQuery || '');
  }, [initialSearchQuery]);

  const allProducts = propProducts || [];

  const filteredProducts = React.useMemo(() => {
    let result = [...allProducts];

    // Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        (p.name || '').toLowerCase().includes(q) || 
        (p.description || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.tags || []).some((t: string) => t.toLowerCase().includes(q))
      );
    }

    // Category Filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    } else if (propCategoryName && propCategoryName !== 'All Products') {
       result = result.filter(p => p.category === propCategoryName);
    }

    // Brand Filter
    if (selectedBrand) {
      result = result.filter(p => (p.brand || 'Echokart') === selectedBrand);
    }

    // Price Filter
    result = result.filter(p => (p.price || 0) <= maxPrice);

    // Rating Filter
    if (selectedRating !== null) {
      result = result.filter(p => Number(p.rating || 0) >= selectedRating);
    }

    // Sort Logic
    result.sort((a, b) => {
      if (sortBy === 'top-rated') return Number(b.rating || 0) - Number(a.rating || 0);
      if (sortBy === 'price') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'newest') return (b.id || 0) - (a.id || 0);
      if (sortBy === 'popular') {
        const aReviews = a.reviewsCount !== undefined ? a.reviewsCount : (Array.isArray(a.reviews) ? a.reviews.length : (a.reviews || 0));
        const bReviews = b.reviewsCount !== undefined ? b.reviewsCount : (Array.isArray(b.reviews) ? b.reviews.length : (b.reviews || 0));
        return bReviews - aReviews;
      }
      return 0;
    });

    return result;
  }, [allProducts, selectedCategory, selectedRating, selectedBrand, maxPrice, sortBy, propCategoryName, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedRating, selectedBrand, maxPrice, sortBy]);


  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="bg-[#f8f9fb] min-h-screen pb-10 md:pb-20">
      <div className="max-w-[1400px] mx-auto px-3 md:px-4 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* Sidebar Filters */}
          <div className={`w-full lg:w-72 flex-shrink-0 space-y-4 md:space-y-8 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between lg:justify-start gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
                  <h2 className="font-bold text-base md:text-lg text-gray-900">Filters</h2>
                </div>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="lg:hidden p-1 bg-gray-50 rounded-full text-gray-400"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4 flex justify-between">
                  <span>Price Range</span>
                  <span className="text-[#e31c3d]">Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
                </h3>
                <input 
                  type="range" 
                  min="0" 
                  max="50000" 
                  step="500"
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#e31c3d]"
                />
                <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wider">
                  <span>₹0</span>
                  <span>₹50,000</span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Category</h3>
                <div className="space-y-3">
                  {propCategories.length > 0 ? (
                    propCategories.map((cat, idx) => {
                      const name = cat.name || cat.title;
                      const count = allProducts.filter(p => p.category === name).length;
                      return (
                        <label 
                          key={cat.id || idx} 
                          className="flex items-center justify-between cursor-pointer group"
                          onClick={() => setSelectedCategory(selectedCategory === name ? null : name)}
                        >
                          <span className={`transition-colors ${selectedCategory === name ? 'text-[#e31c3d] font-bold' : 'text-gray-600 group-hover:text-[#e31c3d]'}`}>{name}</span>
                          <span className="text-gray-400 text-sm bg-gray-50 px-2 py-0.5 rounded-full">{count}</span>
                        </label>
                      );
                    })
                  ) : (
                    <p className="text-xs text-gray-400 italic">No categories found</p>
                  )}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Brands</h3>
                <div className="space-y-3">
                  {(() => {
                    const brands = Array.from(new Set(allProducts.map(p => p.brand || 'Echokart')));
                    return brands.length > 0 ? (
                      brands.map((brand, idx) => {
                        const count = allProducts.filter(p => (p.brand || 'Echokart') === brand).length;
                        return (
                          <label 
                            key={idx} 
                            className="flex items-center justify-between cursor-pointer group"
                            onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedBrand === brand ? 'border-[#e31c3d] bg-red-50' : 'border-gray-300 group-hover:border-[#e31c3d]'}`}>
                                {selectedBrand === brand && <Check className="w-3.5 h-3.5 text-[#e31c3d]" />}
                              </div>
                              <span className={`transition-colors ${selectedBrand === brand ? 'text-[#e31c3d] font-bold' : 'text-gray-600 group-hover:text-[#e31c3d]'}`}>{brand}</span>
                            </div>
                            <span className="text-gray-400 text-sm bg-gray-50 px-2 py-0.5 rounded-full">{count}</span>
                          </label>
                        );
                      })
                    ) : (
                      <p className="text-xs text-gray-400 italic">No brands found</p>
                    );
                  })()}
                </div>
              </div>

              {/* Ratings */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Ratings</h3>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = allProducts.filter(p => Math.floor(Number(p.rating || 0)) >= stars).length;
                    return (
                      <label 
                        key={stars} 
                        className="flex items-center justify-between cursor-pointer group"
                        onClick={() => setSelectedRating(selectedRating === stars ? null : stars)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedRating === stars ? 'border-[#e31c3d] bg-red-50' : 'border-gray-300 group-hover:border-[#e31c3d]'}`}>
                            {selectedRating === stars && <Check className="w-3.5 h-3.5 text-[#e31c3d]" />}
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3.5 h-3.5 ${i < stars ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'fill-gray-200 text-gray-200'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-gray-400 text-sm bg-gray-50 px-2 py-0.5 rounded-full">{count}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Top Bar */}
            <div className="bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-gray-100 mb-4 md:mb-8">
              <div className="flex flex-col gap-4">
                
                <div className="flex items-center justify-between gap-4">
                  {/* Category Name / Search Result */}
                  <div className="flex flex-col min-w-0">
                    {searchQuery ? (
                      <div className="flex items-center gap-2">
                         <h1 className="text-lg md:text-2xl font-bold text-gray-900 truncate">Result: "{searchQuery}"</h1>
                         <button 
                          onClick={() => { setSearchQuery(''); onNavigate('category-products'); }}
                          className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-[#e31c3d] transition-colors shrink-0"
                         >
                           <X size={14} />
                         </button>
                      </div>
                    ) : (
                      <h1 className="text-xl md:text-2xl font-black text-gray-900 truncate tracking-tight">{selectedCategory || propCategoryName || 'All Products'}</h1>
                    )}
                    <span className="text-gray-400 text-[10px] md:text-sm font-bold uppercase tracking-widest mt-0.5">
                      {filteredProducts.length} Results
                    </span>
                  </div>

                  {/* Filter Toggle (Mobile Only) */}
                  <button 
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-gray-900 font-bold text-xs border border-gray-100 active:scale-95 transition-all"
                  >
                    <Filter className="w-3.5 h-3.5" /> Filters
                  </button>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 border-t border-gray-50 pt-4 md:pt-0 md:border-t-0">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full sm:w-auto">
                    {['Top Rated', 'Popular', 'Newest', 'Price'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSortBy(opt.toLowerCase().replace(' ', '-'))}
                        className={`px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                          sortBy === opt.toLowerCase().replace(' ', '-') 
                            ? 'bg-[#e31c3d] text-white shadow-md shadow-red-100' 
                            : 'bg-gray-50 text-gray-400 hover:text-gray-900 border border-gray-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="flex bg-gray-50 p-1 rounded-xl ml-auto border border-gray-100">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'grid' ? 'bg-white text-[#e31c3d] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'list' ? 'bg-white text-[#e31c3d] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <ListIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6' : 'flex flex-col gap-4 md:gap-6'}>
                {paginatedProducts.map((product: any, idx: number) => (
                  <CategoryProductCard 
                    key={product.id + '-' + idx} 
                    product={product} 
                    onNavigate={onNavigate} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-medium transition-all ${
                      currentPage === i + 1 
                        ? 'bg-[#e31c3d] text-white shadow-lg shadow-[#e31c3d]/20' 
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

