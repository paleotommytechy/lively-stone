import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { Search, Filter, BookOpen, Send, Play, CheckCircle2 } from 'lucide-react';
import { PillarStage } from '../../../types';

export const TeachingsPublicView: React.FC = () => {
  const { teachings, openTeachingDetail, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<string>('All');

  const pillarsList = ['All', 'Learn', 'Grow', 'Live', 'Serve', 'Disciple', 'Multiply'];

  const filteredTeachings = teachings.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPillar = selectedPillar === 'All' || t.pillar === selectedPillar;
    return matchesSearch && matchesPillar;
  });

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in">
      
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          School of Tyrannus Teachings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Browse apostolic lectures, scriptures, and Telegram study archives by Saint Abraham Babatunde
        </p>
      </div>

      {/* Search & iOS Filter Pills */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search teachings by title, topic, or scripture..."
            className="w-full pl-11 pr-4 py-3 rounded-full glass-input text-sm font-medium text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {pillarsList.map((p) => {
            const active = selectedPillar === p;
            return (
              <button
                key={p}
                onClick={() => setSelectedPillar(p)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all ios-active ${
                  active
                    ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md shadow-blue-500/20'
                    : 'glass-pill text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {p} {p !== 'All' && 'PILLAR'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Teachings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTeachings.map((t) => (
          <IOSCard key={t.id} onClick={() => openTeachingDetail(t.id)}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="px-3 py-0.5 rounded-full glass-pill text-amber-500 dark:text-amber-300 font-mono font-bold border border-amber-500/20">
                  {t.pillar}
                </span>
                <span className="text-slate-400 font-mono font-medium">{t.date}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white hover:text-blue-500 transition-colors">
                {t.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {t.summary}
              </p>

              {/* Scriptures preview */}
              {t.scriptures && t.scriptures.length > 0 && (
                <div className="p-3.5 rounded-2xl glass-pill border border-white/20 dark:border-white/10 text-xs italic text-slate-700 dark:text-slate-300">
                  "{t.scriptures[0].text.substring(0, 100)}..." — <strong>{t.scriptures[0].book} {t.scriptures[0].chapter}:{t.scriptures[0].verse}</strong>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <a
                  href={t.telegramMessageUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast('Telegram Message', 'Opening Telegram message simulation');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-pill text-blue-600 dark:text-cyan-300 text-xs font-bold border border-blue-500/20 hover:bg-blue-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  Telegram Link
                </a>

                <button
                  onClick={() => openTeachingDetail(t.id)}
                  className="text-xs font-bold text-slate-900 dark:text-white hover:underline"
                >
                  View Details →
                </button>
              </div>
            </div>
          </IOSCard>
        ))}
      </div>

    </div>
  );
};

