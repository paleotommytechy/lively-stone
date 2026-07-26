import React from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { 
  CheckCircle, 
  Lock, 
  Award, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  ScrollText, 
  HeartHandshake, 
  ShieldCheck, 
  Crown 
} from 'lucide-react';
import { PillarStage } from '../../../types';

export const DiscipleshipJourneyView: React.FC = () => {
  const { student, setStudentRoute, openTeachingDetail, teachings } = useApp();

  const journeyStages: {
    stage: PillarStage;
    number: string;
    title: string;
    subtitle: string;
    description: string;
    status: 'completed' | 'current' | 'locked';
    badge: string;
    badgeIcon: React.ReactNode;
    unlockedModules: string[];
  }[] = [
    {
      stage: 'Learn',
      number: '01',
      title: 'Encounter Pure Doctrine',
      subtitle: 'Foundation of Truth',
      description: 'Systematic study of biblical foundation, Christ’s lordship, and apostolic doctrine taught by Saint Abraham Babatunde.',
      status: 'completed',
      badge: 'Truth Encountered Badge',
      badgeIcon: <ScrollText className="w-3.5 h-3.5 text-amber-500" />,
      unlockedModules: ['Apostolic Mandate Overview', 'Nature of the Scriptures', 'Covenant Foundations']
    },
    {
      stage: 'Grow',
      number: '02',
      title: 'Secret Place and Spiritual Capacity',
      subtitle: 'Interior Transformation',
      description: 'Fostering disciplined secret prayer, fasting, word meditation, and emotional healing under the Spirit’s guidance.',
      status: 'current',
      badge: 'Altar Fire Badge',
      badgeIcon: <Award className="w-3.5 h-3.5 text-amber-500" />,
      unlockedModules: ['Cultivating Spiritual Capacity', 'Secret Place Prayer Log', 'Mind Renewal']
    },
    {
      stage: 'Live',
      number: '03',
      title: 'Practical Holiness and Market Conduct',
      subtitle: 'Embodying the Word',
      description: 'Aligning private choices, speech, academic integrity, and relationships with the character of Jesus Christ.',
      status: 'locked',
      badge: 'Practical Integrity Badge',
      badgeIcon: <Sparkles className="w-3.5 h-3.5 text-amber-500" />,
      unlockedModules: ['Foundations of Living the Word', 'Word Obedience Audit', 'Kingdom Financial Stewardship']
    },
    {
      stage: 'Serve',
      number: '04',
      title: 'Campus Outreach and Servant Leadership',
      subtitle: 'Extending Grace',
      description: 'Mobilizing youth for high school invasions (SSGI), hospital evangelism, and community servant leadership.',
      status: 'locked',
      badge: 'Servant Leader Badge',
      badgeIcon: <HeartHandshake className="w-3.5 h-3.5 text-amber-500" />,
      unlockedModules: ['Secondary School Invasion Prep', 'Personal Testimony Formulation', 'Group Outreach Logistics']
    },
    {
      stage: 'Disciple',
      number: '05',
      title: 'School of Tyrannus Cell Leader',
      subtitle: 'Walking with Others',
      description: 'Gathering small groups daily/weekly for mutual accountability, teaching review, and intercession.',
      status: 'locked',
      badge: 'Tyrannus Shepherding Badge',
      badgeIcon: <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />,
      unlockedModules: ['The Pattern of Kingdom Multiplication', 'Small Group Facilitation', 'Spiritual Counseling']
    },
    {
      stage: 'Multiply',
      number: '06',
      title: 'Territorial Kingdom Multiplication',
      subtitle: 'Taking Nations for Christ',
      description: 'Planting new discipleship hubs, sending out missionaries, and establishing permanent kingdom influence.',
      status: 'locked',
      badge: 'Kingdom Multiplier Badge',
      badgeIcon: <Crown className="w-3.5 h-3.5 text-amber-500" />,
      unlockedModules: ['Territorial Warfare & Prayer', 'Sending Out Missionaries', 'Apostolic Legacy']
    }
  ];

  return (
    <div className="space-y-10 pb-16 animate-ios-fade-in">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20 inline-flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-500" />
          Apostolic Discipleship Pathway
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          My Discipleship Journey
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Learn • Grow • Live • Serve • Disciple • Multiply
        </p>
      </div>

      {/* Progress Summary Card */}
      <IOSCard className="bg-gradient-to-r from-zinc-950 via-slate-900 to-zinc-900 text-white border-zinc-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Active Stage</span>
              <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                Pillar 02: GROW
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Building Interior Spiritual Fortitude
            </h2>
            <p className="text-xs text-zinc-300">
              Complete your pending quiet time prayer log and submit the attached quiz to unlock Pillar 03: LIVE.
            </p>
          </div>

          <div className="text-center bg-white/10 p-5 rounded-2xl border border-white/15 backdrop-blur-xl shrink-0">
            <p className="text-xs text-zinc-300 uppercase font-bold tracking-wider">Journey Progress</p>
            <p className="text-4xl font-extrabold text-amber-400 my-1">{student.progressPercentage}%</p>
            <p className="text-[11px] text-zinc-400 font-medium">2 of 6 Pillars Unlocked</p>
          </div>
        </div>
      </IOSCard>

      {/* Pathway Timeline */}
      <div className="space-y-6 relative">
        <div className="hidden lg:block absolute left-8 top-12 bottom-12 w-1 bg-zinc-200 dark:bg-zinc-800 -z-0" />

        {journeyStages.map((stg) => {
          const isDone = stg.status === 'completed';
          const isCurrent = stg.status === 'current';
          const isLocked = stg.status === 'locked';

          return (
            <div key={stg.stage} className="relative z-10">
              <IOSCard
                className={`
                  border transition-all duration-300 
                  ${isDone ? 'border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/10' : ''} 
                  ${isCurrent ? 'border-amber-500/50 bg-amber-500/5 dark:bg-amber-950/10 ring-2 ring-amber-500/30 shadow-xl' : ''} 
                  ${isLocked ? 'opacity-75 border-zinc-200 dark:border-zinc-800' : ''}
                `}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    
                    {/* Stage Number / Status Icon */}
                    <div 
                      className={`
                        w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-base shrink-0 shadow-md 
                        ${isDone ? 'bg-emerald-500 text-white' : ''} 
                        ${isCurrent ? 'bg-amber-500 text-zinc-950' : ''} 
                        ${isLocked ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400' : ''}
                      `}
                    >
                      {isDone ? <CheckCircle className="w-6 h-6" /> : isLocked ? <Lock className="w-5 h-5" /> : stg.number}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                          Pillar {stg.number}: {stg.stage}
                        </span>
                        <span 
                          className={`
                            text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full 
                            ${isDone ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : ''} 
                            ${isCurrent ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300' : ''} 
                            ${isLocked ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500' : ''}
                          `}
                        >
                          {stg.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                        {stg.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {stg.description}
                      </p>

                      {/* Unlocked Modules Badges */}
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {stg.unlockedModules.map((m) => (
                          <span key={m} className="px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Milestone Badge Reward */}
                  <div className="shrink-0 text-right sm:text-left pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-200 dark:border-zinc-800 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-start">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Milestone Award</span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
                      {stg.badgeIcon}
                      {stg.badge}
                    </span>
                  </div>
                </div>
              </IOSCard>
            </div>
          );
        })}
      </div>

    </div>
  );
};
