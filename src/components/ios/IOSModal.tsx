import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface IOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const IOSModal: React.FC<IOSModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-ios-fade-in">
      {/* Backdrop overlay click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal / Bottom Sheet Body */}
      <div 
        className={`
          relative w-full ${maxWidth} 
          ios-glass-card
          rounded-t-[2.5rem] sm:rounded-4xl 
          max-h-[90vh] overflow-y-auto no-scrollbar 
          border-t border-white/40 dark:border-white/20 
          shadow-2xl z-10 animate-ios-slide-up p-6 sm:p-8
        `}
      >
        {/* iOS Pull Handle Bar for Mobile */}
        <div className="w-12 h-1.5 bg-slate-400/40 dark:bg-slate-600/50 rounded-full mx-auto mb-5 sm:hidden" />

        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/20 dark:border-white/10">
          <div>
            {title && (
              <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-pill hover:bg-white/80 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

