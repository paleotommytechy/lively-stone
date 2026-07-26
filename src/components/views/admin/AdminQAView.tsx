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
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Questions Answering Desk
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Saint Abraham Babatunde & Leadership Answering Portal
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((q) => (
          <IOSCard key={q.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-900 dark:text-white">{q.studentName}</span>
                <span className="text-[10px] text-zinc-400">• {q.timestamp}</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${q.isAnswered ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>
                {q.isAnswered ? 'Answered ✓' : 'Needs Response'}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
              {q.question}
            </p>

            {q.isAnswered && q.answer ? (
              <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 text-xs space-y-1">
                <p className="font-bold text-amber-600 dark:text-amber-400">Answer: {q.answer.answerText}</p>
              </div>
            ) : (
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedQuestion(q);
                    setAnswerText('');
                  }}
                  className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold flex items-center gap-1.5 shadow-sm"
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
          <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            "{selectedQuestion?.question}"
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Official Response (Saint Abraham Babatunde)
            </label>
            <textarea
              required
              rows={5}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Type biblical guidance and answer..."
              className="w-full p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setSelectedQuestion(null)}
              className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold"
            >
              Publish Official Answer
            </button>
          </div>
        </form>
      </IOSModal>

    </div>
  );
};
