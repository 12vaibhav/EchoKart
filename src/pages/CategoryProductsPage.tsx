import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Filter, 
  Search, 
  ChevronDown, 
  Star, 
  X, 
  Check
} from 'lucide-react';

import { ProductCard } from '../components/ProductCard';


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
  const viewMode = 'grid'; // Defaulting to grid view
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

  // Filter panel contents - shared between desktop sidebar and mobile drawer
  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
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
          className="w-full h-1.5 bg-gray-200 rounded-md appearance-none cursor-pointer accent-[#e31c3d]"
        />
        <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wider">
          <span>₹0</span>
          <span>₹50,000</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
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
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
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
        <h3 className="font-semibold text-gray-900 mb-3">Ratings</h3>
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
  );

  return (
    <div className="bg-[#f8f9fb] min-h-screen pb-10 md:pb-20">
      <div className="max-w-[1400px] mx-auto px-3 md:px-4 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 sticky top-28">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-gray-900" />
                <h2 className="font-bold text-lg text-gray-900">Filters</h2>
              </div>
              <FilterPanel />
            </div>
          </div>

          {/* Mobile Filter Bottom Sheet Drawer */}
          <AnimatePresence>
            {isFilterOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                  onClick={() => setIsFilterOpen(false)}
                />
                {/* Drawer */}
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[85vh] flex flex-col"
                >
                  {/* Drawer Handle */}
                  <div className="flex-shrink-0 flex flex-col items-center pt-3 pb-2">
                    <div className="w-10 h-1 bg-gray-200 rounded-full" />
                  </div>

                  {/* Drawer Header */}
                  <div className="flex-shrink-0 flex items-center justify-between px-5 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-900" />
                      <h2 className="font-bold text-base text-gray-900">Filters</h2>
                    </div>
                    <button 
                      onClick={() => setIsFilterOpen(false)}
                      className="p-1.5 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Scrollable Filter Content */}
                  <div className="flex-1 overflow-y-auto px-5 py-4">
                    <FilterPanel />
                  </div>

                  {/* Apply Button */}
                  <div className="flex-shrink-0 p-4 border-t border-gray-100 bg-white">
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="w-full bg-[#e31c3d] text-white font-black py-3 rounded-xl text-sm uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-[#e31c3d]/20"
                    >
                      Apply Filters ({filteredProducts.length} results)
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Top Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-4 md:mb-8 overflow-hidden">
              {/* Row 1: Title + Filter button */}
              <div className="flex items-center justify-between gap-4 p-3 md:p-4">
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

                {/* Filter Toggle Button (Mobile Only) */}
                <button 
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-gray-900 font-bold text-xs border border-gray-200 active:scale-95 transition-all shrink-0"
                >
                  <Filter className="w-3.5 h-3.5" />
                  Filters
                </button>
              </div>

              {/* Row 2: Sort Pills — edge-to-edge scrollable strip */}
              <div className="border-t border-gray-50">
                <div
                  style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
                  className="flex flex-row flex-nowrap items-center gap-2 overflow-x-auto px-3 md:px-4 py-2.5 hide-scrollbar snap-x"
                >
                  {['Top Rated', 'Popular', 'Newest', 'Price'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSortBy(opt.toLowerCase().replace(' ', '-'))}
                      className={`flex-none snap-start px-4 py-1.5 rounded-md text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                        sortBy === opt.toLowerCase().replace(' ', '-') 
                          ? 'bg-[#e31c3d] text-white shadow-md shadow-red-100' 
                          : 'bg-gray-50 text-gray-500 hover:text-gray-900 border border-gray-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                  {/* Trailing spacer so last pill isn't flush to edge */}
                  <div className="flex-none w-1" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6' : 'flex flex-col gap-4 md:gap-6'}>
                {paginatedProducts.map((product: any, idx: number) => (
                  <ProductCard 
                    key={product.id + '-' + idx} 
                    product={product} 
                    onNavigate={onNavigate} 
                    variant="category"
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
                    className={`w-10 h-10 flex items-center justify-center rounded-md font-medium transition-all ${
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
