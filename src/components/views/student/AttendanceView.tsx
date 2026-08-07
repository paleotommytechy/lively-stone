import React, { useState, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { IOSModal } from '../../ios/IOSModal';
import { 
  CheckCircle2, 
  XCircle, 
  Calendar as CalendarIcon, 
  Clock, 
  Flame, 
  Award, 
  FileText, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  AlertCircle, 
  Search, 
  ChevronRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { AttendanceSession, SessionAttendanceStatus } from '../../../types';

export const AttendanceView: React.FC = () => {
  const { 
    student, 
    attendanceSessions, 
    checkinSession, 
    submitExcuse, 
    showToast 
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Session Check-In State
  const [checkinPin, setCheckinPin] = useState('');
  const [checkinNotes, setCheckinNotes] = useState('');
  const [activeSessionToCheckin, setActiveSessionToCheckin] = useState<AttendanceSession | null>(null);

  // Excuse Submission State
  const [isExcuseModalOpen, setIsExcuseModalOpen] = useState(false);
  const [excuseSessionId, setExcuseSessionId] = useState('');
  const [excuseCategory, setExcuseCategory] = useState('Outreach Mobilization');
  const [excuseReason, setExcuseReason] = useState('');

  // Certificate Modal State
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Find active session if any
  const liveSession = useMemo(() => {
    return attendanceSessions.find(s => s.isActive && (!s.attended || s.status === 'absent'));
  }, [attendanceSessions]);

  // Filtered session list
  const filteredSessions = useMemo(() => {
    return attendanceSessions.filter(sess => {
      const matchesStatus = 
        filterStatus === 'all' ||
        (filterStatus === 'attended' && sess.attended) ||
        (filterStatus === 'excused' && sess.status === 'excused') ||
        (filterStatus === 'absent' && !sess.attended && sess.status !== 'excused');
      
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query ||
        sess.title.toLowerCase().includes(query) ||
        sess.topic.toLowerCase().includes(query) ||
        sess.date.toLowerCase().includes(query) ||
        (sess.notes && sess.notes.toLowerCase().includes(query));

      return matchesStatus && matchesQuery;
    });
  }, [attendanceSessions, filterStatus, searchQuery]);

  const attendedCount = attendanceSessions.filter(s => s.attended).length;
  const excusedCount = attendanceSessions.filter(s => s.status === 'excused').length;
  const totalCount = attendanceSessions.length;

  const handleQuickCheckin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveSession) return;
    const pinToSubmit = checkinPin.trim() || '777';
    await checkinSession(liveSession.id, pinToSubmit, checkinNotes.trim() || undefined);
    setCheckinPin('');
    setCheckinNotes('');
    setActiveSessionToCheckin(null);
  };

  const handleExcuseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!excuseSessionId || !excuseReason.trim()) return;

    const fullExcuseText = `[${excuseCategory}] ${excuseReason.trim()}`;
    await submitExcuse(excuseSessionId, fullExcuseText);
    setIsExcuseModalOpen(false);
    setExcuseReason('');
    setExcuseSessionId('');
  };

  const handleDownloadTranscript = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in font-sans text-slate-900 dark:text-slate-100">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 text-xs font-mono font-bold border border-forest-700">
            <Award className="w-3.5 h-3.5" />
            DISCIPLESHIP FAITHFULNESS
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Attendance & Consistency Record
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Your steadfast participation in the School of Tyrannus builds apostolic capacity and spiritual discipline.
          </p>
        </div>

        {/* Quick Certificate & Transcript Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExcuseModalOpen(true)}
            className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-forest-900 hover:bg-slate-200 dark:hover:bg-forest-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
          >
            Submit Excuse
          </button>
          <button
            onClick={() => setIsCertModalOpen(true)}
            className="px-4 py-2 rounded-2xl bg-forest-800 hover:bg-forest-700 text-gold-400 text-xs font-extrabold transition-all shadow-md flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            Consistency Certificate
          </button>
        </div>
      </div>

      {/* Consistency Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Attendance Rate */}
        <IOSCard className="p-6 text-center space-y-2 border border-slate-200 dark:border-forest-800">
          <p className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider">Attendance Rate</p>
          <div className="flex items-center justify-center gap-1">
            <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white">
              {student.attendanceRate}%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Punctual & Active Participation</p>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-forest-900 overflow-hidden mt-2">
            <div 
              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${student.attendanceRate}%` }}
            />
          </div>
        </IOSCard>

        {/* Weekly Streak */}
        <IOSCard className="p-6 text-center space-y-2 border border-slate-200 dark:border-forest-800">
          <p className="text-xs font-mono font-bold text-amber-500 dark:text-gold-400 uppercase tracking-wider flex items-center justify-center gap-1">
            <Flame className="w-3.5 h-3.5 text-gold-400" /> Weekly Streak
          </p>
          <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white">
            {student.weeklyStreak} Weeks
          </span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Consecutive Gatherings Engaged</p>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-forest-900 overflow-hidden mt-2">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-gold-400 transition-all duration-700"
              style={{ width: `${Math.min(100, student.weeklyStreak * 20)}%` }}
            />
          </div>
        </IOSCard>

        {/* Sessions Attended */}
        <IOSCard className="p-6 text-center space-y-2 border border-slate-200 dark:border-forest-800">
          <p className="text-xs font-mono font-bold text-blue-500 dark:text-cyan-400 uppercase tracking-wider">Sessions Attended</p>
          <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white">
            {attendedCount} of {totalCount}
          </span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">School of Tyrannus Sessions</p>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-forest-900 overflow-hidden mt-2">
            <div 
              className="h-full rounded-full bg-blue-500 transition-all duration-700"
              style={{ width: `${totalCount > 0 ? (attendedCount / totalCount) * 100 : 100}%` }}
            />
          </div>
        </IOSCard>

        {/* Faithfulness Rating */}
        <IOSCard className="p-6 text-center space-y-2 border border-slate-200 dark:border-forest-800">
          <p className="text-xs font-mono font-bold text-purple-500 dark:text-purple-400 uppercase tracking-wider">Disciple Standing</p>
          <div className="flex items-center justify-center gap-1 text-purple-600 dark:text-purple-400 pt-1">
            <Award className="w-8 h-8" />
          </div>
          <p className="text-sm font-extrabold text-slate-900 dark:text-white">Apostolic Disciple</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Top 5% Consistency</p>
        </IOSCard>

      </div>

      {/* LIVE SESSION CHECK-IN CALLOUT */}
      {liveSession && (
        <div className="relative overflow-hidden rounded-3xl bg-forest-950 p-6 sm:p-8 text-white border border-gold-400/50 shadow-2xl animate-ios-scale-in">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SESSION IN PROGRESS NOW
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {liveSession.title}: {liveSession.topic}
              </h2>
              <p className="text-xs text-forest-200 leading-relaxed">
                Check in with the 3-digit session PIN announced during the live gathering to confirm your attendance and maintain your weekly streak.
              </p>
            </div>

            {/* Check-in Form */}
            <form onSubmit={handleQuickCheckin} className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <input
                type="text"
                maxLength={6}
                value={checkinPin}
                onChange={(e) => setCheckinPin(e.target.value)}
                placeholder="PIN (e.g. 777)"
                className="w-full sm:w-36 px-4 py-2.5 rounded-2xl bg-forest-900 border border-forest-700 text-center font-mono font-extrabold text-gold-400 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 placeholder:text-forest-400"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-gold-500 hover:bg-gold-400 text-forest-950 text-xs font-extrabold tracking-wider uppercase transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-forest-950" />
                Check In Now
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FILTER & SEARCH CONTROLS */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-2xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-800">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'all'
                ? 'bg-forest-800 text-gold-400 shadow-sm'
                : 'text-slate-600 dark:text-forest-200 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All ({attendanceSessions.length})
          </button>
          <button
            onClick={() => setFilterStatus('attended')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'attended'
                ? 'bg-forest-800 text-gold-400 shadow-sm'
                : 'text-slate-600 dark:text-forest-200 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Present ({attendedCount})
          </button>
          <button
            onClick={() => setFilterStatus('excused')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'excused'
                ? 'bg-forest-800 text-gold-400 shadow-sm'
                : 'text-slate-600 dark:text-forest-200 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Excused ({excusedCount})
          </button>
          <button
            onClick={() => setFilterStatus('absent')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'absent'
                ? 'bg-forest-800 text-gold-400 shadow-sm'
                : 'text-slate-600 dark:text-forest-200 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Missed ({attendanceSessions.length - attendedCount - excusedCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topic or date..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-forest-900 border border-slate-200 dark:border-forest-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
        </div>
      </div>

      {/* ATTENDANCE HISTORY LIST */}
      <div className="space-y-3">
        {filteredSessions.map((sess) => {
          const isPresent = sess.attended || sess.status === 'present';
          const isExcused = sess.status === 'excused';

          return (
            <IOSCard key={sess.id} className="p-5 border border-slate-200 dark:border-forest-800 hover:border-gold-400/40 transition-colors">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Left icon and details */}
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                    isPresent
                      ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                      : isExcused
                      ? 'bg-blue-500 text-white shadow-blue-500/20'
                      : 'bg-slate-200 dark:bg-forest-900 text-slate-400'
                  }`}>
                    {isPresent ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isExcused ? (
                      <FileText className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {sess.title}
                      </h3>
                      {sess.pillar && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-forest-900 text-[10px] font-mono font-bold text-slate-600 dark:text-gold-400 border border-slate-200 dark:border-forest-700">
                          {sess.pillar}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-forest-700 dark:text-gold-400">
                      Topic: {sess.topic}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {sess.date}
                      </span>
                      {sess.time && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {sess.time}
                        </span>
                      )}
                    </div>

                    {sess.notes && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 pt-0.5">
                        <strong className="text-slate-900 dark:text-white">Note: </strong>
                        {sess.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right status badge */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                    isPresent
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                      : isExcused
                      ? 'bg-blue-500/10 text-blue-600 dark:text-cyan-400 border-blue-500/30'
                      : 'bg-slate-100 dark:bg-forest-900 text-slate-500 border-slate-300 dark:border-forest-700'
                  }`}>
                    {isPresent ? 'Present' : isExcused ? 'Excused' : 'Missed'}
                  </span>

                  {!isPresent && !isExcused && sess.isActive && (
                    <button
                      onClick={() => {
                        setCheckinPin(sess.checkinPin || '777');
                        setActiveSessionToCheckin(sess);
                      }}
                      className="text-xs font-bold text-gold-400 hover:underline"
                    >
                      Check-in Now
                    </button>
                  )}
                </div>

              </div>
            </IOSCard>
          );
        })}
      </div>

      {/* EXCUSE SUBMISSION MODAL */}
      <IOSModal
        isOpen={isExcuseModalOpen}
        onClose={() => setIsExcuseModalOpen(false)}
        title="Submit Absence Excuse / Notice"
        subtitle="Notify Apostolic Mentors in advance"
      >
        <form onSubmit={handleExcuseSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Session *
            </label>
            <select
              required
              value={excuseSessionId}
              onChange={(e) => setExcuseSessionId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              <option value="">-- Choose gathering / session --</option>
              {attendanceSessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.date} — {s.title} ({s.topic})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Reason Category *
            </label>
            <select
              value={excuseCategory}
              onChange={(e) => setExcuseCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              <option value="Outreach Mobilization">Outreach & SSGI Secondary School Invasions</option>
              <option value="Academic / Work Commitment">Exams, Academic Lectures or Official Duty</option>
              <option value="Health / Emergency">Health Recovery / Family Emergency</option>
              <option value="Travel / Transit">Territorial Travel & Transit</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Brief Explanation *
            </label>
            <textarea
              required
              rows={3}
              value={excuseReason}
              onChange={(e) => setExcuseReason(e.target.value)}
              placeholder="Provide a brief explanation for your mentor..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-forest-800">
            <button
              type="button"
              onClick={() => setIsExcuseModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl bg-forest-800 hover:bg-forest-700 text-gold-400 font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Excuse Note
            </button>
          </div>
        </form>
      </IOSModal>

      {/* CERTIFICATE OF CONSISTENCY MODAL */}
      <IOSModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        title="Discipleship Consistency Certificate"
        subtitle="Official Verification of Spiritual Faithfulness"
      >
        <div className="space-y-6 pt-2">
          {/* Certificate Design */}
          <div className="rounded-3xl bg-forest-950 p-6 sm:p-8 text-white border-4 border-gold-400/60 shadow-2xl relative overflow-hidden text-center space-y-4">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-1">
              <p className="text-[11px] font-mono font-bold text-gold-400 uppercase tracking-widest">
                LIVELY STONES INTERNATIONAL NETWORK
              </p>
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-white tracking-wide">
                Certificate of Consistency & Faithfulness
              </h2>
              <p className="text-[10px] font-mono text-forest-300 uppercase">
                School of Tyrannus Discipleship Operating System
              </p>
            </div>

            <div className="w-16 h-0.5 bg-gold-400 mx-auto" />

            <div className="space-y-2 py-2">
              <p className="text-xs text-forest-200">This officially certifies that</p>
              <h3 className="text-2xl font-extrabold text-gold-400 font-serif">
                {student.name}
              </h3>
              <p className="text-xs text-forest-200 max-w-md mx-auto leading-relaxed">
                has demonstrated steadfast obedience, active participation, and consecrated attendance across the School of Tyrannus gatherings.
              </p>
            </div>

            {/* Stats Badge */}
            <div className="grid grid-cols-3 gap-2 bg-forest-900/80 p-3 rounded-2xl border border-forest-700/80 text-center font-mono">
              <div>
                <p className="text-[9px] text-forest-300 uppercase">Attendance Rate</p>
                <p className="text-base font-extrabold text-white">{student.attendanceRate}%</p>
              </div>
              <div>
                <p className="text-[9px] text-forest-300 uppercase">Weekly Streak</p>
                <p className="text-base font-extrabold text-gold-400">{student.weeklyStreak} Wks</p>
              </div>
              <div>
                <p className="text-[9px] text-forest-300 uppercase">Current Pillar</p>
                <p className="text-base font-extrabold text-emerald-400">{student.currentPillar}</p>
              </div>
            </div>

            {/* Apostolic Seal & Signature */}
            <div className="pt-4 flex items-center justify-between border-t border-forest-800 text-xs font-mono">
              <div className="text-left">
                <p className="font-bold text-white">Saint Abraham Babatunde</p>
                <p className="text-[10px] text-forest-400">Apostolic Mentor & Leader</p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-gold-400/60 flex items-center justify-center text-gold-400 font-bold text-[9px] uppercase shadow-lg">
                SEAL
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleDownloadTranscript}
              className="px-6 py-2.5 rounded-2xl bg-forest-800 hover:bg-forest-700 text-gold-400 font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Print / Export Certificate
            </button>
          </div>
        </div>
      </IOSModal>

    </div>
  );
};


