import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Save, Check, User, MapPin, Sprout, Tractor, Warehouse, Droplets } from 'lucide-react';

export const FarmerProfileModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { farmerProfile, updateFarmerProfile } = useApp();
  const [formData, setFormData] = useState({ ...farmerProfile });
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarmerProfile(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
      <div className="bg-stone-900 border border-stone-700 w-full max-w-2xl rounded-3xl shadow-2xl p-6 text-stone-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">Farmer Profile & Farm Parameters</h3>
              <p className="text-xs text-stone-400">Powers Krishi AI recommendations and policy matching</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs sm:text-sm">
          {/* Personal Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-400 font-medium mb-1">Farmer Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-stone-400 font-medium mb-1">Mobile Contact</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div>
              <label className="block text-stone-400 font-medium mb-1">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-stone-400 font-medium mb-1">State / Province</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-stone-400 font-medium mb-1">District / County</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-stone-400 font-medium mb-1">Village / Town</label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Land & Soil */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block text-stone-400 font-medium mb-1">Land Size</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={formData.landSize}
                  onChange={(e) => setFormData({ ...formData, landSize: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-emerald-500"
                />
                <select
                  value={formData.landUnit}
                  onChange={(e) => setFormData({ ...formData, landUnit: e.target.value as any })}
                  className="bg-stone-800 border border-stone-700 rounded-xl px-2 py-2 text-stone-200"
                >
                  <option value="Acres">Acres</option>
                  <option value="Hectares">Hectares</option>
                  <option value="Bigha">Bigha</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-stone-400 font-medium mb-1">Soil Type</label>
              <input
                type="text"
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-stone-400 font-medium mb-1">Soil pH Level</label>
              <input
                type="number"
                step="0.1"
                value={formData.soilPh}
                onChange={(e) => setFormData({ ...formData, soilPh: parseFloat(e.target.value) || 7.0 })}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-stone-400 font-medium mb-1">Irrigation Method</label>
              <select
                value={formData.irrigationMethod}
                onChange={(e) => setFormData({ ...formData, irrigationMethod: e.target.value as any })}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Drip">Drip Micro-Irrigation (Subsidized)</option>
                <option value="Canal">Canal Irrigation</option>
                <option value="Tube-well">Electric / Solar Tube-well</option>
                <option value="Sprinkler">Sprinkler</option>
                <option value="Rainfed">Rainfed</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-400 font-medium mb-1">Farming Method</label>
              <select
                value={formData.farmingMethod}
                onChange={(e) => setFormData({ ...formData, farmingMethod: e.target.value as any })}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Integrated">Integrated Precision & Chemical Balanced</option>
                <option value="Organic">Certified Organic (PKVY)</option>
                <option value="Natural (ZBNF)">Natural Zero Budget (ZBNF)</option>
                <option value="Conventional">Conventional</option>
              </select>
            </div>
          </div>

          {/* Storage Requirement */}
          <div>
            <label className="block text-stone-400 font-medium mb-1">Storage Requirement (Quintals)</label>
            <input
              type="number"
              value={formData.storageNeedsQuintals}
              onChange={(e) => setFormData({ ...formData, storageNeedsQuintals: parseInt(e.target.value, 10) || 0 })}
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-lg shadow-emerald-700/30"
            >
              {isSaved ? <Check className="w-4 h-4 text-emerald-200" /> : <Save className="w-4 h-4" />}
              <span>{isSaved ? 'Parameters Updated!' : 'Save Farm Parameters'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
