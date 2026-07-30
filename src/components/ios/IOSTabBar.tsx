import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Info, 
  BookOpen, 
  FileText, 
  MapPin, 
  Calendar, 
  UserPlus, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  Users, 
  HelpCircle, 
  Share2, 
  BarChart3,
  ShieldAlert,
  Compass
} from 'lucide-react';
import { PublicRoute, StudentRoute, AdminRoute } from '../../types';

export const IOSTabBar: React.FC = () => {
  const { 
    roleView, 
    setRoleView,
    publicRoute, 
    setPublicRoute, 
    studentRoute, 
    setStudentRoute, 
    adminRoute, 
    setAdminRoute 
  } = useApp();

  // Public Navigation
  const publicNav: { id: PublicRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { id: 'tyrannus', label: 'School of Tyrannus', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'teachings', label: 'Teachings', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'impact', label: 'SSGI Impact', icon: <MapPin className="w-4 h-4" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
    { id: 'join', label: 'Join Us', icon: <UserPlus className="w-4 h-4" /> },
  ];

  // Student Navigation
  const studentNav: { id: StudentRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { id: 'journey', label: 'Discipleship', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'teachings', label: 'Teachings', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'attendance', label: 'Attendance', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'community', label: 'Community', icon: <Users className="w-4 h-4" /> },
    { id: 'questions', label: 'Q&A Desk', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'share-cards', label: 'Share Cards', icon: <Share2 className="w-4 h-4" /> },
  ];

  // Admin Navigation
  const adminNav: { id: AdminRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'students', label: 'Students', icon: <Users className="w-4 h-4" /> },
    { id: 'teachings', label: 'Teachings', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'questions', label: 'Q&A Desk', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'share-cards', label: 'Share Cards', icon: <Share2 className="w-4 h-4" /> },
    { id: 'ssgi', label: 'SSGI Admin', icon: <MapPin className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Desktop Navigation & Experience Mode Bar */}
      <nav className="hidden md:block w-full sticky top-[64px] z-30 ios-glass border-b border-white/20 dark:border-white/10 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-2.5 gap-4">
          
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {roleView === 'public' &&
              publicNav.map((item) => {
                const active = publicRoute === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setPublicRoute(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ios-active ${
                      active
                        ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}

            {roleView === 'student' &&
              studentNav.map((item) => {
                const active = studentRoute === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setStudentRoute(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ios-active ${
                      active
                        ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}

            {roleView === 'admin' &&
              adminNav.map((item) => {
                const active = adminRoute === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setAdminRoute(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ios-active ${
                      active
                        ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}
          </div>

          {/* Quick Role View Switcher Segmented Glass Controls */}
          <div className="flex items-center gap-1 p-1 rounded-full glass-pill border border-white/30 dark:border-slate-700 shrink-0">
            <button
              onClick={() => setRoleView('public')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                roleView === 'public'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Public
            </button>
            <button
              onClick={() => setRoleView('student')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                roleView === 'student'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Disciple
            </button>
            <button
              onClick={() => setRoleView('admin')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                roleView === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Admin
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile iOS Floating Bottom Dock */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 p-2 rounded-3xl ios-glass border border-white/30 dark:border-white/15 shadow-2xl shadow-slate-950/20">
        <div className="flex items-center justify-around">
          {roleView === 'public' &&
            publicNav.slice(0, 5).map((item) => {
              const active = publicRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setPublicRoute(item.id)}
                  className={`flex flex-col items-center gap-1 px-2 py-1 rounded-2xl transition-all ios-active ${
                    active 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-500/10 font-extrabold scale-105' 
                      : 'text-slate-500 dark:text-slate-400 font-medium'
                  }`}
                >
                  {item.icon}
                  <span className="text-[10px]">{item.label.split(' ')[0]}</span>
                </button>
              );
            })}

          {roleView === 'student' &&
            studentNav.slice(0, 5).map((item) => {
              const active = studentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setStudentRoute(item.id)}
                  className={`flex flex-col items-center gap-1 px-2 py-1 rounded-2xl transition-all ios-active ${
                    active 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-500/10 font-extrabold scale-105' 
                      : 'text-slate-500 dark:text-slate-400 font-medium'
                  }`}
                >
                  {item.icon}
                  <span className="text-[10px]">{item.label.split(' ')[0]}</span>
                </button>
              );
            })}

          {roleView === 'admin' &&
            adminNav.slice(0, 5).map((item) => {
              const active = adminRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminRoute(item.id)}
                  className={`flex flex-col items-center gap-1 px-2 py-1 rounded-2xl transition-all ios-active ${
                    active 
                      ? 'text-amber-500 dark:text-amber-400 bg-amber-500/10 font-extrabold scale-105' 
                      : 'text-slate-500 dark:text-slate-400 font-medium'
                  }`}
                >
                  {item.icon}
                  <span className="text-[10px]">{item.label.split(' ')[0]}</span>
                </button>
              );
            })}
        </div>
      </div>
    </>
  );
};

