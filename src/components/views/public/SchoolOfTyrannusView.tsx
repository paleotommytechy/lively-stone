import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Card } from '../../ui/Card';
import { 
  BookOpen, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Search, 
  Filter,
  GraduationCap,
  Award,
  PlayCircle,
  FileText
} from 'lucide-react';
import { MinistryCrestSVG } from '../../vectors/MinistryVectors';

export const SchoolOfTyrannusView: React.FC = () => {
  const { 
    teachings, 
    openTeachingDetail, 
    setRoleView, 
    setStudentRoute, 
    startQuiz, 
    showToast 
  } = useApp();

  const [selectedPillar, setSelectedPillar] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const pillarsList = ['All', 'Learn', 'Grow', 'Live', 'Serve', 'Disciple', 'Multiply'];

  const filteredTeachings = teachings.filter(t => {
    const matchesPillar = selectedPillar === 'All' || t.pillar.toLowerCase() === selectedPillar.toLowerCase();
    const matchesSearch = searchQuery.trim() === '' || 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPillar && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in text-slate-900 dark:text-slate-100">
      
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-forest-950 text-white p-8 sm:p-12 border border-forest-800 shadow-2xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 text-gold-400 text-xs font-mono font-bold border border-forest-700">
            <MinistryCrestSVG className="w-4 h-4" />
            <span>ACTS 19:8-10 APOSTOLIC LECTURE HALL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            School of Tyrannus
          </h1>

          <p className="text-forest-200 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
            Convened by <strong className="text-gold-400 font-bold">Saint Abraham Babatunde</strong>, this platform structures daily Telegram teachings into a complete discipleship curriculum spanning the 6 growth pillars.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => { setRoleView('student'); setStudentRoute('dashboard'); }}
              className="px-6 py-3 rounded-2xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              Enter Disciple Portal
            </button>
            
            <a
              href="https://t.me/LivelyStonesNetwork"
              target="_blank"
              rel="noreferrer"
              onClick={() => showToast('Telegram Channel', 'Opening official Telegram teaching channel...')}
              className="px-5 py-3 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs flex items-center gap-2 border border-forest-700"
            >
              <Send className="w-4 h-4 text-gold-400" />
              Official Telegram Channel
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* Curriculum Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-800">
        
        {/* Pillar Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {pillarsList.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPillar(p)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedPillar === p
                  ? 'bg-forest-800 text-gold-400 shadow-md'
                  : 'text-slate-600 dark:text-forest-200 hover:bg-white dark:hover:bg-forest-800/60'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teachings & topics..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-forest-950 border border-slate-200 dark:border-forest-800 text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
          />
        </div>
      </div>

      {/* Teachings List Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-forest-700 dark:text-gold-400" />
            Lecture Series & Courses ({filteredTeachings.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTeachings.map((t) => (
            <Card key={t.id} onClick={() => openTeachingDetail(t.id)}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-0.5 rounded-full bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 font-mono font-bold text-xs border border-forest-200 dark:border-forest-800">
                    {t.pillar} PILLAR
                  </span>
                  <span className="text-xs font-mono text-slate-400">{t.duration}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white hover:text-forest-700 dark:hover:text-gold-400 transition-colors">
                  {t.title}
                </h3>
                
                <p className="text-xs text-slate-600 dark:text-forest-200 line-clamp-2 leading-relaxed">
                  {t.summary}
                </p>

                <div className="pt-3 border-t border-slate-200 dark:border-forest-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Speaker: {t.speaker}
                  </span>

                  <div className="flex items-center gap-2">
                    {t.quizId && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startQuiz(t.quizId!);
                        }}
                        className="px-3 py-1 rounded-xl bg-forest-800 text-gold-400 text-xs font-bold hover:bg-forest-700 transition-colors"
                      >
                        Take Quiz
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openTeachingDetail(t.id);
                      }}
                      className="text-xs font-bold text-forest-700 dark:text-gold-400 hover:underline"
                    >
                      Open Lesson →
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
};
