import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Play, Sparkles } from 'lucide-react';

const YouTubeShortPlayer = React.lazy(() =>
  import('./YouTubeShortPlayer').then((module) => ({ default: module.YouTubeShortPlayer }))
);

interface LazyPlayerProps {
  videoSrc?: string;
  title?: string;
  className?: string;
}

export const LazyYouTubePlayer: React.FC<LazyPlayerProps> = ({
  videoSrc = 'https://www.youtube.com/shorts/LS3lNxWrydQ',
  title = 'Kingdom Teaching YouTube Short',
  className = '',
}) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Once visible, load component and keep initialized
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-full min-h-[320px] relative ${className}`}>
      {isInView ? (
        <Suspense
          fallback={
            <div className="w-full aspect-video rounded-3xl bg-slate-950 border border-white/20 flex flex-col items-center justify-center space-y-3 p-6 text-center animate-pulse">
              <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center">
                <Play className="w-6 h-6 text-cyan-300 fill-cyan-300 ml-1" />
              </div>
              <span className="text-xs font-mono font-bold text-cyan-300 tracking-wider">
                LOADING VIDEO COMPONENT...
              </span>
            </div>
          }
        >
          <YouTubeShortPlayer videoSrc={videoSrc} title={title} className={className} />
        </Suspense>
      ) : (
        /* Lightweight Placeholder Facade before scrolling into view */
        <div className="w-full aspect-video rounded-3xl sm:rounded-4xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-white/20 p-6 flex flex-col items-center justify-center text-center space-y-3 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-7 h-7 text-cyan-300 fill-cyan-300 ml-1" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              SCROLL TO LOAD YOUTUBE EMBED
            </div>
            <p className="text-xs text-slate-300 font-medium max-w-xs">
              {title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
