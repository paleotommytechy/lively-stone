import React from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { allStudentsList } from '../../../data/mock-students';
import { Users, Award, Flame, CheckCircle2 } from 'lucide-react';

export const AdminStudentsView: React.FC = () => {
  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Student Roster & Progress Tracking
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Monitor attendance, assignment completion, and stage progression of School of Tyrannus disciples
        </p>
      </div>

      <div className="space-y-4">
        {allStudentsList.map((std) => (
          <IOSCard key={std.id} className="p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img 
                  src={std.avatarUrl} 
                  alt={std.name} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500/50"
                />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    {std.name}
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      Pillar: {std.currentPillar}
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {std.email} • {std.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-zinc-600 dark:text-zinc-300">
                <div className="text-center">
                  <p className="font-bold text-zinc-900 dark:text-white">{std.progressPercentage}%</p>
                  <p className="text-[10px] text-zinc-400">Progress</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-amber-500">{std.weeklyStreak} Wks</p>
                  <p className="text-[10px] text-zinc-400">Streak 🔥</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-emerald-500">{std.attendanceRate}%</p>
                  <p className="text-[10px] text-zinc-400">Attendance</p>
                </div>
              </div>
            </div>
          </IOSCard>
        ))}
      </div>
    </div>
  );
};
