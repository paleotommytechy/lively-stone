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
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Questions & Answers Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Ask spiritual, theological, or practical questions answered by Saint Abraham Babatunde
          </p>
        </div>

        <button
          onClick={() => setIsAskModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all ios-active border border-white/20"
        >
          <Plus className="w-4 h-4" />
          Ask Question
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search questions by keyword or topic..."
          className="w-full pl-11 pr-4 py-3 rounded-full glass-input text-sm font-medium text-slate-900 dark:text-white focus:outline-none"
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
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/40"
                />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    {q.studentName}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400">{q.timestamp}</p>
                </div>
              </div>

              <span className={`px-3 py-0.5 rounded-full text-xs font-mono font-bold ${q.isAnswered ? 'glass-pill text-emerald-500 dark:text-emerald-400 border border-emerald-500/30' : 'glass-pill text-amber-500 dark:text-amber-400 border border-amber-500/30'}`}>
                {q.isAnswered ? 'Answered ✓' : 'Awaiting Answer'}
              </span>
            </div>

            <div className="space-y-1">
              {q.teachingTitle && (
                <span className="text-[11px] font-mono font-semibold text-blue-600 dark:text-cyan-400">
                  Topic: {q.teachingTitle}
                </span>
              )}
              <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {q.question}
              </h4>
            </div>

            {/* Answer Section */}
            {q.isAnswered && q.answer && (
              <div className="p-4 rounded-3xl glass-pill border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Answered by {q.answer.answeredBy}</span>
                  <span className="text-[10px] font-mono text-slate-400">({q.answer.timestamp})</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  {q.answer.answerText}
                </p>
              </div>
            )}

            <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={() => toggleLikeQuestion(q.id)}
                className={`flex items-center gap-1.5 font-bold transition-colors ${
                  q.isLiked ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{q.likes} Helpful</span>
              </button>
            </div>
          </IOSCard>
        ))}
      </div>

      {/* Ask Question Modal */}
      <IOSModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
        title="Ask a Question"
        subtitle="Submitted directly to Saint Abraham Babatunde & Leadership team"
      >
        <form onSubmit={handleAskSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="Spiritual Disciplines">Spiritual Disciplines & Prayer</option>
              <option value="Scripture Interpretation">Scripture Interpretation</option>
              <option value="Campus Ministry">Campus Ministry & Outreach</option>
              <option value="Practical Holiness">Practical Holiness & Living</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Related Teaching (Optional)
            </label>
            <input
              type="text"
              value={teachingTitle}
              onChange={(e) => setTeachingTitle(e.target.value)}
              placeholder="e.g. Cultivating Spiritual Capacity"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Your Question
            </label>
            <textarea
              required
              rows={4}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Write your spiritual question clearly..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAskModalOpen(false)}
              className="px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md"
            >
              Submit Question
            </button>
          </div>
        </form>
      </IOSModal>

    </div>
  );
};
