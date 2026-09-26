import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Coins,
  Calculator,
  TrendingUp,
  Percent,
  CheckCircle2,
  DollarSign,
  Scale,
  Sparkles,
} from 'lucide-react';

export const ProfitCalculator: React.FC = () => {
  const { farmerProfile } = useApp();

  // Inputs
  const [landArea, setLandArea] = useState<number>(farmerProfile.landSize || 4.5);
  const [seedCostPerAcre, setSeedCostPerAcre] = useState<number>(1800);
  const [fertilizerCostPerAcre, setFertilizerCostPerAcre] = useState<number>(3200);
  const [laborCostPerAcre, setLaborCostPerAcre] = useState<number>(4500);
  const [irrigationCostPerAcre, setIrrigationCostPerAcre] = useState<number>(1200);
  const [machineryCostPerAcre, setMachineryCostPerAcre] = useState<number>(2800);
  const [transportCostPerAcre, setTransportCostPerAcre] = useState<number>(1000);
  const [expectedYieldQPerAcre, setExpectedYieldQPerAcre] = useState<number>(22); // 22 Quintals/acre for Wheat
  const [expectedSellingPrice, setExpectedSellingPrice] = useState<number>(2420); // ₹2,420/Q

  // Calculations
  const costPerAcre =
    seedCostPerAcre +
    fertilizerCostPerAcre +
    laborCostPerAcre +
    irrigationCostPerAcre +
    machineryCostPerAcre +
    transportCostPerAcre;

  const totalCost = costPerAcre * landArea;
  const totalYieldQuintals = expectedYieldQPerAcre * landArea;
  const grossRevenue = totalYieldQuintals * expectedSellingPrice;
  const netProfit = grossRevenue - totalCost;
  const profitPerAcre = netProfit / landArea;
  const breakEvenPricePerQ = Math.round(totalCost / totalYieldQuintals);
  const roiPercent = Math.round((netProfit / totalCost) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Farm Profit & Break-Even Financial Modeler
              </h1>
              <p className="text-xs text-stone-400">
                Determine your minimum break-even price and projected returns before harvest
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC METRICS SUMMARY BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 space-y-1">
          <span className="text-[11px] text-stone-400 uppercase font-bold">Total Investment</span>
          <p className="text-2xl font-black text-white">₹{Math.round(totalCost).toLocaleString()}</p>
          <span className="text-[10px] text-stone-500">₹{costPerAcre.toLocaleString()} / Acre</span>
        </div>

        <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 space-y-1">
          <span className="text-[11px] text-stone-400 uppercase font-bold">Gross Harvest Revenue</span>
          <p className="text-2xl font-black text-amber-400">₹{Math.round(grossRevenue).toLocaleString()}</p>
          <span className="text-[10px] text-stone-500">{totalYieldQuintals} Total Quintals</span>
        </div>

        <div className="p-5 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
          <span className="text-[11px] text-emerald-300 uppercase font-bold">Expected Net Profit</span>
          <p className="text-2xl font-black text-emerald-400">₹{Math.round(netProfit).toLocaleString()}</p>
          <span className="text-[10px] text-emerald-300 font-bold">ROI: +{roiPercent}%</span>
        </div>

        <div className="p-5 rounded-3xl bg-blue-950/40 border border-blue-500/40 space-y-1">
          <span className="text-[11px] text-blue-300 uppercase font-bold">Break-Even Price</span>
          <p className="text-2xl font-black text-blue-400">₹{breakEvenPricePerQ} <span className="text-xs font-normal">/ Q</span></p>
          <span className="text-[10px] text-stone-400">Safety margin: ₹{expectedSellingPrice - breakEvenPricePerQ}/Q</span>
        </div>
      </div>

      {/* 3. INPUT CONFIGURATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Cultivation Cost per Acre */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-white font-['Outfit']">Cultivation Expenses (Per Acre)</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <label className="block text-stone-400 mb-1">Land Area (Acres)</label>
              <input
                type="number"
                step="0.5"
                value={landArea}
                onChange={(e) => setLandArea(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
              />
            </div>

            <div>
              <label className="block text-stone-400 mb-1">Certified Seeds (₹/acre)</label>
              <input
                type="number"
                value={seedCostPerAcre}
                onChange={(e) => setSeedCostPerAcre(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
              />
            </div>

            <div>
              <label className="block text-stone-400 mb-1">Fertilizer & Nutrition (₹/acre)</label>
              <input
                type="number"
                value={fertilizerCostPerAcre}
                onChange={(e) => setFertilizerCostPerAcre(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
              />
            </div>

            <div>
              <label className="block text-stone-400 mb-1">Labor & Weeding (₹/acre)</label>
              <input
                type="number"
                value={laborCostPerAcre}
                onChange={(e) => setLaborCostPerAcre(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
              />
            </div>

            <div>
              <label className="block text-stone-400 mb-1">Irrigation / Electricity (₹/acre)</label>
              <input
                type="number"
                value={irrigationCostPerAcre}
                onChange={(e) => setIrrigationCostPerAcre(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
              />
            </div>

            <div>
              <label className="block text-stone-400 mb-1">Machinery & Harvester (₹/acre)</label>
              <input
                type="number"
                value={machineryCostPerAcre}
                onChange={(e) => setMachineryCostPerAcre(parseInt(e.target.value) || 0)}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
              />
            </div>
          </div>
        </div>

        {/* Harvest Yield & Price Realization */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-['Outfit']">Yield & Market Price Assumptions</h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-stone-400 mb-1">Expected Yield per Acre (Quintals)</label>
                <input
                  type="number"
                  value={expectedYieldQPerAcre}
                  onChange={(e) => setExpectedYieldQPerAcre(parseInt(e.target.value) || 1)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 font-bold"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Expected Mandi Selling Price (₹/Quintal)</label>
                <input
                  type="number"
                  value={expectedSellingPrice}
                  onChange={(e) => setExpectedSellingPrice(parseInt(e.target.value) || 0)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 font-bold text-amber-400"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
              <span className="text-emerald-400 font-bold block">💡 AI Profit Insight:</span>
              <p className="text-stone-300">
                Your break-even price is <strong>₹{breakEvenPricePerQ}/Q</strong>. The current Khanna Mandi price is <strong>₹{expectedSellingPrice}/Q</strong>, providing a comfortable buffer of <strong>₹{expectedSellingPrice - breakEvenPricePerQ}/Q</strong>. If you store your grain for 2 months, our price forecaster projects a potential additional premium of ₹120-150/Q.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
