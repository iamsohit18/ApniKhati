import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_STORAGE_FACILITIES } from '../../data/mockData';
import { StorageFacility } from '../../types';
import {
  Warehouse,
  Search,
  Filter,
  CheckCircle2,
  Thermometer,
  ShieldCheck,
  Star,
  MapPin,
  Calculator,
  ArrowRight,
  Check,
  Calendar,
} from 'lucide-react';

export const StoragePage: React.FC = () => {
  const { farmerProfile } = useApp();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Storage Cost Calculator state
  const [calcQuantityMT, setCalcQuantityMT] = useState<number>(25); // 25 Metric Tons
  const [calcDurationMonths, setCalcDurationMonths] = useState<number>(3); // 3 Months

  // Booking modal state
  const [bookingFacility, setBookingFacility] = useState<StorageFacility | null>(null);
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const types = ['All', 'Cold Storage', 'Grain Silo', 'Dry Warehouse'];

  const filteredFacilities = MOCK_STORAGE_FACILITIES.filter((f) => {
    const matchesType = selectedType === 'All' || f.type === selectedType;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Warehouse className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Warehouse & Cold Storage Locator
              </h1>
              <p className="text-xs text-stone-400">
                WDRA-Certified Silos, Multi-Chamber Cold Stores & Controlled Atmosphere
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 flex-shrink-0 text-purple-400" />
          <span>NABARD-subsidized facilities accept e-NWR warehouse receipts for bank loans.</span>
        </div>
      </div>

      {/* 2. STORAGE COST ESTIMATOR */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-purple-950/40 border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center gap-3 pb-4 border-b border-stone-800">
          <div className="w-10 h-10 rounded-xl bg-purple-500 text-stone-950 flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white font-['Outfit']">
              Storage Cost & Duration Calculator
            </h2>
            <p className="text-xs text-stone-400">
              Calculate post-harvest storage charges before deciding whether to store or sell immediately
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <label className="block text-stone-300 font-medium mb-1">
              Quantity to Store (Metric Tons)
            </label>
            <input
              type="number"
              value={calcQuantityMT}
              onChange={(e) => setCalcQuantityMT(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 font-bold focus:outline-none focus:border-purple-500"
            />
            <span className="text-[10px] text-stone-500 mt-1 block">1 Metric Ton = 10 Quintals = 20 Bags (50kg)</span>
          </div>

          <div>
            <label className="block text-stone-300 font-medium mb-1">
              Planned Duration (Months)
            </label>
            <input
              type="number"
              min="1"
              max="12"
              value={calcDurationMonths}
              onChange={(e) => setCalcDurationMonths(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 font-bold focus:outline-none focus:border-purple-500"
            />
            <span className="text-[10px] text-stone-500 mt-1 block">Optimal for price appreciation between seasons</span>
          </div>
        </div>

        {/* Dynamic calculation cards for each facility type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {MOCK_STORAGE_FACILITIES.map((f) => {
            const totalCost = f.monthlyRatePerMT * calcQuantityMT * calcDurationMonths;
            return (
              <div key={f.id} className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 text-center space-y-1">
                <span className="text-xs font-semibold text-purple-300">{f.name}</span>
                <p className="text-[11px] text-stone-400">₹{f.monthlyRatePerMT} / MT / Month</p>
                <p className="text-lg font-black text-white pt-1">₹{totalCost.toLocaleString()}</p>
                <span className="text-[10px] text-stone-500 block">Total for {calcDurationMonths} months</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. STORAGE LISTINGS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Available Facilities</span>
            <span className="text-xs text-stone-400">• Real-Time Capacity Telemetry</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1">
            {types.map((tp) => (
              <button
                key={tp}
                onClick={() => setSelectedType(tp)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedType === tp
                    ? 'bg-purple-500 text-stone-950'
                    : 'bg-stone-900 text-stone-300 border border-stone-800 hover:bg-stone-800'
                }`}
              >
                {tp}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFacilities.map((fac) => {
            const vacancyPercent = Math.round((fac.availableCapacityMT / fac.totalCapacityMT) * 100);
            return (
              <div
                key={fac.id}
                className="bg-stone-900 border border-stone-800 hover:border-purple-500/50 rounded-3xl overflow-hidden shadow-xl transition flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={fac.image}
                      alt={fac.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-md text-purple-300 text-[10px] font-bold border border-purple-500/30">
                        {fac.type}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-stone-950 text-[10px] font-bold">
                        {fac.availableCapacityMT} MT Vacant
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-white font-['Outfit']">{fac.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{fac.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-stone-400">
                      <MapPin className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                      <span>{fac.location} • <strong>{fac.distanceKm} km</strong></span>
                    </div>

                    <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1 text-xs">
                      <div className="flex justify-between text-stone-300">
                        <span className="flex items-center gap-1">
                          <Thermometer className="w-3.5 h-3.5 text-teal-400" /> Temp: {fac.temperatureCelsius}
                        </span>
                        <span>RH: {fac.humidityLevel}</span>
                      </div>

                      {/* Progress bar of available capacity */}
                      <div className="pt-1">
                        <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${100 - vacancyPercent}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-stone-500 pt-1">
                          <span>{fac.totalCapacityMT - fac.availableCapacityMT} MT Stored</span>
                          <span>{fac.availableCapacityMT} MT Free</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 text-[10px]">
                      {fac.suitableCrops.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-stone-950 text-stone-300 border border-stone-800">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-800/80 mt-2">
                  <div>
                    <span className="text-lg font-black text-purple-400">₹{fac.monthlyRatePerMT}</span>
                    <span className="text-xs text-stone-400"> / MT / mo</span>
                  </div>

                  <button
                    onClick={() => setBookingFacility(fac)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition shadow-lg shadow-purple-700/30"
                  >
                    Reserve Space
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. RESERVATION CONFIRMATION MODAL */}
      {bookingFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 w-full max-w-md rounded-3xl p-6 shadow-2xl text-stone-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">Reserve Storage Capacity</h3>
                <p className="text-xs text-stone-400">{bookingFacility.name}</p>
              </div>
              <button onClick={() => setBookingFacility(null)} className="text-stone-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                <span className="text-stone-400">Reservation Summary</span>
                <p className="font-bold text-white">{calcQuantityMT} Metric Tons for {calcDurationMonths} Months</p>
                <p className="text-purple-400 font-bold">Estimated Cost: ₹{(calcQuantityMT * calcDurationMonths * bookingFacility.monthlyRatePerMT).toLocaleString()}</p>
              </div>

              <p className="text-stone-300 text-xs">
                A booking token will be issued for your farmer profile ({farmerProfile.name}). Present this token upon gate arrival for prioritized weighbridge unloading.
              </p>

              <button
                onClick={() => {
                  setIsBooked(true);
                  setTimeout(() => {
                    setIsBooked(false);
                    setBookingFacility(null);
                  }, 1400);
                }}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition flex items-center justify-center gap-2"
              >
                {isBooked ? <Check className="w-4 h-4" /> : <Warehouse className="w-4 h-4" />}
                <span>{isBooked ? 'Storage Space Confirmed!' : 'Confirm Reservation'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
