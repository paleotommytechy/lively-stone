import React from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { Avatar } from '../../ui/Avatar';
import { Users, Award, Flame, CheckCircle2 } from 'lucide-react';

export const AdminStudentsView: React.FC = () => {
  const { studentsList } = useApp();

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Student Roster & Progress Tracking
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Monitor attendance, assignment completion, and stage progression of School of Tyrannus disciples
        </p>
      </div>

      <div className="space-y-4">
        {studentsList.map((std) => (
          <IOSCard key={std.id} className="p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar 
                  src={std.avatarUrl} 
                  name={std.name} 
                  size="lg"
                  className="ring-2 ring-blue-500/40"
                />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {std.name}
                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full glass-pill text-indigo-600 dark:text-cyan-400 border border-indigo-500/20">
                      Pillar: {std.currentPillar}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {std.email} • {std.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-slate-600 dark:text-slate-300 font-mono">
                <div className="text-center">
                  <p className="font-extrabold text-slate-900 dark:text-white">{std.progressPercentage}%</p>
                  <p className="text-[10px] text-slate-400">Progress</p>
                </div>
                <div className="text-center">
                  <p className="font-extrabold text-amber-500">{std.weeklyStreak} Wks</p>
                  <p className="text-[10px] text-slate-400">Streak 🔥</p>
                </div>
                <div className="text-center">
                  <p className="font-extrabold text-emerald-500">{std.attendanceRate}%</p>
                  <p className="text-[10px] text-slate-400">Attendance</p>
                </div>
              </div>
            </div>
          </IOSCard>
        ))}
      </div>
    </div>
  );
};

