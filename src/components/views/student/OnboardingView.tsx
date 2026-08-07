import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { useAuth } from '../../../context/AuthContext';
import { 
  User, 
  MapPin, 
  BookOpen, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { MinistryCrestSVG } from '../../vectors/MinistryVectors';

export const OnboardingView: React.FC = () => {
  const { setStudentRoute, showToast } = useApp();
  const { user } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [fullName, setFullName] = useState<string>(user?.full_name || '');
  const [phone, setPhone] = useState<string>('');
  const [location, setLocation] = useState<string>('Lagos, Nigeria');
  const [church, setChurch] = useState<string>('');
  const [occupation, setOccupation] = useState<string>('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Scripture Meditation', 'Intercessory Prayer']);

  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(prev => prev.filter(i => i !== item));
    } else {
      setSelectedInterests(prev => [...prev, item]);
    }
  };

  const handleComplete = () => {
    showToast('Onboarding Complete!', 'Welcome to your Disciple Portal journey!');
    setStudentRoute('dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8 px-4 animate-ios-fade-in text-slate-900 dark:text-slate-100">
      
      {/* Step Indicator Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-forest-800 text-gold-400 flex items-center justify-center shadow-lg">
          <MinistryCrestSVG className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Welcome to Lively Stones
        </h1>
        <p className="text-xs text-slate-500 dark:text-forest-300 font-medium">
          Personalize your discipleship journey step {step} of 3
        </p>

        <div className="flex items-center justify-center gap-2 pt-2">
          <div className={`h-1.5 rounded-full transition-all ${step >= 1 ? 'w-12 bg-forest-700 dark:bg-gold-400' : 'w-4 bg-slate-200 dark:bg-forest-900'}`} />
          <div className={`h-1.5 rounded-full transition-all ${step >= 2 ? 'w-12 bg-forest-700 dark:bg-gold-400' : 'w-4 bg-slate-200 dark:bg-forest-900'}`} />
          <div className={`h-1.5 rounded-full transition-all ${step >= 3 ? 'w-12 bg-forest-700 dark:bg-gold-400' : 'w-4 bg-slate-200 dark:bg-forest-900'}`} />
        </div>
      </div>

      {/* STEP 1: Personal Details */}
      {step === 1 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-forest-950 border border-slate-200 dark:border-forest-800 shadow-xl space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5 text-forest-700 dark:text-gold-400" />
            Step 1: Disciple Profile Details
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Full Name</label>
              <input 
                type="text" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                placeholder="Your full name..." 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-forest-900 border text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Phone Number</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="+234 800 000 0000" 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-forest-900 border text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">City & Country</label>
                <input 
                  type="text" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  placeholder="Lagos, Nigeria" 
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-forest-900 border text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">Church / Fellowship</label>
                <input 
                  type="text" 
                  value={church} 
                  onChange={(e) => setChurch(e.target.value)} 
                  placeholder="Lively Stones Network" 
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-forest-900 border text-xs focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={() => setStep(2)}
            className="w-full py-3 rounded-2xl bg-forest-800 hover:bg-forest-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Continue to Step 2</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Spiritual Interests */}
      {step === 2 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-forest-950 border border-slate-200 dark:border-forest-800 shadow-xl space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-500" />
            Step 2: Spiritual Growth Goals
          </h2>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            Select areas where you desire spiritual maturity and encouragement:
          </p>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            {[
              'Scripture Meditation',
              'Intercessory Prayer',
              'Apostolic Doctrine',
              'Evangelism & SSGI',
              'Leadership Mentorship',
              'Holiness in Daily Life'
            ].map((item) => {
              const active = selectedInterests.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleInterest(item)}
                  className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                    active 
                      ? 'bg-forest-800 text-white border-forest-700 shadow-md' 
                      : 'bg-slate-50 dark:bg-forest-900 border-slate-200 dark:border-forest-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button 
              onClick={() => setStep(1)}
              className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-forest-900 text-xs font-bold"
            >
              Back
            </button>
            <button 
              onClick={() => setStep(3)}
              className="flex-1 py-3 rounded-2xl bg-forest-800 hover:bg-forest-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Continue to Step 3</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Complete */}
      {step === 3 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-forest-950 border border-slate-200 dark:border-forest-800 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-forest-800 text-gold-400 flex items-center justify-center shadow-xl">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Onboarding 100% Complete!
          </h2>

          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            Your profile and discipleship pathway are configured. You are ready to engage Scripture, cultivate prayer, and grow with the community.
          </p>

          <button 
            onClick={handleComplete}
            className="w-full py-3.5 rounded-2xl bg-forest-800 hover:bg-forest-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl"
          >
            Enter Disciple Portal
          </button>
        </div>
      )}

    </div>
  );
};
