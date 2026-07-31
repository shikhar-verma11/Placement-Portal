import React from 'react';

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="w-full space-y-2 animate-pulse">
      <div className="h-10 bg-[#282828] rounded-lg w-full mb-3 border border-[#3A3A3A]" />
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="h-12 bg-[#1F1F1F] rounded-lg w-full border border-[#3A3A3A]/50 flex items-center px-4 gap-4">
          <div className="h-4 bg-[#282828] rounded w-1/4" />
          <div className="h-4 bg-[#282828] rounded w-1/6" />
          <div className="h-4 bg-[#282828] rounded w-1/5" />
          <div className="h-4 bg-[#282828] rounded w-1/8" />
          <div className="h-4 bg-[#282828] rounded w-1/6 ml-auto" />
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="p-5 rounded-xl bg-[#1F1F1F] border border-[#3A3A3A] animate-pulse space-y-3">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-[#282828] rounded w-1/3" />
        <div className="h-6 w-6 bg-[#282828] rounded-lg" />
      </div>
      <div className="h-8 bg-[#282828] rounded w-1/2" />
      <div className="h-3 bg-[#282828] rounded w-3/4" />
    </div>
  );
};
