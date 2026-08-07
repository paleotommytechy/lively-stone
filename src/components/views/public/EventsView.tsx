import React, { useState, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { IOSModal } from '../../ios/IOSModal';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Globe, 
  Video, 
  Ticket, 
  Share2, 
  Download, 
  ExternalLink,
  ChevronRight,
  Filter,
  Flame,
  LayoutGrid,
  ListOrdered,
  CalendarDays,
  ShieldCheck,
  Award
} from 'lucide-react';
import { MinistryEvent, MinistryEventType } from '../../../types';

export const EventsView: React.FC = () => {
  const { 
    events, 
    registerForEvent, 
    generateIcsCalendarFile, 
    generateGoogleCalendarUrl, 
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline' | 'calendar'>('grid');
  
  // Registration Modal State
  const [selectedEvent, setSelectedEvent] = useState<MinistryEvent | null>(null);
  const [regStep, setRegStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fellowship, setFellowship] = useState('');
  const [notes, setNotes] = useState('');
  const [generatedTicket, setGeneratedTicket] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Categories list
  const categories = ['All', 'Convention', 'Retreat', 'Evangelism', 'Class', 'Prayer Gathering'];

  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      const matchesCategory = selectedCategory === 'All' || evt.type === selectedCategory || evt.category?.toLowerCase().includes(selectedCategory.toLowerCase());
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query || 
        evt.title.toLowerCase().includes(query) ||
        evt.theme.toLowerCase().includes(query) ||
        evt.location.toLowerCase().includes(query) ||
        evt.description.toLowerCase().includes(query) ||
        evt.speakers.some(s => s.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [events, selectedCategory, searchQuery]);

  const totalRegistrations = useMemo(() => {
    return events.reduce((acc, curr) => acc + (curr.registeredCount || 0), 0);
  }, [events]);

  const handleOpenRegister = (evt: MinistryEvent) => {
    setSelectedEvent(evt);
    setRegStep(1);
    setGeneratedTicket(evt.ticketCode || '');
  };

  const handleProceedToForm = () => {
    setRegStep(2);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !fullName.trim() || !email.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await registerForEvent(
        selectedEvent.id,
        fullName.trim(),
        email.trim(),
        phone.trim() || undefined,
        notes.trim() || undefined
      );
      setGeneratedTicket(res.ticketCode || `TKT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
      setRegStep(3);
    } catch (err) {
      console.error('Registration failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setRegStep(1);
    setFullName('');
    setEmail('');
    setPhone('');
    setFellowship('');
    setNotes('');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to Clipboard', `${label} copied!`, 'success');
  };

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in font-sans">
      
      {/* Hero Banner with Discipleship Aesthetics */}
      <div className="relative overflow-hidden rounded-3xl bg-forest-950 text-white p-6 sm:p-10 border border-forest-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 border border-forest-700 text-gold-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-gold-400" />
            Kingdom Gatherings & Convocations
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Conventions, Retreats & Apostolic Invasions
          </h1>
          <p className="text-sm sm:text-base text-forest-200 leading-relaxed">
            Gathering disciples, ministers, and campus leaders for territorial impact, intense prayer, expository doctrine, and strategic multiplication.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-forest-900/80 border border-forest-700/60">
              <p className="text-[10px] font-mono font-bold text-forest-300 uppercase">Total Gatherings</p>
              <p className="text-xl sm:text-2xl font-extrabold text-gold-400 font-mono">{events.length} Scheduled</p>
            </div>
            <div className="p-3 rounded-2xl bg-forest-900/80 border border-forest-700/60">
              <p className="text-[10px] font-mono font-bold text-forest-300 uppercase">Confirmed Registrations</p>
              <p className="text-xl sm:text-2xl font-extrabold text-white font-mono">{totalRegistrations.toLocaleString()}+</p>
            </div>
            <div className="p-3 rounded-2xl bg-forest-900/80 border border-forest-700/60 col-span-2 sm:col-span-1">
              <p className="text-[10px] font-mono font-bold text-forest-300 uppercase">Regional Reach</p>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">West Africa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, themes, speakers, or cities..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-forest-900 border border-slate-200 dark:border-forest-800 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-forest-900 p-1 rounded-2xl border border-slate-200 dark:border-forest-800 self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'grid'
                ? 'bg-forest-800 text-white shadow-sm'
                : 'text-slate-600 dark:text-forest-200 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Cards
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'timeline'
                ? 'bg-forest-800 text-white shadow-sm'
                : 'text-slate-600 dark:text-forest-200 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            Schedule
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'calendar'
                ? 'bg-forest-800 text-white shadow-sm'
                : 'text-slate-600 dark:text-forest-200 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            Agenda
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-forest-800 text-gold-400 border border-gold-400/40 shadow-md scale-105'
                : 'bg-white dark:bg-forest-900/60 border border-slate-200 dark:border-forest-800 text-slate-600 dark:text-forest-200 hover:bg-slate-50 dark:hover:bg-forest-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* No Events Found */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-16 space-y-3 bg-white dark:bg-forest-900/40 rounded-3xl border border-slate-200 dark:border-forest-800">
          <CalendarIcon className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Events Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            We couldn't find any gatherings matching your criteria. Try adjusting your search query or selecting a different category.
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-full bg-forest-800 text-gold-400 text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="space-y-6">
          {filteredEvents.map((evt) => {
            const capacity = evt.maxCapacity || 1000;
            const pctFilled = Math.min(100, Math.round((evt.registeredCount / capacity) * 100));

            return (
              <IOSCard key={evt.id} className="overflow-hidden p-0 border border-slate-200 dark:border-forest-800 shadow-xl group hover:border-gold-400/50 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Banner Image with Badges */}
                  <div className="lg:col-span-5 relative overflow-hidden h-64 lg:h-full min-h-[240px]">
                    <img 
                      src={evt.bannerUrl} 
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-forest-950/90 text-gold-400 font-mono font-bold text-xs border border-gold-400/30 backdrop-blur-md">
                        {evt.type}
                      </span>
                      {evt.venueType === 'online' && (
                        <span className="px-2.5 py-1 rounded-full bg-blue-900/90 text-blue-300 font-mono font-bold text-xs border border-blue-400/30 flex items-center gap-1 backdrop-blur-md">
                          <Video className="w-3 h-3" /> Online Stream
                        </span>
                      )}
                      {evt.venueType === 'hybrid' && (
                        <span className="px-2.5 py-1 rounded-full bg-purple-900/90 text-purple-300 font-mono font-bold text-xs border border-purple-400/30 flex items-center gap-1 backdrop-blur-md">
                          <Globe className="w-3 h-3" /> Hybrid Gathering
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                      <p className="text-[11px] font-mono text-gold-400 font-bold uppercase tracking-wider">Apostolic Theme</p>
                      <p className="text-sm font-bold leading-snug line-clamp-2">"{evt.theme}"</p>
                    </div>
                  </div>

                  {/* Event Details Content */}
                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                            {evt.title}
                          </h2>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                            <span className="flex items-center gap-1.5 font-mono font-bold text-forest-700 dark:text-gold-400">
                              <CalendarIcon className="w-4 h-4 text-gold-500" />
                              {evt.date}
                            </span>
                            <span className="flex items-center gap-1.5 font-mono text-slate-500">
                              <Clock className="w-3.5 h-3.5" />
                              {evt.time}
                            </span>
                          </div>
                        </div>

                        {evt.userRegistered && (
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30 flex items-center gap-1 shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Registered
                          </span>
                        )}
                      </div>

                      <p className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                        <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{evt.location}</span>
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {evt.description}
                      </p>

                      {/* Speakers */}
                      <div className="pt-2">
                        <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Apostolic Lineup & Teachers</p>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {evt.speakers.map((spk, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-forest-900 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-forest-700">
                              {spk}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Registration Capacity Progress */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1 font-bold">
                            <Users className="w-3.5 h-3.5 text-gold-400" />
                            {evt.registeredCount.toLocaleString()} Registered
                          </span>
                          <span>{capacity - evt.registeredCount} Seats Remaining</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-forest-900 overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-forest-700 to-gold-500 transition-all duration-500"
                            style={{ width: `${pctFilled}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-slate-200 dark:border-forest-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => generateIcsCalendarFile(evt)}
                          className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-forest-900 hover:bg-slate-200 dark:hover:bg-forest-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                          title="Download iCal (.ics) file"
                        >
                          <Download className="w-3.5 h-3.5" />
                          iCal
                        </button>
                        <a
                          href={generateGoogleCalendarUrl(evt)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-forest-900 hover:bg-slate-200 dark:hover:bg-forest-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                          title="Add to Google Calendar"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Google Cal
                        </a>
                      </div>

                      <button
                        onClick={() => handleOpenRegister(evt)}
                        className={`px-6 py-2.5 rounded-2xl font-extrabold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 ${
                          evt.userRegistered
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            : 'bg-forest-800 hover:bg-forest-700 text-gold-400 border border-gold-400/40'
                        }`}
                      >
                        <Ticket className="w-4 h-4" />
                        {evt.userRegistered ? 'View Digital Pass' : 'Register for Gathering'}
                      </button>
                    </div>
                  </div>

                </div>
              </IOSCard>
            );
          })}
        </div>
      )}

      {/* TIMELINE / SCHEDULE VIEW */}
      {viewMode === 'timeline' && (
        <div className="space-y-4">
          {filteredEvents.map((evt, idx) => (
            <IOSCard key={evt.id} className="p-6 border border-slate-200 dark:border-forest-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-forest-900 text-gold-400 flex flex-col items-center justify-center font-mono font-bold shrink-0 border border-forest-700">
                    <span className="text-xs uppercase">#{idx + 1}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 text-xs font-mono font-bold">
                        {evt.type}
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-500">{evt.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {evt.location}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenRegister(evt)}
                  className="px-5 py-2 rounded-xl bg-forest-800 text-gold-400 text-xs font-bold hover:bg-forest-700 transition-colors shrink-0"
                >
                  {evt.userRegistered ? 'Pass Ready' : 'Register'}
                </button>
              </div>
            </IOSCard>
          ))}
        </div>
      )}

      {/* CALENDAR AGENDA VIEW */}
      {viewMode === 'calendar' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <IOSCard key={evt.id} className="p-6 space-y-4 flex flex-col justify-between border border-slate-200 dark:border-forest-800">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-forest-900 text-gold-400 font-mono font-bold text-[10px]">
                    {evt.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{evt.time}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {evt.title}
                </h3>
                <p className="text-xs font-mono text-forest-700 dark:text-gold-400 font-semibold flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  {evt.date}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {evt.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-forest-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  {evt.registeredCount} attending
                </span>
                <button
                  onClick={() => handleOpenRegister(evt)}
                  className="px-4 py-1.5 rounded-xl bg-forest-800 text-gold-400 text-xs font-bold hover:bg-forest-700 transition-colors"
                >
                  {evt.userRegistered ? 'View Pass' : 'Register'}
                </button>
              </div>
            </IOSCard>
          ))}
        </div>
      )}

      {/* MULTI-STEP EVENT REGISTRATION MODAL */}
      <IOSModal
        isOpen={!!selectedEvent}
        onClose={handleCloseModal}
        title={selectedEvent?.title}
        subtitle="Complete your event registration pass"
      >
        {selectedEvent && (
          <div className="space-y-6 pt-2">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-forest-800 pb-3 font-mono text-xs font-bold">
              <span className={`flex items-center gap-1.5 ${regStep >= 1 ? 'text-gold-500' : 'text-slate-400'}`}>
                1. Overview
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className={`flex items-center gap-1.5 ${regStep >= 2 ? 'text-gold-500' : 'text-slate-400'}`}>
                2. Details
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className={`flex items-center gap-1.5 ${regStep === 3 ? 'text-emerald-400' : 'text-slate-400'}`}>
                3. Digital Pass
              </span>
            </div>

            {/* STEP 1: Overview */}
            {regStep === 1 && (
              <div className="space-y-4">
                <div className="rounded-2xl bg-forest-950 p-4 text-white space-y-2 border border-forest-800">
                  <span className="px-2.5 py-0.5 rounded-full bg-forest-900 text-gold-400 font-mono text-[10px] font-bold">
                    {selectedEvent.type}
                  </span>
                  <h3 className="text-base font-extrabold text-white">"{selectedEvent.theme}"</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-forest-200 pt-1">
                    <p>📅 {selectedEvent.date}</p>
                    <p>⏰ {selectedEvent.time}</p>
                  </div>
                  <p className="text-xs text-forest-300">📍 {selectedEvent.location}</p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedEvent.description}
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Confirmed Speakers:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEvent.speakers.map((s, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-forest-900 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-forest-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedToForm}
                    className="px-6 py-2.5 rounded-2xl bg-forest-800 hover:bg-forest-700 text-gold-400 font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center gap-2"
                  >
                    Proceed to Registration <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Registration Form */}
            {regStep === 2 && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Brother Ifeoluwa"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 800 000 0000"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Fellowship / Campus / State
                    </label>
                    <input
                      type="text"
                      value={fellowship}
                      onChange={(e) => setFellowship(e.target.value)}
                      placeholder="e.g. Ekiti State University / Lagos Fellowship"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Notes or Accommodation Inquiries
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Optional notes or prayer points for the gathering..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-200 dark:border-forest-800">
                  <button
                    type="button"
                    onClick={() => setRegStep(1)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-2xl bg-forest-800 hover:bg-forest-700 text-gold-400 font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center gap-2"
                  >
                    {isSubmitting ? 'Registering...' : 'Confirm Registration'}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Digital Pass / Confirmation */}
            {regStep === 3 && (
              <div className="text-center py-4 space-y-6 animate-ios-scale-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Registration Confirmed!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Your seat is reserved for {selectedEvent.title}. Present this ticket pass at the welcome desk.
                  </p>
                </div>

                {/* Digital Ticket Card */}
                <div className="rounded-3xl bg-forest-950 p-6 text-white text-left space-y-4 border border-gold-400/40 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-xl" />
                  
                  <div className="flex items-start justify-between border-b border-forest-800 pb-3">
                    <div>
                      <p className="text-[10px] font-mono font-bold text-gold-400 uppercase tracking-wider">Lively Stones Digital Pass</p>
                      <h4 className="text-base font-extrabold text-white">{selectedEvent.title}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-forest-900 text-gold-400 font-mono text-xs font-extrabold border border-forest-700">
                      {selectedEvent.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <p className="text-[10px] text-forest-400 uppercase">Attendee</p>
                      <p className="font-bold text-white truncate">{fullName || 'Registered Disciple'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-forest-400 uppercase">Ticket Code</p>
                      <p className="font-bold text-gold-400">{generatedTicket || 'TKT-LSK-8921'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-forest-400 uppercase">Date & Time</p>
                      <p className="font-bold text-white">{selectedEvent.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-forest-400 uppercase">Venue</p>
                      <p className="font-bold text-white truncate">{selectedEvent.location}</p>
                    </div>
                  </div>

                  {/* QR Code Simulation */}
                  <div className="pt-2 flex items-center justify-between border-t border-forest-800">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-inner flex items-center justify-center">
                        <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center text-[9px] font-mono font-black text-white text-center">
                          QR PASS
                        </div>
                      </div>
                      <div className="text-[10px] text-forest-300 font-mono">
                        <p className="font-bold text-white">Status: Verified</p>
                        <p>PIN: {selectedEvent.checkinPin || '777'}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(generatedTicket || 'TKT-LSK-8921', 'Ticket Code')}
                      className="px-3 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-gold-400 text-xs font-mono font-bold border border-forest-700 transition-colors"
                    >
                      Copy Ticket
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => generateIcsCalendarFile(selectedEvent)}
                    className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-forest-900 text-slate-900 dark:text-white text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200"
                  >
                    <Download className="w-4 h-4" /> Save to Calendar (.ics)
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 rounded-2xl bg-forest-800 text-gold-400 text-xs font-extrabold hover:bg-forest-700 shadow-md"
                  >
                    Done
                  </button>
                </div>

              </div>
            )}

          </div>
        )}
      </IOSModal>

    </div>
  );
};


