import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  HeartHandshake, 
  BookOpen, 
  Shield, 
  Lock, 
  Users, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Flame, 
  Calendar, 
  FileEdit,
  Send,
  MessageSquare
} from 'lucide-react';

export type PrayerPrivacy = 'private' | 'mentor_only' | 'prayer_team' | 'small_group' | 'community';

export interface PrayerJournalEntry {
  id: string;
  title: string;
  content: string;
  scriptureRef?: string;
  date: string;
}

export interface PrayerRequestItem {
  id: string;
  title: string;
  description: string;
  category: string;
  privacy: PrayerPrivacy;
  isAnswered: boolean;
  answeredTestimony?: string;
  prayingCount: number;
  isPraying?: boolean;
  createdAt: string;
}

export const PrayerSystemView: React.FC = () => {
  const { showToast } = useApp();
  
  const [activeTab, setActiveTab] = useState<'focus' | 'journal' | 'requests' | 'answered'>('focus');

  // Prayer Journal Entries
  const [journalEntries, setJournalEntries] = useState<PrayerJournalEntry[]>([
    {
      id: 'pj-1',
      title: 'Morning Fellowship & Guidance',
      content: 'Lord, grant me wisdom to walk faithfully today in the School of Tyrannus sessions.',
      scriptureRef: 'Proverbs 3:5-6',
      date: 'Today'
    }
  ]);

  // Prayer Requests
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequestItem[]>([
    {
      id: 'pr-1',
      title: 'Grace for Secondary School Evangelism (SSGI)',
      description: 'Praying for 1,000 Bibles and salvation of students across South-West Nigeria.',
      category: 'Missions',
      privacy: 'community',
      isAnswered: false,
      prayingCount: 24,
      isPraying: true,
      createdAt: '2 days ago'
    },
    {
      id: 'pr-2',
      title: 'Personal Family Healing',
      description: 'Trusting God for complete physical restoration.',
      category: 'Health',
      privacy: 'mentor_only',
      isAnswered: true,
      answeredTestimony: 'Praise God! Complete healing verified by physicians.',
      prayingCount: 8,
      isPraying: false,
      createdAt: '1 week ago'
    }
  ]);

  // New Request Form state
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('Personal');
  const [newPrivacy, setNewPrivacy] = useState<PrayerPrivacy>('community');
  const [showNewModal, setShowNewModal] = useState<boolean>(false);

  // New Journal Form state
  const [journalTitle, setJournalTitle] = useState<string>('');
  const [journalContent, setJournalContent] = useState<string>('');
  const [journalScripture, setJournalScripture] = useState<string>('');

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newReq: PrayerRequestItem = {
      id: `pr-${Date.now()}`,
      title: newTitle.trim(),
      description: newDescription.trim(),
      category: newCategory,
      privacy: newPrivacy,
      isAnswered: false,
      prayingCount: 1,
      isPraying: true,
      createdAt: 'Just now'
    };

    setPrayerRequests(prev => [newReq, ...prev]);
    setNewTitle('');
    setNewDescription('');
    setShowNewModal(false);
    showToast('Prayer Request Created', `Your prayer request is saved under "${newPrivacy}" privacy level.`);
  };

  const handleCreateJournalEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalTitle.trim() || !journalContent.trim()) return;

    const newJ: PrayerJournalEntry = {
      id: `pj-${Date.now()}`,
      title: journalTitle.trim(),
      content: journalContent.trim(),
      scriptureRef: journalScripture.trim() || undefined,
      date: 'Just now'
    };

    setJournalEntries(prev => [newJ, ...prev]);
    setJournalTitle('');
    setJournalContent('');
    setJournalScripture('');
    showToast('Journal Entry Saved', 'Private prayer journal updated.');
  };

  const handleTogglePraying = (id: string) => {
    setPrayerRequests(prev =>
      prev.map(r => {
        if (r.id === id) {
          const isNowPraying = !r.isPraying;
          return {
            ...r,
            isPraying: isNowPraying,
            prayingCount: isNowPraying ? r.prayingCount + 1 : r.prayingCount - 1
          };
        }
        return r;
      })
    );
    showToast('Prayer Supported', 'You are standing in prayer for this request.');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-ios-fade-in text-slate-900 dark:text-slate-100">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-emerald-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-mono font-bold border border-emerald-700/50 inline-flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-emerald-300" />
              LIVELY STONES PRAYER ECOSYSTEM
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Communion & Intercession
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl font-medium">
              "The effectual fervent prayer of a righteous man availeth much." — James 5:16
            </p>
          </div>

          <button
            onClick={() => setShowNewModal(true)}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all ios-active"
          >
            <Plus className="w-4 h-4" />
            New Prayer Request
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('focus')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'focus' ? 'bg-white dark:bg-slate-800 shadow-md text-emerald-700 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Daily Focus
        </button>

        <button
          onClick={() => setActiveTab('journal')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'journal' ? 'bg-white dark:bg-slate-800 shadow-md text-emerald-700 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Private Journal ({journalEntries.length})
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'requests' ? 'bg-white dark:bg-slate-800 shadow-md text-emerald-700 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Prayer Requests ({prayerRequests.filter(r => !r.isAnswered).length})
        </button>

        <button
          onClick={() => setActiveTab('answered')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'answered' ? 'bg-white dark:bg-slate-800 shadow-md text-emerald-700 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Answered Testimonies ({prayerRequests.filter(r => r.isAnswered).length})
        </button>
      </div>

      {/* TAB 1: DAILY PRAYER FOCUS */}
      {activeTab === 'focus' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Today's Apostolic Prayer Focus
              </span>
              <span className="text-xs font-mono text-slate-400">August 2026</span>
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Praying for Spiritual Endurance & Holiness
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              "Father, sanctify our hearts through Your truth. Empower every disciple in the School of Tyrannus to walk blameless, filled with the Holy Ghost, and zealous for good works."
            </p>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                Ephesians 3:16-19
              </span>
              <button 
                onClick={() => showToast('Prayer Session Logged', 'Logged 15 minutes of intercession.')}
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md"
              >
                Log 15 Mins Prayer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRIVATE JOURNAL */}
      {activeTab === 'journal' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FileEdit className="w-4 h-4 text-emerald-600" />
              Write Journal Entry
            </h3>

            <form onSubmit={handleCreateJournalEntry} className="space-y-3">
              <input 
                type="text" 
                value={journalTitle} 
                onChange={(e) => setJournalTitle(e.target.value)} 
                placeholder="Entry title..." 
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <textarea 
                rows={4}
                value={journalContent} 
                onChange={(e) => setJournalContent(e.target.value)} 
                placeholder="Write private prayer thoughts..." 
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <input 
                type="text" 
                value={journalScripture} 
                onChange={(e) => setJournalScripture(e.target.value)} 
                placeholder="Scripture reference (e.g. Psalm 23)..." 
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <button 
                type="submit" 
                className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-xs"
              >
                Save Private Entry
              </button>
            </form>
          </div>

          <div className="md:col-span-2 space-y-3">
            {journalEntries.map((j) => (
              <div key={j.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-white">{j.title}</span>
                  <span className="text-slate-400 font-mono">{j.date}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {j.content}
                </p>
                {j.scriptureRef && (
                  <span className="inline-block text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
                    {j.scriptureRef}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PRAYER REQUESTS */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {prayerRequests.filter(r => !r.isAnswered).map((req) => (
            <div key={req.id} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold uppercase">
                    {req.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-mono font-bold capitalize">
                    {req.privacy.replace('_', ' ')} Privacy
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">{req.createdAt}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {req.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {req.description}
              </p>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleTogglePraying(req.id)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    req.isPraying ? 'bg-emerald-800 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  {req.isPraying ? 'Praying' : 'Stand in Prayer'} ({req.prayingCount})
                </button>

                <button 
                  onClick={() => {
                    setPrayerRequests(prev => prev.map(p => p.id === req.id ? { ...p, isAnswered: true, answeredTestimony: 'Praise God! Prayer answered.' } : p));
                    showToast('Testimony Recorded', 'Marked prayer request as answered!');
                  }}
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  Mark as Answered
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: ANSWERED TESTIMONIES */}
      {activeTab === 'answered' && (
        <div className="space-y-4">
          {prayerRequests.filter(r => r.isAnswered).map((req) => (
            <div key={req.id} className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 shadow-md space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {req.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Testimony: {req.answeredTestimony || 'God faithfully answered this prayer.'}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CREATE PRAYER REQUEST MODAL */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 animate-spring-up">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                New Prayer Request
              </h3>
              <button onClick={() => setShowNewModal(false)} className="text-xs font-bold text-slate-400">
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">Title</label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  placeholder="Request title..." 
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">Description</label>
                <textarea 
                  rows={3}
                  value={newDescription} 
                  onChange={(e) => setNewDescription(e.target.value)} 
                  placeholder="Share details for prayer..." 
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Category</label>
                  <select 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)} 
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
                  >
                    <option value="Personal">Personal</option>
                    <option value="Family">Family</option>
                    <option value="Missions">Missions</option>
                    <option value="Health">Health</option>
                    <option value="Thanksgiving">Thanksgiving</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Privacy Level</label>
                  <select 
                    value={newPrivacy} 
                    onChange={(e) => setNewPrivacy(e.target.value as PrayerPrivacy)} 
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-bold"
                  >
                    <option value="private">Private (Only Me)</option>
                    <option value="mentor_only">Mentor Only</option>
                    <option value="prayer_team">Prayer Team</option>
                    <option value="small_group">Small Group</option>
                    <option value="community">Community (Public)</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg pt-2"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
