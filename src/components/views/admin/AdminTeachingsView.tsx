import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { IOSModal } from '../../ios/IOSModal';
import { Plus, BookOpen, Send, Trash2, Edit3, CheckCircle2 } from 'lucide-react';
import { PillarStage } from '../../../types';

export const AdminTeachingsView: React.FC = () => {
  const { teachings, addTeachingByAdmin, showToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [speaker, setSpeaker] = useState('Saint Abraham Babatunde');
  const [topic, setTopic] = useState('Discipleship & Apostolic Impact');
  const [pillar, setPillar] = useState<PillarStage>('Learn');
  const [duration, setDuration] = useState('1h 00m');
  const [telegramUrl, setTelegramUrl] = useState('https://t.me/LivelyStonesNetwork/1050');
  const [keyPoint1, setKeyPoint1] = useState('');
  const [keyPoint2, setKeyPoint2] = useState('');
  const [scriptureBook, setScriptureBook] = useState('Acts');
  const [scriptureChapter, setScriptureChapter] = useState(19);
  const [scriptureVerse, setScriptureVerse] = useState('8-10');
  const [scriptureText, setScriptureText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    addTeachingByAdmin({
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      description,
      summary,
      date: 'Today',
      speaker,
      topic,
      pillar,
      duration,
      telegramMessageUrl: telegramUrl,
      scriptures: [
        {
          book: scriptureBook,
          chapter: Number(scriptureChapter),
          verse: scriptureVerse,
          text: scriptureText || 'Scripture reading for the lesson.'
        }
      ],
      keyPoints: [
        keyPoint1 || 'Key discipleship takeaway 1',
        keyPoint2 || 'Key discipleship takeaway 2'
      ]
    });

    setIsModalOpen(false);
    setTitle('');
    setSummary('');
  };

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Curriculum & Teaching Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Publish School of Tyrannus lectures by Saint Abraham Babatunde and configure Telegram links
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all ios-active border border-amber-400/30"
        >
          <Plus className="w-4 h-4" />
          Create New Teaching
        </button>
      </div>

      {/* Teachings Table / Cards List */}
      <div className="space-y-4">
        {teachings.map((t) => (
          <IOSCard key={t.id} className="p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full glass-pill text-amber-500 dark:text-amber-300 font-bold border border-amber-500/30">
                    {t.pillar} Pillar
                  </span>
                  <span className="text-slate-400">• {t.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                  {t.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={t.telegramMessageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full glass-pill text-blue-600 dark:text-cyan-400 font-mono font-bold text-xs border border-blue-500/30 inline-flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Telegram Link
                </a>
              </div>
            </div>
          </IOSCard>
        ))}
      </div>

      {/* Create Teaching Modal */}
      <IOSModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New School of Tyrannus Teaching"
        subtitle="Configure lecture details, scriptures, and Telegram message bridge"
      >
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Teaching Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cultivating Spiritual Capacity in the Secret Place"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Pillar Stage
              </label>
              <select
                value={pillar}
                onChange={(e) => setPillar(e.target.value as PillarStage)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="Learn">Learn</option>
                <option value="Grow">Grow</option>
                <option value="Live">Live</option>
                <option value="Serve">Serve</option>
                <option value="Disciple">Disciple</option>
                <option value="Multiply">Multiply</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Summary & Overview
            </label>
            <textarea
              required
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Summary of pure apostolic doctrine taught..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Telegram Message URL Bridge
            </label>
            <input
              type="url"
              required
              value={telegramUrl}
              onChange={(e) => setTelegramUrl(e.target.value)}
              placeholder="https://t.me/LivelyStonesNetwork/..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md"
            >
              Publish Teaching
            </button>
          </div>
        </form>
      </IOSModal>

    </div>
  );
};
