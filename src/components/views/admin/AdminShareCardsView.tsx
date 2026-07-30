import React from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { Share2, CheckCircle2, Download, Plus } from 'lucide-react';

export const AdminShareCardsView: React.FC = () => {
  const { shareCards, setRoleView, setStudentRoute } = useApp();

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Share Cards & Social Media Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Review and approve teaching insight templates for student social media sharing
          </p>
        </div>

        <button
          onClick={() => {
            setRoleView('student');
            setStudentRoute('share-cards');
          }}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all ios-active border border-amber-400/30"
        >
          <Plus className="w-4 h-4" />
          Open Card Studio
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {shareCards.map((sc) => (
          <IOSCard key={sc.id} className="space-y-3">
            <div className={`aspect-[4/5] rounded-3xl p-5 text-white bg-gradient-to-br ${sc.bgGradient} flex flex-col justify-between text-xs shadow-xl border border-white/20 relative overflow-hidden backdrop-blur-xl`}>
              <p className="font-bold text-[10px] uppercase font-mono text-amber-300 tracking-wider">{sc.headline}</p>
              <p className="font-semibold line-clamp-4 leading-relaxed font-serif italic text-slate-100">"{sc.keyInsight}"</p>
              <p className="text-[10px] font-mono text-cyan-300">{sc.scriptureRef}</p>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-500 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Approved
              </span>
              <span className="text-slate-400 font-medium">{sc.downloadsCount} Downloads</span>
            </div>
          </IOSCard>
        ))}
      </div>
    </div>
  );
};

