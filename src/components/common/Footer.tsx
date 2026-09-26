import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, Globe, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setIsKrishiModalOpen, t } = useApp();

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white font-['Outfit']">
                Apni<span className="text-emerald-400">Kheti</span>
              </span>
            </div>
            <p className="text-stone-300 max-w-sm leading-relaxed">
              The AI Agriculture Operating System connecting farmers with predictive AI, APMC mandis, equipment rental, cold storage, lab testing, corporate buyers, and government support.
            </p>
            <p className="text-emerald-400 font-semibold text-[11px]">
              🌱 &ldquo;One Farmer. One AI. One Agricultural Ecosystem.&rdquo;
            </p>
          </div>

          {/* Column 1: Services */}
          <div className="space-y-2">
            <p className="font-bold text-stone-200 uppercase tracking-wider text-[11px]">Services</p>
            <ul className="space-y-1.5">
              <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-emerald-400">Farmer Dashboard</button></li>
              <li><button onClick={() => setActiveTab('market')} className="hover:text-emerald-400">Live Mandi Prices</button></li>
              <li><button onClick={() => setActiveTab('equipment')} className="hover:text-emerald-400">Equipment Rental</button></li>
              <li><button onClick={() => setActiveTab('storage')} className="hover:text-emerald-400">Cold Storage & Silos</button></li>
              <li><button onClick={() => setActiveTab('scanner')} className="hover:text-emerald-400">AI Crop Scanner</button></li>
              <li><button onClick={() => setActiveTab('testing')} className="hover:text-emerald-400">Soil Health Testing</button></li>
            </ul>
          </div>

          {/* Column 2: Government & Policies */}
          <div className="space-y-2">
            <p className="font-bold text-stone-200 uppercase tracking-wider text-[11px]">Agri Policy</p>
            <ul className="space-y-1.5">
              <li><button onClick={() => setActiveTab('schemes')} className="hover:text-emerald-400">PM-KISAN & SMAM</button></li>
              <li><button onClick={() => setActiveTab('schemes')} className="hover:text-emerald-400">PM-KUSUM Solar Pumps</button></li>
              <li><button onClick={() => setActiveTab('schemes')} className="hover:text-emerald-400">NHB Cold Storage Grants</button></li>
              <li><button onClick={() => setActiveTab('schemes')} className="hover:text-emerald-400">Global USDA & EU CAP</button></li>
              <li><button onClick={() => setActiveTab('schemes')} className="hover:text-emerald-400">Eligibility Screener</button></li>
            </ul>
          </div>

          {/* Column 3: Platform & Community */}
          <div className="space-y-2">
            <p className="font-bold text-stone-200 uppercase tracking-wider text-[11px]">Ecosystem</p>
            <ul className="space-y-1.5">
              <li><button onClick={() => setIsKrishiModalOpen(true)} className="hover:text-emerald-400">Ask Krishi AI</button></li>
              <li><button onClick={() => setActiveTab('buyers')} className="hover:text-emerald-400">Corporate Buyers</button></li>
              <li><button onClick={() => setActiveTab('transport')} className="hover:text-emerald-400">Harvest Transport</button></li>
              <li><button onClick={() => setActiveTab('calculator')} className="hover:text-emerald-400">Farm Profit Modeler</button></li>
              <li><button onClick={() => setActiveTab('community')} className="hover:text-emerald-400">Kisan Chopal Forum</button></li>
              <li><button onClick={() => setActiveTab('admin')} className="hover:text-emerald-400">Admin Console</button></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Notice required by specification */}
        <div className="pt-6 border-t border-stone-800 text-[11px] text-stone-400 space-y-2">
          <p className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Government Policy & Data Verification Notice:</strong> Government schemes, subsidies, policies, market prices, and weather information are referenced from official public notifications (agrimachinery.nic.in, pmkisan.gov.in, mnre.gov.in, agmarknet.gov.in, usda.gov). ApniKheti provides informational eligibility assessments and agricultural guidance. Final subsidy sanction and disbursement remain subject to official verification by respective competent authorities.
            </span>
          </p>
        </div>

        {/* Bottom copyright and live ticker */}
        <div className="pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2">
          <p>© 2026 ApniKheti Inc. All rights reserved. Built for Global AgriTech.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All 31 Multilingual Models Operational</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
