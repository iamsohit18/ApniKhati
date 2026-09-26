import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Navigation,
  Phone,
  ArrowRight,
  FlaskConical,
} from 'lucide-react';

export const FieldAgentDashboard: React.FC = () => {
  const { setActiveRole, setActiveTab } = useApp();

  const [tasks, setTasks] = useState([
    {
      id: 'task-1',
      farmer: 'Ramesh Patel',
      phone: '+91 98765 43210',
      location: 'Samrala Kalan, Ludhiana',
      crop: 'Wheat Plot B (Tillering)',
      testType: 'Soil NPK + Micronutrient Test',
      appointment: 'Today, 02:00 PM',
      status: 'ON_THE_WAY',
    },
    {
      id: 'task-2',
      farmer: 'Harbans Singh',
      phone: '+91 98140 22334',
      location: 'Doraha Road, Ludhiana',
      crop: 'Mustard Plot A',
      testType: 'Borewell Salinity (EC) Test',
      appointment: 'Today, 04:30 PM',
      status: 'ASSIGNED',
    },
    {
      id: 'task-3',
      farmer: 'Baldev Ram',
      phone: '+91 98760 11998',
      location: 'Sahnewal Khurd',
      crop: 'Paddy Stubble Soil Health',
      testType: 'Organic Carbon & pH Test',
      appointment: 'Yesterday',
      status: 'SUBMITTED_TO_LAB',
    },
  ]);

  const advanceStatus = (id: string) => {
    const statusFlow = ['ASSIGNED', 'ACCEPTED', 'ON_THE_WAY', 'COLLECTED', 'SUBMITTED_TO_LAB', 'COMPLETED'];
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const currentIndex = statusFlow.indexOf(t.status);
          const nextIndex = Math.min(statusFlow.length - 1, currentIndex + 1);
          return { ...t, status: statusFlow[nextIndex] };
        }
        return t;
      })
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Field Agent Sample Collection Route
              </h1>
              <p className="text-xs text-stone-400">
                Agent: Gurmukh Singh • Ludhiana East Field Territory #04
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

      {/* 2. TASK QUEUE */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white font-['Outfit']">Today&rsquo;s Scheduled Sample Pickups</h3>

        <div className="space-y-4">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white font-['Outfit']">{t.farmer}</h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                      {t.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">{t.location} • 📅 {t.appointment}</p>
                </div>

                <a
                  href={`tel:${t.phone}`}
                  className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Farmer</span>
                </a>
              </div>

              <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 text-xs grid grid-cols-2 gap-2">
                <div>
                  <span className="text-stone-500 text-[10px] block">Test Requested</span>
                  <p className="font-semibold text-stone-200">{t.testType}</p>
                </div>
                <div>
                  <span className="text-stone-500 text-[10px] block">Crop Plot</span>
                  <p className="font-semibold text-stone-200">{t.crop}</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                  GPS Geo-tagging enabled for soil core
                </span>

                <button
                  onClick={() => advanceStatus(t.id)}
                  disabled={t.status === 'COMPLETED'}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs transition"
                >
                  {t.status === 'ASSIGNED' && 'Accept Task'}
                  {t.status === 'ACCEPTED' && 'Start Navigation'}
                  {t.status === 'ON_THE_WAY' && 'Collect Sample (Barcoded)'}
                  {t.status === 'COLLECTED' && 'Submit to NABL Lab'}
                  {t.status === 'SUBMITTED_TO_LAB' && 'Mark Completed'}
                  {t.status === 'COMPLETED' && 'Completed'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
