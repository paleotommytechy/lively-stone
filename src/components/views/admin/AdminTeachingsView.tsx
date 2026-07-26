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
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Curriculum & Teaching Manager
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Publish School of Tyrannus lectures by Saint Abraham Babatunde and configure Telegram links
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md flex items-center gap-2 transition-all ios-active"
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
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                    {t.pillar} Pillar
                  </span>
                  <span className="text-zinc-400">• {t.date}</span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {t.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                  {t.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={t.telegramMessageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 text-xs font-bold flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  Telegram
                </a>
                <button
                  onClick={() => showToast('Edit Teaching', 'Teaching update form simulation')}
                  className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </IOSCard>
        ))}
      </div>

      {/* Create Teaching Drawer Modal */}
      <IOSModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create School of Tyrannus Teaching"
        subtitle="Publish a new lecture with Telegram links and scripture anchors"
      >
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Teaching Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Apostolic Multiplication in Tyrannus"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Speaker
              </label>
              <input
                type="text"
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Discipleship Pillar
              </label>
              <select
                value={pillar}
                onChange={(e) => setPillar(e.target.value as PillarStage)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none"
              >
                <option value="Learn">Learn</option>
                <option value="Grow">Grow</option>
                <option value="Live">Live</option>
                <option value="Serve">Serve</option>
                <option value="Disciple">Disciple</option>
                <option value="Multiply">Multiply</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Executive Summary
            </label>
            <textarea
              required
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Core message summary..."
              className="w-full p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Telegram Post URL Simulation
            </label>
            <input
              type="text"
              value={telegramUrl}
              onChange={(e) => setTelegramUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold"
            >
              Publish Teaching
            </button>
          </div>
        </form>
      </IOSModal>

    </div>
  );
};
