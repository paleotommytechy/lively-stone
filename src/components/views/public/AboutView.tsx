import React from 'react';
import { IOSCard } from '../../ios/IOSCard';
import {
  MinistryCrestSVG,
  SacredStonePillarSVG,
  KingdomShieldSVG,
  DiscipleshipCrownSVG,
  ApostolicFireSVG
} from '../../vectors/MinistryVectors';
import { Sparkles, Compass, BookOpen, Heart } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-10 pb-16 animate-ios-fade-in">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-amber-400 text-xs font-mono font-bold border border-amber-500/30">
          <MinistryCrestSVG className="w-4 h-4" />
          <span>ABOUT OUR MINISTRY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Lively Stones International Network
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          A Christian ministry dedicated to equipping believers through systematic biblical discipleship, spiritual growth, evangelism, and kingdom impact across campuses and nations.
        </p>
      </div>

      {/* Convener Profile */}
      <IOSCard className="bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-indigo-950/80 text-white border-white/20 dark:border-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="relative group">
            <img
              src="/AB.jpg"
              alt="Saint Abraham Babatunde"
              className="w-full h-80 object-cover rounded-3xl border border-amber-400/40 shadow-2xl"
            />
            <div className="absolute top-3 right-3 p-2 rounded-2xl glass-pill border border-white/30 text-amber-300 backdrop-blur-md">
              <MinistryCrestSVG className="w-6 h-6" />
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              CONVENER & SPIRITUAL LEADER
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Saint Abraham Babatunde
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Saint Abraham Babatunde convenes the School of Tyrannus with an unyielding mandate: to raise a generation of believers who are deeply rooted in the Scriptures, filled with the Holy Spirit, and actively establishing the Kingdom of God in their daily spheres.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-3 py-1 rounded-full glass-pill text-amber-300 border border-amber-400/30">
                Apostolic Teaching
              </span>
              <span className="px-3 py-1 rounded-full glass-pill text-cyan-300 border border-cyan-400/30">
                Youth Evangelism
              </span>
              <span className="px-3 py-1 rounded-full glass-pill text-indigo-300 border border-indigo-400/30">
                School of Tyrannus
              </span>
            </div>
          </div>
        </div>
      </IOSCard>

      {/* Core Tenets with Custom Vector Graphics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <IOSCard className="border border-cyan-500/20">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-lg mb-4 border border-cyan-500/30 shadow-md">
            <KingdomShieldSVG className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Uncompromising Truth</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            We hold firmly to the infallible authority of God’s Word. Discipleship begins with a mind renewed by biblical sound doctrine.
          </p>
        </IOSCard>

        <IOSCard className="border border-indigo-500/20">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-lg mb-4 border border-indigo-500/30 shadow-md">
            <SacredStonePillarSVG className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Daily Consistency</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Following Apostle Paul’s model in Acts 19:9, spiritual maturity is forged through daily instruction, secret prayer, and accountability.
          </p>
        </IOSCard>

        <IOSCard className="border border-amber-500/20">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg mb-4 border border-amber-500/30 shadow-md">
            <DiscipleshipCrownSVG className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Kingdom Multiplication</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Every disciple is equipped to become a disciple-maker, taking the gospel to secondary schools, universities, and corporate institutions.
          </p>
        </IOSCard>
      </div>
    </div>
  );
};
