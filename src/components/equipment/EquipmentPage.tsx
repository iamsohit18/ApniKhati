import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_EQUIPMENT } from '../../data/mockData';
import { EquipmentListing } from '../../types';
import {
  Tractor,
  Search,
  Filter,
  CheckCircle2,
  Star,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Check,
  X,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const EquipmentPage: React.FC = () => {
  const { farmerProfile } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Booking modal state
  const [bookingItem, setBookingItem] = useState<EquipmentListing | null>(null);
  const [bookingHours, setBookingHours] = useState<number>(4);
  const [bookingDate, setBookingDate] = useState<string>('2026-10-02');
  const [includeOperator, setIncludeOperator] = useState<boolean>(true);
  const [isBooked, setIsBooked] = useState<boolean>(false);

  // Contact modal state
  const [contactItem, setContactItem] = useState<EquipmentListing | null>(null);

  const categories = ['All', 'Tractor', 'Rotavator', 'Drone', 'Harvester', 'Seeder', 'Sprayer'];

  const filteredEquipment = MOCK_EQUIPMENT.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setBookingItem(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
              <Tractor className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Agricultural Equipment Rental Hub
              </h1>
              <p className="text-xs text-stone-400">
                Verified Machinery, Custom Hiring Centres (CHC) & Drone Services
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 flex-shrink-0 text-orange-400" />
          <span>All machinery verified with GPS tracking & skilled certified operators.</span>
        </div>
      </div>

      {/* 2. SEARCH & CATEGORY BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tractor model, rotavator, drone..."
            className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-stone-950'
                  : 'bg-stone-900 text-stone-300 border border-stone-800 hover:bg-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. EQUIPMENT LISTINGS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((eq) => (
          <div
            key={eq.id}
            className="bg-stone-900 border border-stone-800 hover:border-orange-500/50 rounded-3xl overflow-hidden shadow-xl transition flex flex-col justify-between group"
          >
            <div>
              {/* Image & Status Tag */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={eq.image}
                  alt={eq.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-md text-stone-200 text-[10px] font-bold border border-stone-700">
                    {eq.category}
                  </span>
                  {eq.isVerified && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-stone-950 text-[10px] font-bold flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      eq.availableNow
                        ? 'bg-emerald-500 text-stone-950'
                        : 'bg-stone-800/90 text-stone-400'
                    }`}
                  >
                    {eq.availableNow ? 'Available Today' : 'Booked'}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-white font-['Outfit']">{eq.title}</h3>
                    <p className="text-xs text-stone-400">{eq.providerName}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{eq.rating}</span>
                    <span className="text-[10px] text-stone-500">({eq.reviewCount})</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-stone-400">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <span>{eq.location} • <strong>{eq.distanceKm} km</strong> away</span>
                </div>

                {/* Specs */}
                <div className="flex flex-wrap gap-1">
                  {eq.specs.map((sp, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-stone-950 px-2 py-0.5 rounded-md text-stone-300 border border-stone-800"
                    >
                      {sp}
                    </span>
                  ))}
                </div>

                {/* Pricing Box */}
                <div className="pt-2 border-t border-stone-800 flex items-baseline justify-between">
                  <div>
                    <span className="text-xl font-black text-orange-400">{eq.currency}{eq.hourlyRate}</span>
                    <span className="text-xs text-stone-400"> / hour</span>
                  </div>
                  <span className="text-xs text-stone-400">
                    Day rate: <strong>{eq.currency}{eq.dailyRate}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 pt-0 flex items-center gap-2">
              <button
                onClick={() => setBookingItem(eq)}
                disabled={!eq.availableNow}
                className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition text-center shadow-lg shadow-orange-700/30"
              >
                Book Machine
              </button>

              <button
                onClick={() => setContactItem(eq)}
                className="px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition"
                title="Call Equipment Owner"
              >
                <Phone className="w-4 h-4 text-orange-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. BOOKING MODAL */}
      {bookingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 text-stone-100">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">Book Equipment</h3>
                <p className="text-xs text-stone-400">{bookingItem.title}</p>
              </div>
              <button onClick={() => setBookingItem(null)} className="text-stone-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-stone-300 font-medium mb-1">Select Work Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Estimated Hours</label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={bookingHours}
                  onChange={(e) => setBookingHours(parseInt(e.target.value) || 1)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
                />
              </div>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-800/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeOperator}
                  onChange={(e) => setIncludeOperator(e.target.checked)}
                  className="rounded text-orange-500 w-4 h-4"
                />
                <span>Include Skilled Operator ({bookingItem.providerName})</span>
              </label>

              {/* Total Calculation */}
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400">Total Rental Estimate</span>
                  <p className="text-[10px] text-stone-500">{bookingHours} hrs × {bookingItem.currency}{bookingItem.hourlyRate}</p>
                </div>
                <span className="text-lg font-black text-orange-400">
                  {bookingItem.currency}{(bookingHours * bookingItem.hourlyRate).toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm transition flex items-center justify-center gap-2"
              >
                {isBooked ? <Check className="w-4 h-4" /> : <Tractor className="w-4 h-4" />}
                <span>{isBooked ? 'Booking Confirmed!' : 'Confirm Reservation'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. CONTACT OWNER MODAL */}
      {contactItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 w-full max-w-sm rounded-3xl p-6 shadow-2xl text-stone-100 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 mx-auto flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{contactItem.providerName}</h3>
              <p className="text-xs text-stone-400">{contactItem.location} ({contactItem.distanceKm} km away)</p>
            </div>
            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
              <span className="text-xs text-stone-400">Direct Owner Helpline</span>
              <p className="text-lg font-mono font-bold text-orange-300">+91 98142 88765</p>
            </div>
            <button
              onClick={() => setContactItem(null)}
              className="w-full py-2 bg-stone-800 hover:bg-stone-700 rounded-xl text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
