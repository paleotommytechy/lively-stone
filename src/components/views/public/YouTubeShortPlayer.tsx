import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';

interface VideoPlayerProps {
  videoSrc?: string;
  title?: string;
  className?: string;
}

const getYouTubeId = (urlStr: string): string | null => {
  if (!urlStr) return null;
  const shortsMatch = urlStr.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch?.[1]) return shortsMatch[1];

  const watchMatch = urlStr.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch?.[1]) return watchMatch[1];

  const youtuBeMatch = urlStr.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (youtuBeMatch?.[1]) return youtuBeMatch[1];

  const embedMatch = urlStr.match(/\/embed\/([a-zA-Z0-9_-]+)/);
  if (embedMatch?.[1]) return embedMatch[1];

  if (/^[a-zA-Z0-9_-]{11}$/.test(urlStr)) return urlStr;

  return null;
};

export const YouTubeShortPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc = 'https://www.youtube.com/shorts/LS3lNxWrydQ',
  title = 'Kingdom Teaching YouTube Short',
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const youtubeId = getYouTubeId(videoSrc);

  useEffect(() => {
    // Add domain preconnect hints for high speed loading
    ['https://www.youtube-nocookie.com', 'https://i.ytimg.com'].forEach((domain) => {
      if (!document.querySelector(`link[href="${domain}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
      }
    });
  }, []);

  // Native IntersectionObserver to pause video on scroll past hero & resume on return
  useEffect(() => {
    const containerNode = containerRef.current;
    if (!containerNode) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Resume playback when returned to viewport
          if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
              '*'
            );
          }
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          // Pause instantly when scrolled off-screen
          if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
              '*'
            );
          }
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      {
        threshold: 0.15 // Triggers pause when less than 15% visible
      }
    );

    observer.observe(containerNode);

    return () => {
      observer.disconnect();
    };
  }, [youtubeId]);

  if (youtubeId) {
    // Fast youtube-nocookie.com domain with audio allowed & enablejsapi=1 for postMessage control
    const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${youtubeId}&controls=1&rel=0&playsinline=1&modestbranding=1&enablejsapi=1`;

    const thumbnailUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

    return (
      <div 
        ref={containerRef}
        className={`relative w-full mx-auto rounded-3xl sm:rounded-4xl overflow-hidden bg-slate-950 border border-white/20 dark:border-white/10 shadow-2xl shadow-cyan-500/20 group 
          aspect-[9/16] max-w-xs sm:max-w-sm lg:max-w-none lg:w-full lg:aspect-video transition-all duration-300 ${className}`}
      >
        {/* Fast Poster Thumbnail Facade (shows until iframe finishes loading) */}
        {!isLoaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950 overflow-hidden">
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="w-full h-full object-cover opacity-60 blur-xs scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="relative z-20 flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-cyan-500/30 border border-cyan-400/50 flex items-center justify-center backdrop-blur-md animate-pulse">
                <Play className="w-6 h-6 text-cyan-300 fill-cyan-300 ml-1" />
              </div>
              <span className="text-xs font-mono font-semibold text-cyan-200 tracking-wider">
                LOADING VIDEO...
              </span>
            </div>
          </div>
        )}

        {/* Audio Control Quick Toggle Badge */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-cyan-300 text-xs font-mono font-bold backdrop-blur-md flex items-center gap-1.5 shadow-lg transition-all active:scale-95"
          title={isMuted ? "Click to enable audio" : "Audio enabled"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-amber-400" />
              <span>MUTED</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>AUDIO ON</span>
            </>
          )}
        </button>

        {/* Optimized YouTube Embed Iframe */}
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
          className="w-full h-full border-0 rounded-3xl sm:rounded-4xl"
        />
      </div>
    );
  }

  // Fallback for HTML5 video
  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-video rounded-3xl sm:rounded-4xl overflow-hidden bg-slate-950 border border-white/20 dark:border-white/10 shadow-2xl ${className}`}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        controls
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        className="w-full h-full object-contain border-0"
      />
    </div>
  );
};



