import React from 'react';
import { Truck, Calendar, DollarSign, CornerUpLeft, MessageCircle, Shield, Package } from 'lucide-react';

export const CATEGORIES = [];
export const TRENDING_PRODUCTS = [];

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
        a: 'You can initiate a return request by contacting our customer support team via email at supportechokart@gmail.com. Please include your order ID for faster assistance.',
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
        a: 'Once your order is dispatched, You can track order directly from the "Track Order" section on our website.',
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
