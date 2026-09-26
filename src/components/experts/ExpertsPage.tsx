import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_EXPERTS } from '../../data/mockData';
import { ExpertConsultant } from '../../types';
import {
  UserCheck,
  Star,
  Phone,
  Video,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Check,
  GraduationCap,
} from 'lucide-react';

export const ExpertsPage: React.FC = () => {
  const { farmerProfile } = useApp();
  const [selectedExpert, setSelectedExpert] = useState<ExpertConsultant | null>(null);
  const [consultType, setConsultType] = useState<'CALL' | 'VIDEO' | 'CHAT'>('CALL');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Talk to an Agricultural Scientist & Agronomist
              </h1>
              <p className="text-xs text-stone-400">
                Direct phone, chat, or video consultations with verified university experts
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 flex-shrink-0 text-teal-400" />
          <span>Subsidized free consultations for registered smallholders under ApniKheti Krishi Seva.</span>
        </div>
      </div>

      {/* 2. EXPERTS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_EXPERTS.map((exp) => (
          <div
            key={exp.id}
            className="bg-stone-900 border border-stone-800 hover:border-teal-500/50 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between group transition"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={exp.avatar}
                  alt={exp.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-stone-700"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white font-['Outfit']">{exp.name}</h3>
                    {exp.isOnline && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Online now" />
                    )}
                  </div>
                  <p className="text-xs text-teal-400 font-medium">{exp.title}</p>
                  <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{exp.rating}</span>
                    <span className="text-stone-500">({exp.consultationsDone} sessions)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 text-xs space-y-1.5">
                <p className="text-stone-300 font-semibold">{exp.specialization}</p>
                <div className="flex items-center gap-1 text-[11px] text-stone-400">
                  <GraduationCap className="w-3.5 h-3.5 text-stone-500" />
                  <span>{exp.qualification}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-stone-800/80">
                  <span>Languages: {exp.languages.join(', ')}</span>
                  <span>{exp.experienceYears} yrs experience</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 block">Consultation Fee</span>
                <span className="text-sm font-black text-emerald-400">
                  {exp.consultationFee === 0 ? 'FREE (Subsidized)' : `₹${exp.consultationFee}`}
                </span>
              </div>

              <button
                onClick={() => setSelectedExpert(exp)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition shadow-lg shadow-teal-700/30"
              >
                Book Session
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. BOOKING MODAL */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 w-full max-w-md rounded-3xl p-6 shadow-2xl text-stone-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">Book Agronomist Consultation</h3>
                <p className="text-xs text-stone-400">{selectedExpert.name}</p>
              </div>
              <button onClick={() => setSelectedExpert(null)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-stone-400 mb-1">Choose Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'CALL', label: 'Audio Call', icon: Phone },
                    { id: 'VIDEO', label: 'Video Call', icon: Video },
                    { id: 'CHAT', label: 'Chat & Photos', icon: MessageSquare },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setConsultType(m.id as any)}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                          consultType === m.id
                            ? 'bg-teal-950/50 border-teal-500 text-teal-300'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] font-bold">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                <span className="text-stone-400 text-xs">Farm Case Attached</span>
                <p className="font-bold text-white">{farmerProfile.name} • {farmerProfile.crops[0]?.name} ({farmerProfile.crops[0]?.stage})</p>
                <p className="text-[10px] text-stone-500">Recent Soil Card & Weather forecast auto-shared with doctor.</p>
              </div>

              <button
                onClick={() => {
                  setIsBooked(true);
                  setTimeout(() => {
                    setIsBooked(false);
                    setSelectedExpert(null);
                  }, 1500);
                }}
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition flex items-center justify-center gap-2"
              >
                {isBooked ? <Check className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                <span>{isBooked ? 'Consultation Confirmed!' : 'Connect with Doctor Now'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
