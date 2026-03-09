import React from 'react';

export const BrandLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
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
