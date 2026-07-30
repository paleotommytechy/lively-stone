import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { Sparkles, CheckCircle2, Send, Heart, UserPlus } from 'lucide-react';

export const JoinView: React.FC = () => {
  const { setRoleView, showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    status: 'Student'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Enlistment Submitted', 'Welcome to School of Tyrannus!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16 animate-ios-fade-in pt-4">
      
      <div className="text-center space-y-3">
        <span className="px-4 py-1.5 rounded-full glass-pill text-amber-500 dark:text-amber-300 text-xs font-mono font-bold border border-amber-500/20 inline-flex items-center gap-1.5">
          <UserPlus className="w-4 h-4 text-amber-400" />
          JOIN DISCIPLESHIP CLASS
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Join School of Tyrannus
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Begin your journey through Learn → Grow → Live → Serve → Disciple → Multiply
        </p>
      </div>

      <IOSCard>
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Welcome to the Family!
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
              Your profile has been created for the School of Tyrannus prototype. You can now explore the Student Experience.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setRoleView('student')}
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all ios-active"
              >
                Go to Student Portal Now
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ifeoluwa"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ifeoluwa@example.com"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Location (City / State)
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Ado-Ekiti, Nigeria"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Current Background / Calling
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="Student">University / Secondary School Student</option>
                <option value="Youth">Youth Believer</option>
                <option value="Leader">Youth Leader / Fellowship Exco</option>
                <option value="Believer">Believer Seeking Discipleship</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-extrabold text-xs shadow-xl shadow-amber-500/25 transition-all ios-active"
              >
                Enlist in School of Tyrannus
              </button>
            </div>
          </form>
        )}
      </IOSCard>

    </div>
  );
};

