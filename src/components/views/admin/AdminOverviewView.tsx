import React from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { Users, BookOpen, FileText, HelpCircle, Share2, BarChart3, Plus, ShieldCheck } from 'lucide-react';

export const AdminOverviewView: React.FC = () => {
  const { 
    teachings, 
    assignments, 
    questions, 
    shareCards, 
    setAdminRoute, 
    showToast 
  } = useApp();

  const unansweredQCount = questions.filter(q => !q.isAnswered).length;
  const pendingAssignmentsCount = assignments.filter(a => a.submitted && a.status === 'submitted').length;

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-4 py-1 rounded-full glass-pill text-amber-400 text-xs font-mono font-bold border border-amber-500/30">
              ADMIN MATRIX CONTROL // ACTS 19:9
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            School of Tyrannus Overview
          </h1>
        </div>

        <button
          onClick={() => setAdminRoute('create-teaching')}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all ios-active border border-amber-400/30"
        >
          <Plus className="w-4 h-4" />
          Create New Teaching
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <IOSCard 
          onClick={() => setAdminRoute('teachings')}
          className="border border-blue-500/30"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono font-bold text-blue-500 dark:text-cyan-400 uppercase">Active Teachings</p>
            <BookOpen className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white my-2 font-mono">{teachings.length}</p>
          <p className="text-[11px] text-slate-500 font-mono">School of Tyrannus lectures</p>
        </IOSCard>

        <IOSCard 
          onClick={() => setAdminRoute('questions')}
          className="border border-amber-500/30"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono font-bold text-amber-500 dark:text-amber-400 uppercase">Q&A Queue</p>
            <HelpCircle className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white my-2 font-mono">{unansweredQCount} Unanswered</p>
          <p className="text-[11px] text-slate-500 font-mono">Pending mentor response</p>
        </IOSCard>

        <IOSCard 
          onClick={() => setAdminRoute('assignments')}
          className="border border-indigo-500/30"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono font-bold text-indigo-500 dark:text-indigo-400 uppercase">Assignments</p>
            <FileText className="w-5 h-5 text-indigo-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white my-2 font-mono">{pendingAssignmentsCount} To Review</p>
          <p className="text-[11px] text-slate-500 font-mono">Student submissions</p>
        </IOSCard>

        <IOSCard 
          onClick={() => setAdminRoute('share-cards')}
          className="border border-emerald-500/30"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono font-bold text-emerald-500 dark:text-emerald-400 uppercase">Share Cards</p>
            <Share2 className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white my-2 font-mono">{shareCards.length} Live Cards</p>
          <p className="text-[11px] text-slate-500 font-mono">Social graphics generated</p>
        </IOSCard>
      </div>

      {/* Admin Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Unanswered Q&A Desk Teaser */}
        <IOSCard className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Questions Pending Answer
            </h3>
            <button 
              onClick={() => setAdminRoute('questions')}
              className="text-xs font-bold text-blue-500 hover:underline"
            >
              Open Q&A Desk
            </button>
          </div>

          <div className="space-y-3">
            {questions.slice(0, 2).map((q) => (
              <div key={q.id} className="p-3.5 rounded-2xl glass-pill space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{q.studentName}</span>
                  <span className="text-slate-400 font-mono">{q.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-1">
                  "{q.question}"
                </p>
              </div>
            ))}
          </div>
        </IOSCard>

        {/* SSGI Mission Metrics Banner */}
        <IOSCard className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Kingdom Impact (SSGI Ekiti)
            </h3>
            <button 
              onClick={() => setAdminRoute('ssgi')}
              className="text-xs font-bold text-blue-500 hover:underline"
            >
              Manage SSGI Data
            </button>
          </div>

          <div className="p-4 rounded-3xl glass-pill space-y-2 border border-blue-500/20">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400">Schools Reached</span>
              <span className="font-bold font-mono text-amber-500 dark:text-amber-400">12 High Schools</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400">Students Reached</span>
              <span className="font-bold font-mono text-cyan-400">3,450 Youth</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400">Decisions for Christ</span>
              <span className="font-bold font-mono text-emerald-400">1,120 Souls</span>
            </div>
          </div>
        </IOSCard>

      </div>

    </div>
  );
};
