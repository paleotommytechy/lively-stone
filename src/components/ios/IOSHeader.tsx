import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sun, 
  Moon, 
  Bell
} from 'lucide-react';

export const IOSHeader: React.FC = () => {
  const { roleView, setRoleView, theme, toggleTheme, student, showToast } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full transition-all ios-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
        
        {/* Left: Black & White Ministry Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => setRoleView('public')}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-black text-sm sm:text-base shadow-sm ios-active border border-zinc-300 dark:border-zinc-700">
            LS
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-xs sm:text-sm text-zinc-900 dark:text-white block leading-tight">
              LIVELY STONES
            </span>
            <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 block leading-tight">
              School of Tyrannus
            </span>
          </div>
        </div>

        {/* Right Controls: Theme Toggle, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 hover:bg-zinc-300 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 transition-all ios-active border border-zinc-300/40 dark:border-zinc-700/40"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Quick Notification Bell */}
          <button
            onClick={() => showToast('School of Tyrannus Notice', 'Next live discipleship gathering convenes this Sunday')}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 hover:bg-zinc-300 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 transition-all ios-active relative border border-zinc-300/40 dark:border-zinc-700/40"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
          </button>

          {/* Student Profile Pill */}
          <div 
            onClick={() => setRoleView('student')}
            className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 border border-zinc-300/40 dark:border-zinc-700/40 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img 
              src={student.avatarUrl} 
              alt={student.name} 
              className="w-6 h-6 rounded-full object-cover border border-black dark:border-white"
            />
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 hidden sm:inline">
              {student.name.split(' ')[0]}
            </span>
          </div>

        </div>

      </div>
    </header>
  );
};
