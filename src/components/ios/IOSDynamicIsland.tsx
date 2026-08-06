import React from 'react';
import { useUIStore } from '../../store/useUIStore';
import { Sparkles, X } from 'lucide-react';

export const IOSDynamicIsland: React.FC = () => {
  const { toast, hideToast } = useUIStore();

  if (!toast) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
      <div className="bg-slate-950/90 dark:bg-slate-900/95 text-white rounded-full p-2.5 pl-4 pr-3 shadow-2xl shadow-blue-500/20 border border-white/20 dark:border-slate-700 backdrop-blur-2xl animate-dynamic-island flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-amber-400 flex items-center justify-center text-white shrink-0 shadow-md">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold tracking-wide truncate text-slate-100">
                {toast.title}
              </h4>
              <span className="flex gap-0.5 items-center">
                <span className="w-1 h-3 bg-blue-400 rounded-full animate-pulse" />
                <span className="w-1 h-2 bg-indigo-400 rounded-full animate-pulse delay-75" />
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-300 truncate">
              {toast.message}
            </p>
          </div>
        </div>
        <button
          onClick={hideToast}
          className="w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center shrink-0 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

