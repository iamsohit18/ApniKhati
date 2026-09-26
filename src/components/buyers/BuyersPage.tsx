import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_BUYERS } from '../../data/mockData';
import { BuyerProfile } from '../../types';
import {
  TrendingUp,
  Search,
  CheckCircle2,
  Building2,
  Phone,
  MessageSquare,
  Plus,
  Check,
  Star,
  Sparkles,
  MapPin,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const BuyersPage: React.FC = () => {
  const { farmerProfile } = useApp();
  const [buyersList] = useState<BuyerProfile[]>(MOCK_BUYERS);
  
  // Crop listing modal state
  const [showListCropModal, setShowListCropModal] = useState<boolean>(false);
  const [listedCropData, setListedCropData] = useState({
    crop: 'Wheat (गेहूं)',
    variety: 'PBW 550 Grade-A',
    quantityMT: 40,
    expectedPrice: 2450,
    harvestDate: '2026-11-20',
  });
  const [isCropListed, setIsCropListed] = useState<boolean>(false);

  // Direct buyer offer modal
  const [selectedBuyerForOffer, setSelectedBuyerForOffer] = useState<BuyerProfile | null>(null);
  const [offerPrice, setOfferPrice] = useState<number>(2450);
  const [offerSent, setOfferSent] = useState<boolean>(false);

  const handleListCropSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCropListed(true);
    setTimeout(() => {
      setIsCropListed(false);
      setShowListCropModal(false);
    }, 1400);
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    setOfferSent(true);
    setTimeout(() => {
      setOfferSent(false);
      setSelectedBuyerForOffer(null);
    }, 1400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Direct Farmer → Corporate Buyer Network
              </h1>
              <p className="text-xs text-stone-400">
                Connect directly with verified FMCG food processors, exporters, and retail supermarket chains
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowListCropModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-700/30 transition hover:scale-105 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>List My Harvest For Sale</span>
        </button>
      </div>

      {/* 2. ACTIVE BUYER PROCUREMENT MANDATES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Institutional Procurement Requests
          </span>
          <span className="text-xs text-stone-400">Verified Contracts with Guaranteed Escrow Payouts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buyersList.map((buyer) => (
            <div
              key={buyer.id}
              className="bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between group transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={buyer.avatar}
                      alt={buyer.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-stone-700"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-white font-['Outfit']">{buyer.organization}</h3>
                        {buyer.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-stone-400">{buyer.name} • {buyer.type}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-stone-400">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>{buyer.location}</span>
                </div>

                {/* Active Commodity Needs */}
                <div className="space-y-2 pt-2 border-t border-stone-800">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Active Buying Requirement:
                  </span>
                  {buyer.activeRequirements.map((req, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1 text-xs">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-stone-100">{req.crop} ({req.variety})</span>
                        <span className="text-amber-400 font-black">₹{req.targetPricePerQ} / Q</span>
                      </div>
                      <p className="text-[11px] text-stone-400">Target Volume: {req.quantityMT} MT</p>
                      <p className="text-[10px] text-emerald-300 font-medium">Specs: {req.qualityGrade}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-stone-800 flex items-center gap-2">
                <button
                  onClick={() => setSelectedBuyerForOffer(buyer)}
                  className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm transition text-center shadow-lg shadow-amber-700/30"
                >
                  Send Purchase Offer
                </button>

                <a
                  href={`tel:${buyer.phone}`}
                  className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
                  title="Contact Buyer"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. LIST MY HARVEST MODAL */}
      {showListCropModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 w-full max-w-md rounded-3xl p-6 shadow-2xl text-stone-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">List Crop for Verified Buyers</h3>
                <p className="text-xs text-stone-400">Published to 450+ verified corporate purchasers</p>
              </div>
              <button onClick={() => setShowListCropModal(false)} className="text-stone-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleListCropSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-stone-300 font-medium mb-1">Crop & Variety</label>
                <input
                  type="text"
                  value={listedCropData.variety}
                  onChange={(e) => setListedCropData({ ...listedCropData, variety: e.target.value })}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">Volume (Metric Tons)</label>
                  <input
                    type="number"
                    value={listedCropData.quantityMT}
                    onChange={(e) => setListedCropData({ ...listedCropData, quantityMT: parseInt(e.target.value) || 1 })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-medium mb-1">Expected Price (₹/Q)</label>
                  <input
                    type="number"
                    value={listedCropData.expectedPrice}
                    onChange={(e) => setListedCropData({ ...listedCropData, expectedPrice: parseInt(e.target.value) || 0 })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Estimated Harvest / Ready Date</label>
                <input
                  type="date"
                  value={listedCropData.harvestDate}
                  onChange={(e) => setListedCropData({ ...listedCropData, harvestDate: e.target.value })}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition flex items-center justify-center gap-2"
              >
                {isCropListed ? <Check className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                <span>{isCropListed ? 'Harvest Listed Live!' : 'Publish Crop Listing'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. PURCHASE OFFER MODAL */}
      {selectedBuyerForOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 w-full max-w-md rounded-3xl p-6 shadow-2xl text-stone-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">Make Purchase Offer</h3>
                <p className="text-xs text-stone-400">{selectedBuyerForOffer.organization}</p>
              </div>
              <button onClick={() => setSelectedBuyerForOffer(null)} className="text-stone-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSendOffer} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-stone-300 font-medium mb-1">Your Offered Price (₹ / Quintal)</label>
                <input
                  type="number"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(parseInt(e.target.value) || 0)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 font-bold"
                />
              </div>

              <p className="text-stone-400 text-xs">
                Offer will be sent with your verified farm profile ({farmerProfile.name}, {farmerProfile.landSize} Acres, {farmerProfile.district}). The buyer can accept or countersign digital contract terms.
              </p>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm transition flex items-center justify-center gap-2"
              >
                {offerSent ? <Check className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                <span>{offerSent ? 'Offer Dispatched to Buyer!' : 'Transmit Offer & Negotiate'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
