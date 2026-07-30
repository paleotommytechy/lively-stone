import React from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { MapPin, Plus, Sparkles, Edit3 } from 'lucide-react';

export const AdminSSGIView: React.FC = () => {
  const { ssgiData, showToast } = useApp();

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            SSGI & Kingdom Impact Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Document outreach campaigns, school invasion stories, and volunteer stats
          </p>
        </div>

        <button
          onClick={() => showToast('SSGI Admin', 'Add new school invasion record modal simulation')}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all ios-active border border-emerald-400/30"
        >
          <Plus className="w-4 h-4" />
          Add School Invasion Log
        </button>
      </div>

      <IOSCard className="bg-gradient-to-r from-slate-950/90 via-slate-900/90 to-emerald-950/80 text-white border-white/20 dark:border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
        <div className="space-y-3">
          <span className="px-3.5 py-1 rounded-full glass-pill text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
            ACTIVE CAMPAIGN DATA
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight">{ssgiData.campaignName}</h2>
          <p className="text-xs text-slate-300 font-mono">{ssgiData.region} • {ssgiData.dateRange}</p>
        </div>
      </IOSCard>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Logged School Stories ({ssgiData.stories.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ssgiData.stories.map((s) => (
            <IOSCard key={s.id} className="space-y-3">
              <img src={s.imageUrl} alt={s.schoolName} className="w-full h-40 object-cover rounded-2xl shadow-md border border-white/10" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{s.schoolName}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">{s.fullStory}</p>
            </IOSCard>
          ))}
        </div>
      </div>
    </div>
  );
};

