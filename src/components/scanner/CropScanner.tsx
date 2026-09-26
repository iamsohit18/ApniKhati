import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { scanCropApi } from '../../services/api';
import { CropScanResult } from '../../types';
import {
  ScanLine,
  Camera,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  Info,
  Bug,
  Leaf,
} from 'lucide-react';

export const CropScanner: React.FC = () => {
  const { farmerProfile, setIsKrishiModalOpen, speakText, setActiveTab } = useApp();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<CropScanResult | null>(null);
  const [selectedCropName, setSelectedCropName] = useState<string>('Wheat (गेहूं)');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Preset realistic sample cases for instant demonstration
  const presetSamples = [
    {
      label: 'Wheat: Yellow Rust',
      crop: 'Wheat (गेहूं)',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      description: 'Yellow stripe fungal pustules on upper wheat leaves.',
    },
    {
      label: 'Mustard: Aphid Infestation',
      crop: 'Mustard (सरसों)',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5703bc225?auto=format&fit=crop&w=600&q=80',
      description: 'Sap-sucking aphids clustering on floral heads.',
    },
    {
      label: 'Rice: Bacterial Blight',
      crop: 'Basmati Rice (धान)',
      image: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=600&q=80',
      description: 'Wavy yellow-to-white lesions along leaf margins.',
    },
    {
      label: 'Maize: Nitrogen Deficiency',
      crop: 'Maize (मक्का)',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
      description: 'V-shaped chlorosis running down leaf midrib.',
    },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        triggerAnalysis(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectPreset = (sample: typeof presetSamples[0]) => {
    setSelectedCropName(sample.crop);
    setSelectedImage(sample.image);
    triggerAnalysis(sample.image);
  };

  const triggerAnalysis = async (imgBase64: string) => {
    setIsScanning(true);
    setScanResult(null);

    try {
      const res = await scanCropApi({
        cropName: selectedCropName,
        imageBase64: imgBase64,
        symptoms: 'Leaf discoloration, yellow streaks, fungal spore suspicion',
      });
      setScanResult(res);
      speakText(`Diagnostic complete. Detected: ${res.possibleIssue} with confidence ${res.confidence}. Immediate action: ${res.immediateSteps[0]}`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                AI Crop Disease & Pest Scanner
              </h1>
              <p className="text-xs text-stone-400">
                Computer Vision Crop Pathology powered by Gemini Vision
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('experts')}
          className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition flex items-center gap-2 self-start md:self-auto"
        >
          <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
          <span>Consult Agronomist Directly</span>
        </button>
      </div>

      {/* 2. UPLOAD & SCAN ZONE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Upload Box */}
        <div className="bg-stone-900 border-2 border-dashed border-stone-700 hover:border-teal-500/60 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4 transition">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />

          {selectedImage ? (
            <div className="relative w-full max-h-64 overflow-hidden rounded-2xl border border-stone-700">
              <img src={selectedImage} alt="Crop sample" className="w-full h-56 object-cover" />
              {isScanning && (
                <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                  <RefreshCw className="w-8 h-8 text-teal-400 animate-spin" />
                  <p className="text-xs font-bold text-teal-300">Analyzing leaf pathology patterns...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-stone-800 text-teal-400 flex items-center justify-center">
              <Camera className="w-8 h-8" />
            </div>
          )}

          <div>
            <h3 className="text-base font-bold text-white font-['Outfit']">
              {selectedImage ? 'Image Uploaded' : 'Upload or Photograph Crop Leaf'}
            </h3>
            <p className="text-xs text-stone-400 max-w-xs mt-1">
              Capture close-up of affected foliage, stems, or spots in clear sunlight.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-lg shadow-teal-700/30"
            >
              <Upload className="w-4 h-4" />
              <span>{selectedImage ? 'Change Photo' : 'Upload Crop Photo'}</span>
            </button>
          </div>
        </div>

        {/* Preset Sample Cases for Immediate Demo */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Or Select Realistic Preset Cases
              </span>
              <span className="text-[11px] text-stone-500">Tap to diagnose</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {presetSamples.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => selectPreset(sample)}
                  className="p-2.5 rounded-2xl bg-stone-950/80 border border-stone-800 hover:border-teal-500/50 text-left transition flex items-center gap-2.5 group"
                >
                  <img
                    src={sample.image}
                    alt={sample.label}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-200 truncate group-hover:text-teal-300">
                      {sample.label}
                    </p>
                    <p className="text-[10px] text-stone-400 truncate">{sample.crop}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs text-stone-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-stone-500 flex-shrink-0" />
            <span>
              Supports Wheat, Mustard, Rice, Cotton, Maize, Potatoes, Tomatoes and Chili.
            </span>
          </div>
        </div>
      </div>

      {/* 3. DIAGNOSIS RESULTS DISPLAY */}
      {scanResult && (
        <div className="bg-stone-900 border-2 border-teal-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-scale-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-800 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                  AI Pathology Report
                </span>
                <span className="text-xs text-stone-400">Target Crop: {scanResult.crop}</span>
              </div>
              <h2 className="text-2xl font-black text-white font-['Outfit'] mt-1">
                {scanResult.possibleIssue}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-stone-400 block">Diagnostic Confidence</span>
                <span className="text-lg font-black text-teal-400">{scanResult.confidence}</span>
              </div>
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold">
                {scanResult.severity}
              </span>
            </div>
          </div>

          {/* Symptoms Identified */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              Observed Foliage Symptoms
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {scanResult.symptoms.map((sym, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 text-stone-300">
                  • {sym}
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next Steps */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              Immediate Corrective Steps (Within 48h)
            </h4>
            <div className="space-y-1.5 text-xs text-stone-200">
              {scanResult.immediateSteps.map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-md bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Biological vs Chemical Treatments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
              <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                🌿 Biological / Organic Treatment
              </span>
              <p className="text-stone-300">{scanResult.biologicalRemedy}</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1.5">
              <span className="text-amber-300 font-bold flex items-center gap-1.5">
                🧪 Chemical Treatment (Recommended Dosage)
              </span>
              <p className="text-stone-300">{scanResult.chemicalRemedy}</p>
            </div>
          </div>

          {/* Strictly Enforced Disclaimer */}
          <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Important Advisory Notice:</strong> {scanResult.disclaimer} Always wear protective gear during spray applications and adhere to pre-harvest intervals (PHI).
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
