import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { CategoryRow } from './components/CategoryRow';
import { ProductCarouselSection } from './components/ProductCarouselSection';
import { NewArrivals } from './components/NewArrivals';
import { VideoShowcase } from './components/VideoShowcase';
import { CustomerReviews } from './components/CustomerReviews';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FAQSection } from './components/FAQSection';
import { supabase } from './lib/supabase';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { CategoryProductsPage } from './pages/CategoryProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AccountPage } from './pages/AccountPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { HelpFAQPage } from './pages/HelpFAQPage';
import { PrivacyPolicyPage } from './pages/policies/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/policies/TermsConditionsPage';
import { RefundCancellationPage } from './pages/policies/RefundCancellationPage';
import { ReturnPolicyPage } from './pages/policies/ReturnPolicyPage';
import { ShippingPolicyPage } from './pages/policies/ShippingPolicyPage';
import { AuthPage } from './pages/AuthPage';

import {
  Search,
  User,
  Heart,
  ShoppingCart,
  MapPin,
  Calendar,
  CornerUpLeft,
  DollarSign,
  Truck,
  Shield,
  MessageCircle,
  Package,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Menu,
  X,
  ArrowRight,
  Play,
  Minus,
  Plus,
  ShieldCheck,
  Filter,
  CreditCard,
  ThumbsUp,
  Check,
  Headphones,
  RotateCcw,
  CheckCircle2,
  Zap,
  Users,
  Award,
  Lock,
  Facebook,
  Chrome,
  Eye,
  EyeOff,
  LogOut,
  Trash2,
  Clock,
  Settings as SettingsIcon,
  History,
  CreditCard as CardIcon,
  CheckCircle as SuccessIcon,
  ShoppingBag
} from 'lucide-react';

// --- Mock Data ---





// --- Components ---


const fadeInUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};


const BrandLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <div className={`relative flex-shrink-0 text-[#e31c3d] ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      {/* Cart body */}
      <path d="M 8 30 L 20 30 Q 25 30 28 38 L 35 65 Q 37 72 45 72 L 78 72" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Wheels */}
      <circle cx="45" cy="83" r="5" fill="currentColor"/>
      <circle cx="70" cy="83" r="5" fill="currentColor"/>
      
      {/* Letter K */}
      <path d="M 42 35 L 42 65 M 42 50 L 58 35 M 45 50 L 65 65" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Arrow Swoosh */}
      <path d="M 12 75 Q 35 55 70 45" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
      <polygon points="65,35 82,45 65,55" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      
      {/* Wifi waves */}
      <path d="M 68 30 Q 78 28 84 38" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M 62 22 Q 78 18 90 34" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M 56 14 Q 78 8 96 30" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  </div>
);


























import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { OrdersManagement } from './pages/dashboard/OrdersManagement';
import { ProductsManagement } from './pages/dashboard/ProductsManagement';
import { CategoriesManagement } from './pages/dashboard/CategoriesManagement';
import { Earnings } from './pages/dashboard/Earnings';
import { Customers } from './pages/dashboard/Customers';
import { Analytics } from './pages/dashboard/Analytics';
import { Promotions } from './pages/dashboard/Promotions';
import { Settings } from './pages/dashboard/Settings';
import { PlaceholderPage } from './pages/dashboard/PlaceholderPage';
import { OrderDetailsPage } from './pages/dashboard/OrderDetailsPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AdminProfilePage } from './pages/AdminProfilePage';

// Helper to sync route with URL
const getRouteFromUrl = () => {
  const path = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  
  if (path === '/' || path === '') return { path: 'home', id: null, categoryName: null, searchQuery: null };
  
  // Dashboard routes usually start with /dashboard
  if (path.startsWith('/dashboard')) {
    const id = searchParams.get('id');
    return { path, id, categoryName: null, searchQuery: null };
  }
  
  const cleanPath = path.replace('/', '');
  return { 
    path: cleanPath, 
    id: searchParams.get('id'), 
    categoryName: searchParams.get('category'), 
    searchQuery: searchParams.get('q') 
  };
};

export default function App() {
  const [route, setRoute] = useState(getRouteFromUrl());

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel for maximum performance
      const [
        { data: productsData, error: productsError },
        { data: categoriesData, error: categoriesError },
        { data: bData, error: bannersError },
        { data: vData, error: videosError },
        { data: rData, error: reviewsError }
      ] = await Promise.all([
        supabase.from('products').select('*, categories(name)'),
        supabase.from('categories').select('*'),
        supabase.from('banners').select('*').order('order', { ascending: true }),
        supabase.from('videos').select('*').order('order', { ascending: true }),
        supabase.from('reviews').select('*').order('created_at', { ascending: false })
      ]);

      if (productsError) throw productsError;
      if (categoriesError) throw categoriesError;
      if (bannersError) throw bannersError;
      if (videosError) throw videosError;
      if (reviewsError) throw reviewsError;

      // Map Supabase product format
      const mappedProducts = productsData?.map(p => ({
        id: p.id,
        title: p.name,
        name: p.name,
        price: p.price,
        oldPrice: p.old_price,
        image: p.main_image_url,
        rating: p.rating,
        reviews: p.reviews || [],
        reviewsCount: p.reviews_count !== undefined && p.reviews_count !== null ? p.reviews_count : (p.reviews?.length || 0),
        stock: p.stock_quantity,
        isTrending: p.is_trending,
        isNewArrival: p.is_new_arrival,
        category: p.categories?.name || 'Uncategorized',
        categoryId: p.category_id,
        status: p.status || 'In Stock',
        tags: p.tags || [],
        description: p.description,
        shortDescription: p.short_description,
        images: p.images || [],
        featureImages: p.feature_images || []
      })) || [];

      // Map Supabase category format
      const mappedCategories = categoriesData?.map(c => ({
        id: c.id,
        title: c.name,
        name: c.name,
        image: c.image_url,
        visible: c.visible,
        isSale: c.is_sale,
        items: 0,
        trend: '0%',
        trendUp: null
      })) || [];

      // Atomic state updates to prevent staggered renders
      setProducts(mappedProducts);
      setCategories(mappedCategories);
      setCustomizations({
        banners: bData?.map(b => ({
          ...b,
          image: b.image_url, // Hero.tsx expects 'image'
          category_name: b.category_name
        })) || [],
        trending: mappedProducts.filter(p => p.isTrending),
        arrivals: mappedProducts.filter(p => p.isNewArrival),
        videos: vData?.map(v => ({
          ...v,
          src: v.video_url,    // VideoShowcase.tsx expects 'src'
          product: v.product_name // VideoShowcase.tsx expects 'product'
        })) || [],
        reviews: rData?.map(r => ({
          ...r,
          text: r.comment || r.text,
          name: r.name || 'Customer',
          product: r.product_name || r.product,
          avatar: r.avatar_url
        })) || [],
      });
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Subscribe to changes for real-time updates
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, fetchData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, fetchData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'banners' }, fetchData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'videos' }, fetchData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, fetchData)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Sync state with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [customizations, setCustomizations] = useState(() => {
    const parse = (key: string) => {
      const val = localStorage.getItem(key);
      if (!val) return [];
      try { return JSON.parse(val); } catch(e) { console.error(`Failed to parse ${key}`, e); return []; }
    };
    return {
      banners: parse('STORE_CUSTOM_BANNERS'),
      trending: parse('STORE_CUSTOM_TRENDING'),
      arrivals: parse('STORE_CUSTOM_ARRIVALS'),
      videos: parse('STORE_CUSTOM_VIDEOS'),
      reviews: parse('STORE_CUSTOM_REVIEWS'),
    };
  });

  // Listener for storage changes (to sync across tabs/components if needed, though here we'll use a reload or direct state pass)
  useEffect(() => {
    const parse = (key: string) => {
      const val = localStorage.getItem(key);
      if (!val) return [];
      try { return JSON.parse(val); } catch(e) { return []; }
    };
    const handleStorageChange = (e?: StorageEvent) => {
      if (!e || e.key === 'STORE_CUSTOM_BANNERS' || e.key === 'STORE_CUSTOM_TRENDING' || e.key === 'STORE_CUSTOM_ARRIVALS' || e.key === 'STORE_CUSTOM_VIDEOS' || e.key === 'STORE_CUSTOM_REVIEWS') {
        setCustomizations({
          banners: parse('STORE_CUSTOM_BANNERS'),
          trending: parse('STORE_CUSTOM_TRENDING'),
          arrivals: parse('STORE_CUSTOM_ARRIVALS'),
          videos: parse('STORE_CUSTOM_VIDEOS'),
          reviews: parse('STORE_CUSTOM_REVIEWS'),
        });
      }
      

    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const navigate = (path: string, id?: any, categoryName?: string | null, searchQuery?: string | null) => {
    // Generate URL
    let url = path === 'home' ? '/' : (path.startsWith('/') ? path : `/${path}`);
    const params = new URLSearchParams();
    if (id) params.set('id', id);
    if (categoryName) params.set('category', categoryName);
    if (searchQuery) params.set('q', searchQuery);
    
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
    
    // Update browser URL
    window.history.pushState({}, '', url);
    
    // Update state
    setRoute({ path, id: id ?? null, categoryName: categoryName ?? null, searchQuery: searchQuery ?? null });
    window.scrollTo(0, 0);
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#e31c3d] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-slate-400">Loading EchoKart...</p>
        </div>
      </div>
    );
  }

  // Check if current route is a dashboard route
  const isDashboard = route.path.startsWith('/dashboard');

  if (isDashboard) {
    return (
      <DashboardLayout currentPath={route.path} onNavigate={navigate}>
        {route.path === '/dashboard' && <DashboardOverview onNavigate={navigate} />}
        {route.path === '/dashboard/orders' && <OrdersManagement onNavigate={navigate} />}
        {route.path === '/dashboard/orders/detail' && <OrderDetailsPage orderId={route.id} onBack={() => navigate('/dashboard/orders')} />}
        {route.path === '/dashboard/products' && <ProductsManagement products={products} onProductsChange={setProducts} />}
        {route.path === '/dashboard/categories' && <CategoriesManagement categories={categories} onCategoriesChange={setCategories} />}
        {route.path === '/dashboard/earnings' && <Earnings />}
        {route.path === '/dashboard/customers' && <Customers />}
        {route.path === '/dashboard/analytics' && <Analytics />}
        {route.path === '/dashboard/promotions' && <Promotions />}
        {route.path === '/dashboard/settings' && <Settings products={products} />}
        {route.path === '/dashboard/profile' && <AdminProfilePage onBack={() => navigate('/dashboard')} />}
        
        {/* Placeholders for other pages */}
        {route.path === '/dashboard/messages' && <PlaceholderPage title="Message Center" />}
        {route.path === '/dashboard/returns' && <PlaceholderPage title="Return Requests" />}
        {route.path === '/dashboard/reviews' && <PlaceholderPage title="Product Reviews" />}
        {route.path === '/dashboard/bugs' && <PlaceholderPage title="Bug Reports" />}
        {route.path === '/dashboard/support' && <PlaceholderPage title="Help & Support" />}
        {route.path === '/dashboard/inventory' && <PlaceholderPage title="Inventory Management" />}
        {route.path === '/dashboard/suppliers' && <PlaceholderPage title="Supplier Integration" />}
        {route.path === '/dashboard/events' && <PlaceholderPage title="Events & Calendar" />}
        
        {/* Fallback */}
        {!['/dashboard', '/dashboard/orders', '/dashboard/products', '/dashboard/categories', '/dashboard/earnings', '/dashboard/customers', '/dashboard/analytics', '/dashboard/promotions', '/dashboard/settings', '/dashboard/messages', '/dashboard/returns', '/dashboard/reviews', '/dashboard/bugs', '/dashboard/support', '/dashboard/inventory', '/dashboard/suppliers', '/dashboard/events', '/dashboard/profile', '/dashboard/orders/detail'].includes(route.path) && <DashboardOverview onNavigate={navigate} />}
      </DashboardLayout>
    );
  }

  return (
    <div className="font-sans text-[#333333] bg-[#ffffff] min-h-screen selection:bg-[#e31c3d] selection:text-white">
      <Header products={products} onNavigate={navigate} />
      <main className="pt-24 md:pt-28">
        {route.path === 'home' && <HomePage products={products} categories={categories} customizations={customizations} onNavigate={navigate} />}
        {route.path === 'category' && <CategoryPage categories={categories} onNavigate={navigate} />}
            {route.path === 'category-products' && <CategoryProductsPage products={products} categories={categories} categoryName={route.categoryName || 'All Products'} initialSearchQuery={route.searchQuery} onNavigate={navigate} />}
            {route.path === 'product' && <ProductDetailPage productId={route.id} products={products} onNavigate={navigate} />}
        {route.path === 'cart' && <CartPage onNavigate={navigate} />}
        {route.path === 'checkout' && <CheckoutPage onNavigate={navigate} />}
        {route.path === 'order-confirmation' && <OrderConfirmationPage onNavigate={navigate} orderId={route.id} />}
        {route.path === 'account' && <AccountPage onNavigate={navigate} initialTab={route.id ?? undefined} />}
        {route.path === 'wishlist' && <AccountPage onNavigate={navigate} initialTab={'wishlist' as any} />}
        {route.path === 'about' && <AboutUsPage />}
        {route.path === 'contact' && <ContactUsPage />}
        {route.path === 'track' && <TrackOrderPage initialOrderId={route.id} />}
        {route.path === 'help' && <HelpFAQPage />}
        {route.path === 'privacy-policy' && <PrivacyPolicyPage />}
        {route.path === 'terms-conditions' && <TermsConditionsPage />}
        {route.path === 'refund-cancellation' && <RefundCancellationPage />}
        {route.path === 'return-policy' && <ReturnPolicyPage />}
        {route.path === 'shipping-policy' && <ShippingPolicyPage />}
        {route.path === 'auth' && <AuthPage onNavigate={navigate} />}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
