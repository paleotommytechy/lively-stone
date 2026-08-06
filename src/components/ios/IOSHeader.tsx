import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useUIStore } from '../../store/useUIStore';
import { 
  Sun, 
  Moon, 
  Bell,
  Home,
  Info,
  Calendar,
  Video,
  BookOpen,
  GraduationCap,
  User,
  FolderDown,
  MessageSquare,
  HelpCircle,
  LogOut,
  BarChart3,
  Users,
  Search
} from 'lucide-react';
import { PublicRoute, StudentRoute, AdminRoute } from '../../types';

export const IOSHeader: React.FC = () => {
  const { 
    roleView, 
    setRoleView, 
    publicRoute, 
    setPublicRoute, 
    studentRoute,
    setStudentRoute,
    adminRoute,
    setAdminRoute,
    student,
    selectedTeachingId,
    teachings,
    theme, 
    toggleTheme, 
    showToast 
  } = useApp();

  const { isAuthenticated, logout } = useAuth();
  const setSearchOpen = useUIStore(state => state.setSearchOpen);

  // If on portal routes (/learn or /admin) and NOT authenticated, hide header completely so ONLY login page shows
  if ((roleView === 'student' || roleView === 'admin') && !isAuthenticated) {
    return null;
  }

  // Public Navigation Links
  const publicNav: { id: PublicRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { id: 'events', label: 'Event', icon: <Calendar className="w-4 h-4" /> },
    { id: 'teachings', label: 'Media', icon: <Video className="w-4 h-4" /> },
  ];

  // Student Portal Navigation Links (The 7 Specified Student Pages)
  const studentNav: { id: StudentRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'teachings', label: 'Course Catalog', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'teaching-detail', label: 'Classroom', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'journey', label: 'User Profile', icon: <User className="w-4 h-4" /> },
    { id: 'share-cards', label: 'Resource Library', icon: <FolderDown className="w-4 h-4" /> },
    { id: 'community', label: 'Community', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'questions', label: 'About / Help', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  // Admin Navigation Links
  const adminNav: { id: AdminRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'students', label: 'Students', icon: <Users className="w-4 h-4" /> },
    { id: 'teachings', label: 'Teachings', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'questions', label: 'Q&A Desk', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'share-cards', label: 'Share Cards', icon: <FolderDown className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 ios-glass border-b border-white/20 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
        
        {/* Left: Ministry Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer shrink-0" 
          onClick={() => {
            setRoleView('public');
            setPublicRoute('home');
          }}
        >
          <div className="relative group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 dark:from-white dark:to-slate-200 text-white dark:text-slate-950 flex items-center justify-center font-black text-base sm:text-lg shadow-lg shadow-blue-500/20 ios-active border border-white/30 dark:border-slate-800 transition-transform group-hover:scale-105">
              LS
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>
          
          <div className="hidden min-[400px]:block">
            <span className="font-extrabold tracking-tight text-base sm:text-lg text-slate-900 dark:text-white leading-none block">
              LIVELY STONES
            </span>
            {roleView === 'student' && (
              <span className="text-[10px] font-mono text-cyan-400 block font-semibold">
                STUDENT PORTAL
              </span>
            )}
            {roleView === 'admin' && (
              <span className="text-[10px] font-mono text-amber-400 block font-semibold">
                ADMIN DESK
              </span>
            )}
          </div>
        </div>

        {/* Center: Navigation Links */}
        {roleView === 'public' && (
          <nav className="hidden sm:flex items-center gap-1.5 sm:gap-2">
            {publicNav.map((item) => {
              const active = publicRoute === item.id;
              const path = item.id === 'home' ? '/' : `/${item.id}`;
              return (
                <Link
                  key={item.id}
                  to={path}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ios-active ${
                    active
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}

        {roleView === 'student' && isAuthenticated && (
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {studentNav.map((item) => {
              const active = studentRoute === item.id;
              const path = item.id === 'teaching-detail' 
                ? `/student/teachings/${selectedTeachingId || teachings[0]?.id || 't-101'}`
                : `/student/${item.id}`;
              return (
                <Link
                  key={item.id}
                  to={path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ios-active ${
                    active
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}

        {roleView === 'admin' && isAuthenticated && (
          <nav className="hidden md:flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {adminNav.map((item) => {
              const active = adminRoute === item.id;
              const path = item.id === 'overview' ? '/admin/dashboard' : `/admin/${item.id}`;
              return (
                <Link
                  key={item.id}
                  to={path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ios-active ${
                    active
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 scale-[1.02]'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Controls: Notifications, Theme, Logout / Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Global Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl glass-pill hover:bg-white/80 dark:hover:bg-slate-800/80 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all ios-active shadow-sm"
            title="Global Search"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Quick Notification Bell */}
          <button
            onClick={() => showToast('Apostolic Notice', 'Next live discipleship session convenes this Sunday')}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl glass-pill hover:bg-white/80 dark:hover:bg-slate-800/80 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all ios-active relative shadow-sm"
            title="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900" />
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl glass-pill hover:bg-white/80 dark:hover:bg-slate-800/80 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-all ios-active shadow-sm"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4.5 h-4.5 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-indigo-600" />
            )}
          </button>

          {/* Logged in User Profile Avatar & Logout Action */}
          {isAuthenticated && (
            <div className="flex items-center gap-2 pl-2 border-l border-white/20 dark:border-slate-800">
              <img 
                src={student.avatarUrl} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500/50"
              />
              <button
                onClick={() => {
                  logout();
                  setRoleView('public');
                  showToast('Logged Out', 'Successfully logged out of portal.');
                }}
                className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all ios-active"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Mobile Navigation Rows */}
      {roleView === 'public' && (
        <div className="sm:hidden flex items-center justify-around py-2 px-3 border-t border-white/10 glass-pill">
          {publicNav.map((item) => {
            const active = publicRoute === item.id;
            const path = item.id === 'home' ? '/' : `/${item.id}`;
            return (
              <Link
                key={item.id}
                to={path}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      {roleView === 'student' && isAuthenticated && (
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto no-scrollbar py-2 px-3 border-t border-white/10 glass-pill">
          {studentNav.map((item) => {
            const active = studentRoute === item.id;
            const path = item.id === 'teaching-detail' 
              ? `/student/teachings/${selectedTeachingId || teachings[0]?.id || 't-101'}`
              : `/student/${item.id}`;
            return (
              <Link
                key={item.id}
                to={path}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
