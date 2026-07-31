import React from 'react';
import { Inbox, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-[#151515]/60 border border-[#3A3A3A] my-4">
      <div className="w-14 h-14 rounded-2xl bg-[#282828] border border-[#3A3A3A] flex items-center justify-center text-[#6A8DFF] mb-4 shadow-inner">
        {icon || <Inbox className="w-7 h-7" />}
      </div>
      <h4 className="text-base font-heading font-semibold text-[#FAFAFA] mb-1">{title}</h4>
      <p className="text-xs font-body text-[#9E9E9E] max-w-md mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-white bg-[#6A8DFF] hover:bg-[#7D9EFF] transition-all shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
