import React, { useState, useEffect, useRef } from 'react';

interface YouTubeShortPlayerProps {
  videoId?: string;
  className?: string;
  start?: number;
  end?: number;
}

export const YouTubeShortPlayer: React.FC<YouTubeShortPlayerProps> = ({
  videoId = 'K2HftBQeE4k',
  className = '',
  start = 0,
  end = 120 // Plays only the first 2 minutes (120 seconds)
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [iframeSrc, setIframeSrc] = useState<string>('');

  // 1. YouTube Embed URL: Landscape 16:9, muted autoplay, loop first 2 minutes (start=0 & end=120), no controls (controls=0)
  const getEmbedUrl = () => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&start=${start}&end=${end}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1`;
  };

  // 2. Scroll-to-Pause using native IntersectionObserver: Swaps src to "" off-screen and restores on-screen
  useEffect(() => {
    const targetNode = containerRef.current;
    if (!targetNode) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIframeSrc(getEmbedUrl());
        } else {
          setIsVisible(false);
          setIframeSrc(''); // Swap src off-screen to stop playback & unload resources
        }
      },
      {
        threshold: 0.25 // 25% visibility threshold
      }
    );

    observer.observe(targetNode);

    return () => {
      observer.disconnect();
    };
  }, [videoId, start, end]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video rounded-3xl sm:rounded-4xl overflow-hidden bg-slate-950 border border-white/20 dark:border-white/10 shadow-2xl ${className}`}
    >
      {isVisible && iframeSrc ? (
        <iframe
          src={iframeSrc}
          title="YouTube Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full object-cover border-0"
        />
      ) : (
        <div className="w-full h-full bg-slate-950" />
      )}
    </div>
  );
};
