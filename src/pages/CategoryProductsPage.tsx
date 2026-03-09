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
import { TRENDING_PRODUCTS, CATEGORIES } from '../data';

// --- Mock Data for Filters ---
const FILTER_CATEGORIES = [
  { name: 'Accessories', count: 25 },
  { name: 'Appliances', count: 54 },
  { name: 'Bags', count: 78 },
  { name: 'Electronic', count: 42 },
  { name: 'Entertainment', count: 35 },
  { name: 'Induction', count: 64 },
  { name: 'Mobile Phone', count: 92 },
];

const FILTER_BRANDS = [
  { name: 'Samsung', count: 25 },
  { name: 'Apple', count: 54 },
  { name: 'Sony', count: 78 },
  { name: 'LG', count: 42 },
  { name: 'Dell', count: 35 },
  { name: 'Asus', count: 64 },
];

const FILTER_RATINGS = [
  { stars: 5, count: 25 },
  { stars: 4, count: 54 },
  { stars: 3, count: 78 },
  { stars: 2, count: 42 },
  { stars: 1, count: 35 },
];

const CategoryProductCard = ({ product, onNavigate, viewMode }: { product: any, onNavigate: any, viewMode: 'grid' | 'list' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div 
      className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group ${
        viewMode === 'list' ? 'flex gap-6 items-center' : 'flex flex-col'
      }`}
      onClick={() => onNavigate('product', product.id)}
    >
      {/* Image Container */}
      <div className={`relative bg-[#f8f9fb] rounded-xl overflow-hidden flex items-center justify-center p-6 ${
        viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square mb-4'
      }`}>
        <button 
          onClick={(e) => { e.stopPropagation(); setIsWishlisted(!isWishlisted); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm transition-all z-10 hover:bg-gray-50"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#e31c3d] text-[#e31c3d]' : 'text-gray-400'}`} />
        </button>
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className={`flex flex-col ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <h3 className="font-medium text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-[#e31c3d] transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-[#e31c3d] font-bold text-lg">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.oldPrice && (
            <>
              <span className="text-gray-400 text-sm line-through">
                ₹{product.oldPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[#e31c3d] text-sm font-medium bg-red-50 px-2 py-0.5 rounded">
                {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'fill-gray-200 text-gray-200'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-900 font-medium">{product.rating}</span>
          <span className="text-sm text-gray-400">({product.reviews} Reviews)</span>
        </div>

        {viewMode === 'list' && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            Experience premium quality with our latest collection. Designed for comfort and style, this product features high-grade materials and exceptional craftsmanship.
          </p>
        )}

        <div className="flex gap-3 mt-auto">
          <button 
            onClick={(e) => { e.stopPropagation(); }}
            className="flex-1 border border-gray-200 text-gray-600 font-medium py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Add To Cart
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onNavigate('product', product.id); }}
            className="flex-1 bg-[#e31c3d] text-white font-medium py-2.5 rounded-xl text-sm hover:bg-[#c41835] transition-all shadow-sm hover:shadow-md"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export const CategoryProductsPage = ({ categoryIndex, onNavigate }: { categoryIndex?: number, onNavigate: (path: string, id?: number | null) => void }) => {
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryName = categoryIndex !== undefined && CATEGORIES[categoryIndex] ? CATEGORIES[categoryIndex].name : 'All Products';

  // Duplicate products to fill the grid for demo purposes
  const products = [...TRENDING_PRODUCTS, ...TRENDING_PRODUCTS, ...TRENDING_PRODUCTS].slice(0, 8);

  return (
    <div className="bg-[#f8f9fb] min-h-screen pb-20">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-72 flex-shrink-0 space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-gray-900" />
                <h2 className="font-bold text-lg text-gray-900">Filters</h2>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="relative h-1 bg-gray-200 rounded-full mb-6">
                  <div className="absolute left-0 top-0 h-full bg-[#e31c3d] rounded-full w-1/2"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#e31c3d] rounded-full shadow cursor-pointer"></div>
                  <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#e31c3d] rounded-full shadow cursor-pointer"></div>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-900">
                  <span>₹0</span>
                  <span>₹20,000+</span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Category</h3>
                <div className="space-y-3">
                  {FILTER_CATEGORIES.map((cat, idx) => (
                    <label key={idx} className="flex items-center justify-between cursor-pointer group">
                      <span className="text-gray-600 group-hover:text-[#e31c3d] transition-colors">{cat.name}</span>
                      <span className="text-gray-400 text-sm bg-gray-50 px-2 py-0.5 rounded-full">{cat.count}</span>
                    </label>
                  ))}
                  <button className="text-[#e31c3d] text-sm font-medium mt-2 hover:underline">See more</button>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Brands</h3>
                <div className="space-y-3">
                  {FILTER_BRANDS.map((brand, idx) => (
                    <label key={idx} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center group-hover:border-[#e31c3d]">
                          {idx === 1 && <Check className="w-3.5 h-3.5 text-[#e31c3d]" />}
                        </div>
                        <span className="text-gray-600 group-hover:text-[#e31c3d] transition-colors">{brand.name}</span>
                      </div>
                      <span className="text-gray-400 text-sm bg-gray-50 px-2 py-0.5 rounded-full">{brand.count}</span>
                    </label>
                  ))}
                  <button className="text-[#e31c3d] text-sm font-medium mt-2 hover:underline">See more</button>
                </div>
              </div>

              {/* Ratings */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Ratings</h3>
                <div className="space-y-3">
                  {FILTER_RATINGS.map((rating, idx) => (
                    <label key={idx} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center group-hover:border-[#e31c3d]">
                          {idx === 0 && <Check className="w-3.5 h-3.5 text-[#e31c3d]" />}
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${i < rating.stars ? 'fill-[#ff9c1a] text-[#ff9c1a]' : 'fill-gray-200 text-gray-200'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm bg-gray-50 px-2 py-0.5 rounded-full">{rating.count}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Category Name */}
                <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>

                {/* Results Count */}
                <span className="text-gray-500 text-sm font-medium whitespace-nowrap">
                  Showing 1-8 of 86 results
                </span>

                {/* Actions */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm">Sort by:</span>
                    <div className="flex bg-gray-50 p-1 rounded-lg">
                      {['Top Rated', 'Popular', 'Newest', 'Price'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setSortBy(opt.toLowerCase().replace(' ', '-'))}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                            sortBy === opt.toLowerCase().replace(' ', '-') 
                              ? 'bg-white text-[#e31c3d] shadow-sm' 
                              : 'text-gray-500 hover:text-gray-900'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex bg-gray-50 p-1 rounded-lg">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all ${
                        viewMode === 'grid' ? 'bg-white text-[#e31c3d] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all ${
                        viewMode === 'list' ? 'bg-white text-[#e31c3d] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <ListIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {products.map((product, idx) => (
                <CategoryProductCard 
                  key={`${product.id}-${idx}`} 
                  product={product} 
                  onNavigate={onNavigate}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#e31c3d] text-white font-medium shadow-lg shadow-[#e31c3d]/20">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-600 font-medium hover:bg-gray-50 border border-gray-200">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-600 font-medium hover:bg-gray-50 border border-gray-200">3</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-600 font-medium hover:bg-gray-50 border border-gray-200">...</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-600 font-medium hover:bg-gray-50 border border-gray-200">12</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

