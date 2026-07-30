import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { IOSModal } from '../../ios/IOSModal';
import { HelpCircle, CheckCircle2, ShieldCheck, Send } from 'lucide-react';
import { StudentQuestion } from '../../../types';

export const AdminQAView: React.FC = () => {
  const { questions, answerQuestionByAdmin, showToast } = useApp();
  const [selectedQuestion, setSelectedQuestion] = useState<StudentQuestion | null>(null);
  const [answerText, setAnswerText] = useState('');

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuestion || !answerText.trim()) return;

    answerQuestionByAdmin(selectedQuestion.id, answerText);
    setSelectedQuestion(null);
    setAnswerText('');
  };

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in">
      
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Questions Answering Desk
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Saint Abraham Babatunde & Leadership Answering Portal
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((q) => (
          <IOSCard key={q.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{q.studentName}</span>
                <span className="text-[10px] font-mono text-slate-400">• {q.timestamp}</span>
              </div>
              <span className={`px-3 py-0.5 rounded-full text-xs font-mono font-bold ${q.isAnswered ? 'glass-pill text-emerald-500 dark:text-emerald-400 border border-emerald-500/30' : 'glass-pill text-amber-500 dark:text-amber-400 border border-amber-500/30'}`}>
                {q.isAnswered ? 'Answered ✓' : 'Needs Response'}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              {q.question}
            </p>

            {q.isAnswered && q.answer ? (
              <div className="p-4 rounded-3xl glass-pill border border-emerald-500/30 text-xs space-y-1">
                <p className="font-bold text-emerald-500 dark:text-emerald-400">Answer: {q.answer.answerText}</p>
              </div>
            ) : (
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedQuestion(q);
                    setAnswerText('');
                  }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-md ios-active"
                >
                  <Send className="w-3.5 h-3.5" />
                  Answer this Question
                </button>
              </div>
            )}
          </IOSCard>
        ))}
      </div>

      {/* Answer Modal */}
      <IOSModal
        isOpen={!!selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
        title="Answer Student Question"
        subtitle={`Asking student: ${selectedQuestion?.studentName}`}
      >
        <form onSubmit={handleAnswerSubmit} className="space-y-4 pt-2">
          <div className="p-3.5 rounded-2xl glass-pill text-xs font-semibold text-slate-800 dark:text-slate-200">
            "{selectedQuestion?.question}"
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Official Response (Saint Abraham Babatunde)
            </label>
            <textarea
              required
              rows={5}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Type biblical guidance and answer..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setSelectedQuestion(null)}
              className="px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md"
            >
              Publish Response
            </button>
          </div>
        </form>
      </IOSModal>

    </div>
  );
};
