import React from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { 
  Flame, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Award,
  Send,
  HelpCircle,
  Share2,
  GraduationCap,
  Zap
} from 'lucide-react';

export const StudentDashboardView: React.FC = () => {
  const { 
    student, 
    teachings, 
    assignments, 
    openTeachingDetail, 
    setStudentRoute, 
    startQuiz, 
    openAssignmentModal 
  } = useApp();

  const pendingAssignments = assignments.filter(a => !a.submitted);

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in">
      
      {/* Personalized Disciple Command Center Glass Card */}
      <div className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-slate-950/90 via-slate-900/90 to-blue-950/80 text-white p-6 sm:p-10 border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img 
              src={student.avatarUrl} 
              alt={student.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shrink-0 ring-4 ring-blue-500/60 shadow-xl"
            />
            <div className="space-y-1">
              <span className="px-3.5 py-1 rounded-full glass-pill text-amber-300 text-xs font-mono font-bold border border-amber-500/30 inline-flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                SCHOOL OF TYRANNUS DISCIPLE
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Good day, {student.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Pillar Stage: <strong className="text-cyan-300 font-bold">{student.currentPillar}</strong> • {student.location}
              </p>
            </div>
          </div>

          {/* Consistency Indicator Widget */}
          <div className="flex items-center gap-3.5 glass-pill p-4 rounded-3xl border border-white/20 shrink-0 shadow-lg backdrop-blur-xl">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider">Weekly Consistency</p>
              <p className="text-lg font-extrabold text-white">{student.weeklyStreak} Weeks Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Discipleship Progress Overview Widget */}
      <IOSCard className="space-y-4 border border-blue-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              DISCIPLESHIP COMPLETION INDEX
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Overall journey progress across the 6 pillars
            </p>
          </div>
          <span className="text-2xl font-extrabold text-blue-600 dark:text-cyan-400 font-mono">
            {student.progressPercentage}%
          </span>
        </div>

        {/* iOS Smooth Progress Bar */}
        <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5 border border-white/20">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-400 transition-all duration-700 shadow-sm"
            style={{ width: `${student.progressPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
          <span>Learn • Grow • Live</span>
          <span className="font-bold text-amber-500 dark:text-amber-400">Serve • Disciple • Multiply</span>
        </div>
      </IOSCard>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <IOSCard className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold text-lg shrink-0 border border-blue-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Teachings</p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">{student.totalTeachingsCompleted} Done</p>
          </div>
        </IOSCard>

        <IOSCard className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg shrink-0 border border-indigo-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Quizzes</p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">{student.quizzesCompleted} Passed</p>
          </div>
        </IOSCard>

        <IOSCard className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg shrink-0 border border-amber-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Assignments</p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">{student.assignmentsSubmitted} Logged</p>
          </div>
        </IOSCard>

        <IOSCard className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg shrink-0 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Attendance</p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">{student.attendanceRate}% Rate</p>
          </div>
        </IOSCard>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setStudentRoute('journey')}
          className="p-4 rounded-3xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold flex flex-col items-center gap-2 hover:opacity-90 transition-opacity ios-active shadow-lg border border-white/20"
        >
          <Award className="w-5 h-5 text-amber-400 dark:text-amber-600" />
          Discipleship Journey
        </button>

        <button
          onClick={() => setStudentRoute('share-cards')}
          className="p-4 rounded-3xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-xs font-extrabold flex flex-col items-center gap-2 transition-colors ios-active shadow-lg shadow-amber-500/20"
        >
          <Share2 className="w-5 h-5" />
          Share Insight Cards
        </button>

        <button
          onClick={() => setStudentRoute('community')}
          className="p-4 rounded-3xl bg-indigo-600 text-white text-xs font-bold flex flex-col items-center gap-2 hover:bg-indigo-500 transition-colors ios-active shadow-lg shadow-indigo-500/20"
        >
          <Sparkles className="w-5 h-5 text-indigo-200" />
          Community Feed
        </button>

        <button
          onClick={() => setStudentRoute('questions')}
          className="p-4 rounded-3xl bg-blue-600 text-white text-xs font-bold flex flex-col items-center gap-2 hover:bg-blue-500 transition-colors ios-active shadow-lg shadow-blue-500/20"
        >
          <HelpCircle className="w-5 h-5" />
          Ask Question
        </button>
      </div>

      {/* Main Grid: Pending Tasks & Recent Teachings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pending Assignments Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Pending Tasks
            </h3>
            <button 
              onClick={() => setStudentRoute('journey')}
              className="text-xs font-bold text-blue-500 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {pendingAssignments.map((a) => (
              <IOSCard key={a.id} className="p-4 border-amber-500/30">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full glass-pill text-amber-600 dark:text-amber-300 font-mono font-bold">
                      Due {a.deadline}
                    </span>
                    <span className="text-slate-400 font-mono font-semibold">{a.pillar}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {a.title}
                  </h4>
                  <button
                    onClick={() => openAssignmentModal(a.id)}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-xs font-extrabold transition-all ios-active shadow-sm"
                  >
                    Submit Response
                  </button>
                </div>
              </IOSCard>
            ))}
          </div>
        </div>

        {/* Recent School of Tyrannus Teachings */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Latest School of Tyrannus Teachings
            </h3>
            <button 
              onClick={() => setStudentRoute('teachings')}
              className="text-xs font-bold text-blue-500 hover:underline"
            >
              Browse All
            </button>
          </div>

          <div className="space-y-3">
            {teachings.slice(0, 3).map((t) => (
              <IOSCard key={t.id} onClick={() => openTeachingDetail(t.id)}>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-full glass-pill text-indigo-600 dark:text-cyan-400 font-mono font-bold border border-indigo-500/20">
                        {t.pillar}
                      </span>
                      <span className="text-slate-400 font-mono">• {t.duration}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
                      {t.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {t.summary}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (t.quizId) startQuiz(t.quizId);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
                  >
                    Take Quiz
                  </button>
                </div>
              </IOSCard>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

