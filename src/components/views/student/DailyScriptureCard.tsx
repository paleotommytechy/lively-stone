import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDailyScripture } from '../../../hooks/useBible';
import { useApp } from '../../../context/AppContext';
import { 
  BookOpen, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  ArrowRight, 
  Quote, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const DailyScriptureCard: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const { 
    reference, 
    text, 
    versionName, 
    versionAbbreviation, 
    copyright, 
    dayOfYear,
    preferredBibleId,
    setPreferredBibleId,
    versions,
    isLoading, 
    isError, 
    refetch,
    parsedReference 
  } = useDailyScripture();

  const [copied, setCopied] = useState(false);
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false);

  const handleCopy = async () => {
    try {
      const formatted = `"${text}" — ${reference} (${versionAbbreviation})`;
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      showToast('Scripture Copied', `"${reference}" copied to clipboard.`);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('Scripture Copied', `${reference} copied.`);
    }
  };

  const handleReadInBible = () => {
    const book = parsedReference.usfm || 'JOS';
    const chapter = parsedReference.chapter || 1;
    const verse = parsedReference.verse ? `&verse=${parsedReference.verse}` : '';
    navigate(`/student/bible?book=${book}&chapter=${chapter}${verse}`);
  };

  // ----------------------------------------------------
  // 1. LOADING SKELETON STATE
  // ----------------------------------------------------
  if (isLoading) {
    return (
      <div 
        data-testid="daily-scripture-loading"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-slate-900 border border-forest-800 p-6 sm:p-8 shadow-xl text-white space-y-4 animate-pulse"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-forest-800/80" />
            <div className="h-4 w-32 bg-forest-800/80 rounded-md" />
          </div>
          <div className="h-6 w-24 bg-forest-800/80 rounded-full" />
        </div>
        <div className="space-y-2 py-2">
          <div className="h-5 w-full bg-forest-800/80 rounded-md" />
          <div className="h-5 w-5/6 bg-forest-800/80 rounded-md" />
          <div className="h-5 w-3/4 bg-forest-800/80 rounded-md" />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-forest-800/60">
          <div className="h-4 w-28 bg-forest-800/80 rounded-md" />
          <div className="h-8 w-28 bg-forest-800/80 rounded-xl" />
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. ERROR / FALLBACK STATE
  // ----------------------------------------------------
  if (isError && !text) {
    return (
      <div 
        data-testid="daily-scripture-error"
        className="relative overflow-hidden rounded-3xl bg-slate-900 border border-amber-500/30 p-6 sm:p-8 shadow-xl text-slate-100 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-gold-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-gold-400" />
            </div>
            <h3 className="text-xs font-mono font-bold text-gold-400 uppercase tracking-widest">
              DAILY SCRIPTURE
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Day {dayOfYear}</span>
        </div>

        <p className="text-sm text-slate-300">
          Today's Scripture could not be retrieved from the YouVersion network. You can retry the connection or read from local scriptures.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Connection
          </button>
          <button
            onClick={handleReadInBible}
            className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-700 text-white text-xs font-bold transition-all"
          >
            Open Bible Reader
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 3. SUCCESS DISPLAY STATE
  // ----------------------------------------------------
  return (
    <div 
      data-testid="daily-scripture-card"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-slate-950 text-white p-6 sm:p-8 border border-forest-800 shadow-2xl transition-all font-sans"
    >
      {/* Background Ornamental Scripture Watermark */}
      <div className="absolute right-3 -bottom-4 opacity-5 pointer-events-none select-none text-gold-400">
        <Quote className="w-40 h-40" />
      </div>

      <div className="relative z-10 space-y-4">
        
        {/* Header Row: Badge, Heading, Translation Switcher & Day */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gold-500/20 border border-gold-400/40 text-gold-400 flex items-center justify-center shadow-inner">
              <BookOpen className="w-4 h-4 text-gold-400" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-mono font-extrabold text-gold-400 uppercase tracking-widest">
                DAILY SCRIPTURE
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-forest-800/80 border border-forest-700 text-forest-200">
                Day {dayOfYear} of 366
              </span>
            </div>
          </div>

          {/* Translation Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setIsVersionDropdownOpen(!isVersionDropdownOpen)}
              className="px-3 py-1 rounded-full bg-forest-800/90 hover:bg-forest-700/90 border border-forest-700 text-gold-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              title="Change Bible Translation"
              aria-label="Select Bible translation"
            >
              <span>{versionAbbreviation}</span>
              <ChevronDown className="w-3 h-3 text-gold-400" />
            </button>

            {isVersionDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-forest-950 border border-forest-700 shadow-2xl p-2 z-30 space-y-1">
                <div className="px-2 py-1 text-[10px] font-mono font-bold text-forest-400 uppercase">
                  Available Translations
                </div>
                {versions.map(v => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setPreferredBibleId(String(v.id));
                      setIsVersionDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      String(v.id) === String(preferredBibleId)
                        ? 'bg-gold-500 text-forest-950 font-bold'
                        : 'text-forest-100 hover:bg-forest-900'
                    }`}
                  >
                    <span>{v.name}</span>
                    <span className="font-mono text-[10px] opacity-75">{v.abbreviation}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scripture Text Quote Surface */}
        <div className="space-y-2 py-1">
          <blockquote className="text-base sm:text-lg lg:text-xl font-serif leading-relaxed text-slate-100 italic">
            "{text}"
          </blockquote>

          {/* Reference & Translation Attribution */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-sm sm:text-base font-sans font-extrabold text-gold-400">
              {reference}
            </span>
            <span className="text-xs font-mono text-forest-300 font-medium">
              • {versionName}
            </span>
          </div>
        </div>

        {/* Card Actions Footer */}
        <div className="pt-3 border-t border-forest-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReadInBible}
              className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-extrabold flex items-center gap-1.5 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read in Bible</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-forest-800/90 hover:bg-forest-700 border border-forest-700 text-slate-200 font-semibold flex items-center gap-1.5 transition-all"
              title="Copy Scripture Passage"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gold-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="text-[10px] font-mono text-forest-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>Powered by YouVersion Platform</span>
          </div>
        </div>

      </div>
    </div>
  );
};
