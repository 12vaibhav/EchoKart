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
import { Newsletter } from './components/Newsletter';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { CategoryProductsPage } from './pages/CategoryProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AccountPage } from './pages/AccountPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { DeliveryReturnsPage } from './pages/DeliveryReturnsPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { HelpFAQPage } from './pages/HelpFAQPage';
import { ImportantPage } from './pages/ImportantPage';
import { WishlistPage } from './pages/WishlistPage';
import { CATEGORIES, TRENDING_PRODUCTS } from './data';
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



const FAQS = [
  {
    category: 'Shipping & Delivery',
    items: [
      {
        q: 'Do you offer free shipping in India?',
        a: 'Yes, we offer free standard shipping on all prepaid and COD orders across India.',
        icon: <Truck className="w-5 h-5 text-[#e31c3d]" />,
      },
      {
        q: 'How long will it take to receive my order?',
        a: 'Standard delivery usually takes 3-7 business days depending on your location in India. Metro cities usually receive orders faster.',
        icon: <Calendar className="w-5 h-5 text-[#e31c3d]" />,
      },
      {
        q: 'Do you offer Cash on Delivery (COD)?',
        a: 'Yes, we offer Cash on Delivery (COD) for most pin codes across India. You can select this option at checkout.',
        icon: <DollarSign className="w-5 h-5 text-[#e31c3d]" />,
      }
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We offer a hassle-free 7-day return policy. If you are not satisfied with your product, you can initiate a return within 7 days of delivery.',
        icon: <CornerUpLeft className="w-5 h-5 text-[#e31c3d]" />,
      },
      {
        q: 'How do I initiate a return?',
        a: 'You can easily initiate a return from your account dashboard or by contacting our customer support team via email or WhatsApp.',
        icon: <MessageCircle className="w-5 h-5 text-[#e31c3d]" />,
      },
      {
        q: 'When will I receive my refund?',
        a: 'Once we receive and inspect your returned item, your refund will be processed within 5-7 business days to your original payment method or bank account.',
        icon: <Shield className="w-5 h-5 text-[#e31c3d]" />,
      },
    ],
  },
  {
    category: 'Order Tracking',
    items: [
      {
        q: 'How can I track my order?',
        a: 'Once your order is dispatched, you will receive a tracking link via SMS and email. You can also track it directly from the "Track Order" section on our website.',
        icon: <Package className="w-5 h-5 text-[#e31c3d]" />,
      }
    ]
  }
];

const MOCK_CART_ITEMS = [
  { ...TRENDING_PRODUCTS[0], quantity: 1, variant: 'Sunset Orange' },
  { ...TRENDING_PRODUCTS[1], quantity: 2, variant: 'Classic Black' },
];

const MOCK_ORDERS = [
  { id: 'ORD-8293', date: 'Mar 05, 2026', status: 'Delivered', total: 3498, items: 2 },
  { id: 'ORD-7124', date: 'Feb 28, 2026', status: 'In Transit', total: 1999, items: 1 },
];

const MOCK_WISHLIST = [
  TRENDING_PRODUCTS[2],
  TRENDING_PRODUCTS[3],
];

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
import { Earnings } from './pages/dashboard/Earnings';
import { Customers } from './pages/dashboard/Customers';
import { Analytics } from './pages/dashboard/Analytics';
import { Promotions } from './pages/dashboard/Promotions';
import { Settings } from './pages/dashboard/Settings';
import { PlaceholderPage } from './pages/dashboard/PlaceholderPage';

// ... existing imports ...

export default function App() {
  const [route, setRoute] = useState<{ path: string, id?: number | null, categoryName?: string | null }>({ path: 'home', id: null, categoryName: null });

  const navigate = (path: string, id?: number | null, categoryName?: string | null) => {
    setRoute({ path, id: id ?? null, categoryName: categoryName ?? null });
    window.scrollTo(0, 0);
  };

  // Check if current route is a dashboard route
  const isDashboard = route.path.startsWith('/dashboard');

  if (isDashboard) {
    return (
      <DashboardLayout currentPath={route.path} onNavigate={navigate}>
        {route.path === '/dashboard' && <DashboardOverview />}
        {route.path === '/dashboard/orders' && <OrdersManagement />}
        {route.path === '/dashboard/products' && <ProductsManagement />}
        {route.path === '/dashboard/earnings' && <Earnings />}
        {route.path === '/dashboard/customers' && <Customers />}
        {route.path === '/dashboard/analytics' && <Analytics />}
        {route.path === '/dashboard/promotions' && <Promotions />}
        {route.path === '/dashboard/settings' && <Settings />}
        
        {/* Placeholders for other pages */}
        {route.path === '/dashboard/messages' && <PlaceholderPage title="Message Center" />}
        {route.path === '/dashboard/returns' && <PlaceholderPage title="Return Requests" />}
        {route.path === '/dashboard/reviews' && <PlaceholderPage title="Product Reviews" />}
        {route.path === '/dashboard/bugs' && <PlaceholderPage title="Bug Reports" />}
        {route.path === '/dashboard/support' && <PlaceholderPage title="Help & Support" />}
        {route.path === '/dashboard/inventory' && <PlaceholderPage title="Inventory Management" />}
        {route.path === '/dashboard/suppliers' && <PlaceholderPage title="Supplier Integration" />}
        {route.path === '/dashboard/categories' && <PlaceholderPage title="Category Management" />}
        {route.path === '/dashboard/events' && <PlaceholderPage title="Events & Calendar" />}
        
        {/* Fallback */}
        {!['/dashboard', '/dashboard/orders', '/dashboard/products', '/dashboard/earnings', '/dashboard/customers', '/dashboard/analytics', '/dashboard/promotions', '/dashboard/settings', '/dashboard/messages', '/dashboard/returns', '/dashboard/reviews', '/dashboard/bugs', '/dashboard/support', '/dashboard/inventory', '/dashboard/suppliers', '/dashboard/categories', '/dashboard/events'].includes(route.path) && <DashboardOverview />}
      </DashboardLayout>
    );
  }

  return (
    <div className="font-sans text-[#333333] bg-[#ffffff] min-h-screen selection:bg-[#e31c3d] selection:text-white">
      <div className="sticky top-0 z-50 flex flex-col">
        <AnnouncementBar />
        <Header onNavigate={navigate} />
      </div>
      <main>
        {route.path === 'home' && <HomePage onNavigate={navigate} />}
        {route.path === 'category' && route.id !== null && <CategoryProductsPage categoryIndex={route.id} onNavigate={navigate} />}
        {route.path === 'category' && route.id === null && <CategoryPage onNavigate={navigate} />}
        {route.path === 'product' && <ProductDetailPage productId={route.id ?? null} onNavigate={navigate} />}
        {route.path === 'cart' && <CartPage onNavigate={navigate} />}
        {route.path === 'checkout' && <CheckoutPage onNavigate={navigate} />}
        {route.path === 'account' && <AccountPage onNavigate={navigate} />}
        {route.path === 'wishlist' && <WishlistPage onNavigate={navigate} />}
        {route.path === 'about' && <AboutUsPage />}
        {route.path === 'contact' && <ContactUsPage />}
        {route.path === 'delivery' && <DeliveryReturnsPage />}
        {route.path === 'track' && <TrackOrderPage />}
        {route.path === 'help' && <HelpFAQPage />}
        {route.path === 'important' && <ImportantPage />}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
