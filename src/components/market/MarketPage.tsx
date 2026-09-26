import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_MARKET_PRICES } from '../../data/mockData';
import { MarketPrice } from '../../types';
import {
  Coins,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Truck,
  Calculator,
  Search,
  Filter,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Scale,
  Sparkles,
} from 'lucide-react';

export const MarketPage: React.FC = () => {
  const { farmerProfile, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('ALL');
  
  // "Where Should I Sell?" Calculator parameters
  const [calcQuantityQuintals, setCalcQuantityQuintals] = useState<number>(50); // 50 Quintals
  const [calcFreightPerKm, setCalcFreightPerKm] = useState<number>(3.5); // ₹3.5 / km / Q
  const [calcMandiCessPercent, setCalcMandiCessPercent] = useState<number>(1.5); // 1.5%

  const cropsList = ['ALL', 'Wheat (गेहूं)', 'Mustard (सरसों)', 'Basmati Rice (धान)', 'Cotton (कपास)', 'Soybean (सोयाबीन)'];

  const filteredPrices = MOCK_MARKET_PRICES.filter((p) => {
    const matchesCrop = selectedCropFilter === 'ALL' || p.crop.includes(selectedCropFilter.split(' ')[0]);
    const matchesSearch =
      p.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mandi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesSearch;
  });

  // Calculate Net Return for a given mandi
  const calculateNetReturn = (item: MarketPrice) => {
    const grossRevenue = item.modalPrice * calcQuantityQuintals;
    const transportTotal = item.distanceKm * calcFreightPerKm * (calcQuantityQuintals / 10);
    const mandiCess = (grossRevenue * calcMandiCessPercent) / 100;
    const netRevenue = grossRevenue - transportTotal - mandiCess;
    const netPricePerQ = netRevenue / calcQuantityQuintals;

    return {
      grossRevenue,
      transportTotal: Math.round(transportTotal),
      mandiCess: Math.round(mandiCess),
      netRevenue: Math.round(netRevenue),
      netPricePerQ: Math.round(netPricePerQ),
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. HEADER & NOTICE BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Live Agricultural Market Prices
              </h1>
              <p className="text-xs text-stone-400">
                APMC Mandis, Terminal Grain Silos & Global Commodities
              </p>
            </div>
          </div>
        </div>

        {/* Demo Data Disclaimer Badge */}
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2 max-w-md">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
          <span>
            {t.disclaimerDemo || 'Demo Data — Connect official AGMARKNET / USDA API to enable live streaming prices.'}
          </span>
        </div>
      </div>

      {/* 2. "WHERE SHOULD I SELL?" NET RETURN CALCULATOR */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/40 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white font-['Outfit']">
                Where Should I Sell? (Net Return Calculator)
              </h2>
              <p className="text-xs text-stone-400">
                Formula: Selling Price − Transportation Cost − Applicable Mandi Cess = Net Realized Return
              </p>
            </div>
          </div>
        </div>

        {/* Parameters input row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div>
            <label className="block text-stone-300 font-medium mb-1">
              Quantity to Sell (Quintals)
            </label>
            <input
              type="number"
              value={calcQuantityQuintals}
              onChange={(e) => setCalcQuantityQuintals(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 font-bold focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-stone-300 font-medium mb-1">
              Freight Rate (₹ / km per 10 Quintals)
            </label>
            <input
              type="number"
              step="0.5"
              value={calcFreightPerKm}
              onChange={(e) => setCalcFreightPerKm(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 font-bold focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-stone-300 font-medium mb-1">
              Mandi Cess & Unloading Fee (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={calcMandiCessPercent}
              onChange={(e) => setCalcMandiCessPercent(parseFloat(e.target.value) || 1.5)}
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 font-bold focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Live Comparison Cards for Wheat */}
        <div>
          <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
            Realized Net Profit Comparison ({calcQuantityQuintals} Quintals Wheat)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_MARKET_PRICES.filter((p) => p.crop.includes('Wheat')).map((mandi) => {
              const net = calculateNetReturn(mandi);
              return (
                <div
                  key={mandi.id}
                  className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white">{mandi.mandi}</h4>
                      <p className="text-xs text-stone-400">{mandi.district}, {mandi.state} • {mandi.distanceKm} km away</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                      Mandi Price: ₹{mandi.modalPrice}/Q
                    </span>
                  </div>

                  <div className="pt-2 border-t border-stone-800/80 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-stone-900/60 p-2 rounded-xl">
                      <p className="text-stone-400 text-[10px]">Gross Sale</p>
                      <p className="font-bold text-white">₹{net.grossRevenue.toLocaleString()}</p>
                    </div>
                    <div className="bg-stone-900/60 p-2 rounded-xl">
                      <p className="text-stone-400 text-[10px]">Freight & Fees</p>
                      <p className="font-bold text-rose-400">-₹{(net.transportTotal + net.mandiCess).toLocaleString()}</p>
                    </div>
                    <div className="bg-emerald-950/60 border border-emerald-500/30 p-2 rounded-xl">
                      <p className="text-emerald-400 text-[10px] font-bold">Estimated Net Return</p>
                      <p className="font-black text-emerald-300">₹{net.netRevenue.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                    <span>Effective realized price: <strong className="text-white">₹{net.netPricePerQ}/Q</strong></span>
                    <button className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
                      <span>Book Transport</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. SEARCH & FILTERS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crop or APMC mandi..."
            className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1">
          {cropsList.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCropFilter(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCropFilter === c
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-stone-900 text-stone-300 border border-stone-800 hover:bg-stone-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 4. MARKET PRICE LISTINGS TABLE */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-950/80 text-stone-400 border-b border-stone-800 text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-4 px-4 sm:px-6">Commodity & Variety</th>
                <th className="py-4 px-4">Market / Mandi</th>
                <th className="py-4 px-4">Min Price</th>
                <th className="py-4 px-4">Max Price</th>
                <th className="py-4 px-4 font-bold text-amber-400">Modal (Avg) Price</th>
                <th className="py-4 px-4">Trend</th>
                <th className="py-4 px-4">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {filteredPrices.map((item) => (
                <tr key={item.id} className="hover:bg-stone-800/40 transition">
                  <td className="py-4 px-4 sm:px-6">
                    <p className="font-bold text-stone-100">{item.crop}</p>
                    <p className="text-[11px] text-stone-400">{item.variety}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-stone-200">{item.mandi}</p>
                    <p className="text-[11px] text-stone-400">{item.district}, {item.state}</p>
                  </td>
                  <td className="py-4 px-4 text-stone-400">
                    {item.priceUnit.split('/')[0]} {item.minPrice}
                  </td>
                  <td className="py-4 px-4 text-stone-400">
                    {item.priceUnit.split('/')[0]} {item.maxPrice}
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-base font-black text-amber-400">
                      {item.priceUnit.split('/')[0]} {item.modalPrice}
                    </span>
                    <span className="text-[10px] text-stone-400 ml-1">/{item.priceUnit.split('/')[1]}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        item.trend === 'UP'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : item.trend === 'DOWN'
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {item.trend === 'UP' ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : item.trend === 'DOWN' ? (
                        <TrendingDown className="w-3.5 h-3.5" />
                      ) : (
                        <Minus className="w-3.5 h-3.5" />
                      )}
                      <span>{item.changePercent}%</span>
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[11px] text-stone-400">
                    {item.lastUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
