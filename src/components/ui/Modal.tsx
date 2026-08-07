import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
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
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className={`
          relative w-full ${maxWidth} 
          bg-white dark:bg-forest-950
          rounded-t-3xl sm:rounded-3xl 
          max-h-[90vh] overflow-y-auto 
          border border-slate-200 dark:border-forest-800 
          shadow-2xl z-10 p-6 sm:p-8
        `}
      >
        <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-200 dark:border-forest-800">
          <div>
            {title && (
              <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs font-medium text-slate-500 dark:text-forest-300 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-forest-900 hover:bg-slate-200 dark:hover:bg-forest-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export const IOSModal = Modal;
