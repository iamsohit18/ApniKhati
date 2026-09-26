import React from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_WEATHER } from '../../data/mockData';
import {
  CloudSun,
  CloudRain,
  CloudLightning,
  Sun,
  Wind,
  Droplets,
  AlertTriangle,
  Sparkles,
  Sprout,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

export const WeatherPage: React.FC = () => {
  const { farmerProfile, setIsKrishiModalOpen } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Weather & Crop Stage Advisory
              </h1>
              <p className="text-xs text-stone-400">
                Localized Micro-Climate Forecast for {farmerProfile.village}, {farmerProfile.district}, {farmerProfile.state}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsKrishiModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-700/30 transition flex items-center gap-1.5 self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Ask Krishi AI Weather Impact</span>
        </button>
      </div>

      {/* 2. EXTREME WEATHER ALERTS */}
      {MOCK_WEATHER.alerts.map((alert, i) => (
        <div
          key={i}
          className="p-5 rounded-3xl bg-rose-950/40 border-2 border-rose-500/60 shadow-xl flex items-start gap-4 text-xs sm:text-sm"
        >
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-stone-950 text-[10px] font-bold">
                CRITICAL WARNING
              </span>
              <h3 className="text-base font-bold text-white font-['Outfit']">{alert.headline}</h3>
            </div>
            <p className="text-stone-200 leading-relaxed">{alert.advice}</p>
          </div>
        </div>
      ))}

      {/* 3. CURRENT WEATHER + CROP STAGE ADVISORY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Current Weather Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Live Conditions</span>
            <span className="text-xs text-stone-400">Station ID: PB-LDH-04</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-5xl font-black text-white font-['Outfit']">{MOCK_WEATHER.temp}°C</span>
              <p className="text-sm font-semibold text-stone-300 mt-1">{MOCK_WEATHER.condition}</p>
            </div>
            <div className="w-16 h-16 rounded-3xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <CloudRain className="w-10 h-10" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-800 text-xs">
            <div className="p-3 rounded-xl bg-stone-950 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-400" />
              <div>
                <span className="text-stone-400 text-[10px]">Humidity</span>
                <p className="font-bold text-white">{MOCK_WEATHER.humidity}%</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 flex items-center gap-2">
              <Wind className="w-4 h-4 text-teal-400" />
              <div>
                <span className="text-stone-400 text-[10px]">Wind Speed</span>
                <p className="font-bold text-white">{MOCK_WEATHER.windSpeed} km/h</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-stone-400 text-[10px]">Rain Chance</span>
                <p className="font-bold text-white">{MOCK_WEATHER.rainfallProbability}%</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-stone-400 text-[10px]">Soil Moisture</span>
                <p className="font-bold text-white">{MOCK_WEATHER.soilMoistureEstimate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Crop-Specific Advisory */}
        <div className="lg:col-span-2 bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">Crop-Specific Weather Guidance</h3>
                <p className="text-xs text-stone-400">Tailored to your current crop growth stages</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {farmerProfile.crops.map((c, i) => (
              <div key={i} className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{c.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">
                      Stage: {c.stage} ({c.acreage} Acres)
                    </span>
                  </h4>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  {c.name.includes('Wheat')
                    ? 'Wheat is in the active tillering window. The incoming 14mm rain will adequately replenish root zone moisture. Withhold tube-well watering for the next 72 hours. Inspect lower leaf canopies for early yellow rust spores after rain ceases.'
                    : 'Mustard is in the blooming phase. Unseasonal heavy wind (above 18 km/h) poses mild risk of floral drop. Ensure field bunds allow natural water run-off to prevent root rot.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. 7-DAY EXTENDED FORECAST BAR */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-white font-['Outfit']">7-Day Agricultural Forecast</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 text-center text-xs">
          {MOCK_WEATHER.forecast.map((fc, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
              <span className="font-bold text-stone-300 block">{fc.day}</span>
              <div className="w-10 h-10 rounded-xl bg-stone-800 text-sky-400 mx-auto flex items-center justify-center">
                {fc.icon.includes('lightning') ? (
                  <CloudLightning className="w-5 h-5 text-amber-400" />
                ) : fc.icon.includes('rain') ? (
                  <CloudRain className="w-5 h-5 text-sky-400" />
                ) : fc.icon.includes('sun') ? (
                  <Sun className="w-5 h-5 text-amber-300" />
                ) : (
                  <CloudSun className="w-5 h-5 text-stone-300" />
                )}
              </div>
              <div>
                <p className="font-black text-white">{fc.high}° / <span className="text-stone-500 font-normal">{fc.low}°</span></p>
                <p className="text-[10px] text-sky-400 font-medium">{fc.rainProb}% rain</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
