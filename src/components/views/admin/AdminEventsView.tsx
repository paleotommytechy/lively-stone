import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Card } from '../../ui/Card';
import { IOSModal } from '../../ios/IOSModal';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Download, 
  CheckCircle2, 
  Video, 
  Globe, 
  Ticket, 
  ExternalLink,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { MinistryEvent, MinistryEventType, VenueType } from '../../../types';

export const AdminEventsView: React.FC = () => {
  const { 
    events, 
    createEventByAdmin, 
    deleteEventByAdmin, 
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventType, setSelectedEventType] = useState<string>('All');
  
  // Create Event Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<MinistryEventType>('Convention');
  const [category, setCategory] = useState('Annual Gathering');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('8:00 AM & 4:30 PM WAT');
  const [location, setLocation] = useState('Lively Stones Apostolic Center, Ado-Ekiti, Nigeria');
  const [venueType, setVenueType] = useState<VenueType>('hybrid');
  const [onlineLink, setOnlineLink] = useState('');
  const [theme, setTheme] = useState('');
  const [description, setDescription] = useState('');
  const [speakersInput, setSpeakersInput] = useState('Saint Abraham Babatunde, Apostolic Elders');
  const [bannerUrl, setBannerUrl] = useState('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80');
  const [maxCapacity, setMaxCapacity] = useState<number>(2000);
  const [checkinPin, setCheckinPin] = useState('777');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // View Attendees Modal State
  const [rosterEvent, setRosterEvent] = useState<MinistryEvent | null>(null);
  const [attendeeSearch, setAttendeeSearch] = useState('');
  const [mockAttendees, setMockAttendees] = useState([
    { id: 'att-1', name: 'Brother David O.', email: 'david@livelystone.org', phone: '+234 803 112 3456', status: 'attended', code: 'TKT-LSK-8921' },
    { id: 'att-2', name: 'Sister Grace A.', email: 'grace@livelystone.org', phone: '+234 802 445 6789', status: 'registered', code: 'TKT-LSK-4012' },
    { id: 'att-3', name: 'Brother Emmanuel K.', email: 'emmanuel@livelystone.org', phone: '+234 809 778 9901', status: 'registered', code: 'TKT-LSK-5510' },
    { id: 'att-4', name: 'Sister Faith B.', email: 'faith@livelystone.org', phone: '+234 814 332 1190', status: 'attended', code: 'TKT-LSK-9902' },
    { id: 'att-5', name: 'Brother Joshua T.', email: 'joshua@livelystone.org', phone: '+234 816 889 0044', status: 'registered', code: 'TKT-LSK-1123' },
  ]);

  const filteredEvents = events.filter(evt => {
    const matchesType = selectedEventType === 'All' || evt.type === selectedEventType;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query ||
      evt.title.toLowerCase().includes(query) ||
      evt.theme.toLowerCase().includes(query) ||
      evt.location.toLowerCase().includes(query);
    return matchesType && matchesQuery;
  });

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !theme.trim()) {
      showToast('Validation Error', 'Title, date, and theme are required.', 'warning');
      return;
    }

    setIsSubmitting(true);
    const speakersArray = speakersInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    try {
      await createEventByAdmin({
        title: title.trim(),
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        type,
        category,
        date: date.trim(),
        time: time.trim(),
        startDate: new Date().toISOString(),
        location: location.trim(),
        venueType,
        onlineLink: onlineLink.trim() || undefined,
        theme: theme.trim(),
        description: description.trim(),
        speakers: speakersArray.length > 0 ? speakersArray : ['Saint Abraham Babatunde'],
        bannerUrl: bannerUrl.trim(),
        registrationOpen: true,
        maxCapacity: Number(maxCapacity) || 1000,
        checkinPin: checkinPin.trim() || '777',
        requiresCheckin: true,
      });

      setIsCreateModalOpen(false);
      resetForm();
    } catch (err) {
      console.error('Failed to create event:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setType('Convention');
    setDate('');
    setTheme('');
    setDescription('');
    setOnlineLink('');
  };

  const handleDelete = async (evt: MinistryEvent) => {
    if (window.confirm(`Are you sure you want to archive "${evt.title}"?`)) {
      await deleteEventByAdmin(evt.id);
    }
  };

  const toggleAttendeeStatus = (id: string) => {
    setMockAttendees(prev =>
      prev.map(a =>
        a.id === id
          ? { ...a, status: a.status === 'attended' ? 'registered' : 'attended' }
          : a
      )
    );
    showToast('Attendee Updated', 'Attendance confirmation status saved.', 'info');
  };

  const exportAttendeesCSV = () => {
    const headers = 'Name,Email,Phone,Status,Ticket Code\n';
    const rows = mockAttendees.map(a => `"${a.name}","${a.email}","${a.phone}","${a.status}","${a.code}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${rosterEvent?.slug || 'event'}-attendees.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Export Complete', 'Attendees roster downloaded as CSV.', 'success');
  };

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in font-sans text-slate-900 dark:text-slate-100">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 text-xs font-mono font-bold border border-forest-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            ADMINISTRATIVE CONVOCATIONS HUB
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Conventions & Gatherings Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Publish kingdom convocations, manage registrations, issue digital passes, and monitor seating capacity.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-2.5 rounded-2xl bg-forest-800 hover:bg-forest-700 text-gold-400 font-extrabold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create New Event
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 space-y-1 border border-slate-200 dark:border-forest-800">
          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Total Convocations</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{events.length}</p>
          <p className="text-[11px] text-forest-700 dark:text-gold-400 font-semibold">Scheduled in 2026</p>
        </Card>

        <Card className="p-5 space-y-1 border border-slate-200 dark:border-forest-800">
          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Total Registrations</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {events.reduce((acc, curr) => acc + (curr.registeredCount || 0), 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-500 font-semibold">Active Digital Passes</p>
        </Card>

        <Card className="p-5 space-y-1 border border-slate-200 dark:border-forest-800">
          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Capacity Utilization</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">78%</p>
          <p className="text-[11px] text-blue-500 font-semibold">High Engagement Rate</p>
        </Card>

        <Card className="p-5 space-y-1 border border-slate-200 dark:border-forest-800">
          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Upcoming Outreach</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">SSGI Missions</p>
          <p className="text-[11px] text-purple-400 font-semibold">18 Secondary Schools</p>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search convocations, themes, or locations..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-forest-900 border border-slate-200 dark:border-forest-800 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-2xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-800">
          {['All', 'Convention', 'Retreat', 'Evangelism', 'Class', 'Prayer Gathering'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedEventType(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedEventType === t
                  ? 'bg-forest-800 text-gold-400 shadow-sm'
                  : 'text-slate-600 dark:text-forest-200 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Events Roster Grid */}
      <div className="space-y-4">
        {filteredEvents.map((evt) => {
          const cap = evt.maxCapacity || 1000;
          const pct = Math.min(100, Math.round((evt.registeredCount / cap) * 100));

          return (
            <Card key={evt.id} className="p-6 border border-slate-200 dark:border-forest-800 hover:border-gold-400/40 transition-colors">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                
                {/* Event info */}
                <div className="flex items-start gap-4 max-w-2xl">
                  <img 
                    src={evt.bannerUrl} 
                    alt={evt.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 border border-forest-700/60 shadow-md"
                  />
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-forest-900 text-gold-400 font-mono text-[10px] font-bold border border-forest-700">
                        {evt.type}
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-semibold">
                        PIN: {evt.checkinPin || '777'}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                      {evt.title}
                    </h3>
                    <p className="text-xs font-bold text-forest-700 dark:text-gold-400">
                      "{evt.theme}"
                    </p>
                    <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      📅 {evt.date} • ⏰ {evt.time} • 📍 {evt.location}
                    </p>
                  </div>
                </div>

                {/* Capacity & Action Controls */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between w-full lg:w-auto gap-3 shrink-0">
                  <div className="space-y-1 text-left lg:text-right w-full sm:w-48">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                      <span>{evt.registeredCount} Registered</span>
                      <span>{cap} Max</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-forest-900 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-forest-700 to-gold-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        setRosterEvent(evt);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-gold-400 text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5" /> View Roster
                    </button>
                    <button
                      onClick={() => handleDelete(evt)}
                      className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      title="Archive Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </Card>
          );
        })}
      </div>

      {/* CREATE EVENT MODAL */}
      <IOSModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Convocation / Gathering"
        subtitle="Publish to the public events directory"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2 max-h-[75vh] overflow-y-auto no-scrollbar pr-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Lively Stones Annual Kingdom Convention 2026"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Event Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as MinistryEventType)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <option value="Convention">Annual Convention</option>
                <option value="Retreat">Leadership Retreat</option>
                <option value="Evangelism">SSGI Evangelism Outreach</option>
                <option value="Class">School of Tyrannus Seminar</option>
                <option value="Prayer Gathering">All-Night Prayer Vigil</option>
                <option value="Workshop">Theology Workshop</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Venue Type
              </label>
              <select
                value={venueType}
                onChange={(e) => setVenueType(e.target.value as VenueType)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <option value="in-person">In-Person Only</option>
                <option value="hybrid">Hybrid (In-Person + Live Stream)</option>
                <option value="online">Online Broadcast Only</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Date Display *
              </label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. November 18-22, 2026"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Time / Sessions
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 8:00 AM & 4:30 PM WAT"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Apostolic Theme *
            </label>
            <input
              type="text"
              required
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g. Transformed Disciples: Taking the Nations"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Physical Location / Auditorium
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Main Auditorium, Lively Stones Center, Ado-Ekiti"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Detailed Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the burden, teaching series, and discipleship outcomes for this gathering..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Seating Capacity
              </label>
              <input
                type="number"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Check-in PIN
              </label>
              <input
                type="text"
                value={checkinPin}
                onChange={(e) => setCheckinPin(e.target.value)}
                placeholder="777"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400 font-mono"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-forest-800">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-2xl bg-forest-800 hover:bg-forest-700 text-gold-400 font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center gap-2"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Convocation'}
            </button>
          </div>
        </form>
      </IOSModal>

      {/* EVENT ROSTER MODAL */}
      <IOSModal
        isOpen={!!rosterEvent}
        onClose={() => setRosterEvent(null)}
        title={rosterEvent ? `Attendees: ${rosterEvent.title}` : 'Event Roster'}
        subtitle="Manage confirmed registrations & tickets"
      >
        {rosterEvent && (
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <input
                type="text"
                value={attendeeSearch}
                onChange={(e) => setAttendeeSearch(e.target.value)}
                placeholder="Search attendee by name or ticket code..."
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
              />
              <button
                onClick={exportAttendeesCSV}
                className="px-4 py-2 rounded-xl bg-forest-800 text-gold-400 text-xs font-bold flex items-center gap-1.5 hover:bg-forest-700 shrink-0"
              >
                <Download className="w-3.5 h-3.5" /> Export CSV Roster
              </button>
            </div>

            {/* Attendees Table */}
            <div className="border border-slate-200 dark:border-forest-800 rounded-2xl overflow-hidden max-h-80 overflow-y-auto no-scrollbar">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-slate-50 dark:bg-forest-900/80 border-b border-slate-200 dark:border-forest-800 text-slate-500 dark:text-slate-400 font-mono uppercase">
                  <tr>
                    <th className="px-4 py-3">Attendee</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Ticket Pass</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-forest-800">
                  {mockAttendees.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-forest-900/40">
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                        {a.name}
                      </td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-mono">
                        {a.email}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-gold-400">
                        {a.code}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                          a.status === 'attended'
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30'
                        }`}>
                          {a.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => toggleAttendeeStatus(a.id)}
                          className="text-xs font-bold text-forest-700 dark:text-gold-400 hover:underline"
                        >
                          {a.status === 'attended' ? 'Mark Registered' : 'Confirm Presence'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setRosterEvent(null)}
                className="px-6 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </IOSModal>

    </div>
  );
};
