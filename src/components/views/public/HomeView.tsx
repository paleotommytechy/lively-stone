import React from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { LazyYouTubePlayer } from './LazyYouTubePlayer';
import {
  MinistryCrestSVG,
  SacredStonePillarSVG,
  KingdomShieldSVG,
  DiscipleshipCrownSVG,
  ApostolicFireSVG
} from '../../vectors/MinistryVectors';
import {
  ArrowRight,
  BookOpen,
  Send,
  Calendar,
  ChevronRight,
  Sprout,
  HeartHandshake,
  Crown,
  Sparkles,
  Flame,
  ShieldCheck,
  Zap,
  GraduationCap,
  Award,
  Users,
  MessageSquare,
  Share2
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    teachings,
    openTeachingDetail,
    setPublicRoute,
    setRoleView,
    showToast
  } = useApp();

  const pillars = [
    { name: 'Learn', desc: 'Encounter pure biblical doctrine and apostolic truth.', color: 'from-cyan-500 via-blue-600 to-indigo-700', icon: <BookOpen className="w-5 h-5 text-white" /> },
    { name: 'Grow', desc: 'Build deep spiritual endurance through prayer and fasting.', color: 'from-indigo-600 via-blue-600 to-cyan-500', icon: <Sprout className="w-5 h-5 text-white" /> },
    { name: 'Live', desc: 'Embody practical holiness in everyday decisions.', color: 'from-cyan-400 via-blue-600 to-indigo-600', icon: <Sparkles className="w-5 h-5 text-white" /> },
    { name: 'Serve', desc: 'Deploy your gifts in secondary school and campus outreach.', color: 'from-indigo-500 via-blue-600 to-amber-500', icon: <HeartHandshake className="w-5 h-5 text-white" /> },
    { name: 'Disciple', desc: 'Walk intentionally with others in small fellowship groups.', color: 'from-blue-600 via-indigo-600 to-amber-400', icon: <ApostolicFireSVG className="w-5 h-5" /> },
    { name: 'Multiply', desc: 'Raise faithful disciple makers who impact nations for Christ.', color: 'from-amber-400 via-amber-500 to-indigo-800', icon: <DiscipleshipCrownSVG className="w-5 h-5" /> },
  ];

  const lmsFeatures = [
    {
      title: 'Structured Discipleship Pathways',
      desc: 'Guide learners step-by-step through 6 distinct spiritual growth stages with milestone tracking.',
      icon: <SacredStonePillarSVG className="w-7 h-7" />,
      color: 'border-cyan-500/30'
    },
    {
      title: 'Interactive Assessment Engine',
      desc: 'Instant quiz grading, pass score validation, and automated spiritual milestone awards.',
      icon: <KingdomShieldSVG className="w-7 h-7" />,
      color: 'border-blue-500/30'
    },
    {
      title: 'Community Q&A & Peer Desk',
      desc: 'Direct interaction with Saint Abraham Babatunde & leadership for doctrine & life guidance.',
      icon: <MessageSquare className="w-6 h-6 text-amber-400" />,
      color: 'border-amber-500/30'
    },
    {
      title: 'Evangelism Social Card Studio',
      desc: 'Empower disciples to create & share beautifully formatted scripture insight graphics.',
      icon: <Share2 className="w-6 h-6 text-indigo-400" />,
      color: 'border-indigo-500/30'
    }
  ];

  return (
    <div className="space-y-12 pb-16 animate-ios-fade-in">

      {/* TalentLMS-Inspired Hero Section */}
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-indigo-950/80 text-white p-8 sm:p-12 lg:p-14 border border-white/20 dark:border-white/10 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-indigo-600/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Hand Side: Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Holographic Pill with Custom Crest */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold shadow-md tracking-wider">
              <MinistryCrestSVG className="w-4 h-4" />
              <span>APOSTOLIC LEARNING MANAGEMENT SYSTEM</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.1]">
              The Discipleship Platform Built for <span className="shimmer-text">Kingdom Multiplication</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Welcome to the <strong className="text-white font-semibold">School of Tyrannus LMS</strong>, convened by <strong className="text-cyan-300 font-semibold">Saint Abraham Babatunde</strong>. A consecrated digital environment to equip believers through structured courses, interactive quizzes, and practical outreach.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => setPublicRoute('tyrannus')}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs tracking-wider uppercase shadow-xl shadow-cyan-500/25 flex items-center gap-2.5 transition-all ios-active border border-white/20"
              >
                Explore LMS Courses
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setRoleView('student')}
                className="px-7 py-3.5 rounded-full glass-pill hover:bg-white/20 text-white font-bold text-xs tracking-wider uppercase backdrop-blur-xl flex items-center gap-2 transition-all ios-active border border-cyan-400/30 shadow-md"
              >
                Launch Student Portal
              </button>
            </div>
          </div>

          {/* Right Hand Side: Saint Abraham Babatunde Hero Image */}
          <div className="lg:col-span-5 flex justify-center w-full relative group">
            <div className="relative overflow-hidden rounded-3xl border-2 border-white/20 dark:border-white/10 shadow-2xl shadow-cyan-500/20 max-w-md w-full">
              <img
                src="/AB.jpg"
                alt="Saint Abraham Babatunde"
                className="w-full h-[360px] sm:h-[400px] object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">Convener</span>
                <h3 className="text-lg font-extrabold text-white">Saint Abraham Babatunde</h3>
                <p className="text-xs text-slate-300">Lively Stones Ministry Network</p>
              </div>
            </div>
          </div>

        </div>

        {/* TalentLMS Stats Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10 font-mono">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-cyan-300">1,200+</p>
            <p className="text-xs text-slate-300 font-sans">Active Disciples</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-300">6 Pillars</p>
            <p className="text-xs text-slate-300 font-sans">Growth Roadmap</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-indigo-300">100% Free</p>
            <p className="text-xs text-slate-300 font-sans">Apostolic Training</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-300">98%</p>
            <p className="text-xs text-slate-300 font-sans">Session Consistency</p>
          </div>
        </div>
      </section>

      {/* Core LMS Features Showcase */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-4 py-1 rounded-full glass-pill text-cyan-400 text-xs font-mono font-bold border border-cyan-500/20">
            LMS CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Designed for Intuitive Discipleship
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Everything you need to learn pure doctrine, track accountability, and multiply.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {lmsFeatures.map((feat) => (
            <IOSCard key={feat.title} className={`space-y-3 border ${feat.color}`}>
              <div className="w-12 h-12 rounded-2xl glass-pill flex items-center justify-center border border-white/20 shadow-md">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {feat.desc}
              </p>
            </IOSCard>
          ))}
        </div>
      </section>

      {/* Discipleship Pathway Framework */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-4 py-1 rounded-full glass-pill text-cyan-400 text-xs font-mono font-bold border border-cyan-500/20">
            APOSTOLIC CURRICULUM
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The 6 Pillars of Growth
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Learn • Grow • Live • Serve • Disciple • Multiply
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p, idx) => (
            <IOSCard key={p.name} className="relative overflow-hidden group hover:border-cyan-400/50">
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  {p.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-extrabold text-cyan-400 uppercase tracking-widest block">
                    PILLAR 0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {p.name}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {p.desc}
              </p>
            </IOSCard>
          ))}
        </div>
      </section>

      {/* Convener Message Spotlight */}
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 border border-white/20 dark:border-white/10 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
          <div className="relative group">
            <img
              src="/AB.jpg"
              alt="Saint Abraham Babatunde"
              className="rounded-3xl shadow-2xl object-cover w-full h-80 border border-white/20 group-hover:scale-[1.02] transition-transform duration-300 shrink-0"
            />
            <div className="absolute bottom-3 left-3 right-3 p-4 rounded-2xl glass-pill border border-amber-400/40 text-white text-xs backdrop-blur-xl">
              <p className="font-extrabold text-sm text-white">Saint Abraham Babatunde</p>
              <p className="text-[11px] text-cyan-300 font-medium">Convener, Lively Stones Network</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold glass-pill text-cyan-300 border border-cyan-500/30">
              <MinistryCrestSVG className="w-4 h-4" />
              <span>APOSTOLIC MANDATE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              "We are not raising spectators. We are raising disciples built on daily biblical truth."
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              The School of Tyrannus is a consecrated space modeled after Paul's daily lecture hall in Ephesus. Our mandate is to ground believers in deep scripture, intimacy with God, and practical kingdom outreach across secondary schools and campuses.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setPublicRoute('about')}
                className="px-6 py-2.5 rounded-full bg-white text-slate-950 text-xs font-extrabold transition-all ios-active shadow-lg hover:bg-slate-100"
              >
                Read Full Vision
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teachings */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Featured LMS Courses
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              School of Tyrannus lecture series by Saint Abraham Babatunde
            </p>
          </div>
          <button
            onClick={() => setPublicRoute('teachings')}
            className="text-xs font-bold text-cyan-400 flex items-center gap-1 hover:underline"
          >
            View All ({teachings.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teachings.slice(0, 2).map((t) => (
            <IOSCard key={t.id} onClick={() => openTeachingDetail(t.id)}>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="px-3 py-0.5 rounded-full glass-pill text-cyan-400 font-bold border border-cyan-500/20">
                    {t.topic}
                  </span>
                  <span className="font-mono text-[11px]">{t.date}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white hover:text-cyan-400 transition-colors">
                  {t.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {t.summary}
                </p>

                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    {t.pillar} Pillar
                  </span>

                  <a
                    href={t.telegramMessageUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast('Telegram Notice', 'Opening Telegram lesson link...');
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-bold border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Telegram Lesson
                  </a>
                </div>
              </div>
            </IOSCard>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="relative rounded-4xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden text-center space-y-4">
        <span className="px-4 py-1.5 rounded-full glass-pill text-amber-300 text-xs font-mono font-bold border border-amber-500/30 inline-block">
          BEGIN YOUR DISCIPLESHIP JOURNEY
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto">
          Ready to Grow Deep Roots in Christ & Impact Nations?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal">
          Enlist in the School of Tyrannus discipleship class today and start your journey across the 6 growth pillars.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={() => setPublicRoute('join')}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-xl shadow-amber-500/25 transition-all ios-active"
          >
            Enlist in Discipleship Class
          </button>
        </div>
      </section>

    </div>
  );
};
