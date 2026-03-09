import React from 'react';
import { Truck, Calendar, DollarSign, CornerUpLeft, MessageCircle, Shield, Package } from 'lucide-react';

export const CATEGORIES = [
  { name: 'Sale Items', image: '', isSale: true },
  { name: 'Tech Gadgets', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80' },
  { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80' },
  { name: 'Beauty & Health', image: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?w=400&q=80' },
  { name: 'Fitness Gear', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80' },
  { name: 'Car Accessories', image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&q=80' },
  { name: 'Pet Supplies', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80' },
  { name: 'Travel Essentials', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80' },
];

export const TRENDING_PRODUCTS = [
  {
    id: 1,
    title: 'Sunset Projection Lamp',
    brand: 'Echokart',
    price: 1999,
    oldPrice: 3999,
    image: 'https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=800&q=80',
    badges: [
      { text: 'Hot Selling', color: 'bg-[#e31c3d]' },
      { text: 'Discount Upto 50%', color: 'bg-purple-700' },
    ],
    rating: 5,
    reviews: 1284,
    stock: 384,
    swatches: ['#ff4500', '#ff8c00', '#ffd700'],
  },
  {
    id: 2,
    title: 'Smart Posture Corrector',
    brand: 'Echokart',
    price: 1499,
    oldPrice: 2999,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    badges: [{ text: 'Hot Selling', color: 'bg-[#e31c3d]' }],
    rating: 4,
    reviews: 852,
    stock: 192,
    swatches: ['#000000', '#ffffff'],
  },
  {
    id: 3,
    title: 'Portable Fresh Juice Blender',
    brand: 'Echokart',
    price: 2499,
    oldPrice: 4999,
    image: 'https://images.unsplash.com/photo-1623366302587-bca348126b3a?w=800&q=80',
    badges: [
      { text: 'New', color: 'bg-[#00c853]' },
      { text: 'Discount Upto 50%', color: 'bg-purple-700' },
    ],
    rating: 5,
    reviews: 431,
    stock: 95,
    swatches: ['#ff69b4', '#87ceeb', '#ffffff'],
  },
  {
    id: 4,
    title: 'Astronaut Galaxy Projector',
    brand: 'Echokart',
    price: 3499,
    oldPrice: 6999,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80',
    badges: [{ text: 'Hot Selling', color: 'bg-[#e31c3d]' }],
    rating: 5,
    reviews: 2105,
    stock: 96,
    swatches: [],
  },
  {
    id: 5,
    title: 'Crystal Hair Eraser',
    brand: 'Echokart',
    price: 999,
    oldPrice: 1999,
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    badges: [{ text: 'New', color: 'bg-[#00c853]' }],
    rating: 4,
    reviews: 3402,
    stock: 7,
    lowStock: true,
    swatches: ['#ffb6c1', '#dda0dd', '#87cefa'],
  },
  {
    id: 6,
    title: 'Smart Neck Massager',
    brand: 'Echokart',
    price: 2999,
    oldPrice: 5999,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    badges: [{ text: 'Hot Selling', color: 'bg-[#e31c3d]' }],
    rating: 5,
    reviews: 156,
    stock: 45,
    swatches: ['#ffffff', '#000000'],
  },
  {
    id: 7,
    title: 'Volcano Humidifier',
    brand: 'Echokart',
    price: 1999,
    oldPrice: 3499,
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&q=80',
    badges: [{ text: 'New', color: 'bg-[#00c853]' }],
    rating: 4,
    reviews: 89,
    stock: 120,
    swatches: [],
  },
  {
    id: 8,
    title: 'Wireless Car Charger',
    brand: 'Echokart',
    price: 1799,
    oldPrice: 2999,
    image: 'https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?w=800&q=80',
    badges: [{ text: 'Hot Selling', color: 'bg-[#e31c3d]' }],
    rating: 5,
    reviews: 234,
    stock: 65,
    swatches: ['#000000'],
  },
];

export const FAQS = [
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

export const ANNOUNCEMENTS = [
  "Enjoy Hassle-Free Returns & Exchanges",
  "Complimentary Shipping on All Orders",
  "Secure Cash on Delivery Available"
];
