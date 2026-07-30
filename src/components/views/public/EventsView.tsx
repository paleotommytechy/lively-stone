import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSCard } from '../../ios/IOSCard';
import { IOSModal } from '../../ios/IOSModal';
import { Calendar, MapPin, Clock, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { MinistryEvent } from '../../../types';

export const EventsView: React.FC = () => {
  const { events, showToast } = useApp();
  const [selectedEvent, setSelectedEvent] = useState<MinistryEvent | null>(null);
  const [registered, setRegistered] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    setRegistered(true);
    showToast('Registration Confirmed', `You are registered for ${selectedEvent?.title}`);
  };

  return (
    <div className="space-y-8 pb-16 animate-ios-fade-in">
      
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Ministry Conventions & Events
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Gathering believers for territorial impact, retreats, and annual conventions
        </p>
      </div>

      <div className="space-y-6">
        {events.map((evt) => (
          <IOSCard key={evt.id} className="overflow-hidden p-0 border border-white/20 dark:border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <img 
                src={evt.bannerUrl} 
                alt={evt.title}
                className="w-full h-56 md:h-full object-cover"
              />

              <div className="md:col-span-2 p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full glass-pill text-amber-500 dark:text-amber-300 font-mono font-bold text-xs border border-amber-500/20">
                      {evt.type}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {evt.registeredCount.toLocaleString()} Registered
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {evt.title}
                  </h2>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <p className="flex items-center gap-2 font-semibold font-mono">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      {evt.date} • {evt.time}
                    </p>
                    <p className="flex items-center gap-2 font-semibold">
                      <MapPin className="w-4 h-4 text-indigo-500" />
                      {evt.location}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="pt-1 text-xs">
                    <strong className="text-slate-900 dark:text-white">Speakers: </strong>
                    <span className="text-slate-600 dark:text-slate-400">{evt.speakers.join(', ')}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setSelectedEvent(evt);
                      setRegistered(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition-all ios-active hover:from-amber-400 hover:to-amber-300"
                  >
                    Register for Event
                  </button>
                </div>
              </div>
            </div>
          </IOSCard>
        ))}
      </div>

      {/* Registration Modal */}
      <IOSModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title}
        subtitle="Complete your event registration"
      >
        {registered ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Registration Successful!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              We look forward to hosting you at {selectedEvent?.location}. A confirmation pass has been simulated for your account.
            </p>
            <button
              onClick={() => setSelectedEvent(null)}
              className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
              >
                Confirm Registration
              </button>
            </div>
          </form>
        )}
      </IOSModal>

    </div>
  );
};

