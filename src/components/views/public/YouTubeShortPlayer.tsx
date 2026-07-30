import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  videoSrc?: string;
  className?: string;
}

export const YouTubeShortPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc = '/video.mp4',
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Native IntersectionObserver to auto play video when scrolled into view and pause off-screen
  useEffect(() => {
    const targetNode = containerRef.current;
    const videoNode = videoRef.current;
    if (!targetNode || !videoNode) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoNode.play().catch(() => {
            // Handles browser autoplay permissions cleanly
          });
        } else {
          videoNode.pause();
        }
      },
      {
        threshold: 0.25 // Plays when 25% visible in viewport
      }
    );

    observer.observe(targetNode);

    return () => {
      observer.disconnect();
    };
  }, []);

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
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-contain border-0"
      />
    </div>
  );
};
