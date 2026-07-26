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
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            SSGI & Kingdom Impact Manager
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Document outreach campaigns, school invasion stories, and volunteer stats
          </p>
        </div>

        <button
          onClick={() => showToast('SSGI Admin', 'Add new school invasion record modal simulation')}
          className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add School Invasion Log
        </button>
      </div>

      <IOSCard className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-slate-900 text-white border-emerald-900/50 p-6 sm:p-8">
        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            Active Campaign Data
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight">{ssgiData.campaignName}</h2>
          <p className="text-xs text-zinc-300">{ssgiData.region} • {ssgiData.dateRange}</p>
        </div>
      </IOSCard>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
          Logged School Stories ({ssgiData.stories.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ssgiData.stories.map((s) => (
            <IOSCard key={s.id} className="space-y-3">
              <img src={s.imageUrl} alt={s.schoolName} className="w-full h-40 object-cover rounded-xl" />
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{s.schoolName}</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3">{s.fullStory}</p>
            </IOSCard>
          ))}
        </div>
      </div>
    </div>
  );
};
