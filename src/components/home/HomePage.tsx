import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BackgroundVideoPlayer } from '../common/BackgroundVideoPlayer';
import { MOCK_MARKET_PRICES, MOCK_POLICY_ALERTS, MOCK_SCHEMES } from '../../data/mockData';
import {
  Sprout,
  Mic,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Tractor,
  Warehouse,
  ScanLine,
  FlaskConical,
  Coins,
  Truck,
  BookOpen,
  Users,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  FileCheck,
  ChevronRight,
  Globe2,
  PhoneCall,
  Play,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    t,
    farmerProfile,
    setActiveTab,
    setIsKrishiModalOpen,
    startVoiceListening,
    isVoiceListening,
  } = useApp();

  const [voiceQueryInput, setVoiceQueryInput] = useState('');

  const handleHeroVoiceOrSubmit = (overrideText?: string) => {
    const q = overrideText || voiceQueryInput;
    setIsKrishiModalOpen(true);
  };

  const lifecycleSteps = [
    { title: 'PLAN', desc: 'Crop selection & subsidies' },
    { title: 'GROW', desc: 'Weather & stage advisory' },
    { title: 'MONITOR', desc: 'Risk & soil moisture alerts' },
    { title: 'TEST', desc: 'Agent soil sample pickup' },
    { title: 'HARVEST', desc: 'Combine & labor rental' },
    { title: 'STORE', desc: 'Cold store & silo vacancy' },
    { title: 'FIND BUYER', desc: 'Direct corporate contracts' },
    { title: 'SELL', desc: 'Net return mandi comparison' },
    { title: 'ANALYZE', desc: 'ROI & profit calculation' },
    { title: 'IMPROVE', desc: 'AI seasonal insights' },
  ];

  const startupServices = [
    {
      id: 'dashboard',
      title: 'Farmer Dashboard',
      subtitle: "Personalized Daily Farm Intelligence & Alerts",
      icon: Sprout,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Daily Engine',
    },
    {
      id: 'market',
      title: 'Live Market & Where to Sell',
      subtitle: "Real APMC Mandis, Price Trends & Net Profit Calculator",
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-600',
      badge: 'Price Intelligence',
    },
    {
      id: 'schemes',
      title: 'Agri Policies & Subsidies',
      subtitle: "Central, State & Global 50% Grants & Eligibility Checker",
      icon: ShieldCheck,
      color: 'from-blue-600 to-indigo-700',
      badge: 'Verified Schemes',
    },
    {
      id: 'scanner',
      title: 'AI Crop Disease Scanner',
      subtitle: "Instant leaf photo diagnosis, curative sprays & prevention",
      icon: ScanLine,
      color: 'from-teal-500 to-emerald-600',
      badge: 'Gemini Vision',
    },
    {
      id: 'equipment',
      title: 'Machinery Rental Hub',
      subtitle: "Tractors, Rotavators, Drones & Harvesters per hour/day",
      icon: Tractor,
      color: 'from-orange-500 to-amber-600',
      badge: 'Verified Owners',
    },
    {
      id: 'storage',
      title: 'Cold Storage & Warehouses',
      subtitle: "Find capacity, WDRA certified silos & calculate storage fees",
      icon: Warehouse,
      color: 'from-purple-600 to-indigo-600',
      badge: 'Live Vacancy',
    },
    {
      id: 'testing',
      title: 'Soil & Crop Lab Testing',
      subtitle: "Doorstep field agent sample pickup to digital health card",
      icon: FlaskConical,
      color: 'from-cyan-600 to-blue-600',
      badge: 'Doorstep Pickup',
    },
    {
      id: 'calculator',
      title: 'Farm Profit Calculator',
      subtitle: "Input costs vs yield vs market price break-even model",
      icon: Coins,
      color: 'from-emerald-600 to-green-700',
      badge: 'Finance Tool',
    },
  ];

  return (
    <div className="relative min-h-screen bg-stone-950 text-stone-100 overflow-hidden">
      
      {/* 1. HERO SECTION WITH 7-DAY LOOPING VIDEO BACKGROUND */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        <BackgroundVideoPlayer />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          
          {/* Startup Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-md animate-fade-in shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>The AI Agriculture Operating System for Farmers</span>
          </div>

          {/* Startup Catchphrase & Tagline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-['Outfit'] drop-shadow-2xl">
              Don’t Search Everywhere.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Ask Once.
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-base sm:text-xl text-stone-200 font-normal leading-relaxed drop-shadow-md">
              From farming decisions to live market rates, agricultural machinery, cold storage, and government subsidies — one intelligent platform built around the farmer.
            </p>
            <p className="text-xs sm:text-sm text-emerald-300/90 font-medium tracking-wide">
              🌱 &ldquo;One Farmer. One AI. One Agricultural Ecosystem.&rdquo;
            </p>
          </div>

          {/* Voice-First Central Interactive Box */}
          <div className="max-w-3xl mx-auto pt-4">
            <div className="p-2 sm:p-3 rounded-3xl bg-stone-900/90 backdrop-blur-2xl border border-stone-700/80 shadow-2xl shadow-emerald-950/60">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                
                <div className="flex items-center gap-3 w-full px-4 py-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={voiceQueryInput}
                    onChange={(e) => setVoiceQueryInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleHeroVoiceOrSubmit();
                    }}
                    placeholder='Speak or type: "I have 3 acres and grow wheat. What subsidies & buyers are available?"'
                    className="w-full bg-transparent text-sm sm:text-base text-white placeholder-stone-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto px-2 pb-2 sm:pb-0 justify-end">
                  <button
                    onClick={() => {
                      startVoiceListening((txt) => {
                        setVoiceQueryInput(txt);
                        handleHeroVoiceOrSubmit(txt);
                      });
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition flex-shrink-0 ${
                      isVoiceListening
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600'
                    }`}
                    title="Speak in any Indian or Global language"
                  >
                    <Mic className="w-4 h-4 text-emerald-400" />
                    <span>{isVoiceListening ? 'Listening...' : 'Speak'}</span>
                  </button>

                  <button
                    onClick={() => handleHeroVoiceOrSubmit()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-700/40 transition hover:scale-102 flex-shrink-0"
                  >
                    <span>Ask Krishi AI</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sample Voice Prompts */}
              <div className="pt-2 px-3 border-t border-stone-800/80 flex items-center gap-2 overflow-x-auto text-[11px] text-stone-400">
                <span className="text-amber-400 font-semibold flex-shrink-0">Try asking:</span>
                <button
                  onClick={() => handleHeroVoiceOrSubmit("What subsidy is available for farm equipment in Punjab?")}
                  className="hover:text-emerald-300 underline underline-offset-2 flex-shrink-0"
                >
                  &ldquo;Farm equipment subsidies in Punjab&rdquo;
                </button>
                <span>•</span>
                <button
                  onClick={() => handleHeroVoiceOrSubmit("मेरे गेहूं के पत्ते पीले हो रहे हैं")}
                  className="hover:text-emerald-300 underline underline-offset-2 flex-shrink-0"
                >
                  &ldquo;गेहूं के पत्ते पीले हो रहे हैं&rdquo;
                </button>
                <span>•</span>
                <button
                  onClick={() => handleHeroVoiceOrSubmit("Where should I sell my wheat to get maximum profit?")}
                  className="hover:text-emerald-300 underline underline-offset-2 flex-shrink-0"
                >
                  &ldquo;Where should I sell my wheat?&rdquo;
                </button>
              </div>
            </div>
          </div>

          {/* Primary Quick Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm shadow-xl shadow-emerald-500/30 transition hover:scale-105 active:scale-95"
            >
              <span>{farmerProfile.name}&rsquo;s Farm Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('schemes')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-stone-800/90 hover:bg-stone-700/90 border border-stone-600 text-stone-200 font-semibold text-sm transition"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Explore 30+ Verified Schemes</span>
            </button>

            <button
              onClick={() => setActiveTab('market')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-stone-800/90 hover:bg-stone-700/90 border border-stone-600 text-stone-200 font-semibold text-sm transition"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Check Live APMC Rates</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. TRUST STATS & VERIFIED NETWORK */}
      <section className="border-y border-stone-800 bg-stone-900/60 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-['Outfit']">142,000+</p>
            <p className="text-xs text-stone-400 font-medium mt-1">Verified Farmers Onboarded</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-amber-400 font-['Outfit']">1,850+</p>
            <p className="text-xs text-stone-400 font-medium mt-1">APMC & Global Mandis Covered</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-teal-400 font-['Outfit']">₹54 Cr+</p>
            <p className="text-xs text-stone-400 font-medium mt-1">Subsidies & Benefits Matched</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-cyan-400 font-['Outfit']">31 Languages</p>
            <p className="text-xs text-stone-400 font-medium mt-1">Multilingual Voice-First AI</p>
          </div>
        </div>
      </section>

      {/* 3. COMPLETE AGRICULTURAL LIFECYCLE BAR */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Complete Farming Cycle</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mt-1">
            Empowering Every Decision from Sowing to Selling
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {lifecycleSteps.map((step, idx) => (
            <div
              key={step.title}
              className="bg-stone-900 border border-stone-800 rounded-xl p-3 text-center hover:border-emerald-500/50 transition group"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-xs font-bold mb-1.5 group-hover:bg-emerald-500 group-hover:text-stone-950 transition">
                {idx + 1}
              </div>
              <p className="text-xs font-bold text-stone-100">{step.title}</p>
              <p className="text-[10px] text-stone-400 mt-1 leading-tight">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. "WHAT SHOULD I DO TODAY?" HIGHLIGHT BANNER */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900/60 via-teal-900/40 to-stone-900 border border-emerald-500/40 p-6 sm:p-10 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Core Intelligence Layer</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                &ldquo;What Should I Do Today?&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                The AI synthesizes your farm profile, crop stage, real-time weather, APMC price premiums, machinery availability, and government support into a 1-tap daily action plan.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-stone-950 font-black text-sm sm:text-base shadow-xl shadow-emerald-500/30 transition hover:scale-105 active:scale-95 whitespace-nowrap flex items-center gap-2"
            >
              <span>Generate Today&rsquo;s Farm Plan</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. CORE STARTUP SERVICES SUITE */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Full Agricultural Stack</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mt-1">
              Integrated AgriTech Services
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>View All Farmer Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {startupServices.map((srv) => {
            const Icon = srv.icon;
            return (
              <button
                key={srv.id}
                onClick={() => {
                  setActiveTab(srv.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-stone-900/90 border border-stone-800 hover:border-emerald-500/50 rounded-2xl p-5 text-left transition hover:shadow-xl hover:shadow-emerald-950/40 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${srv.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                    {srv.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs font-semibold text-emerald-400">
                  <span>Open Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. LIVE MARKET TICKER PREVIEW */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-800 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit']">
                  Live Agricultural Market Feed
                </h3>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                Demo Data — Connect official AGMARKNET / USDA NASS API to enable live streaming ticks.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('market')}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Compare Mandis & Net Returns</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {MOCK_MARKET_PRICES.slice(0, 3).map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-stone-200">{item.crop}</p>
                  <p className="text-[11px] text-stone-400">{item.mandi} • {item.state}</p>
                  <p className="text-[10px] text-stone-500 mt-1">{item.distanceKm} km away</p>
                </div>
                <div className="text-right">
                  <p className="text-base sm:text-lg font-black text-amber-400">{item.priceUnit.split('/')[0]} {item.modalPrice}</p>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.trend === 'UP' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-stone-800 text-stone-400'}`}>
                    {item.trend === 'UP' ? `+${item.changePercent}%` : `${item.changePercent}%`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHAT'S NEW IN AGRICULTURE (POLICY & SUBSIDY ALERTS) */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between pb-6 border-b border-stone-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                Continuous Policy Intelligence
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit'] mt-1">
                🆕 What&rsquo;s New in Agriculture?
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('schemes')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>View All Policies</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-stone-800 mt-2">
            {MOCK_POLICY_ALERTS.map((alert) => (
              <div key={alert.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
                      {alert.type.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] text-stone-400">Published: {alert.publishedDate}</span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-100">{alert.title}</h4>
                  <p className="text-xs text-stone-300 max-w-2xl">{alert.summary}</p>
                </div>
                <button
                  onClick={() => setActiveTab('schemes')}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold whitespace-nowrap self-start md:self-center transition"
                >
                  Check Eligibility
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ & FINAL CALL TO ACTION */}
      <section className="py-16 px-4 max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
          Ready to run your farm on ApniKheti?
        </h2>
        <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto">
          Join thousands of farmers making higher profits, reducing pesticide waste, and securing maximum government grants with AI guidance.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setIsKrishiModalOpen(true)}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-base shadow-2xl shadow-emerald-500/40 transition hover:scale-105 active:scale-95"
          >
            <Mic className="w-5 h-5" />
            <span>Speak to Krishi AI Free</span>
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-8 py-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-base border border-stone-700 transition"
          >
            <span>Open Farm Dashboard</span>
          </button>
        </div>
      </section>

    </div>
  );
};
