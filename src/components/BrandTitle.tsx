import React from 'react';
import brandTitle from '../Brand Assets/Brand Title & Subtitle.svg';

interface BrandTitleProps {
  className?: string;
}

export const BrandTitle: React.FC<BrandTitleProps> = ({ className = "" }) => {
  return (
    <img 
      src={brandTitle} 
      alt="EchoKart Title" 
      className={`block object-contain ${className}`}
    />
  );
};
