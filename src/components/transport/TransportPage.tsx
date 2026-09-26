import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Truck,
  MapPin,
  Calendar,
  CheckCircle2,
  Star,
  Check,
  ArrowRight,
  ShieldCheck,
  Scale,
} from 'lucide-react';

export const TransportPage: React.FC = () => {
  const { farmerProfile } = useApp();

  const [pickup, setPickup] = useState(`${farmerProfile.village}, ${farmerProfile.district}`);
  const [destination, setDestination] = useState('Khanna APMC Mega Grain Market');
  const [cargoCrop, setCargoCrop] = useState('Wheat (गेहूं)');
  const [cargoQuintals, setCargoQuintals] = useState<number>(50);
  const [transportDate, setTransportDate] = useState('2026-10-04');
  const [bookedVehicleId, setBookedVehicleId] = useState<string | null>(null);

  const vehicleOptions = [
    {
      id: 'v-1',
      title: 'Mahindra Bolero Maxi Truck Plus',
      type: 'Pickup 1.5T',
      capacityQ: 35,
      provider: 'Punjab Kisan Transport Co.',
      rating: 4.9,
      distanceKm: 22,
      ratePerKm: 18,
      baseFare: 450,
      image: 'https://images.unsplash.com/photo-1586191582151-f73972d326f5?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'v-2',
      title: 'Tata 407 LPT High Deck (Trolley Guarded)',
      type: 'Medium Commercial (4T)',
      capacityQ: 80,
      provider: 'Malwa Agri Logistics',
      rating: 4.8,
      distanceKm: 22,
      ratePerKm: 28,
      baseFare: 650,
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'v-3',
      title: 'Tractor Trolley (Dual Hydraulic Jack)',
      type: 'Rural Trolley (8T)',
      capacityQ: 140,
      provider: 'Samrala Chahal Transport',
      rating: 4.7,
      distanceKm: 22,
      ratePerKm: 22,
      baseFare: 500,
      image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Agricultural Harvest Transport
              </h1>
              <p className="text-xs text-stone-400">
                Book on-demand mini trucks, tractor trolleys & grain carriers with GPS tracking
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ROUTE & CARGO INPUTS */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-white font-['Outfit']">Request Farm-to-Mandi Transportation</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm">
          <div>
            <label className="block text-stone-400 mb-1">Pickup Farm Location</label>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
            />
          </div>

          <div>
            <label className="block text-stone-400 mb-1">Destination Mandi / Warehouse</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
            />
          </div>

          <div>
            <label className="block text-stone-400 mb-1">Harvest Crop & Quantity (Quintals)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={cargoCrop}
                onChange={(e) => setCargoCrop(e.target.value)}
                className="w-1/2 bg-stone-800 border border-stone-700 rounded-xl px-2 py-2 text-stone-100"
              />
              <input
                type="number"
                value={cargoQuintals}
                onChange={(e) => setCargoQuintals(parseInt(e.target.value) || 1)}
                className="w-1/2 bg-stone-800 border border-stone-700 rounded-xl px-2 py-2 text-stone-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-400 mb-1">Date of Transport</label>
            <input
              type="date"
              value={transportDate}
              onChange={(e) => setTransportDate(e.target.value)}
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
            />
          </div>
        </div>
      </div>

      {/* 3. VEHICLE OPTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicleOptions.map((v) => {
          const estimatedCost = v.baseFare + v.distanceKm * v.ratePerKm;
          return (
            <div
              key={v.id}
              className="bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-3xl p-5 shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <img
                  src={v.image}
                  alt={v.title}
                  className="w-full h-40 object-cover rounded-2xl border border-stone-800"
                />

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white font-['Outfit']">{v.title}</h4>
                    <p className="text-xs text-stone-400">{v.provider} • {v.type}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{v.rating}</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs space-y-1">
                  <div className="flex justify-between text-stone-300">
                    <span>Capacity: {v.capacityQ} Quintals</span>
                    <span>Distance: {v.distanceKm} km</span>
                  </div>
                  <div className="flex justify-between text-stone-400 text-[11px]">
                    <span>Rate: ₹{v.ratePerKm} / km</span>
                    <span>Base Fare: ₹{v.baseFare}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block">Estimated Cost</span>
                  <span className="text-lg font-black text-amber-400">₹{estimatedCost}</span>
                </div>

                <button
                  onClick={() => {
                    setBookedVehicleId(v.id);
                    setTimeout(() => setBookedVehicleId(null), 2000);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition shadow-lg shadow-amber-700/30 flex items-center gap-1.5"
                >
                  {bookedVehicleId === v.id ? <Check className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                  <span>{bookedVehicleId === v.id ? 'Trip Dispatched!' : 'Book Vehicle'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
