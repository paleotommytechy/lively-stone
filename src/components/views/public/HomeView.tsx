import React from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Send, 
  Users, 
  Award, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Flame,
  ChevronRight,
  Sprout,
  HeartHandshake,
  Crown
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    teachings, 
    openTeachingDetail, 
    setPublicRoute, 
    setRoleView,
    ssgiData,
    events,
    showToast 
  } = useApp();

  const pillars = [
    { name: 'Learn', desc: 'Encounter pure biblical doctrine and apostolic truth.', color: 'from-blue-500 to-indigo-600', icon: <BookOpen className="w-5 h-5 text-white" /> },
    { name: 'Grow', desc: 'Build deep spiritual endurance through prayer and fasting.', color: 'from-indigo-500 to-purple-600', icon: <Sprout className="w-5 h-5 text-white" /> },
    { name: 'Live', desc: 'Embody practical holiness in everyday decisions.', color: 'from-purple-500 to-pink-600', icon: <Sparkles className="w-5 h-5 text-white" /> },
    { name: 'Serve', desc: 'Deploy your gifts in secondary school and campus outreach.', color: 'from-pink-500 to-rose-600', icon: <HeartHandshake className="w-5 h-5 text-white" /> },
    { name: 'Disciple', desc: 'Walk intentionally with others in small fellowship groups.', color: 'from-orange-500 to-amber-600', icon: <Flame className="w-5 h-5 text-white" /> },
    { name: 'Multiply', desc: 'Raise faithful disciple makers who impact nations for Christ.', color: 'from-amber-500 to-emerald-600', icon: <Crown className="w-5 h-5 text-white" /> },
  ];

  return (
    <div className="space-y-12 pb-16 animate-ios-fade-in">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-950 via-slate-950 to-zinc-900 text-white p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/20 via-orange-600/15 to-indigo-600/20 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl text-amber-300 text-xs font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Lively Stones International Network
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Transforming Believers into <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-300 to-indigo-300">Territorial Disciples</span>
          </h1>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Welcome to the <strong className="text-white font-semibold">School of Tyrannus</strong>, convened by <strong className="text-amber-300 font-semibold">Saint Abraham Babatunde</strong>. A digital environment created to help believers encounter God's truth, live out the Word, and become disciples who multiply.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => setPublicRoute('tyrannus')}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-zinc-950 font-extrabold text-xs tracking-wider uppercase hover:brightness-110 shadow-xl shadow-amber-500/25 flex items-center gap-2 transition-all ios-active"
            >
              Explore School of Tyrannus
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setRoleView('student')}
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs tracking-wider uppercase backdrop-blur-xl flex items-center gap-2 transition-all ios-active"
            >
              Enter Student Portal
            </button>
          </div>
        </div>
      </section>

      {/* Discipleship Pathway Framework */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
            Apostolic Curriculum
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            The 6 Pillars of Growth
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Learn • Grow • Live • Serve • Disciple • Multiply
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p, idx) => (
            <IOSCard key={p.name} className="relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-lg shadow-black/10 shrink-0`}>
                  {p.icon}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-amber-500 uppercase tracking-widest">
                    Pillar 0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {p.name}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                {p.desc}
              </p>
            </IOSCard>
          ))}
        </div>
      </section>

      {/* Convener Message Spotlight */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-900 via-slate-950 to-zinc-900 text-white p-8 sm:p-12 border border-zinc-800 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
          <div className="relative">
            <img 
              src="/AB.jpg" 
              alt="Saint Abraham Babatunde" 
              className="rounded-3xl shadow-2xl object-cover w-full h-80 border border-white/20"
            />
            <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 text-white text-xs">
              <p className="font-extrabold text-sm">Saint Abraham Babatunde</p>
              <p className="text-[11px] text-amber-300 font-semibold">Convener, Lively Stones Network</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Apostolic Mandate
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              "We are not raising spectators. We are raising disciples built on daily biblical truth."
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              The School of Tyrannus is a consecrated space modeled after Paul's daily lecture hall in Ephesus. Our mandate is to ground believers in deep scripture, intimacy with God, and practical kingdom outreach across secondary schools and campuses.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setPublicRoute('about')}
                className="px-6 py-2.5 rounded-full bg-white text-zinc-950 text-xs font-bold transition-all ios-active shadow-md"
              >
                Read Full Vision
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured School of Tyrannus Teachings */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Recent Teachings
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              School of Tyrannus lecture series by Saint Abraham Babatunde
            </p>
          </div>
          <button
            onClick={() => setPublicRoute('teachings')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
          >
            View All ({teachings.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teachings.slice(0, 2).map((t) => (
            <IOSCard key={t.id} onClick={() => openTeachingDetail(t.id)}>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="px-3 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20">
                    {t.topic}
                  </span>
                  <span>{t.date}</span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t.title}
                </h3>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                  {t.summary}
                </p>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
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
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
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

      {/* SSGI Ekiti State Outreach Banner */}
      <section className="relative rounded-[2.5rem] bg-gradient-to-r from-emerald-950 via-zinc-900 to-slate-900 text-white p-8 sm:p-12 border border-emerald-900/50 shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                Kingdom Impact
              </span>
              <span className="text-xs text-zinc-400 font-semibold">Prototype Data</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Secondary School Gospel Invasion (SSGI)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              Between late October and November 2025, Lively Stones Network conducted an extensive gospel invasion across Ekiti State, visiting secondary schools and raising student fellowships.
            </p>
          </div>

          <button
            onClick={() => setPublicRoute('impact')}
            className="px-7 py-3 rounded-full bg-emerald-500 text-zinc-950 font-extrabold text-xs uppercase tracking-wider hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 shrink-0 transition-all ios-active"
          >
            Explore Impact Map
          </button>
        </div>
      </section>

      {/* Annual Convention Teaser */}
      <section className="bg-amber-500/10 border border-amber-500/20 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-zinc-950 font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              {events[0].title}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {events[0].date} • {events[0].location}
            </p>
          </div>
        </div>

        <button
          onClick={() => setPublicRoute('events')}
          className="px-6 py-2.5 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 shrink-0 transition-all ios-active shadow-md"
        >
          View Convention Details
        </button>
      </section>

    </div>
  );
};
