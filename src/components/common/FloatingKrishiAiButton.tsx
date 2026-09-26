import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Mic, Sparkles, MessageSquare, X } from 'lucide-react';

export const FloatingKrishiAiButton: React.FC = () => {
  const { setIsKrishiModalOpen, t, farmerProfile } = useApp();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end gap-2 pointer-events-none">
      
      {/* Floating Prompt Bubble */}
      {showTooltip && (
        <div className="pointer-events-auto bg-stone-900/95 backdrop-blur-md border border-emerald-500/40 text-stone-100 p-3 rounded-2xl shadow-2xl max-w-xs text-xs animate-bounce-slow">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-bold text-emerald-400 flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Krishi AI Active
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-stone-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-stone-300 text-[11px]">
            &ldquo;Rain is forecast tomorrow. Ask me about your Wheat & Mustard spray timings!&rdquo;
          </p>
        </div>
      )}

      {/* Main Large Glowing AI Button */}
      <button
        onClick={() => setIsKrishiModalOpen(true)}
        className="pointer-events-auto group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/75 hover:scale-105 active:scale-95 transition-all border border-emerald-300/40"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
        </span>

        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
          <Bot className="w-4 h-4 text-white" />
        </div>

        <span className="font-['Outfit'] tracking-wide">
          {t.askKrishiAi || 'Ask Krishi AI'}
        </span>

        <Mic className="w-4 h-4 text-emerald-100 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};
