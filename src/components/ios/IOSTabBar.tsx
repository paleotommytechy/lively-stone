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
  BarChart3
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
    { id: 'journey', label: 'Journey', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'teachings', label: 'Teachings', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'assignments', label: 'Tasks', icon: <FileText className="w-4 h-4" /> },
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
    { id: 'assignments', label: 'Tasks', icon: <FileText className="w-4 h-4" /> },
    { id: 'questions', label: 'Q&A Desk', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'share-cards', label: 'Share Cards', icon: <Share2 className="w-4 h-4" /> },
    { id: 'ssgi', label: 'SSGI Admin', icon: <MapPin className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Desktop Sub-navigation Bar */}
      <nav className="hidden md:block w-full bg-white/70 dark:bg-zinc-900/70 border-b border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2">
          {roleView === 'public' &&
            publicNav.map((item) => {
              const active = publicRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setPublicRoute(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ios-active ${
                    active
                      ? 'bg-[#3B82F6] text-white shadow-md shadow-blue-500/20'
                      : 'text-[#0F172A] dark:text-zinc-300 hover:bg-[#E0ECF8]/70 dark:hover:bg-zinc-800/60'
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
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ios-active ${
                    active
                      ? 'bg-[#3B82F6] text-white shadow-md shadow-blue-500/20'
                      : 'text-[#0F172A] dark:text-zinc-300 hover:bg-[#E0ECF8]/70 dark:hover:bg-zinc-800/60'
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
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ios-active ${
                    active
                      ? 'bg-[#3B82F6] text-white shadow-md shadow-blue-500/20'
                      : 'text-[#0F172A] dark:text-zinc-300 hover:bg-[#E0ECF8]/70 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
        </div>
      </nav>

      {/* Mobile iOS Bottom Floating Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-2 pb-5 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-ios border-t border-zinc-200/60 dark:border-zinc-800/60">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {roleView === 'public' &&
            publicNav.slice(0, 5).map((item) => {
              const active = publicRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setPublicRoute(item.id)}
                  className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all ios-active ${
                    active ? 'text-[#3B82F6] scale-105' : 'text-zinc-500 dark:text-zinc-400'
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
                  className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all ios-active ${
                    active ? 'text-[#3B82F6] scale-105' : 'text-zinc-500 dark:text-zinc-400'
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
                  className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all ios-active ${
                    active ? 'text-[#3B82F6] scale-105' : 'text-zinc-500 dark:text-zinc-400'
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
