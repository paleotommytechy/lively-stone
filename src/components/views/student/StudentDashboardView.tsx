import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Card } from '../../ui/Card';
import { Avatar } from '../../ui/Avatar';
import { DailyScriptureCard } from './DailyScriptureCard';
import { 
  Flame, 
  BookOpen, 
  HeartHandshake,
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
    <div className="space-y-8 pb-16 animate-ios-fade-in text-slate-900 dark:text-slate-100">
      
      {/* Personalized Disciple Command Center */}
      <div className="relative overflow-hidden rounded-3xl bg-forest-950 text-white p-6 sm:p-10 border border-forest-800 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <Avatar 
              src={student.avatarUrl} 
              name={student.name}
              size="xl"
              className="ring-4 ring-gold-400/60 shadow-xl"
            />
            <div className="space-y-1">
              <span className="px-3.5 py-1 rounded-full bg-forest-900 text-gold-400 text-xs font-mono font-bold border border-forest-700 inline-flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-gold-400" />
                LIVELY STONES DISCIPLE
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Good day, {student.name}
              </h1>
              <p className="text-xs sm:text-sm text-forest-200">
                Pillar Stage: <strong className="text-gold-400 font-bold">{student.currentPillar}</strong> • {student.location}
              </p>
            </div>
          </div>

          {/* Consistency Indicator Widget */}
          <div className="flex items-center gap-3.5 bg-forest-900/80 p-4 rounded-2xl border border-forest-700 shrink-0 shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-gold-500 text-forest-950 flex items-center justify-center font-bold shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-forest-300 uppercase tracking-wider">Weekly Consistency</p>
              <p className="text-lg font-extrabold text-white">{student.weeklyStreak} Weeks Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Official YouVersion Daily Scripture / Verse of the Day */}
      <DailyScriptureCard />

      {/* Discipleship Progress Overview Widget */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold text-forest-800 dark:text-gold-400 uppercase tracking-wider">
              DISCIPLESHIP COMPLETION INDEX
            </h3>
            <p className="text-xs text-slate-500 dark:text-forest-300">
              Overall journey progress across the 6 pillars
            </p>
          </div>
          <span className="text-2xl font-extrabold text-forest-800 dark:text-gold-400 font-mono">
            {student.progressPercentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-forest-900 overflow-hidden p-0.5 border border-slate-300 dark:border-forest-800">
          <div 
            className="h-full rounded-full bg-forest-700 dark:bg-gold-500 transition-all duration-700 shadow-sm"
            style={{ width: `${student.progressPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-forest-300 pt-1">
          <span>Learn • Grow • Live</span>
          <span className="font-bold text-forest-800 dark:text-gold-400">Serve • Disciple • Multiply</span>
        </div>
      </Card>

      {/* Primary Discipleship Actions (Bible, Prayer, Roadmap, Community) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setStudentRoute('bible')}
          className="p-4 rounded-2xl bg-forest-800 hover:bg-forest-700 text-gold-400 text-xs font-extrabold flex flex-col items-center gap-2 transition-all shadow-lg"
        >
          <BookOpen className="w-5 h-5 text-gold-400" />
          Bible Reader & Plans
        </button>

        <button
          onClick={() => setStudentRoute('prayer')}
          className="p-4 rounded-2xl bg-forest-800 hover:bg-forest-700 text-gold-400 text-xs font-extrabold flex flex-col items-center gap-2 transition-all shadow-lg"
        >
          <HeartHandshake className="w-5 h-5 text-gold-400" />
          Prayer Ecosystem
        </button>

        <button
          onClick={() => setStudentRoute('journey')}
          className="p-4 rounded-2xl bg-slate-900 dark:bg-forest-900 text-white text-xs font-bold flex flex-col items-center gap-2 hover:opacity-90 transition-opacity shadow-md"
        >
          <Award className="w-5 h-5 text-gold-400" />
          Growth Roadmap
        </button>

        <button
          onClick={() => setStudentRoute('community')}
          className="p-4 rounded-2xl bg-slate-900 dark:bg-forest-900 text-white text-xs font-bold flex flex-col items-center gap-2 hover:opacity-90 transition-opacity shadow-md"
        >
          <Sparkles className="w-5 h-5 text-gold-400" />
          Community Feed
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 flex items-center justify-center font-bold text-lg shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Teachings</p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">{student.totalTeachingsCompleted} Done</p>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 flex items-center justify-center font-bold text-lg shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Quizzes</p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">{student.quizzesCompleted} Passed</p>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 flex items-center justify-center font-bold text-lg shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Assignments</p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">{student.assignmentsSubmitted} Logged</p>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 flex items-center justify-center font-bold text-lg shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Attendance</p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">{student.attendanceRate}% Rate</p>
          </div>
        </Card>
      </div>

      {/* Main Grid: Pending Tasks & Recent Teachings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pending Tasks Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Pending Tasks
            </h3>
            <button 
              onClick={() => setStudentRoute('journey')}
              className="text-xs font-bold text-forest-700 dark:text-gold-400 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {pendingAssignments.map((a) => (
              <Card key={a.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 font-mono font-bold">
                      Due {a.deadline}
                    </span>
                    <span className="text-slate-400 font-mono font-semibold">{a.pillar}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {a.title}
                  </h4>
                  <button
                    onClick={() => openAssignmentModal(a.id)}
                    className="w-full py-2 rounded-xl bg-forest-800 hover:bg-forest-700 text-white text-xs font-extrabold transition-all shadow-sm"
                  >
                    Submit Response
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Teachings */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Latest Discipleship Teachings
            </h3>
            <button 
              onClick={() => setStudentRoute('teachings')}
              className="text-xs font-bold text-forest-700 dark:text-gold-400 hover:underline"
            >
              Browse All
            </button>
          </div>

          <div className="space-y-3">
            {teachings.slice(0, 3).map((t) => (
              <Card key={t.id} onClick={() => openTeachingDetail(t.id)}>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 font-mono font-bold">
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
                    className="px-3.5 py-1.5 rounded-full bg-forest-800 hover:bg-forest-700 text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
                  >
                    Take Quiz
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
