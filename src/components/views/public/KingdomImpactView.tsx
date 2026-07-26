import React from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { MapPin, Users, BookOpen, HeartHandshake, Sparkles, Info } from 'lucide-react';

export const KingdomImpactView: React.FC = () => {
  const { ssgiData } = useApp();

  return (
    <div className="space-y-10 pb-16 animate-ios-fade-in">
      
      {/* Prototype Data Warning Banner */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold">
        <Info className="w-5 h-5 shrink-0 text-amber-500" />
        <div>
          <span className="font-extrabold uppercase tracking-wide">Prototype Data Notice: </span>
          The statistics below represent demonstration data for the School of Tyrannus prototype. Verified outreach metrics will be updated by ministry administrators.
        </div>
      </div>

      {/* Main SSGI Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-zinc-900 to-slate-900 text-white rounded-[2.5rem] p-8 sm:p-12 border border-emerald-900/50 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Kingdom Outreach Highlight
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {ssgiData.campaignName}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-200">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-emerald-400" />
              {ssgiData.region}
            </span>
            <span>•</span>
            <span>{ssgiData.dateRange}</span>
          </div>
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
            Lively Stones International Network mobilized student disciple-makers to invade secondary schools across Ekiti State with the gospel of Jesus Christ, setting up student prayer fellowships and distributing youth study guides.
          </p>
        </div>
      </div>

      {/* Impact Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <IOSCard className="text-center bg-gradient-to-b from-white to-zinc-50 dark:from-[#1C1C1E] dark:to-zinc-900">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Schools Invaded</p>
          <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 my-1">{ssgiData.schoolsVisited}</p>
          <p className="text-[11px] text-zinc-400">Secondary institutions</p>
        </IOSCard>

        <IOSCard className="text-center bg-gradient-to-b from-white to-zinc-50 dark:from-[#1C1C1E] dark:to-zinc-900">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Students Reached</p>
          <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 my-1">{ssgiData.studentsReached.toLocaleString()}+</p>
          <p className="text-[11px] text-zinc-400">High school youths</p>
        </IOSCard>

        <IOSCard className="text-center bg-gradient-to-b from-white to-zinc-50 dark:from-[#1C1C1E] dark:to-zinc-900">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Bibles & Materials</p>
          <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 my-1">{ssgiData.biblesDistributed.toLocaleString()}</p>
          <p className="text-[11px] text-zinc-400">Discipleship guides</p>
        </IOSCard>

        <IOSCard className="text-center bg-gradient-to-b from-white to-zinc-50 dark:from-[#1C1C1E] dark:to-zinc-900">
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Volunteers</p>
          <p className="text-3xl sm:text-4xl font-extrabold text-amber-600 dark:text-amber-400 my-1">{ssgiData.volunteersMobilized}</p>
          <p className="text-[11px] text-zinc-400">Mobilized ministers</p>
        </IOSCard>
      </div>

      {/* Featured School Stories */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
          Invasion School Stories & Testimonies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ssgiData.stories.map((story) => (
            <IOSCard key={story.id} className="flex flex-col justify-between">
              <div className="space-y-3">
                <img 
                  src={story.imageUrl} 
                  alt={story.schoolName}
                  className="w-full h-44 object-cover rounded-2xl border border-zinc-200 dark:border-zinc-800"
                />
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <MapPin className="w-3.5 h-3.5" />
                  {story.location}
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  {story.schoolName}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
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
