import React from 'react';
import { Hero } from '../components/Hero';
import { CategoryRow } from '../components/CategoryRow';
import { ProductCarouselSection } from '../components/ProductCarouselSection';
import { NewArrivals } from '../components/NewArrivals';
import { VideoShowcase } from '../components/VideoShowcase';
import { CustomerReviews } from '../components/CustomerReviews';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { FAQSection } from '../components/FAQSection';
import { Newsletter } from '../components/Newsletter';
import { TRENDING_PRODUCTS } from '../data';

export const HomePage = ({ onNavigate }: { onNavigate: (path: string, id?: number | null) => void }) => {
  return (
    <>
      <CategoryRow onNavigate={onNavigate} />
      <Hero onNavigate={onNavigate} />
      <ProductCarouselSection title="Trending Now" products={TRENDING_PRODUCTS} onNavigate={onNavigate} />
      <NewArrivals onNavigate={onNavigate} />
      <VideoShowcase />
      <CustomerReviews />
      <WhyChooseUs />
      <FAQSection />
      <Newsletter />
    </>
  );
};
