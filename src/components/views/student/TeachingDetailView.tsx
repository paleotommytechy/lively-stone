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
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        BACK TO TEACHINGS
      </button>

      {/* Main Header Card */}
      <div className="bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-blue-950/80 text-white rounded-4xl p-6 sm:p-10 border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="px-3 py-1 rounded-full glass-pill text-amber-300 font-bold border border-amber-500/30">
            {currentTeaching.pillar} PILLAR
          </span>
          <span className="text-slate-300 font-medium">
            {currentTeaching.date} • {currentTeaching.duration}
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {currentTeaching.title}
          </h1>
          <p className="text-xs sm:text-sm text-cyan-300 font-mono font-medium">
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
            className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all ios-active border border-white/20"
          >
            <Send className="w-4 h-4" />
            Read Full Post on Telegram
          </a>

          <button
            onClick={() => toggleMarkTeachingCompleted(currentTeaching.id)}
            className={`px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 border transition-all ios-active ${
              currentTeaching.isCompletedByStudent
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'glass-pill text-white border-white/30'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {currentTeaching.isCompletedByStudent ? 'Completed' : 'Mark as Completed'}
          </button>
        </div>
      </div>

      {/* Audio Stream Bar */}
      <IOSCard className="bg-gradient-to-r from-slate-950/80 to-blue-950/80 text-white p-6 border-white/20 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => showToast('Audio Stream', 'Playing School of Tyrannus lecture audio...')}
              className="w-12 h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center font-bold text-lg shadow-lg shadow-amber-500/20 transition-transform ios-active shrink-0"
            >
              <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
            </button>
            <div>
              <p className="text-xs font-bold text-white">Audio Recording & Lecture Stream</p>
              <p className="text-[11px] font-mono text-slate-400">Convened by Saint Abraham Babatunde</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400 font-mono">
            <Volume2 className="w-4 h-4 text-amber-400" />
            00:00 / {currentTeaching.duration}
          </div>
        </div>
      </IOSCard>

      {/* Executive Summary */}
      <IOSCard className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Apostolic Summary
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {currentTeaching.summary}
        </p>
      </IOSCard>

      {/* Key Teaching Points */}
      <IOSCard className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Key Discipleship Takeaways
        </h3>
        <ul className="space-y-2.5">
          {currentTeaching.keyPoints.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
              <span className="w-5 h-5 rounded-full glass-pill text-amber-500 dark:text-amber-400 flex items-center justify-center font-mono font-bold text-[11px] shrink-0 border border-amber-500/30">
                {idx + 1}
              </span>
              <span className="font-medium leading-relaxed">{pt}</span>
            </li>
          ))}
        </ul>
      </IOSCard>

      {/* Scripture References */}
      <IOSCard className="space-y-4 border border-amber-500/30">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          Scripture Anchors
        </h3>
        <div className="space-y-3">
          {currentTeaching.scriptures.map((s, idx) => (
            <div key={idx} className="p-4 rounded-2xl glass-pill border border-white/20 dark:border-white/10 space-y-1">
              <p className="text-xs italic text-slate-800 dark:text-slate-200 font-serif leading-relaxed">
                "{s.text}"
              </p>
              <p className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">
                — {s.book} {s.chapter}:{s.verse}
              </p>
            </div>
          ))}
        </div>
      </IOSCard>

      {/* Interactive Workflows Trigger (Quiz & Assignment) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentTeaching.quizId && (
          <IOSCard className="space-y-3 border border-indigo-500/30">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-cyan-400 font-mono font-bold text-xs">
              <Award className="w-4 h-4" />
              INTERACTIVE QUIZ ATTACHED
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Test your grasp on this lecture and update your milestone progress.
            </p>
            <button
              onClick={() => startQuiz(currentTeaching.quizId!)}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all ios-active"
            >
              Start Lesson Quiz
            </button>
          </IOSCard>
        )}

        {currentTeaching.assignmentId && (
          <IOSCard className="space-y-3 border border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 font-mono font-bold text-xs">
              <FileText className="w-4 h-4" />
              PRACTICAL TASK ATTACHED
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Log your practical obedience exercise for mentor review.
            </p>
            <button
              onClick={() => openAssignmentModal(currentTeaching.assignmentId!)}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition-all ios-active"
            >
              Submit Practical Task
            </button>
          </IOSCard>
        )}
      </div>

    </div>
  );
};

