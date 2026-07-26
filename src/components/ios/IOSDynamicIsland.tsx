import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, CheckCircle, Bell, X } from 'lucide-react';

export const IOSDynamicIsland: React.FC = () => {
  const { toast, hideToast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
      <div className="bg-black/90 dark:bg-zinc-900/95 text-white rounded-full p-2.5 pl-4 pr-3 shadow-2xl border border-zinc-700/60 backdrop-blur-2xl animate-dynamic-island flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold tracking-wide truncate text-zinc-100">
              {toast.title}
            </h4>
            <p className="text-[11px] font-medium text-zinc-400 truncate">
              {toast.message}
            </p>
          </div>
        </div>
        <button
          onClick={hideToast}
          className="w-6 h-6 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center shrink-0 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
