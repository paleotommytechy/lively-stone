import React from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { MapPin, Users, BookOpen, HeartHandshake, Sparkles, Info } from 'lucide-react';

export const KingdomImpactView: React.FC = () => {
  const { ssgiData } = useApp();

  return (
    <div className="space-y-10 pb-16 animate-ios-fade-in">
      
      {/* Prototype Data Warning Banner */}
      <div className="flex items-center gap-3 p-4 rounded-2xl glass-pill border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-medium backdrop-blur-xl">
        <Info className="w-5 h-5 shrink-0 text-amber-500" />
        <div>
          <span className="font-mono font-bold uppercase tracking-wide">PROTOTYPE DATA NOTICE: </span>
          The statistics below represent demonstration data for the School of Tyrannus prototype. Verified outreach metrics will be updated by ministry administrators.
        </div>
      </div>

      {/* Main SSGI Banner */}
      <div className="bg-gradient-to-br from-emerald-950/90 via-slate-900/90 to-slate-950/90 text-white rounded-4xl p-8 sm:p-12 border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="px-4 py-1.5 rounded-full glass-pill text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30 inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin-slow" />
            KINGDOM OUTREACH HIGHLIGHT
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {ssgiData.campaignName}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-semibold text-emerald-200">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-emerald-400" />
              {ssgiData.region}
            </span>
            <span>•</span>
            <span>{ssgiData.dateRange}</span>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Lively Stones International Network mobilized student disciple-makers to invade secondary schools across Ekiti State with the gospel of Jesus Christ, setting up student prayer fellowships and distributing youth study guides.
          </p>
        </div>
      </div>

      {/* Impact Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <IOSCard className="text-center">
          <p className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Schools Invaded</p>
          <p className="text-3xl sm:text-4xl font-extrabold text-emerald-500 dark:text-emerald-400 my-1">{ssgiData.schoolsVisited}</p>
          <p className="text-[11px] text-slate-400">Secondary institutions</p>
        </IOSCard>

        <IOSCard className="text-center">
          <p className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Students Reached</p>
          <p className="text-3xl sm:text-4xl font-extrabold text-blue-500 dark:text-blue-400 my-1">{ssgiData.studentsReached.toLocaleString()}+</p>
          <p className="text-[11px] text-slate-400">High school youths</p>
        </IOSCard>

        <IOSCard className="text-center">
          <p className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Bibles & Materials</p>
          <p className="text-3xl sm:text-4xl font-extrabold text-indigo-500 dark:text-indigo-400 my-1">{ssgiData.biblesDistributed.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400">Discipleship guides</p>
        </IOSCard>

        <IOSCard className="text-center">
          <p className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Volunteers</p>
          <p className="text-3xl sm:text-4xl font-extrabold text-amber-500 dark:text-amber-400 my-1">{ssgiData.volunteersMobilized}</p>
          <p className="text-[11px] text-slate-400">Mobilized ministers</p>
        </IOSCard>
      </div>

      {/* Featured School Stories */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Invasion School Stories & Testimonies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ssgiData.stories.map((story) => (
            <IOSCard key={story.id} className="flex flex-col justify-between">
              <div className="space-y-3">
                <img 
                  src={story.imageUrl} 
                  alt={story.schoolName}
                  className="w-full h-44 object-cover rounded-2xl border border-white/20 dark:border-white/10"
                />
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-500 dark:text-emerald-400">
                  <MapPin className="w-3.5 h-3.5" />
                  {story.location}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {story.schoolName}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {story.fullStory}
                </p>
              </div>
            </IOSCard>
          ))}
        </div>
      </div>

    </div>
  );
};

