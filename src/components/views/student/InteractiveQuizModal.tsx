import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSModal } from '../../ios/IOSModal';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';

export const InteractiveQuizModal: React.FC = () => {
  const { activeQuiz, closeQuiz, submitQuizResult } = useApp();
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!activeQuiz) return null;

  const currentQ = activeQuiz.questions[currentQuestionIdx];
  const totalQ = activeQuiz.questions.length;

  const handleSelectOption = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < totalQ - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / totalQ) * 100);
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    submitQuizResult(activeQuiz.id, score);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setIsSubmitted(false);
  };

  const finalScore = calculateScore();
  const passed = finalScore >= activeQuiz.passingScore;

  return (
    <IOSModal
      isOpen={!!activeQuiz}
      onClose={closeQuiz}
      title={activeQuiz.title}
      subtitle={`Question ${currentQuestionIdx + 1} of ${totalQ}`}
    >
      {isSubmitted ? (
        /* Quiz Score & Review View */
        <div className="space-y-6 py-4 animate-ios-fade-in">
          <div className="text-center space-y-3">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto text-4xl shadow-xl ${passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
              {passed ? <Award className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {passed ? 'Congratulations! Quiz Passed' : 'Keep Studying!'}
            </h3>
            <p className="text-3xl font-extrabold text-amber-400 font-mono">
              Score: {finalScore}%
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Passing criteria: {activeQuiz.passingScore}% • Your progress has been updated!
            </p>
          </div>

          {/* Question Breakdown Review */}
          <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar pt-2 border-t border-slate-200/60 dark:border-slate-800">
            {activeQuiz.questions.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.correctOptionIndex;
              return (
                <div key={q.id} className="p-3.5 rounded-2xl glass-pill text-xs space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white">
                    {idx + 1}. {q.question}
                  </p>
                  <p className={isCorrect ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-red-500 font-semibold'}>
                    Your Answer: {userAns !== undefined ? q.options[userAns] : 'Not answered'} {isCorrect ? '✓' : '✗'}
                  </p>
                  {!isCorrect && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Correct Answer: {q.options[q.correctOptionIndex]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-3 gap-3">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-full glass-pill text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Quiz
            </button>
            <button
              onClick={closeQuiz}
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md"
            >
              Done & Return
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Answering View */
        <div className="space-y-6 py-2 animate-ios-fade-in">
          {/* Progress Pill Bar */}
          <div className="flex items-center gap-1.5">
            {activeQuiz.questions.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  idx === currentQuestionIdx
                    ? 'bg-blue-600 dark:bg-cyan-400 shadow-sm'
                    : selectedAnswers[idx] !== undefined
                    ? 'bg-emerald-500/60'
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.question}
            </h3>

            {/* Options Radio List */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, optionIdx) => {
                const isSelected = selectedAnswers[currentQuestionIdx] === optionIdx;
                return (
                  <button
                    key={optionIdx}
                    onClick={() => handleSelectOption(optionIdx)}
                    className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'bg-blue-600/10 text-blue-600 dark:text-cyan-300 border-blue-500/50 shadow-md ring-2 ring-blue-500/30'
                        : 'glass-pill text-slate-800 dark:text-slate-200 border-white/20 dark:border-white/10 hover:bg-white/60 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{opt}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${isSelected ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-400'}`}>
                      {isSelected ? '✓' : ''}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIdx === 0}
              className="px-4 py-2 rounded-full text-xs font-semibold text-slate-500 disabled:opacity-30"
            >
              Previous
            </button>

            {currentQuestionIdx === totalQ - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < totalQ}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-amber-500/20 disabled:opacity-40"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </IOSModal>
  );
};
