import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  BookOpen, 
  HeartHandshake, 
  Users, 
  Bell, 
  User, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  LogOut, 
  ShieldCheck,
  Search
} from 'lucide-react';
import { MinistryCrestSVG } from '../vectors/MinistryVectors';

export const Header: React.FC = () => {
  const { 
    roleView, 
    setRoleView, 
    setPublicRoute, 
    setStudentRoute, 
    setAdminRoute,
    theme, 
    toggleTheme,
    showToast 
  } = useApp();
  
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-forest-950/90 backdrop-blur-md border-b border-slate-200 dark:border-forest-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div 
          onClick={() => setRoleView('public')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-2xl bg-forest-800 text-gold-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <MinistryCrestSVG className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-forest-700 dark:group-hover:text-gold-400 transition-colors">
              Lively Stones
            </h1>
            <p className="text-[10px] font-mono text-slate-500 dark:text-forest-300 tracking-wider uppercase font-semibold">
              Discipleship Ecosystem
            </p>
          </div>
        </div>

        {/* Desktop Main Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 font-sans text-xs font-extrabold">
          {roleView === 'public' && (
            <>
              <button 
                onClick={() => setPublicRoute('home')} 
                className="px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-forest-900 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => setPublicRoute('about')} 
                className="px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-forest-900 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => setPublicRoute('teachings')} 
                className="px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-forest-900 transition-colors"
              >
                Teachings
              </button>
              <button 
                onClick={() => setPublicRoute('events')} 
                className="px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-forest-900 transition-colors"
              >
                Events
              </button>
            </>
          )}

          {roleView === 'student' && (
            <>
              <button 
                onClick={() => setStudentRoute('dashboard')} 
                className="px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-forest-900 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => setStudentRoute('journey')} 
                className="px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-forest-900 transition-colors"
              >
                Journey
              </button>
              <button 
                onClick={() => setStudentRoute('community')} 
                className="px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-forest-900 transition-colors"
              >
                Community
              </button>
              <button 
                onClick={() => setStudentRoute('questions')} 
                className="px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-forest-900 transition-colors"
              >
                Q&A
              </button>
            </>
          )}

          {roleView === 'admin' && (
            <>
              <button 
                onClick={() => setAdminRoute('overview')} 
                className="px-3.5 py-2 rounded-xl text-amber-600 dark:text-gold-400 hover:bg-slate-100 dark:hover:bg-forest-900 transition-colors"
              >
                Overview
              </button>
              <button 
                onClick={() => setAdminRoute('students')} 
                className="px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-forest-900 transition-colors"
              >
                Disciples
              </button>
              <button 
                onClick={() => setAdminRoute('teachings')} 
                className="px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-forest-900 transition-colors"
              >
                Teachings
              </button>
              <button 
                onClick={() => setAdminRoute('questions')} 
                className="px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-forest-900 transition-colors"
              >
                Q&A Desk
              </button>
            </>
          )}
        </nav>

        {/* Right Actions & Utilities */}
        <div className="flex items-center gap-2">

          {/* User Auth Portal Button */}
          {roleView === 'public' ? (
            <button
              onClick={() => setRoleView('student')}
              className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-extrabold text-xs tracking-wider uppercase shadow-md transition-all"
            >
              Disciple Portal
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRoleView(roleView === 'admin' ? 'student' : 'admin')}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-forest-700 text-xs font-extrabold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-forest-900 transition-colors hidden sm:block"
              >
                Switch to {roleView === 'admin' ? 'Disciple' : 'Admin'}
              </button>

              <button
                onClick={logout}
                className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-forest-900 transition-colors md:hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-forest-800 bg-white dark:bg-forest-950 p-4 space-y-2 font-sans font-bold text-sm shadow-xl">
          <button 
            onClick={() => { setRoleView('public'); setPublicRoute('home'); setMobileMenuOpen(false); }}
            className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-forest-900"
          >
            Home
          </button>
          <button 
            onClick={() => { setRoleView('student'); setStudentRoute('dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-forest-900"
          >
            Disciple Portal
          </button>
          <button 
            onClick={() => { setRoleView('admin'); setAdminRoute('overview'); setMobileMenuOpen(false); }}
            className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-forest-900 text-gold-500"
          >
            Admin Portal
          </button>
        </div>
      )}
    </header>
  );
};
