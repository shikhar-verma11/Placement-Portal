import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

interface ToastManagerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastManager: React.FC<ToastManagerProps> = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-[#6A8DFF]" />;
        let border = 'border-[#6A8DFF]/30';

        if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-[#6A8DFF]" />;
          border = 'border-[#6A8DFF]/30';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-[#D9A441]" />;
          border = 'border-[#D9A441]/30';
        } else if (toast.type === 'error') {
          icon = <XCircle className="w-5 h-5 text-[#FF5252]" />;
          border = 'border-[#FF5252]/30';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-[#1F1F1F]/95 backdrop-blur-md border ${border} shadow-2xl transition-all duration-300 animate-slideUp`}
          >
            <div className="shrink-0 mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-heading font-semibold text-[#FAFAFA]">{toast.title}</h4>
              <p className="text-xs font-body text-[#9E9E9E] mt-0.5 leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="shrink-0 p-1 text-[#9E9E9E] hover:text-[#FAFAFA] transition-colors rounded-lg hover:bg-[#282828]"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
