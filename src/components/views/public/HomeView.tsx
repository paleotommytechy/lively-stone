import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Card } from '../../ui/Card';
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
    { name: 'Learn', desc: 'Encounter pure biblical doctrine and apostolic truth.', color: 'bg-forest-800 text-gold-400', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Grow', desc: 'Build deep spiritual endurance through prayer and fasting.', color: 'bg-forest-800 text-gold-400', icon: <Sprout className="w-5 h-5" /> },
    { name: 'Live', desc: 'Embody practical holiness in everyday decisions.', color: 'bg-forest-800 text-gold-400', icon: <Sparkles className="w-5 h-5" /> },
    { name: 'Serve', desc: 'Deploy your gifts in secondary school and campus outreach.', color: 'bg-forest-800 text-gold-400', icon: <HeartHandshake className="w-5 h-5" /> },
    { name: 'Disciple', desc: 'Walk intentionally with others in small fellowship groups.', color: 'bg-forest-800 text-gold-400', icon: <ApostolicFireSVG className="w-5 h-5" /> },
    { name: 'Multiply', desc: 'Raise faithful disciple makers who impact nations for Christ.', color: 'bg-forest-800 text-gold-400', icon: <DiscipleshipCrownSVG className="w-5 h-5" /> },
  ];

  const lmsFeatures = [
    {
      title: 'Structured Discipleship Pathways',
      desc: 'Guide learners step-by-step through 6 distinct spiritual growth stages with milestone tracking.',
      icon: <SacredStonePillarSVG className="w-7 h-7" />
    },
    {
      title: 'Interactive Assessment Engine',
      desc: 'Instant quiz grading, pass score validation, and automated spiritual milestone awards.',
      icon: <KingdomShieldSVG className="w-7 h-7" />
    },
    {
      title: 'Community Q&A & Peer Desk',
      desc: 'Direct interaction with Saint Abraham Babatunde & leadership for doctrine & life guidance.',
      icon: <MessageSquare className="w-6 h-6 text-gold-400" />
    },
    {
      title: 'Evangelism Social Card Studio',
      desc: 'Empower disciples to create & share beautifully formatted scripture insight graphics.',
      icon: <Share2 className="w-6 h-6 text-forest-300" />
    }
  ];

  return (
    <div className="space-y-12 pb-16 animate-ios-fade-in text-slate-900 dark:text-slate-100">

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-forest-950 text-white p-8 sm:p-12 lg:p-14 border border-forest-800 shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900 border border-forest-700 text-gold-400 text-xs font-mono font-bold tracking-wider">
              <MinistryCrestSVG className="w-4 h-4" />
              <span>APOSTOLIC DISCIPLESHIP SYSTEM</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.1]">
              The Discipleship Platform Built for <span className="text-gold-400">Kingdom Multiplication</span>
            </h1>

            <p className="text-forest-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Welcome to the <strong className="text-white font-semibold">School of Tyrannus</strong>, convened by <strong className="text-gold-400 font-semibold">Saint Abraham Babatunde</strong>. A consecrated digital environment to equip believers through structured courses, interactive quizzes, and practical outreach.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => setPublicRoute('tyrannus')}
                className="px-7 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-forest-950 font-extrabold text-xs tracking-wider uppercase shadow-xl flex items-center gap-2.5 transition-all"
              >
                Explore Courses
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setRoleView('student')}
                className="px-7 py-3.5 rounded-full bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs tracking-wider uppercase border border-forest-700 transition-all"
              >
                Launch Disciple Portal
              </button>
            </div>
          </div>

          {/* Right Convener Hero Image */}
          <div className="lg:col-span-5 flex justify-center w-full relative group">
            <div className="relative overflow-hidden rounded-3xl border-2 border-forest-700 shadow-2xl max-w-md w-full">
              <img
                src="/AB.jpg"
                alt="Saint Abraham Babatunde"
                className="w-full h-[360px] sm:h-[400px] object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent flex flex-col justify-end p-5">
                <span className="text-xs font-mono font-bold text-gold-400 uppercase tracking-widest">Convener</span>
                <h3 className="text-lg font-extrabold text-white">Saint Abraham Babatunde</h3>
                <p className="text-xs text-forest-200">Lively Stones Ministry Network</p>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Strip */}
        <div className="mt-12 pt-8 border-t border-forest-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10 font-mono">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-gold-400">1,200+</p>
            <p className="text-xs text-forest-300 font-sans">Active Disciples</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-gold-400">6 Pillars</p>
            <p className="text-xs text-forest-300 font-sans">Growth Roadmap</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-gold-400">100% Free</p>
            <p className="text-xs text-forest-300 font-sans">Apostolic Training</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-gold-400">98%</p>
            <p className="text-xs text-forest-300 font-sans">Session Consistency</p>
          </div>
        </div>
      </section>

      {/* Core LMS Features Showcase */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-4 py-1 rounded-full bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 text-xs font-mono font-bold border border-forest-200 dark:border-forest-800">
            SYSTEM CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Designed for Intuitive Discipleship
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-forest-300 font-medium">
            Everything you need to learn pure doctrine, track accountability, and multiply.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {lmsFeatures.map((feat) => (
            <Card key={feat.title} className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-forest-100 dark:bg-forest-900 flex items-center justify-center text-forest-800 dark:text-gold-400 shadow-sm">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-forest-200 leading-relaxed font-medium">
                {feat.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Discipleship Pathway Framework */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-4 py-1 rounded-full bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 text-xs font-mono font-bold border border-forest-200 dark:border-forest-800">
            APOSTOLIC CURRICULUM
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The 6 Pillars of Growth
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-forest-300 font-medium">
            Learn • Grow • Live • Serve • Disciple • Multiply
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p, idx) => (
            <Card key={p.name} className="relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-forest-800 text-gold-400 flex items-center justify-center shadow-md shrink-0">
                  {p.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-extrabold text-forest-600 dark:text-gold-400 uppercase tracking-widest block">
                    PILLAR 0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {p.name}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-forest-200 leading-relaxed font-medium">
                {p.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Teachings */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Featured Discipleship Courses
            </h2>
            <p className="text-xs text-slate-500 dark:text-forest-300">
              School of Tyrannus lecture series by Saint Abraham Babatunde
            </p>
          </div>
          <button
            onClick={() => setPublicRoute('teachings')}
            className="text-xs font-bold text-forest-700 dark:text-gold-400 flex items-center gap-1 hover:underline"
          >
            View All ({teachings.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teachings.slice(0, 2).map((t) => (
            <Card key={t.id} onClick={() => openTeachingDetail(t.id)}>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="px-3 py-0.5 rounded-full bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 font-bold border border-forest-200 dark:border-forest-800">
                    {t.topic}
                  </span>
                  <span className="font-mono text-[11px]">{t.date}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white hover:text-forest-700 dark:hover:text-gold-400 transition-colors">
                  {t.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-forest-200 line-clamp-2 leading-relaxed">
                  {t.summary}
                </p>

                <div className="pt-3 border-t border-slate-200 dark:border-forest-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-forest-700 dark:text-gold-400 flex items-center gap-1.5">
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
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-forest-800 text-gold-400 text-xs font-bold hover:bg-forest-700 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Telegram Lesson
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
};
