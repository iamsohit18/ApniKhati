import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_SOIL_REPORT } from '../../data/mockData';
import {
  FlaskConical,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Layers,
  Leaf,
  FileText,
  UserCheck,
} from 'lucide-react';

export const SoilTestingPage: React.FC = () => {
  const { farmerProfile } = useApp();
  
  // Booking test state
  const [selectedService, setSelectedService] = useState('Standard NPK & Organic Carbon Testing');
  const [testBookingStep, setTestBookingStep] = useState<'IDLE' | 'CONFIRMED'>('IDLE');
  const [appointmentDate, setAppointmentDate] = useState('2026-10-05');

  const testServices = [
    {
      title: 'Comprehensive Soil Health Analysis',
      price: '₹299',
      subsidized: 'Free with Soil Health Card Scheme',
      turnaround: '48 hours',
      metrics: ['pH', 'Organic Carbon', 'N, P, K', 'Zinc & Boron', 'EC'],
    },
    {
      title: 'Irrigation Borewell Water Quality',
      price: '₹199',
      subsidized: 'State Subsidized',
      turnaround: '24 hours',
      metrics: ['Salinity (EC)', 'Sodium Adsorption Ratio (SAR)', 'TDS', 'Chloride'],
    },
    {
      title: 'Plant Leaf Tissue Nutrient Profiling',
      price: '₹450',
      subsidized: 'ICAR Accredited',
      turnaround: '3 days',
      metrics: ['Micronutrient assimilation', 'Nitrogen uptake efficiency', 'Toxicity index'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Soil & Crop Health Testing Lab
              </h1>
              <p className="text-xs text-stone-400">
                Doorstep Field Agent Sample Collection → NABL Accredited Lab Testing → AI Prescription
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 flex-shrink-0 text-teal-400" />
          <span>Accredited under National Soil Health Card Mission with GPS-tagged samples.</span>
        </div>
      </div>

      {/* 2. 6-STAGE WORKFLOW VISUALIZER */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
          Seamless 6-Stage Doorstep Workflow
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          {[
            { step: '1. Request', status: 'Book Online', active: true },
            { step: '2. Field Agent', status: 'Assigned in 2h', active: true },
            { step: '3. Sample Pick', status: 'GPS Tagged Core', active: true },
            { step: '4. NABL Lab', status: 'Spectroscopy', active: true },
            { step: '5. Digital Card', status: 'SMS & WhatsApp', active: true },
            { step: '6. AI Advice', status: 'Fertilizer Plan', active: true },
          ].map((s, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-1">
              <div className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-300 mx-auto flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </div>
              <p className="text-xs font-bold text-white">{s.step}</p>
              <p className="text-[10px] text-teal-400">{s.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. BOOK A TEST & DIGITAL CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Book Test Services */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white font-['Outfit']">Book Doorstep Sample Collection</h3>
            
            <div className="space-y-3">
              {testServices.map((srv, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedService(srv.title)}
                  className={`p-4 rounded-2xl border cursor-pointer transition space-y-2 ${
                    selectedService === srv.title
                      ? 'bg-teal-950/40 border-teal-500 text-white'
                      : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold">{srv.title}</h4>
                    <span className="text-xs font-black text-teal-400">{srv.price}</span>
                  </div>
                  <p className="text-[10px] text-amber-300">{srv.subsidized}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {srv.metrics.map((m, i) => (
                      <span key={i} className="text-[9px] bg-stone-800 px-1.5 py-0.5 rounded text-stone-400">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-stone-300 text-xs font-medium mb-1">Preferred Pickup Date</label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100"
              />
            </div>

            <button
              onClick={() => {
                setTestBookingStep('CONFIRMED');
                setTimeout(() => setTestBookingStep('IDLE'), 2000);
              }}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-teal-700/30"
            >
              {testBookingStep === 'CONFIRMED' ? <Check className="w-4 h-4" /> : <FlaskConical className="w-4 h-4" />}
              <span>{testBookingStep === 'CONFIRMED' ? 'Field Agent Dispatched!' : 'Confirm Collection Appointment'}</span>
            </button>
          </div>
        </div>

        {/* Existing Active Digital Soil Health Card */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-800 gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active Digital Soil Health Card
                </span>
                <h3 className="text-lg font-black text-white font-['Outfit'] mt-1">
                  Sample ID: {MOCK_SOIL_REPORT.sampleId}
                </h3>
                <p className="text-xs text-stone-400">
                  {farmerProfile.name} • {farmerProfile.village}, {farmerProfile.district} • Lab: {MOCK_SOIL_REPORT.labName}
                </p>
              </div>

              <span className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold self-start sm:self-auto">
                Status: {MOCK_SOIL_REPORT.statusRating}
              </span>
            </div>

            {/* Nutrient meters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] text-stone-400 uppercase font-bold">Soil pH</span>
                <p className="text-xl font-black text-emerald-400 mt-1">{MOCK_SOIL_REPORT.ph}</p>
                <span className="text-[10px] text-emerald-300">Optimal Neutral</span>
              </div>

              <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] text-stone-400 uppercase font-bold">Organic Carbon</span>
                <p className="text-xl font-black text-emerald-400 mt-1">{MOCK_SOIL_REPORT.organicCarbonPercent}%</p>
                <span className="text-[10px] text-stone-400">Target &gt; 0.75%</span>
              </div>

              <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] text-stone-400 uppercase font-bold">Nitrogen (N)</span>
                <p className="text-xl font-black text-amber-400 mt-1">{MOCK_SOIL_REPORT.nitrogenKgHa} <span className="text-xs font-normal">kg/ha</span></p>
                <span className="text-[10px] text-amber-300">Slightly Low</span>
              </div>

              <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] text-stone-400 uppercase font-bold">Zinc (Zn)</span>
                <p className="text-xl font-black text-rose-400 mt-1">{MOCK_SOIL_REPORT.zincPpm} <span className="text-xs font-normal">ppm</span></p>
                <span className="text-[10px] text-rose-300">Deficient</span>
              </div>
            </div>

            {/* AI Dosage Optimization Recommendations */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <h4 className="text-sm font-bold text-white font-['Outfit']">
                  AI & Agronomist Fertilizer Prescription
                </h4>
              </div>

              <div className="space-y-2 text-xs text-stone-200">
                {MOCK_SOIL_REPORT.aiRecommendations.map((rec, i) => (
                  <div key={i} className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
