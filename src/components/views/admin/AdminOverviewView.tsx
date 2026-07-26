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
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
              Admin Leadership Dashboard
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mt-1">
            School of Tyrannus Overview
          </h1>
        </div>

        <button
          onClick={() => setAdminRoute('create-teaching')}
          className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md flex items-center gap-2 transition-all ios-active"
        >
          <Plus className="w-4 h-4" />
          Create New Teaching
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <IOSCard 
          onClick={() => setAdminRoute('teachings')}
          className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/20"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Active Teachings</p>
            <BookOpen className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-white my-2">{teachings.length}</p>
          <p className="text-[11px] text-zinc-500">School of Tyrannus lectures</p>
        </IOSCard>

        <IOSCard 
          onClick={() => setAdminRoute('questions')}
          className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">Q&A Queue</p>
            <HelpCircle className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-white my-2">{unansweredQCount} Unanswered</p>
          <p className="text-[11px] text-zinc-500">Pending mentor response</p>
        </IOSCard>

        <IOSCard 
          onClick={() => setAdminRoute('assignments')}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">Assignments</p>
            <FileText className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-white my-2">{pendingAssignmentsCount} To Review</p>
          <p className="text-[11px] text-zinc-500">Student submissions</p>
        </IOSCard>

        <IOSCard 
          onClick={() => setAdminRoute('share-cards')}
          className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">Share Cards</p>
            <Share2 className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-white my-2">{shareCards.length} Live Cards</p>
          <p className="text-[11px] text-zinc-500">Social graphics generated</p>
        </IOSCard>
      </div>

      {/* Admin Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Unanswered Q&A Desk Teaser */}
        <IOSCard className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              Unanswered Questions Queue
            </h3>
            <button 
              onClick={() => setAdminRoute('questions')}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
            >
              Open Answer Desk →
            </button>
          </div>

          <div className="space-y-3">
            {questions.filter(q => !q.isAnswered).slice(0, 2).map((q) => (
              <div key={q.id} className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-zinc-900 dark:text-white">
                  <span>{q.studentName}</span>
                  <span className="text-[10px] text-zinc-400">{q.timestamp}</span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 font-medium">{q.question}</p>
              </div>
            ))}
          </div>
        </IOSCard>

        {/* Content Management Teaser */}
        <IOSCard className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              Teachings & Telegram Manager
            </h3>
            <button 
              onClick={() => setAdminRoute('teachings')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Manage Curriculum →
            </button>
          </div>

          <div className="space-y-3">
            {teachings.slice(0, 2).map((t) => (
              <div key={t.id} className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 text-xs space-y-1">
                <p className="font-bold text-zinc-900 dark:text-white">{t.title}</p>
                <p className="text-[11px] text-zinc-500">{t.date} • Speaker: {t.speaker}</p>
              </div>
            ))}
          </div>
        </IOSCard>

      </div>

    </div>
  );
};
