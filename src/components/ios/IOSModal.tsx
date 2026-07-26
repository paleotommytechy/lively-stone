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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-ios-fade-in">
      {/* Backdrop overlay click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal / Bottom Sheet Body */}
      <div 
        className={`
          relative w-full ${maxWidth} 
          bg-white dark:bg-[#1C1C1E] 
          rounded-t-[2.5rem] sm:rounded-3xl 
          max-h-[90vh] overflow-y-auto no-scrollbar 
          border border-zinc-200/80 dark:border-zinc-800/80 
          shadow-2xl z-10 animate-ios-slide-up p-6 sm:p-8
        `}
      >
        {/* iOS Pull Handle Bar for Mobile */}
        <div className="w-12 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-auto mb-5 sm:hidden" />

        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            {title && (
              <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-colors"
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
