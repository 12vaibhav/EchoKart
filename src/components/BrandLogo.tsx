import React from 'react';
import logoUrl from '../Brand Assets/Logo.svg';

export const BrandLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <div className={`relative flex-shrink-0 ${className}`}>
    <img 
      src={logoUrl} 
      alt="EchoKart Logo" 
      className="w-full h-full object-contain filter drop-shadow-md"
    />
  </div>
);
