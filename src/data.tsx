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
    category: 'Exchanges & Replacements',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We offer a hassle-free 7-day exchange and replacement policy for damaged or defective items. Please note that we do not offer full returns or refunds.',
        icon: <CornerUpLeft className="w-5 h-5 text-[#e31c3d]" />,
      },
      {
        q: 'How do I initiate an exchange?',
        a: 'You can initiate a replacement request by contacting our customer support team via email at supportechokart@gmail.com. Please include your order ID and photos of the issue for faster assistance.',
        icon: <MessageCircle className="w-5 h-5 text-[#e31c3d]" />,
      },
      {
        q: 'When will I receive my replacement?',
        a: 'Once your request is approved and the original item is picked up, your fresh replacement will be dispatched within 48 hours.',
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
  "Seamless Exchanges & Replacements",
  "Complimentary Shipping on All Orders",
  "Secure Cash on Delivery Available"
];
