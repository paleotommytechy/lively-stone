import React from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { Send, BookOpen, CheckCircle, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export const SchoolOfTyrannusView: React.FC = () => {
  const { teachings, openTeachingDetail, setRoleView, showToast } = useApp();

  return (
    <div className="space-y-10 pb-16 animate-ios-fade-in">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-blue-950/80 text-white rounded-4xl p-8 sm:p-12 border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="px-4 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30 inline-flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            DISCIPLESHIP CLASS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            School of Tyrannus
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Inspired by Apostle Paul’s two-year daily discipleship lecture hall in Ephesus (Acts 19:8-10). Convened by <strong className="text-amber-300">Saint Abraham Babatunde</strong>, this platform structures daily Telegram teachings into a complete discipleship curriculum.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setRoleView('student')}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-xs hover:from-amber-400 hover:to-amber-300 transition-all ios-active shadow-lg shadow-amber-500/20"
            >
              Access Student Experience
            </button>
          </div>
        </div>
      </div>

      {/* Telegram Bridge Integration Feature Showcase */}
      <IOSCard className="border border-blue-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Telegram Ministry Channel Connection
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
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
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Curriculum & Lectures
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teachings.map((t) => (
            <IOSCard key={t.id} onClick={() => openTeachingDetail(t.id)}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-0.5 rounded-full glass-pill text-amber-500 dark:text-amber-300 font-mono font-bold text-xs border border-amber-500/20">
                    {t.pillar} PILLAR
                  </span>
                  <span className="text-xs font-mono text-slate-500">{t.duration}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-500">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                  {t.summary}
                </p>

                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
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

