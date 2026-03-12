import React from 'react';
import { Hero } from '../components/Hero';
import { CategoryRow } from '../components/CategoryRow';
import { ProductCarouselSection } from '../components/ProductCarouselSection';
import { NewArrivals } from '../components/NewArrivals';
import { VideoShowcase } from '../components/VideoShowcase';
import { CustomerReviews } from '../components/CustomerReviews';
import { FAQSection } from '../components/FAQSection';


export const HomePage = ({ products, categories, customizations, onNavigate }: { products: any[], categories: any[], customizations: any, onNavigate: (path: string, id?: any, categoryName?: string | null) => void }) => {
  const currentProducts = products || [];
  
  // Connect customizations
  const trendingProducts = currentProducts.filter((p: any) => p.isTrending);
  const arrivalProducts = currentProducts.filter((p: any) => p.isNewArrival);

  return (
    <>
      <CategoryRow categories={categories} onNavigate={onNavigate} />
      <Hero slides={customizations.banners} onNavigate={onNavigate} />
      <ProductCarouselSection title="Trending Now" products={trendingProducts} onNavigate={onNavigate} />
      <NewArrivals products={arrivalProducts} onNavigate={onNavigate} />
      <VideoShowcase videos={customizations.videos} onNavigate={onNavigate} />
      <CustomerReviews reviews={customizations.reviews} />
      <FAQSection />
    </>
  );
};
