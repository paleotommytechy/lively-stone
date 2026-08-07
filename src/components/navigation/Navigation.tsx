import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  HeartHandshake, 
  Sparkles, 
  GraduationCap, 
  HelpCircle, 
  Share2, 
  Award,
  Users
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const { roleView, studentRoute, setStudentRoute } = useApp();

  if (roleView !== 'student') return null;

  return (
    <div className="bg-slate-100 dark:bg-forest-900/60 border-b border-slate-200 dark:border-forest-800 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar font-sans text-xs font-extrabold">
        
        <button
          onClick={() => setStudentRoute('dashboard')}
          className={`px-4 py-2 rounded-xl shrink-0 transition-all ${
            studentRoute === 'dashboard'
              ? 'bg-forest-800 text-white shadow-md'
              : 'text-slate-700 dark:text-forest-200 hover:bg-white dark:hover:bg-forest-800/50'
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => setStudentRoute('journey')}
          className={`px-4 py-2 rounded-xl shrink-0 flex items-center gap-1.5 transition-all ${
            studentRoute === 'journey'
              ? 'bg-forest-800 text-white shadow-md'
              : 'text-slate-700 dark:text-forest-200 hover:bg-white dark:hover:bg-forest-800/50'
          }`}
        >
          <Award className="w-4 h-4 text-gold-400" />
          Growth Roadmap
        </button>

        <button
          onClick={() => setStudentRoute('community')}
          className={`px-4 py-2 rounded-xl shrink-0 flex items-center gap-1.5 transition-all ${
            studentRoute === 'community'
              ? 'bg-forest-800 text-white shadow-md'
              : 'text-slate-700 dark:text-forest-200 hover:bg-white dark:hover:bg-forest-800/50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-gold-400" />
          Community Feed
        </button>

        <button
          onClick={() => setStudentRoute('questions')}
          className={`px-4 py-2 rounded-xl shrink-0 flex items-center gap-1.5 transition-all ${
            studentRoute === 'questions'
              ? 'bg-forest-800 text-white shadow-md'
              : 'text-slate-700 dark:text-forest-200 hover:bg-white dark:hover:bg-forest-800/50'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Q&A Desk
        </button>

        <button
          onClick={() => setStudentRoute('attendance')}
          className={`px-4 py-2 rounded-xl shrink-0 flex items-center gap-1.5 transition-all ${
            studentRoute === 'attendance'
              ? 'bg-forest-800 text-white shadow-md'
              : 'text-slate-700 dark:text-forest-200 hover:bg-white dark:hover:bg-forest-800/50'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-400" />
          Attendance & Streak
        </button>

        <button
          onClick={() => setStudentRoute('events')}
          className={`px-4 py-2 rounded-xl shrink-0 flex items-center gap-1.5 transition-all ${
            studentRoute === 'events'
              ? 'bg-forest-800 text-white shadow-md'
              : 'text-slate-700 dark:text-forest-200 hover:bg-white dark:hover:bg-forest-800/50'
          }`}
        >
          <Users className="w-4 h-4 text-gold-400" />
          Gatherings & Events
        </button>

      </div>
    </div>
  );
};
