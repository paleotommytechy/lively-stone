import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { IOSModal } from '../../ios/IOSModal';
import { HelpCircle, ThumbsUp, Plus, Search, CheckCircle2, ShieldCheck } from 'lucide-react';

export const QuestionsView: React.FC = () => {
  const { questions, askQuestion, toggleLikeQuestion, teachings } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [category, setCategory] = useState('Spiritual Disciplines');
  const [teachingTitle, setTeachingTitle] = useState('');

  const filteredQuestions = questions.filter((q) => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    askQuestion(questionText, category, teachingTitle.trim() || undefined);
    setQuestionText('');
    setTeachingTitle('');
    setIsAskModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Questions & Answers Desk
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Ask spiritual, theological, or practical questions answered by Saint Abraham Babatunde
          </p>
        </div>

        <button
          onClick={() => setIsAskModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all ios-active"
        >
          <Plus className="w-4 h-4" />
          Ask Question
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search questions by keyword or topic..."
          className="w-full pl-11 pr-4 py-3 rounded-full bg-white dark:bg-[#1C1C1E] border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>

      {/* Questions Feed */}
      <div className="space-y-6">
        {filteredQuestions.map((q) => (
          <IOSCard key={q.id} className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img 
                  src={q.studentAvatar} 
                  alt={q.studentName} 
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white">
                    {q.studentName}
                  </h3>
                  <p className="text-[10px] text-zinc-400">{q.timestamp}</p>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${q.isAnswered ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'}`}>
                {q.isAnswered ? 'Answered ✓' : 'Awaiting Answer'}
              </span>
            </div>

            <div className="space-y-1">
              {q.teachingTitle && (
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                  Topic: {q.teachingTitle}
                </span>
              )}
              <h4 className="text-base font-bold text-zinc-900 dark:text-white leading-snug">
                {q.question}
              </h4>
            </div>

            {/* Answer Section */}
            {q.isAnswered && q.answer && (
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  Answered by {q.answer.answeredBy}
                  <span className="text-[10px] text-zinc-400 font-normal">• {q.answer.timestamp}</span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-200 leading-relaxed font-medium">
                  {q.answer.answerText}
                </p>
              </div>
            )}

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <button
                onClick={() => toggleLikeQuestion(q.id)}
                className={`flex items-center gap-1.5 font-semibold ${q.isLiked ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{q.likes} Helpful</span>
              </button>

              <span className="text-zinc-400 text-[11px]">Category: {q.category}</span>
            </div>
          </IOSCard>
        ))}
      </div>

      {/* Ask Question Modal */}
      <IOSModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
        title="Ask a Question"
        subtitle="Submitted to Saint Abraham Babatunde & Leadership"
      >
        <form onSubmit={handleAskSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none"
            >
              <option value="Spiritual Disciplines">Spiritual Disciplines</option>
              <option value="Discipleship & Apostolic Impact">Discipleship & Apostolic Impact</option>
              <option value="Practical Holiness">Practical Holiness</option>
              <option value="Evangelism & Outreach">Evangelism & Outreach</option>
              <option value="General Theology">General Theology</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Related Teaching (Optional)
            </label>
            <select
              value={teachingTitle}
              onChange={(e) => setTeachingTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none"
            >
              <option value="">-- General Question --</option>
              {teachings.map((t) => (
                <option key={t.id} value={t.title}>{t.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Your Question
            </label>
            <textarea
              required
              rows={4}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="State your question clearly..."
              className="w-full p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAskModalOpen(false)}
              className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
            >
              Submit Question
            </button>
          </div>
        </form>
      </IOSModal>

    </div>
  );
};
