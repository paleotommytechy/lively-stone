import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { Share2, Download, Sparkles, Check, Image as ImageIcon, Send, Zap } from 'lucide-react';
import { ShareCardTemplateId } from '../../../types';

export const ShareCardGeneratorView: React.FC = () => {
  const { shareCards, teachings, createShareCard, incrementShareCardDownload, showToast } = useApp();

  const [selectedTemplate, setSelectedTemplate] = useState<ShareCardTemplateId>('editorial');
  const [teachingId, setTeachingId] = useState(teachings[0]?.id || 't-101');
  const [headline, setHeadline] = useState('Daily Tyrannus Discipleship');
  const [keyInsight, setKeyInsight] = useState('Apostolic multiplication occurs in persistent daily instruction that equips reliable believers to disciple others.');
  const [scriptureRef, setScriptureRef] = useState('Acts 19:9-10');
  const [speaker, setSpeaker] = useState('Saint Abraham Babatunde');

  const selectedTeachingObj = teachings.find(t => t.id === teachingId);

  const handleSelectTeaching = (id: string) => {
    setTeachingId(id);
    const t = teachings.find(item => item.id === id);
    if (t) {
      setHeadline(t.title);
      setKeyInsight(t.keyPoints[0] || t.summary);
      if (t.scriptures.length > 0) {
        setScriptureRef(`${t.scriptures[0].book} ${t.scriptures[0].chapter}:${t.scriptures[0].verse}`);
      }
    }
  };

  const handleDownloadCard = (cardId?: string) => {
    if (cardId) {
      incrementShareCardDownload(cardId);
    }
    showToast('Graphic Downloaded', 'Social insight card image saved to device!');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: headline,
          text: `"${keyInsight}" — ${speaker} | School of Tyrannus`,
          url: window.location.href,
        });
        showToast('Shared Successfully', 'Card shared via device native share menu.');
      } catch (err) {
        showToast('Shared Simulation', 'Card link copied to clipboard.');
      }
    } else {
      showToast('Shared Simulation', 'Card link copied to clipboard.');
    }
  };

  const handleCreateNewCard = () => {
    createShareCard({
      teachingId,
      teachingTitle: selectedTeachingObj?.title || 'School of Tyrannus Teaching',
      templateId: selectedTemplate,
      headline,
      keyInsight,
      scriptureRef,
      speaker,
      bgGradient: selectedTemplate === 'editorial' 
        ? 'from-slate-950 via-zinc-900 to-indigo-950' 
        : selectedTemplate === 'scripture' 
        ? 'from-amber-950 via-zinc-950 to-orange-950' 
        : 'from-indigo-950 via-purple-950 to-slate-900'
    });
  };

  return (
    <div className="space-y-10 pb-16 animate-ios-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20 inline-flex items-center gap-1.5">
          <Share2 className="w-4 h-4 text-amber-500" />
          Evangelism & Social Sharing Studio
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Shareable Teaching Insight Cards
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Transform School of Tyrannus key points into elegant social graphics to expand the reach of the Word.
        </p>
      </div>

      {/* Main Studio Grid: Controls Left, Live Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          <IOSCard className="space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Card Studio Controls
            </h3>

            {/* Teaching Selector */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Select Teaching Source
              </label>
              <select
                value={teachingId}
                onChange={(e) => handleSelectTeaching(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none"
              >
                {teachings.map((t) => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>

            {/* Template Chooser */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Design Template
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'editorial', label: '1. Editorial' },
                  { id: 'scripture', label: '2. Scripture' },
                  { id: 'insight', label: '3. Insight' }
                ].map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id as ShareCardTemplateId)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ios-active ${
                      selectedTemplate === tpl.id
                        ? 'bg-amber-500 text-zinc-950 shadow-md'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Headline */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Graphic Headline
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>

            {/* Key Insight Text */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Key Teaching Insight
              </label>
              <textarea
                rows={3}
                value={keyInsight}
                onChange={(e) => setKeyInsight(e.target.value)}
                className="w-full p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>

            {/* Scripture Ref */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Scripture Anchor
              </label>
              <input
                type="text"
                value={scriptureRef}
                onChange={(e) => setScriptureRef(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>

            <button
              onClick={handleCreateNewCard}
              className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 font-bold text-xs shadow-md transition-all ios-active uppercase tracking-wider"
            >
              Generate Card & Add to Gallery
            </button>
          </IOSCard>
        </div>

        {/* Live Graphic Canvas Preview Column */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-indigo-500" />
            Live HD Social Graphic Preview
          </h3>

          {/* Graphic Preview Container */}
          <div 
            className={`
              w-full aspect-[4/5] rounded-[2.5rem] p-8 sm:p-10 text-white flex flex-col justify-between 
              shadow-2xl border border-white/20 relative overflow-hidden transition-all duration-300 
              ${selectedTemplate === 'editorial' ? 'bg-gradient-to-br from-slate-950 via-zinc-900 to-indigo-950 font-sans' : ''} 
              ${selectedTemplate === 'scripture' ? 'bg-gradient-to-br from-amber-950 via-zinc-950 to-orange-950 font-serif' : ''} 
              ${selectedTemplate === 'insight' ? 'bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 font-sans' : ''}
            `}
          >
            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />

            {/* Top Branding */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <p className="text-[11px] font-extrabold tracking-widest uppercase text-amber-400">
                  Lively Stones International Network
                </p>
                <p className="text-[10px] text-zinc-300 font-semibold">School of Tyrannus Discipleship</p>
              </div>
              <div className="w-7 h-7 rounded-xl bg-amber-500 text-zinc-950 font-black text-xs flex items-center justify-center shadow-md">
                LS
              </div>
            </div>

            {/* Middle Content Body depending on Template */}
            <div className="relative z-10 space-y-4 my-auto py-6">
              {selectedTemplate === 'editorial' && (
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 border border-white/15">
                    {headline}
                  </span>
                  <blockquote className="text-xl sm:text-2xl font-extrabold leading-snug tracking-tight text-white">
                    "{keyInsight}"
                  </blockquote>
                  <p className="text-xs font-bold text-amber-400 italic">
                    — {scriptureRef}
                  </p>
                </div>
              )}

              {selectedTemplate === 'scripture' && (
                <div className="space-y-4 text-center">
                  <span className="text-3xl sm:text-4xl font-serif font-extrabold text-amber-400 block tracking-wider">
                    {scriptureRef}
                  </span>
                  <p className="text-base sm:text-lg font-serif italic text-zinc-200 leading-relaxed max-w-md mx-auto">
                    "{keyInsight}"
                  </p>
                  <p className="text-xs font-sans font-extrabold uppercase tracking-widest text-zinc-400">
                    {headline}
                  </p>
                </div>
              )}

              {selectedTemplate === 'insight' && (
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5 text-amber-400" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-amber-300">
                    {headline}
                  </h2>
                  <p className="text-sm sm:text-base font-semibold leading-relaxed text-zinc-100">
                    {keyInsight}
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-lg bg-white/10 text-white border border-white/15 font-semibold">
                      Scripture Anchor: {scriptureRef}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer */}
            <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-4 text-[11px] text-zinc-300">
              <span className="font-bold">Convener: {speaker}</span>
              <span className="font-semibold text-amber-400">livelystones.org</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleDownloadCard()}
              className="py-3 px-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all ios-active"
            >
              <Download className="w-4 h-4" />
              Download Graphic
            </button>

            <button
              onClick={handleNativeShare}
              className="py-3 px-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all ios-active"
            >
              <Share2 className="w-4 h-4" />
              Share Social Card
            </button>
          </div>
        </div>

      </div>

      {/* Approved Gallery Grid */}
      <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
          Community Approved Insight Cards ({shareCards.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {shareCards.map((sc) => (
            <IOSCard key={sc.id} className="space-y-3">
              <div className={`aspect-[4/5] rounded-2xl p-5 text-white bg-gradient-to-br ${sc.bgGradient} flex flex-col justify-between text-xs`}>
                <p className="font-bold text-[10px] uppercase text-amber-300">{sc.headline}</p>
                <p className="font-semibold line-clamp-4">"{sc.keyInsight}"</p>
                <p className="text-[10px] text-zinc-400 font-semibold">{sc.scriptureRef}</p>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-semibold">{sc.downloadsCount} Downloads</span>
                <button
                  onClick={() => handleDownloadCard(sc.id)}
                  className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold hover:bg-amber-500/20"
                >
                  Download
                </button>
              </div>
            </IOSCard>
          ))}
        </div>
      </div>

    </div>
  );
};
