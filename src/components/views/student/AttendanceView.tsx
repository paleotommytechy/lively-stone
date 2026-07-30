import React from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { CheckCircle2, XCircle, Calendar } from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const { student, attendanceSessions } = useApp();

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in">
      
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Attendance & Consistency Record
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Your commitment and active participation build a strong foundation in Christ.
        </p>
      </div>

      {/* Consistency Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <IOSCard className="text-center">
          <p className="text-xs font-mono font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-wider">Attendance Rate</p>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white my-1 font-mono">{student.attendanceRate}%</p>
          <p className="text-[11px] text-slate-500 font-medium">Punctual & Active Participation</p>
        </IOSCard>

        <IOSCard className="text-center">
          <p className="text-xs font-mono font-bold text-blue-500 dark:text-cyan-400 uppercase tracking-wider">Weekly Streak</p>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white my-1 font-mono">{student.weeklyStreak} Weeks</p>
          <p className="text-[11px] text-slate-500 font-medium">Consecutive Session Engagement</p>
        </IOSCard>

        <IOSCard className="text-center">
          <p className="text-xs font-mono font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">Sessions Attended</p>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white my-1 font-mono">
            {attendanceSessions.filter(s => s.attended).length} of {attendanceSessions.length}
          </p>
          <p className="text-[11px] text-slate-500 font-medium">School of Tyrannus Gatherings</p>
        </IOSCard>
      </div>

      {/* Attendance History Log */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Session History
        </h2>

        <div className="space-y-3">
          {attendanceSessions.map((sess) => (
            <IOSCard key={sess.id} className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-md ${sess.attended ? 'bg-emerald-500 shadow-emerald-500/20' : 'glass-pill text-slate-400'}`}>
                    {sess.attended ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {sess.title.replace('—', ':')}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      Topic: {sess.topic} • Date: {sess.date}
                    </p>
                    {sess.notes && (
                      <p className="text-[11px] text-blue-600 dark:text-cyan-400 mt-0.5 font-medium">
                        Note: {sess.notes}
                      </p>
                    )}
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold shrink-0 ${sess.attended ? 'glass-pill text-emerald-500 dark:text-emerald-400 border border-emerald-500/30' : 'glass-pill text-slate-400'}`}>
                  {sess.attended ? 'Attended' : 'Excused'}
                </span>
              </div>
            </IOSCard>
          ))}
        </div>
      </div>

    </div>
  );
};

