import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useUIStore } from '../../store/useUIStore';
import { 
  Menu, 
  Search, 
  Sun, 
  Moon, 
  Flame, 
  Award, 
  Bell, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { MinistryCrestSVG } from '../vectors/MinistryVectors';

export const StudentHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { student, theme, toggleTheme } = useApp();
  const { user } = useAuth();
  
  const toggleMobileNav = useUIStore(state => state.toggleMobileNav);
  const isMobileNavOpen = useUIStore(state => state.isMobileNavOpen);
  const setSearchOpen = useUIStore(state => state.setSearchOpen);

  // Compute active page title from location
  const pageTitle = React.useMemo(() => {
    const path = location.pathname;
    if (path.includes('/student/dashboard')) return 'Overview & Daily Focus';
    if (path.includes('/student/bible')) return 'Scripture & Exegesis';
    if (path.includes('/student/prayer')) return 'Upper Room Prayer System';
    if (path.includes('/student/onboarding')) return 'Foundation & Orientation';
    if (path.includes('/student/journey')) return 'Discipleship Journey & Roadmap';
    if (path.includes('/student/teachings')) return 'Apostolic Teachings';
    if (path.includes('/student/attendance')) return 'Attendance & Streak Record';
    if (path.includes('/student/events')) return 'Convocations & Gatherings';
    if (path.includes('/student/community')) return 'Community Feed & Testimonies';
    if (path.includes('/student/questions')) return 'Apostolic Q&A Desk';
    if (path.includes('/student/share-cards')) return 'Share Insight Cards';
    return 'Disciple Portal';
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-20 w-full bg-white/80 dark:bg-forest-950/80 backdrop-blur-md border-b border-slate-200 dark:border-forest-800/80 transition-colors font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left Side: Mobile Menu Button & Page Title */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Menu Button (Min 44px touch target) */}
          <button
            onClick={toggleMobileNav}
            aria-label="Open student navigation menu"
            aria-expanded={isMobileNavOpen}
            className="md:hidden w-11 h-11 rounded-2xl bg-slate-100 dark:bg-forest-900 text-slate-700 dark:text-slate-200 hover:text-gold-400 flex items-center justify-center border border-slate-200 dark:border-forest-800 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile Brand Emblem for quick recognition */}
          <div className="flex md:hidden items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-forest-800 text-gold-400 flex items-center justify-center border border-forest-700">
              <MinistryCrestSVG className="w-4 h-4" />
            </div>
          </div>

          {/* Active Page Title & Pillar Breadcrumb */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                {pageTitle}
              </h1>
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 text-[10px] font-mono font-bold border border-forest-700/60">
                {student.currentPillar}
              </span>
            </div>
            <p className="hidden lg:block text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
              School of Tyrannus • Consecrated Discipleship Operating System
            </p>
          </div>
        </div>

        {/* Right Side: Search, Streak Badge, Theme Toggle & Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Search Modal Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-100 dark:bg-forest-900/90 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-forest-800 text-xs font-semibold transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-gold-400"
            title="Search Scripture, Teachings & Prayer Topics (Cmd + K)"
            aria-label="Open Search"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 dark:bg-forest-800 text-slate-600 dark:text-slate-300">
              ⌘K
            </kbd>
          </button>

          {/* Streak Flame Counter */}
          <div 
            onClick={() => navigate('/student/attendance')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/10 dark:bg-forest-900 border border-amber-500/30 text-amber-600 dark:text-gold-400 text-xs font-mono font-bold cursor-pointer hover:scale-105 transition-transform"
            title={`${student.weeklyStreak} Weeks Consecutive Gathering Streak`}
          >
            <Flame className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            <span>{student.weeklyStreak}w</span>
          </div>

          {/* Attendance Rate Pill */}
          <div 
            onClick={() => navigate('/student/attendance')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-500/10 dark:bg-forest-900 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold cursor-pointer hover:scale-105 transition-transform"
            title={`${student.attendanceRate}% Gathering Attendance Rate`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{student.attendanceRate}%</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-forest-900 text-slate-700 dark:text-slate-200 hover:text-gold-400 flex items-center justify-center border border-slate-200 dark:border-forest-800 transition-colors focus-visible:ring-2 focus-visible:ring-gold-400"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-gold-400" />
            ) : (
              <Moon className="w-4 h-4 text-forest-800" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
