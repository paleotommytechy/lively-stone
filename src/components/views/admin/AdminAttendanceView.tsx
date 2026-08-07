import React, { useState, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import { Card } from '../../ui/Card';
import { IOSModal } from '../../ios/IOSModal';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar as CalendarIcon, 
  Users, 
  Plus, 
  Download, 
  Search, 
  ShieldCheck, 
  FileText, 
  Award, 
  Flame, 
  AlertCircle,
  UserCheck,
  Send,
  Sparkles
} from 'lucide-react';
import { AttendanceSession, SessionAttendanceStatus, PillarStage } from '../../../types';

export const AdminAttendanceView: React.FC = () => {
  const { 
    studentsList, 
    attendanceSessions, 
    adminCreateAttendanceSession, 
    adminMarkStudentAttendance, 
    showToast 
  } = useApp();

  const [selectedSessionId, setSelectedSessionId] = useState<string>(attendanceSessions[0]?.id || 'att-100');
  const [studentSearch, setStudentSearch] = useState('');
  const [pillarFilter, setPillarFilter] = useState<string>('All');
  
  // Create Session Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [sessionDate, setSessionDate] = useState(new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }));
  const [sessionTime, setSessionTime] = useState('5:00 PM - 7:30 PM WAT');
  const [sessionType, setSessionType] = useState<'Tyrannus' | 'Bible Study' | 'Prayer Meeting' | 'Special'>('Tyrannus');
  const [pillar, setPillar] = useState<PillarStage>('Grow');
  const [checkinPin, setCheckinPin] = useState('777');

  // Pending Excuse Requests State
  const [excuseQueue, setExcuseQueue] = useState([
    {
      id: 'exc-1',
      studentName: 'Brother Emmanuel K.',
      studentEmail: 'emmanuel@livelystone.org',
      sessionTitle: 'School of Tyrannus: Session 28',
      category: 'Outreach & Missions',
      reason: 'Led secondary school devotions during the morning assembly at King’s College Lagos.',
      date: 'July 20, 2026',
      status: 'pending',
    },
    {
      id: 'exc-2',
      studentName: 'Sister Grace A.',
      studentEmail: 'grace@livelystone.org',
      sessionTitle: 'School of Tyrannus: Session 24',
      category: 'Academic Lectures',
      reason: 'Final year university laboratory examination scheduled during evening gathering.',
      date: 'June 22, 2026',
      status: 'approved',
    }
  ]);

  // Current selected session
  const activeSession = useMemo(() => {
    return attendanceSessions.find(s => s.id === selectedSessionId) || attendanceSessions[0];
  }, [attendanceSessions, selectedSessionId]);

  // Filter students roster
  const filteredStudents = useMemo(() => {
    return studentsList.filter(s => {
      const matchesPillar = pillarFilter === 'All' || s.currentPillar === pillarFilter;
      const query = studentSearch.toLowerCase().trim();
      const matchesQuery = !query ||
        s.name.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.location.toLowerCase().includes(query);
      return matchesPillar && matchesQuery;
    });
  }, [studentsList, pillarFilter, studentSearch]);

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !topic.trim()) {
      showToast('Validation Error', 'Title and topic are required.', 'warning');
      return;
    }

    adminCreateAttendanceSession({
      title: title.trim(),
      topic: topic.trim(),
      date: sessionDate.trim(),
      time: sessionTime.trim(),
      sessionType,
      pillar,
      checkinPin: checkinPin.trim() || '777',
      isActive: true,
      status: 'absent',
    });

    setIsCreateModalOpen(false);
    setTitle('');
    setTopic('');
  };

  const handleMarkStatus = (studentId: string, status: SessionAttendanceStatus) => {
    if (!activeSession) return;
    adminMarkStudentAttendance(activeSession.id, studentId, status);
  };

  const handleMarkAllPresent = () => {
    if (!activeSession) return;
    filteredStudents.forEach(s => {
      adminMarkStudentAttendance(activeSession.id, s.id, 'present');
    });
    showToast('Batch Roll Call Saved', `All ${filteredStudents.length} disciples marked present for ${activeSession.title}.`, 'success');
  };

  const handleApproveExcuse = (excuseId: string) => {
    setExcuseQueue(prev =>
      prev.map(e => e.id === excuseId ? { ...e, status: 'approved' } : e)
    );
    showToast('Excuse Approved', 'Absence marked as excused without streak penalty.', 'success');
  };

  const exportAttendanceCSV = () => {
    const headers = 'Disciple Name,Email,Location,Pillar,Attendance Rate,Weekly Streak,Status,Session\n';
    const rows = filteredStudents.map(s => 
      `"${s.name}","${s.email}","${s.location}","${s.currentPillar}","${s.attendanceRate}%","${s.weeklyStreak} Wks","Present","${activeSession?.title || 'Session'}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `attendance-roster-${activeSession?.date || '2026'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Export Complete', 'Discipleship attendance roster downloaded.', 'success');
  };

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in font-sans text-slate-900 dark:text-slate-100">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 text-xs font-mono font-bold border border-forest-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            DISCIPLESHIP ROLL-CALL & CONSISTENCY
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Attendance Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage gathering sessions, conduct interactive roll-calls, review excuse notices, and track discipleship faithfulness.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportAttendanceCSV}
            className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-forest-900 hover:bg-slate-200 dark:hover:bg-forest-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export Report
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-2.5 rounded-2xl bg-forest-800 hover:bg-forest-700 text-gold-400 font-extrabold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Session
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 space-y-1 border border-slate-200 dark:border-forest-800">
          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Average Attendance Rate</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">92%</p>
          <p className="text-[11px] text-emerald-500 font-semibold">High Punctuality Index</p>
        </Card>

        <Card className="p-5 space-y-1 border border-slate-200 dark:border-forest-800">
          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Active Enrolled Disciples</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {studentsList.length}
          </p>
          <p className="text-[11px] text-forest-700 dark:text-gold-400 font-semibold">School of Tyrannus</p>
        </Card>

        <Card className="p-5 space-y-1 border border-slate-200 dark:border-forest-800">
          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Total Sessions Recorded</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {attendanceSessions.length}
          </p>
          <p className="text-[11px] text-blue-500 font-semibold">Weekly Gatherings</p>
        </Card>

        <Card className="p-5 space-y-1 border border-slate-200 dark:border-forest-800">
          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Pending Excuses</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-gold-400 font-mono">
            {excuseQueue.filter(e => e.status === 'pending').length}
          </p>
          <p className="text-[11px] text-purple-400 font-semibold">Awaiting Mentor Review</p>
        </Card>
      </div>

      {/* SESSION SELECTOR & ROLL-CALL HEADER */}
      <Card className="p-6 border border-slate-200 dark:border-forest-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-forest-800 pb-4">
          
          <div className="space-y-1">
            <label className="block text-xs font-mono font-bold text-slate-400 uppercase">
              Current Active Gathering / Roll-Call
            </label>
            <select
              value={selectedSessionId}
              onChange={(e) => setSelectedSessionId(e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              {attendanceSessions.map((sess) => (
                <option key={sess.id} value={sess.id}>
                  {sess.date} — {sess.title} ({sess.topic}) {sess.isActive ? '🔥 [LIVE]' : ''}
                </option>
              ))}
            </select>
          </div>

          {activeSession && (
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-xl bg-forest-900/80 border border-forest-700 text-gold-400 font-bold">
                Check-in PIN: {activeSession.checkinPin || '777'}
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-forest-900/80 border border-forest-700 text-emerald-400 font-bold">
                Pillar: {activeSession.pillar || 'Grow'}
              </div>
              <button
                onClick={handleMarkAllPresent}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shadow-sm"
              >
                Mark All as Present
              </button>
            </div>
          )}

        </div>

        {/* Filter and Search Disciples */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              placeholder="Search disciple by name, email, or city..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {['All', 'Learn', 'Grow', 'Live', 'Serve', 'Disciple', 'Multiply'].map((p) => (
              <button
                key={p}
                onClick={() => setPillarFilter(p)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  pillarFilter === p
                    ? 'bg-forest-800 text-gold-400 shadow-sm'
                    : 'text-slate-500 dark:text-forest-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* DISCIPLES ROLL CALL TABLE */}
        <div className="border border-slate-200 dark:border-forest-800 rounded-2xl overflow-hidden max-h-96 overflow-y-auto no-scrollbar">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 dark:bg-forest-900/80 border-b border-slate-200 dark:border-forest-800 text-slate-500 dark:text-slate-400 font-mono uppercase">
              <tr>
                <th className="px-4 py-3">Disciple</th>
                <th className="px-4 py-3">Location & Pillar</th>
                <th className="px-4 py-3">Streak & Rate</th>
                <th className="px-4 py-3">Today's Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-forest-800">
              {filteredStudents.map((std) => (
                <tr key={std.id} className="hover:bg-slate-50 dark:hover:bg-forest-900/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={std.avatarUrl} 
                        alt={std.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-gold-400/40"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{std.name}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{std.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono">
                    <p className="font-bold text-slate-800 dark:text-slate-200">{std.location}</p>
                    <span className="px-2 py-0.5 rounded bg-forest-900 text-gold-400 text-[10px] font-bold">
                      {std.currentPillar}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono">
                    <p className="font-bold text-emerald-500">{std.attendanceRate}% Rate</p>
                    <p className="text-[11px] text-gold-400">{std.weeklyStreak} Wks Active</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                      PRESENT
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleMarkStatus(std.id, 'present')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-colors"
                        title="Mark Present"
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleMarkStatus(std.id, 'excused')}
                        className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-cyan-400 text-xs font-bold transition-colors"
                        title="Mark Excused"
                      >
                        Excuse
                      </button>
                      <button
                        onClick={() => handleMarkStatus(std.id, 'absent')}
                        className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold transition-colors"
                        title="Mark Absent"
                      >
                        Absent
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* EXCUSE NOTICES REVIEW QUEUE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Student Absence Notices & Excuses
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review reasons submitted by disciples for missing gatherings and maintain grace with accountability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {excuseQueue.map((exc) => (
            <Card key={exc.id} className="p-5 space-y-3 border border-slate-200 dark:border-forest-800">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-forest-900 text-gold-400 font-mono text-[10px] font-bold">
                    {exc.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white pt-1">
                    {exc.studentName}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">{exc.sessionTitle}</p>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                  exc.status === 'approved'
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30'
                }`}>
                  {exc.status.toUpperCase()}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-forest-900/60 p-3 rounded-xl border border-slate-200 dark:border-forest-800">
                "{exc.reason}"
              </p>

              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="font-mono text-slate-400">Date: {exc.date}</span>
                {exc.status === 'pending' && (
                  <button
                    onClick={() => handleApproveExcuse(exc.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-gold-400 font-bold transition-colors"
                  >
                    Approve Notice
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CREATE SESSION MODAL */}
      <IOSModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Discipleship Session"
        subtitle="Open roll-call for School of Tyrannus"
      >
        <form onSubmit={handleCreateSession} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Session Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. School of Tyrannus: Session 30"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Topic / Doctrine Focus *
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. The Apostolic Pattern of Multiplying Disciples"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Session Type
              </label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <option value="Tyrannus">School of Tyrannus (General)</option>
                <option value="Bible Study">Mid-Week Bible Exegesis</option>
                <option value="Prayer Meeting">Upper Room Prayer Gathering</option>
                <option value="Special">Special Impartation Session</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Pillar Stage
              </label>
              <select
                value={pillar}
                onChange={(e) => setPillar(e.target.value as PillarStage)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <option value="Learn">1. Learn (Scripture & Foundations)</option>
                <option value="Grow">2. Grow (Prayer & Capacities)</option>
                <option value="Live">3. Live (Character & Consecration)</option>
                <option value="Serve">4. Serve (Ministry & Leadership)</option>
                <option value="Disciple">5. Disciple (Shepherding Others)</option>
                <option value="Multiply">6. Multiply (Apostolic Expansion)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Date
              </label>
              <input
                type="text"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
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
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-forest-900 border border-slate-200 dark:border-forest-700 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none"
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
              className="px-6 py-2.5 rounded-2xl bg-forest-800 hover:bg-forest-700 text-gold-400 font-extrabold text-xs tracking-wider uppercase shadow-md"
            >
              Open Session Roll Call
            </button>
          </div>
        </form>
      </IOSModal>

    </div>
  );
};
