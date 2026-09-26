import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_FARM_DIARY } from '../../data/mockData';
import { FarmDiaryEntry } from '../../types';
import {
  BookOpen,
  Plus,
  Calendar,
  DollarSign,
  Droplets,
  Sprout,
  ShieldAlert,
  Scissors,
  TrendingUp,
  Check,
} from 'lucide-react';

export const FarmDiary: React.FC = () => {
  const { farmerProfile } = useApp();
  const [diaryEntries, setDiaryEntries] = useState<FarmDiaryEntry[]>(MOCK_FARM_DIARY);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newEntry, setNewEntry] = useState<Partial<FarmDiaryEntry>>({
    date: new Date().toISOString().split('T')[0],
    crop: 'Wheat (PBW 550)',
    activity: 'Irrigation',
    details: '',
    expense: 0,
    notes: '',
  });

  const totalLoggedExpenses = diaryEntries.reduce((acc, curr) => acc + (curr.expense || 0), 0);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.details) return;

    const entry: FarmDiaryEntry = {
      id: `d-${Date.now()}`,
      date: newEntry.date || new Date().toISOString().split('T')[0],
      crop: newEntry.crop || 'Wheat',
      activity: newEntry.activity as any,
      details: newEntry.details,
      expense: newEntry.expense || 0,
      notes: newEntry.notes || '',
    };

    setDiaryEntries([entry, ...diaryEntries]);
    setShowAddModal(false);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      crop: 'Wheat (PBW 550)',
      activity: 'Irrigation',
      details: '',
      expense: 0,
      notes: '',
    });
  };

  const getActivityIcon = (act: string) => {
    switch (act) {
      case 'Sowing':
        return <Sprout className="w-4 h-4 text-emerald-400" />;
      case 'Irrigation':
        return <Droplets className="w-4 h-4 text-teal-400" />;
      case 'Fertilizer':
        return <Sprout className="w-4 h-4 text-amber-400" />;
      case 'Pest Control':
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      case 'Harvesting':
        return <Scissors className="w-4 h-4 text-orange-400" />;
      case 'Sale':
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Digital Farm Diary & Timeline
              </h1>
              <p className="text-xs text-stone-400">
                Log sowing, watering, nutrient sprays, expenses & harvest events
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-stone-400 block">Season Expenses Logged</span>
            <span className="text-lg font-black text-white">₹{totalLoggedExpenses.toLocaleString()}</span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-700/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Farm Log</span>
          </button>
        </div>
      </div>

      {/* 2. TIMELINE LIST */}
      <div className="relative border-l-2 border-stone-800 ml-4 sm:ml-6 space-y-6">
        {diaryEntries.map((entry) => (
          <div key={entry.id} className="relative pl-6 sm:pl-8 group">
            {/* Timeline node icon */}
            <div className="absolute -left-3.5 top-1 w-7 h-7 rounded-full bg-stone-900 border-2 border-emerald-500 flex items-center justify-center">
              {getActivityIcon(entry.activity)}
            </div>

            <div className="bg-stone-900 border border-stone-800 hover:border-emerald-500/40 rounded-2xl p-5 space-y-2 transition shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-stone-800 text-emerald-300 text-xs font-bold border border-stone-700">
                    {entry.activity}
                  </span>
                  <span className="text-xs text-stone-400">{entry.crop}</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-stone-400">
                  <span>📅 {entry.date}</span>
                  {entry.expense > 0 && (
                    <span className="font-bold text-rose-400">Expense: ₹{entry.expense.toLocaleString()}</span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-200">{entry.details}</p>

              {entry.notes && (
                <p className="text-[11px] text-stone-400 italic bg-stone-950/60 p-2 rounded-lg border border-stone-800/80">
                  Note: {entry.notes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. ADD LOG MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 w-full max-w-md rounded-3xl p-6 shadow-2xl text-stone-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-base font-bold text-white font-['Outfit']">Add Farm Diary Record</h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Activity</label>
                  <select
                    value={newEntry.activity}
                    onChange={(e) => setNewEntry({ ...newEntry, activity: e.target.value as any })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
                  >
                    <option value="Sowing">Sowing</option>
                    <option value="Irrigation">Irrigation</option>
                    <option value="Fertilizer">Fertilizer</option>
                    <option value="Pest Control">Pest Control</option>
                    <option value="Weeding">Weeding</option>
                    <option value="Harvesting">Harvesting</option>
                    <option value="Sale">Sale</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Activity Details</label>
                <textarea
                  rows={2}
                  value={newEntry.details}
                  onChange={(e) => setNewEntry({ ...newEntry, details: e.target.value })}
                  placeholder="e.g. Applied 45 kg Urea per acre with zinc sulphate..."
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Incurred Cost (₹)</label>
                <input
                  type="number"
                  value={newEntry.expense}
                  onChange={(e) => setNewEntry({ ...newEntry, expense: parseInt(e.target.value) || 0 })}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition"
              >
                Save Record to Diary
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
