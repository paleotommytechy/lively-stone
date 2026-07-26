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
        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20 inline-flex items-center gap-1.5">
          <UserPlus className="w-4 h-4" />
          Join Discipleship Class
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Join School of Tyrannus
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Begin your journey through Learn → Grow → Live → Serve → Disciple → Multiply
        </p>
      </div>

      <IOSCard>
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto text-3xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Welcome to the Family!
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-md mx-auto">
              Your profile has been created for the School of Tyrannus prototype. You can now explore the Student Experience.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setRoleView('student')}
                className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all ios-active"
              >
                Go to Student Portal Now
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ifeoluwa"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ifeoluwa@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Location (City / State)
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Ado-Ekiti, Nigeria"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Current Background / Calling
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none"
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
                className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/25 transition-all ios-active"
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
