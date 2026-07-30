import React from 'react';
import { IOSCard } from '../../ios/IOSCard';
import { Sparkles, Heart, Shield, Compass, BookOpen, Crown } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-10 pb-16 animate-ios-fade-in">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <span className="px-4 py-1.5 rounded-full glass-pill text-amber-500 dark:text-amber-400 text-xs font-mono font-bold border border-amber-500/20">
          ABOUT OUR MINISTRY
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Lively Stones International Network
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          A Christian ministry dedicated to equipping believers through systematic biblical discipleship, spiritual growth, evangelism, and kingdom impact across campuses and nations.
        </p>
      </div>

      {/* Convener Profile */}
      <IOSCard className="bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-indigo-950/80 text-white border-white/20 dark:border-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <img
            src="/AB.jpg"
            alt="Saint Abraham Babatunde"
            className="w-full h-80 object-cover rounded-3xl border border-white/20 shadow-2xl"
          />
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
              <span className="px-3 py-1 rounded-full glass-pill text-amber-300 border border-amber-400/30">
                Youth Evangelism
              </span>
              <span className="px-3 py-1 rounded-full glass-pill text-amber-300 border border-amber-400/30">
                School of Tyrannus
              </span>
            </div>
          </div>
        </div>
      </IOSCard>

      {/* Core Tenets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <IOSCard>
          <div className="w-11 h-11 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold text-lg mb-4 border border-blue-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Uncompromising Truth</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            We hold firmly to the infallible authority of God’s Word. Discipleship begins with a mind renewed by biblical sound doctrine.
          </p>
        </IOSCard>

        <IOSCard>
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg mb-4 border border-indigo-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Daily Consistency</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Following Apostle Paul’s model in Acts 19:9, spiritual maturity is forged through daily instruction, secret prayer, and accountability.
          </p>
        </IOSCard>

        <IOSCard>
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg mb-4 border border-amber-500/20">
            <Heart className="w-5 h-5" />
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

