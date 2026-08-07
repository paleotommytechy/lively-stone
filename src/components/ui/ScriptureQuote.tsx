import React from 'react';
import { useNavigate } from 'react-router-dom';
import { parseScriptureReference } from '../../services/youversion';
import { BookOpen, ExternalLink } from 'lucide-react';

interface ScriptureQuoteProps {
  reference: string; // e.g. "Joshua 1:9", "Romans 12:1-2", "Psalm 23:1", "JHN.3.16"
  text?: string;
  version?: string;
  className?: string;
  variant?: 'card' | 'inline' | 'callout';
}

/**
 * Reusable Scripture reference & quote component.
 * Allows discipleship features (Prayer, Teachings, Assignments) to link directly to the Bible reader.
 */
export const ScriptureQuote: React.FC<ScriptureQuoteProps> = ({
  reference,
  text,
  version = 'BSB',
  className = '',
  variant = 'card',
}) => {
  const navigate = useNavigate();
  const parsed = parseScriptureReference(reference);

  const handleClick = () => {
    const book = parsed.usfm;
    const chapter = parsed.chapter;
    const verseParam = parsed.verse ? `&verse=${parsed.verse.split('-')[0]}` : '';
    navigate(`/student/bible?book=${book}&chapter=${chapter}${verseParam}`);
  };

  if (variant === 'inline') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-forest-100 dark:bg-forest-900 text-forest-800 dark:text-gold-400 text-xs font-mono font-bold hover:underline cursor-pointer border border-forest-200 dark:border-forest-700 transition-colors ${className}`}
        title={`Read ${parsed.displayReference} in Bible`}
      >
        <BookOpen className="w-3 h-3 text-gold-400" />
        <span>{parsed.displayReference}</span>
      </button>
    );
  }

  if (variant === 'callout') {
    return (
      <div className={`p-3.5 rounded-2xl bg-forest-950/60 border border-forest-800 text-slate-100 space-y-1.5 ${className}`}>
        {text && (
          <p className="text-xs font-serif italic text-slate-200">
            "{text}"
          </p>
        )}
        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-forest-800/80">
          <span className="font-bold text-gold-400">{parsed.displayReference} ({version})</span>
          <button
            onClick={handleClick}
            className="text-forest-300 hover:text-gold-400 font-semibold flex items-center gap-1"
          >
            <span>Read in Bible</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  // Default 'card' variant
  return (
    <div className={`p-4 rounded-2xl bg-slate-50 dark:bg-forest-900/60 border border-slate-200 dark:border-forest-800 space-y-2 ${className}`}>
      {text && (
        <blockquote className="text-sm font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
          "{text}"
        </blockquote>
      )}
      <div className="flex items-center justify-between text-xs pt-1">
        <span className="font-extrabold text-forest-800 dark:text-gold-400 font-sans">
          {parsed.displayReference}
          <span className="text-[10px] font-mono text-slate-400 ml-1 font-normal">({version})</span>
        </span>
        <button
          onClick={handleClick}
          className="px-2.5 py-1 rounded-xl bg-forest-800 hover:bg-forest-700 text-gold-400 text-[11px] font-bold flex items-center gap-1 transition-all"
        >
          <span>Open Bible</span>
          <BookOpen className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
