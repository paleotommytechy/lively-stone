import React from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { 
  Send, 
  BookOpen, 
  Award, 
  FileText, 
  CheckCircle2, 
  Play, 
  Volume2, 
  Share2, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export const TeachingDetailView: React.FC = () => {
  const { 
    selectedTeachingId, 
    teachings, 
    setStudentRoute, 
    setPublicRoute,
    roleView,
    startQuiz, 
    openAssignmentModal, 
    toggleMarkTeachingCompleted,
    showToast 
  } = useApp();

  const currentTeaching = teachings.find((t) => t.id === selectedTeachingId) || teachings[0];

  const handleBack = () => {
    if (roleView === 'public') {
      setPublicRoute('teachings');
    } else {
      setStudentRoute('teachings');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-ios-fade-in">
      
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Teachings
      </button>

      {/* Main Header Card */}
      <div className="bg-gradient-to-br from-zinc-900 via-slate-950 to-zinc-900 text-white rounded-[2.5rem] p-6 sm:p-10 border border-zinc-800 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
            {currentTeaching.pillar} Pillar
          </span>
          <span className="text-zinc-400 font-medium">
            {currentTeaching.date} • {currentTeaching.duration}
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {currentTeaching.title}
          </h1>
          <p className="text-xs sm:text-sm text-amber-400 font-medium">
            Speaker: {currentTeaching.speaker} • Topic: {currentTeaching.topic}
          </p>
        </div>

        {/* Telegram Message Simulation Link */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href={currentTeaching.telegramMessageUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              showToast('Telegram Integration', 'Simulating jump to School of Tyrannus Telegram message post...');
            }}
            className="px-6 py-2.5 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all ios-active"
          >
            <Send className="w-4 h-4" />
            Read Full Post on Telegram
          </a>

          <button
            onClick={() => toggleMarkTeachingCompleted(currentTeaching.id)}
            className={`px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 border transition-all ios-active ${
              currentTeaching.isCompletedByStudent
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {currentTeaching.isCompletedByStudent ? 'Completed' : 'Mark as Completed'}
          </button>
        </div>
      </div>

      {/* Media Player Placeholder (Audio / Video UI) */}
      <IOSCard className="bg-gradient-to-r from-slate-900 to-zinc-900 text-white border-zinc-800 p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => showToast('Audio Player', 'Playing School of Tyrannus audio recording...')}
              className="w-12 h-12 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 flex items-center justify-center font-bold text-lg shadow-md transition-transform ios-active"
            >
              <Play className="w-6 h-6 fill-zinc-950 ml-0.5" />
            </button>
            <div>
              <p className="text-xs font-bold text-white">Audio Recording & Lecture Stream</p>
              <p className="text-[11px] text-zinc-400">Convened by Saint Abraham Babatunde</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-zinc-400 font-mono">
            <Volume2 className="w-4 h-4 text-amber-400" />
            00:00 / {currentTeaching.duration}
          </div>
        </div>
      </IOSCard>

      {/* Executive Summary */}
      <IOSCard className="space-y-3">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Apostolic Summary
        </h3>
        <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {currentTeaching.summary}
        </p>
      </IOSCard>

      {/* Key Teaching Points */}
      <IOSCard className="space-y-4">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white">
          Key Discipleship Takeaways
        </h3>
        <ul className="space-y-2.5">
          {currentTeaching.keyPoints.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs text-zinc-700 dark:text-zinc-300">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                {idx + 1}
              </span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </IOSCard>

      {/* Scripture References */}
      <IOSCard className="space-y-4 bg-amber-500/5 border-amber-500/20">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          Scripture References
        </h3>
        <div className="space-y-3">
          {currentTeaching.scriptures.map((s, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-amber-500/20 space-y-1">
              <p className="text-xs italic text-zinc-800 dark:text-zinc-200">
                "{s.text}"
              </p>
              <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                — {s.book} {s.chapter}:{s.verse}
              </p>
            </div>
          ))}
        </div>
      </IOSCard>

      {/* Interactive Workflows Trigger (Quiz & Assignment) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentTeaching.quizId && (
          <IOSCard className="bg-indigo-500/5 border-indigo-500/20 space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
              <Award className="w-4 h-4" />
              Interactive Quiz Attached
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Test your grasp on this lecture and update your milestone progress.
            </p>
            <button
              onClick={() => startQuiz(currentTeaching.quizId!)}
              className="w-full py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all ios-active"
            >
              Start Lesson Quiz
            </button>
          </IOSCard>
        )}

        {currentTeaching.assignmentId && (
          <IOSCard className="bg-amber-500/5 border-amber-500/20 space-y-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <FileText className="w-4 h-4" />
              Practical Assignment Attached
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Log your practical obedience exercise for mentor review.
            </p>
            <button
              onClick={() => openAssignmentModal(currentTeaching.assignmentId!)}
              className="w-full py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all ios-active"
            >
              Submit Practical Task
            </button>
          </IOSCard>
        )}
      </div>

    </div>
  );
};
