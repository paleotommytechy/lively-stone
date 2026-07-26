import React from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { Send, BookOpen, CheckCircle, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export const SchoolOfTyrannusView: React.FC = () => {
  const { teachings, openTeachingDetail, setRoleView, showToast } = useApp();

  return (
    <div className="space-y-10 pb-16 animate-ios-fade-in">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-zinc-950 text-white rounded-[2.5rem] p-8 sm:p-12 border border-indigo-900/50 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 inline-flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            Discipleship Class
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            School of Tyrannus
          </h1>
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
            Inspired by Apostle Paul’s two-year daily discipleship lecture hall in Ephesus (Acts 19:8-10). Convened by <strong className="text-amber-300">Saint Abraham Babatunde</strong>, this platform structures daily Telegram teachings into a complete discipleship curriculum.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setRoleView('student')}
              className="px-6 py-2.5 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-all ios-active"
            >
              Access Student Experience
            </button>
          </div>
        </div>
      </div>

      {/* Telegram Bridge Integration Feature Showcase */}
      <IOSCard className="bg-blue-500/5 border-blue-500/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Telegram Ministry Channel Connection
              </h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              School of Tyrannus teachings delivered on Telegram are synchronized directly into this structured platform. Take attached quizzes, submit practical assignments, and earn milestone progress seamlessly.
            </p>
          </div>

          <a
            href="https://t.me/LivelyStonesNetwork"
            target="_blank"
            rel="noreferrer"
            onClick={() => showToast('Telegram Channel', 'Redirecting to official Lively Stones Network Telegram channel')}
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shrink-0 shadow-lg shadow-blue-500/20 transition-all ios-active"
          >
            <Send className="w-4 h-4" />
            Join Official Telegram Group
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </IOSCard>

      {/* Teachings Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
          Curriculum & Lectures
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teachings.map((t) => (
            <IOSCard key={t.id} onClick={() => openTeachingDetail(t.id)}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-500/20">
                    {t.pillar} Pillar
                  </span>
                  <span className="text-xs text-zinc-500">{t.duration}</span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                  {t.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2">
                  {t.summary}
                </p>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    By {t.speaker}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openTeachingDetail(t.id);
                    }}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Open Lesson →
                  </button>
                </div>
              </div>
            </IOSCard>
          ))}
        </div>
      </div>

    </div>
  );
};
