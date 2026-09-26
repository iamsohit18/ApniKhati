import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_WEATHER, MOCK_MARKET_PRICES, MOCK_EQUIPMENT, MOCK_STORAGE_FACILITIES, MOCK_SCHEMES } from '../../data/mockData';
import { getDailyFarmPlanApi, DailyFarmPlan } from '../../services/api';
import {
  Sprout,
  Sparkles,
  CloudSun,
  Coins,
  ShieldCheck,
  Tractor,
  Warehouse,
  Bell,
  Bot,
  RefreshCw,
  CheckCircle,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Droplets,
  Check,
  Thermometer,
  Wind,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const FarmerDashboard: React.FC<{ onOpenProfile: () => void }> = ({ onOpenProfile }) => {
  const { farmerProfile, setActiveTab, setIsKrishiModalOpen, speakText, t } = useApp();

  const [farmPlan, setFarmPlan] = useState<DailyFarmPlan | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (key: string) => {
    setCompletedTasks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGeneratePlan = async () => {
    setIsGeneratingPlan(true);
    try {
      const plan = await getDailyFarmPlanApi(farmerProfile, MOCK_WEATHER);
      setFarmPlan(plan);
      speakText(`Here is your farm plan for today Ramesh ji. Top priority: ${plan.topPriorityTask}`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const quickShortcuts = [
    { label: 'Check Mandi Prices', tab: 'market', icon: Coins, color: 'text-amber-400' },
    { label: 'Apply for 50% Subsidy', tab: 'schemes', icon: ShieldCheck, color: 'text-blue-400' },
    { label: 'Rent Rotavator / Drone', tab: 'equipment', icon: Tractor, color: 'text-orange-400' },
    { label: 'Find Cold Storage', tab: 'storage', icon: Warehouse, color: 'text-purple-400' },
    { label: 'Scan Leaf for Disease', tab: 'scanner', icon: Sprout, color: 'text-emerald-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. WELCOME & GREETING HEADER */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-teal-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                Personalized Agri Operating System
              </span>
              <span className="text-xs text-stone-400">
                {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white font-['Outfit']">
              Good Morning, {farmerProfile.name} 👨🌾
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 flex flex-wrap items-center gap-2">
              <span>{farmerProfile.village}, {farmerProfile.district}, {farmerProfile.state}</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">{farmerProfile.landSize} {farmerProfile.landUnit}</span>
              <span>•</span>
              <span>Primary Crops: {farmerProfile.crops.map((c) => `${c.name} (${c.stage})`).join(' & ')}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenProfile}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition"
            >
              Edit Farm Profile
            </button>

            {/* Central "What Should I Do Today?" CTA Button */}
            <button
              onClick={handleGeneratePlan}
              disabled={isGeneratingPlan}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              {isGeneratingPlan ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
              <span>{isGeneratingPlan ? 'Synthesizing...' : '🤖 What Should I Do Today?'}</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. GENERATED "TODAY'S FARM PLAN" (IF ACTIVE OR DEFAULT) */}
      {farmPlan && (
        <div className="bg-stone-900 border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-scale-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-800 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-stone-950 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white font-['Outfit']">
                  🌾 Today&rsquo;s Intelligent Farm Action Plan
                </h3>
                <p className="text-xs text-stone-400">
                  Synthesized across Weather + Soil + Market + Equipment + Storage + Schemes
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>Priority: {farmPlan.topPriorityTask}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
            
            {/* 1. Weather */}
            <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-1.5">
              <div className="flex items-center justify-between text-blue-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <CloudSun className="w-4 h-4" /> 1. Weather
                </span>
                <span className="text-[10px] bg-blue-500/20 px-2 py-0.5 rounded text-blue-300">Rain Alert</span>
              </div>
              <p className="text-stone-300">{farmPlan.weatherSummary}</p>
            </div>

            {/* 2. Irrigation */}
            <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-1.5">
              <div className="flex items-center justify-between text-teal-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <Droplets className="w-4 h-4" /> 2. Irrigation
                </span>
                <span className="text-[10px] bg-teal-500/20 px-2 py-0.5 rounded text-teal-300">Moisture: 62%</span>
              </div>
              <p className="text-stone-300">{farmPlan.irrigationAdvice}</p>
            </div>

            {/* 3. Crop Action */}
            <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-1.5">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <Sprout className="w-4 h-4" /> 3. Crop Protection
                </span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">Tillering</span>
              </div>
              <p className="text-stone-300">{farmPlan.cropAction}</p>
            </div>

            {/* 4. Market */}
            <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-1.5">
              <div className="flex items-center justify-between text-amber-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <Coins className="w-4 h-4" /> 4. Market Opportunity
                </span>
                <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-300">+₹140/Q</span>
              </div>
              <p className="text-stone-300">{farmPlan.marketOpportunity}</p>
            </div>

            {/* 5. Equipment */}
            <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-1.5">
              <div className="flex items-center justify-between text-orange-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <Tractor className="w-4 h-4" /> 5. Nearby Machinery
                </span>
                <span className="text-[10px] bg-orange-500/20 px-2 py-0.5 rounded text-orange-300">3.8 km</span>
              </div>
              <p className="text-stone-300">{farmPlan.equipmentRecommendation}</p>
            </div>

            {/* 6. Subsidy Support */}
            <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-1.5">
              <div className="flex items-center justify-between text-indigo-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> 6. Support & Schemes
                </span>
                <span className="text-[10px] bg-indigo-500/20 px-2 py-0.5 rounded text-indigo-300">50% Grant</span>
              </div>
              <p className="text-stone-300">{farmPlan.governmentSupportAlert}</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. TODAY'S FARM INTELLIGENCE GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-2">
            <span>Today&rsquo;s Farm Intelligence</span>
            <span className="text-xs font-normal text-stone-400">• Real-Time Pulse</span>
          </h2>
          <button
            onClick={() => setIsKrishiModalOpen(true)}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
          >
            <span>Ask Krishi AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Weather Intelligence */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <CloudSun className="w-4 h-4" /> Weather
              </span>
              <span className="text-[10px] text-stone-400">Next 24h</span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{MOCK_WEATHER.temp}°C</span>
                <span className="text-xs text-stone-400">{MOCK_WEATHER.condition}</span>
              </div>
              <p className="text-xs text-amber-300 mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Rain expected tomorrow ({MOCK_WEATHER.rainfallProbability}%)
              </p>
            </div>
            <div className="pt-2 border-t border-stone-800 flex justify-between text-[11px] text-stone-400">
              <span>Humidity: {MOCK_WEATHER.humidity}%</span>
              <span>Wind: {MOCK_WEATHER.windSpeed} km/h</span>
            </div>
          </div>

          {/* Card 2: Market Intelligence */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Coins className="w-4 h-4" /> Market Spot
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">+3.4%</span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">₹2,420</span>
                <span className="text-xs text-stone-400">/ Quintal (Wheat)</span>
              </div>
              <p className="text-xs text-stone-300 mt-1">Khanna Mandi (18 km away)</p>
            </div>
            <div className="pt-2 border-t border-stone-800 flex justify-between text-[11px] text-stone-400">
              <span>Net return: ₹2,375/Q</span>
              <button onClick={() => setActiveTab('market')} className="text-emerald-400 hover:underline">Compare</button>
            </div>
          </div>

          {/* Card 3: Machinery Availability */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                <Tractor className="w-4 h-4" /> Equipment Hub
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">Available</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Shaktiman Rotavator 7ft</p>
              <p className="text-xs text-stone-400 mt-0.5">₹450/hour • Samrala Mandi (3.8 km)</p>
            </div>
            <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-[11px]">
              <span className="text-stone-400">⭐ 4.8 (29 bookings)</span>
              <button onClick={() => setActiveTab('equipment')} className="text-orange-400 hover:underline font-semibold">Rent Now</button>
            </div>
          </div>

          {/* Card 4: Schemes & Grants */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Active Grants
              </span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-bold">4 Matching</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Punjab SMAM Subsidies</p>
              <p className="text-xs text-stone-400 mt-0.5">50% Grant on Super Seeder & Drones</p>
            </div>
            <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-[11px]">
              <span className="text-amber-400 font-semibold">Closes Oct 15</span>
              <button onClick={() => setActiveTab('schemes')} className="text-blue-400 hover:underline font-semibold">Eligibility</button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FARM TASKS & DIGITAL CHECKLIST */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Personalized Farm Task Checklist
            </h3>
            <p className="text-xs text-stone-400">Based on wheat tillering and mustard flowering cycle</p>
          </div>
          <span className="text-xs text-emerald-400 font-bold">
            {Object.values(completedTasks).filter(Boolean).length} / 4 Completed
          </span>
        </div>

        <div className="divide-y divide-stone-800">
          {[
            { id: 't1', title: 'Postpone second nitrogen dose until tomorrow’s showers finish', due: 'Today', tag: 'Weather-critical' },
            { id: 't2', title: 'Scout 10 wheat plants in North Plot for yellow rust pustules', due: 'Today', tag: 'Disease Prevention' },
            { id: 't3', title: 'Submit online application for Punjab SMAM 50% Rotary Tiller quota', due: 'In 4 days', tag: 'Subsidy' },
            { id: 't4', title: 'Confirm grain storage space reservation at Samrala Warehouse', due: 'This Week', tag: 'Post-Harvest' },
          ].map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="py-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-stone-800/40 px-2 rounded-xl transition"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                    completedTasks[task.id]
                      ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                      : 'border-stone-600'
                  }`}
                >
                  {completedTasks[task.id] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <p className={`text-xs sm:text-sm font-medium ${completedTasks[task.id] ? 'line-through text-stone-500' : 'text-stone-200'}`}>
                    {task.title}
                  </p>
                  <p className="text-[10px] text-stone-400">{task.tag} • Due: {task.due}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. QUICK SERVICE SHORTCUTS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {quickShortcuts.map((sc) => {
          const Icon = sc.icon;
          return (
            <button
              key={sc.tab}
              onClick={() => setActiveTab(sc.tab)}
              className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 text-left transition flex flex-col justify-between group"
            >
              <Icon className={`w-6 h-6 ${sc.color} group-hover:scale-110 transition-transform`} />
              <div className="mt-3">
                <p className="text-xs font-bold text-stone-200 group-hover:text-emerald-400 transition-colors">
                  {sc.label}
                </p>
                <span className="text-[10px] text-stone-400 flex items-center gap-0.5 mt-1">
                  Open <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
