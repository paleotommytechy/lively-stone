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
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto text-4xl shadow-xl ${passed ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
              {passed ? <Award className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
            </div>
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              {passed ? 'Congratulations! Quiz Passed' : 'Keep Studying!'}
            </h3>
            <p className="text-3xl font-extrabold text-amber-500">
              Score: {finalScore}%
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Passing criteria: {activeQuiz.passingScore}% • Your progress has been updated!
            </p>
          </div>

          {/* Question Breakdown Review */}
          <div className="space-y-4 max-h-60 overflow-y-auto no-scrollbar pt-2 border-t border-zinc-200 dark:border-zinc-800">
            {activeQuiz.questions.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.correctOptionIndex;
              return (
                <div key={q.id} className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 text-xs space-y-1">
                  <p className="font-bold text-zinc-900 dark:text-white">
                    {idx + 1}. {q.question}
                  </p>
                  <p className={isCorrect ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-red-500 font-semibold'}>
                    Your Answer: {userAns !== undefined ? q.options[userAns] : 'Not answered'} {isCorrect ? '✓' : '✗'}
                  </p>
                  {!isCorrect && (
                    <p className="text-zinc-500 dark:text-zinc-400 italic">
                      Correct Answer: {q.options[q.correctOptionIndex]}
                    </p>
                  )}
                  <p className="text-[11px] text-zinc-400 pt-1">
                    {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retry Quiz
            </button>

            <button
              onClick={closeQuiz}
              className="px-6 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md"
            >
              Done & Return
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Question Runner */
        <div className="space-y-6 pt-2">
          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${((currentQuestionIdx + 1) / totalQ) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-zinc-900 dark:text-white leading-snug">
              {currentQ.question}
            </h4>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`
                    w-full p-4 rounded-2xl text-left text-xs font-semibold 
                    border transition-all duration-200 flex items-center justify-between ios-active 
                    ${isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.01]'
                      : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                    }
                  `}
                >
                  <span>{opt}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${isSelected ? 'border-white bg-white text-indigo-600 font-bold' : 'border-zinc-400'}`}>
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation & Submit Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIdx === 0}
              className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-500 disabled:opacity-30"
            >
              Previous
            </button>

            {currentQuestionIdx < totalQ - 1 ? (
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestionIdx] === undefined}
                className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold disabled:opacity-40 shadow-md flex items-center gap-1.5"
              >
                Next Question
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < totalQ}
                className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold disabled:opacity-40 shadow-md"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </IOSModal>
  );
};
