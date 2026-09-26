import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Users,
  Tractor,
  Warehouse,
  TrendingUp,
  FileText,
  Activity,
  Coins,
  Cpu,
  Globe2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { setActiveRole, setActiveTab } = useApp();

  const stats = [
    { title: 'Active Farmers', value: '142,850', change: '+12.4%', icon: Users, color: 'text-emerald-400' },
    { title: 'Global Countries Active', value: '18', change: '+3', icon: Globe2, color: 'text-blue-400' },
    { title: 'AI Queries Handled', value: '894,200', change: '+28%', icon: Cpu, color: 'text-teal-400' },
    { title: 'Equipment Bookings', value: '14,320', change: '+18.2%', icon: Tractor, color: 'text-orange-400' },
    { title: 'Cold Storage Occupied', value: '38,400 MT', change: '84% Cap', icon: Warehouse, color: 'text-purple-400' },
    { title: 'Platform Gross Volume', value: '₹148.5 Cr', change: '+15.7%', icon: Coins, color: 'text-amber-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                ApniKheti Global Admin & Ecosystem Console
              </h1>
              <p className="text-xs text-stone-400">
                Platform Operations, Verification Queues, Telemetry & Policy Moderation
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setActiveRole('FARMER');
            setActiveTab('dashboard');
          }}
          className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold self-start sm:self-auto transition"
        >
          Exit to Farmer Workspace
        </button>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-1">
              <Icon className={`w-5 h-5 ${s.color}`} />
              <p className="text-[11px] text-stone-400 truncate">{s.title}</p>
              <p className="text-lg font-black text-white">{s.value}</p>
              <span className="text-[10px] text-emerald-400 font-bold">{s.change}</span>
            </div>
          );
        })}
      </div>

      {/* 3. VERIFICATION & PIPELINE MANAGEMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Verification Queue */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <h3 className="text-base font-bold text-white font-['Outfit']">
              Pending Equipment & Storage Verifications
            </h3>
            <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
              3 Pending Review
            </span>
          </div>

          <div className="divide-y divide-stone-800 text-xs">
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Garuda Kisan Drone Fleet (16L Pro)</p>
                <p className="text-stone-400 text-[11px]">Provider: Sahnewal Agri Drones • DGCA License Attached</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition">
                Approve
              </button>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Shree Ram CA Cold Store (3,000 MT)</p>
                <p className="text-stone-400 text-[11px]">Provider: Samrala Cold Chain • WDRA Audit Complete</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition">
                Approve
              </button>
            </div>
          </div>
        </div>

        {/* Global Policy Crawler Status */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <h3 className="text-base font-bold text-white font-['Outfit']">
              Agri Policy & Scheme Verification Status
            </h3>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> All Feeds Active
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex justify-between items-center">
              <div>
                <p className="font-bold text-white">PM-KISAN & SMAM Mechanization Engine</p>
                <p className="text-[10px] text-stone-500">Ministry of Agriculture & Farmers Welfare, Delhi</p>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">
                Verified Today
              </span>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex justify-between items-center">
              <div>
                <p className="font-bold text-white">USDA Natural Resources Conservation Service (EQIP)</p>
                <p className="text-[10px] text-stone-500">United States Department of Agriculture</p>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">
                Synced 4h ago
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
