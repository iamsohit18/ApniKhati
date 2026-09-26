import React, { useRef, useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AGRICULTURE_VIDEOS, getActiveVideoForCurrentWeek } from '../../data/videoData';
import { Play, Pause, Volume2, VolumeX, Calendar, Film, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const BackgroundVideoPlayer: React.FC = () => {
  const {
    activeVideoIndex,
    setActiveVideoIndex,
    isVideoPlaying,
    setIsVideoPlaying,
    isVideoMuted,
    setIsVideoMuted,
  } = useApp();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const cycleInfo = getActiveVideoForCurrentWeek();
  const currentVideo = AGRICULTURE_VIDEOS[activeVideoIndex] || AGRICULTURE_VIDEOS[0];

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.play().catch((err) => {
          console.warn('Autoplay prevented or video loading:', err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVideoPlaying, activeVideoIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  const togglePlay = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const toggleMute = () => {
    setIsVideoMuted(!isVideoMuted);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* Background HTML5 Video */}
      <video
        ref={videoRef}
        key={currentVideo.url}
        src={currentVideo.url}
        poster={currentVideo.poster}
        autoPlay
        loop
        muted={isVideoMuted}
        playsInline
        className="w-full h-full object-cover object-center scale-105 transition-opacity duration-1000"
      />

      {/* Startup Cinematic Gradient Overlays for High Legibility */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-stone-950/60 to-stone-950/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-emerald-950/40 pointer-events-none" />

      {/* Floating 7-Day Reel Control Pill (User can interact with it) */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto">
        <div className="bg-stone-900/80 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-2.5 shadow-2xl text-white transition-all">
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg font-medium border border-emerald-500/30">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>7-Day Cycle: Reel #{currentVideo.id}/8</span>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-stone-300 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Rotate in {cycleInfo.daysRemainingInCycle}d</span>
            </div>

            <button
              onClick={togglePlay}
              className="p-1.5 hover:bg-stone-800 rounded-lg text-stone-300 hover:text-white transition"
              title={isVideoPlaying ? 'Pause Video' : 'Play Video'}
            >
              {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-1.5 hover:bg-stone-800 rounded-lg text-stone-300 hover:text-white transition"
              title={isVideoMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowDrawer(!showDrawer)}
              className="flex items-center gap-1 px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg font-medium transition"
            >
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Change Reel</span>
              {showDrawer ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Expanded Video Reel Selector (Shows 8 videos) */}
          {showDrawer && (
            <div className="mt-3 pt-3 border-t border-stone-800/80 w-72 sm:w-96 max-h-72 overflow-y-auto space-y-2 pr-1">
              <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Auto-changes every 7 days (8 videos)
                </span>
                <span className="text-emerald-400 font-medium">Click to preview</span>
              </div>

              {AGRICULTURE_VIDEOS.map((vid, idx) => (
                <button
                  key={vid.id}
                  onClick={() => {
                    setActiveVideoIndex(idx);
                    setIsVideoPlaying(true);
                  }}
                  className={`w-full text-left p-2 rounded-xl flex items-center gap-2.5 transition ${
                    activeVideoIndex === idx
                      ? 'bg-emerald-600/30 border border-emerald-500/50 text-white'
                      : 'bg-stone-800/50 hover:bg-stone-800 border border-transparent text-stone-300'
                  }`}
                >
                  <img
                    src={vid.poster}
                    alt={vid.title}
                    className="w-12 h-9 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate leading-tight">{vid.title}</p>
                    <p className="text-[10px] text-stone-400 truncate">{vid.tags.join(' • ')}</p>
                  </div>
                  {activeVideoIndex === idx && (
                    <span className="text-[10px] bg-emerald-500/40 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                      Active
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
