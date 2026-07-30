import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sun, 
  Moon, 
  Bell,
  Sparkles,
  Zap
} from 'lucide-react';

export const IOSHeader: React.FC = () => {
  const { roleView, setRoleView, theme, toggleTheme, student, showToast } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 ios-glass border-b border-white/20 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
        
        {/* Left: Futuristic Ministry Logo & System Indicator */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setRoleView('public')}>
          <div className="relative group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 dark:from-white dark:to-slate-200 text-white dark:text-slate-950 flex items-center justify-center font-black text-base sm:text-lg shadow-lg shadow-blue-500/20 ios-active border border-white/30 dark:border-slate-800 transition-transform group-hover:scale-105">
              LS
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                LIVELY STONES
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Zap className="w-2.5 h-2.5 animate-pulse" /> ACTS 19:9
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block leading-tight">
              School of Tyrannus
            </span>
          </div>
        </div>

        {/* Center: System Status Pill (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono text-slate-600 dark:text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-wide">SYSTEM: ONLINE</span>
          <span className="text-slate-400 dark:text-slate-600">|</span>
          <span className="capitalize font-sans font-medium text-blue-600 dark:text-blue-400">
            {roleView} Mode
          </span>
        </div>

        {/* Right Controls: Theme Toggle, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl glass-pill hover:bg-white/80 dark:hover:bg-slate-800/80 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all ios-active shadow-sm"
            title="Toggle high-tech theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4.5 h-4.5 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-indigo-600" />
            )}
          </button>

          {/* Quick Notification Bell */}
          <button
            onClick={() => showToast('Apostolic Notice', 'Next live discipleship session convenes this Sunday')}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl glass-pill hover:bg-white/80 dark:hover:bg-slate-800/80 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all ios-active relative shadow-sm"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900" />
          </button>

          {/* Student Profile Pill */}
          <div 
            onClick={() => setRoleView('student')}
            className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full glass-pill hover:bg-white/80 dark:hover:bg-slate-800/80 cursor-pointer transition-all ios-active shadow-sm border border-white/30 dark:border-slate-700"
          >
            <img 
              src={student.avatarUrl} 
              alt={student.name} 
              className="w-7 h-7 rounded-full object-cover shrink-0 ring-2 ring-blue-500/50"
            />
            <div className="hidden sm:block text-left leading-none">
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                {student.name.split(' ')[0]}
              </span>
              <span className="text-[9px] font-mono text-emerald-500 font-semibold block">
                Pillar: {student.currentPillar}
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};

