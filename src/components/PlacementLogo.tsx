import React from 'react';

export const PlacementLogo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Glow Ring */}
      <circle cx="50" cy="50" r="45" stroke="url(#logoGrad)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
      
      {/* Connection Nodes */}
      <circle cx="50" cy="18" r="4" fill="#34d399" />
      <circle cx="20" cy="70" r="4" fill="#10b981" />
      <circle cx="80" cy="70" r="4" fill="#06b6d4" />
      
      {/* Network Lines */}
      <path d="M50 18 L20 70 M50 18 L80 70 M20 70 L80 70" stroke="url(#logoGrad)" strokeWidth="1" opacity="0.4" />
      
      {/* Graduation Cap / Mortarboard in the center */}
      <path
        d="M50 32L80 44L50 56L20 44Z"
        fill="url(#logoGrad)"
        stroke="#060f1e"
        strokeWidth="2"
      />
      <path
        d="M32 49V64C32 64 40 70 50 70C60 70 68 64 68 64V49"
        stroke="url(#logoGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M74 46.5V62L77 65.5L80 62V46.5"
        stroke="#34d399"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="80" cy="62" r="1.5" fill="#34d399" />

      <defs>
        <linearGradient id="logoGrad" x1="20" y1="20" x2="80" y2="80">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
};
