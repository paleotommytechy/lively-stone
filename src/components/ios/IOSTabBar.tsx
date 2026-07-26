import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  BookOpen, 
  Flame, 
  Calendar, 
  Users, 
  HelpCircle, 
  Share2, 
  Award,
  CheckCircle2,
  FileText,
  BarChart3,
  Globe,
  Settings,
  MapPin,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { PublicRoute, StudentRoute, AdminRoute } from '../../types';

export const IOSTabBar: React.FC = () => {
  const { 
    roleView, 
    publicRoute, 
    setPublicRoute, 
    studentRoute, 
    setStudentRoute, 
    adminRoute, 
    setAdminRoute 
  } = useApp();

  // Public Nav Items
  const publicNav: { id: PublicRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'about', label: 'About', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'tyrannus', label: 'Tyrannus', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'teachings', label: 'Teachings', icon: <FileText className="w-5 h-5" /> },
    { id: 'impact', label: 'SSGI Impact', icon: <MapPin className="w-5 h-5" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-5 h-5" /> },
    { id: 'join', label: 'Join Us', icon: <UserCheck className="w-5 h-5" /> },
  ];

  // Student Nav Items
  const studentNav: { id: StudentRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'journey', label: 'Journey', icon: <Flame className="w-5 h-5" /> },
    { id: 'teachings', label: 'Teachings', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'assignments', label: 'Tasks', icon: <FileText className="w-5 h-5" /> },
    { id: 'attendance', label: 'Attendance', icon: <CheckCircle2 className="w-5 h-5" /> },
    { id: 'community', label: 'Community', icon: <Users className="w-5 h-5" /> },
    { id: 'questions', label: 'Q&A', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'share-cards', label: 'Share Insights', icon: <Share2 className="w-5 h-5" /> },
  ];

  // Admin Nav Items
  const adminNav: { id: AdminRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'students', label: 'Students', icon: <Users className="w-5 h-5" /> },
    { id: 'teachings', label: 'Teachings', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'assignments', label: 'Tasks', icon: <FileText className="w-5 h-5" /> },
    { id: 'questions', label: 'Q&A Desk', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'share-cards', label: 'Share Cards', icon: <Share2 className="w-5 h-5" /> },
    { id: 'ssgi', label: 'SSGI Admin', icon: <MapPin className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Desktop Sub-navigation Bar */}
      <nav className="hidden md:block w-full bg-white/60 dark:bg-zinc-900/60 border-b border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
          {roleView === 'public' &&
            publicNav.map((item) => {
              const active = publicRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setPublicRoute(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ios-active ${
                    active
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
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
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ios-active ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
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
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ios-active ${
                    active
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
        </div>
      </nav>

      {/* Mobile iOS Bottom Floating Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-2 pb-5 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-ios border-t border-zinc-200/60 dark:border-zinc-800/60">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {roleView === 'public' &&
            publicNav.slice(0, 5).map((item) => {
              const active = publicRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setPublicRoute(item.id)}
                  className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-all ios-active ${
                    active ? 'text-blue-600 dark:text-blue-400 scale-105' : 'text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
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
                  className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-all ios-active ${
                    active ? 'text-indigo-600 dark:text-indigo-400 scale-105' : 'text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
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
                  className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-all ios-active ${
                    active ? 'text-amber-600 dark:text-amber-400 scale-105' : 'text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
        </div>
      </div>
    </>
  );
};
