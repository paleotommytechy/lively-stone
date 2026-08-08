import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  GraduationCap,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Phone,
  Church,
  Briefcase
} from 'lucide-react';
import { MinistryCrestSVG } from '../../vectors/MinistryVectors';

export const OnboardingView: React.FC = () => {
  const { setStudentRoute, showToast, updateStudentProfile } = useApp();
  const { user, completeOnboarding } = useAuth() as any;
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [fullName, setFullName] = useState<string>(user?.full_name || '');
  const [phone, setPhone] = useState<string>(user?.phone || '');
  const [city, setCity] = useState<string>(user?.city || 'Lagos');
  const [country, setCountry] = useState<string>(user?.country || 'Nigeria');
  const [church, setChurch] = useState<string>(user?.fellowship || 'Lively Stones International Network');
  const [occupation, setOccupation] = useState<string>(user?.occupation || 'Student Disciple');
  const [biography, setBiography] = useState<string>(user?.biography || '');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Scripture Meditation', 
    'Intercessory Prayer',
    'Apostolic Doctrine'
  ]);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(prev => prev.filter(i => i !== item));
    } else {
      setSelectedInterests(prev => [...prev, item]);
    }
  };

  const handleStep1Next = () => {
    setErrorMsg(null);
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name (minimum 2 characters).');
      return;
    }
    if (!phone.trim() || phone.trim().length < 6) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    if (!city.trim() || !country.trim()) {
      setErrorMsg('Please specify your city and country.');
      return;
    }
    setStep(2);
  };

  const handleStep2Next = () => {
    setErrorMsg(null);
    if (!church.trim()) {
      setErrorMsg('Please provide your local church, fellowship, or ministry fellowship.');
      return;
    }
    if (selectedInterests.length === 0) {
      setErrorMsg('Please select at least one spiritual growth goal.');
      return;
    }
    setStep(3);
  };

  const handleFinalSubmit = async () => {
    setIsSaving(true);
    setErrorMsg(null);

    try {
      const locationStr = city.trim() && country.trim() ? `${city.trim()}, ${country.trim()}` : city.trim() || 'Lagos, Nigeria';
      
      const res = await completeOnboarding({
        fullName: fullName.trim(),
        phone: phone.trim(),
        city: city.trim(),
        country: country.trim(),
        church: church.trim(),
        occupation: occupation.trim(),
        biography: biography.trim(),
        interests: selectedInterests,
      });

      if (!res.success) {
        setErrorMsg(res.error || 'Failed to save profile onboarding. Please try again.');
        setIsSaving(false);
        return;
      }

      // Update student in AppContext
      updateStudentProfile({
        name: fullName.trim(),
        location: locationStr,
        onboardingCompleted: true,
        progressPercentage: 100,
      });

      setIsCompleted(true);
      showToast('Onboarding Complete!', 'Welcome to your Disciple Portal journey!');

      // Redirect directly to the Student Dashboard
      setTimeout(() => {
        setStudentRoute('dashboard');
        navigate('/student/dashboard', { replace: true });
      }, 1000);
    } catch (err: any) {
      console.error('Onboarding submission error:', err);
      setErrorMsg(err?.message || 'An unexpected error occurred during onboarding.');
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8 px-4 animate-ios-fade-in text-slate-900 dark:text-slate-100 font-sans">
      
      {/* Step Indicator Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-forest-800 text-gold-400 flex items-center justify-center shadow-lg border border-forest-700">
          <MinistryCrestSVG className="w-7 h-7" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 text-xs font-mono font-bold border border-forest-700">
          <GraduationCap className="w-3.5 h-3.5" />
          DISCIPLE ORIENTATION // ACTS 19:9
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Welcome to Lively Stones
        </h1>
        <p className="text-xs text-slate-500 dark:text-forest-300 font-medium">
          Configure your consecrated discipleship profile (Step {step} of 3)
        </p>

        <div className="flex items-center justify-center gap-2 pt-2">
          <div className={`h-1.5 rounded-full transition-all ${step >= 1 ? 'w-12 bg-forest-700 dark:bg-gold-400' : 'w-4 bg-slate-200 dark:bg-forest-900'}`} />
          <div className={`h-1.5 rounded-full transition-all ${step >= 2 ? 'w-12 bg-forest-700 dark:bg-gold-400' : 'w-4 bg-slate-200 dark:bg-forest-900'}`} />
          <div className={`h-1.5 rounded-full transition-all ${step >= 3 ? 'w-12 bg-forest-700 dark:bg-gold-400' : 'w-4 bg-slate-200 dark:bg-forest-900'}`} />
        </div>
      </div>

      {/* Validation / Error Banner */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-start gap-3 shadow-lg animate-ios-fade-in">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block text-red-300">Required Information Incomplete</span>
            {errorMsg}
          </div>
        </div>
      )}

      {/* STEP 1: Personal Details & Contact */}
      {step === 1 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-forest-950 border border-slate-200 dark:border-forest-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-forest-900 pb-3">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-forest-700 dark:text-gold-400" />
              Step 1: Disciple Identity & Contact
            </h2>
            <span className="text-[11px] font-mono font-bold text-slate-400">Step 1/3</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Full Name <span className="text-amber-500">*</span>
              </label>
              <input 
                type="text" 
                required
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                placeholder="e.g. Ifeoluwa Olusegun" 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-forest-900 border border-slate-200 dark:border-forest-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                Phone Number <span className="text-amber-500">*</span>
              </label>
              <input 
                type="tel" 
                required
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="+234 800 000 0000" 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-forest-900 border border-slate-200 dark:border-forest-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400 font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  City / State <span className="text-amber-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  placeholder="e.g. Lagos or Ado-Ekiti" 
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-forest-900 border border-slate-200 dark:border-forest-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Country <span className="text-amber-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={country} 
                  onChange={(e) => setCountry(e.target.value)} 
                  placeholder="Nigeria" 
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-forest-900 border border-slate-200 dark:border-forest-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                Occupation / School Discipline
              </label>
              <input 
                type="text" 
                value={occupation} 
                onChange={(e) => setOccupation(e.target.value)} 
                placeholder="e.g. University Student, Engineer, Healthcare" 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-forest-900 border border-slate-200 dark:border-forest-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
          </div>

          <button 
            type="button"
            onClick={handleStep1Next}
            className="w-full py-3 rounded-2xl bg-forest-800 hover:bg-forest-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <span>Continue to Spiritual Goals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Fellowship & Spiritual Goals */}
      {step === 2 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-forest-950 border border-slate-200 dark:border-forest-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-forest-900 pb-3">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold-400" />
              Step 2: Fellowship & Spiritual Growth Goals
            </h2>
            <span className="text-[11px] font-mono font-bold text-slate-400">Step 2/3</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1.5">
                <Church className="w-3.5 h-3.5 text-slate-400" />
                Church / Fellowship Affiliation <span className="text-amber-500">*</span>
              </label>
              <input 
                type="text" 
                required
                value={church} 
                onChange={(e) => setChurch(e.target.value)} 
                placeholder="e.g. Lively Stones Network / Local Assembly" 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-forest-900 border border-slate-200 dark:border-forest-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Personal Biography / Faith Commitment (Optional)
              </label>
              <textarea 
                rows={3}
                value={biography} 
                onChange={(e) => setBiography(e.target.value)} 
                placeholder="Share your spiritual desire or what God is teaching you in this season..." 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-forest-900 border border-slate-200 dark:border-forest-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Select Discipleship Focus Areas <span className="text-amber-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                          ? 'bg-forest-800 text-white border-forest-700 shadow-md ring-1 ring-gold-400/40' 
                          : 'bg-slate-50 dark:bg-forest-900 border-slate-200 dark:border-forest-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-forest-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item}</span>
                        {active && <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <button 
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-forest-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-forest-800 transition-colors"
            >
              Back
            </button>
            <button 
              type="button"
              onClick={handleStep2Next}
              className="flex-1 py-3 rounded-2xl bg-forest-800 hover:bg-forest-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Review & Finalize</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Verification & Activation */}
      {step === 3 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-forest-950 border border-slate-200 dark:border-forest-800 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-full bg-forest-800 text-gold-400 flex items-center justify-center shadow-xl border-2 border-gold-400/60">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Profile Ready for Activation!
            </h2>
            <p className="text-xs text-slate-500 dark:text-forest-300">
              Confirm your details to unlock full access to the School of Tyrannus Disciple Portal.
            </p>
          </div>

          {/* Review Summary Card */}
          <div className="p-4 rounded-2xl bg-forest-900/60 border border-forest-800 text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-forest-800/80 pb-1.5">
              <span className="text-slate-400">Disciple Name:</span>
              <span className="font-bold text-white">{fullName}</span>
            </div>
            <div className="flex justify-between border-b border-forest-800/80 pb-1.5">
              <span className="text-slate-400">Phone:</span>
              <span className="font-mono font-bold text-gold-400">{phone}</span>
            </div>
            <div className="flex justify-between border-b border-forest-800/80 pb-1.5">
              <span className="text-slate-400">Territory:</span>
              <span className="font-bold text-white">{city}, {country}</span>
            </div>
            <div className="flex justify-between border-b border-forest-800/80 pb-1.5">
              <span className="text-slate-400">Fellowship:</span>
              <span className="font-bold text-white">{church}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Profile Index:</span>
              <span className="font-mono font-bold text-emerald-400">100% Complete</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button 
              type="button"
              disabled={isSaving || isCompleted}
              onClick={() => setStep(2)}
              className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-forest-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-forest-800 transition-colors disabled:opacity-50"
            >
              Back
            </button>
            <button 
              type="button"
              disabled={isSaving || isCompleted}
              onClick={handleFinalSubmit}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-forest-800 via-forest-700 to-emerald-800 hover:from-forest-700 hover:to-emerald-700 text-gold-400 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl border border-gold-400/30 transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-gold-400" />
                  <span>Activating Disciple Profile...</span>
                </>
              ) : isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Profile Activated! Redirecting...</span>
                </>
              ) : (
                <>
                  <span>Complete Onboarding & Enter Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
