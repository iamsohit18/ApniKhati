import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_SCHEMES, MOCK_POLICY_ALERTS } from '../../data/mockData';
import { AgriScheme, PolicyAlert } from '../../types';
import {
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  XCircle,
  ExternalLink,
  Download,
  Calendar,
  Building2,
  FileText,
  Sparkles,
  ArrowRight,
  Globe,
  Bell,
  Check,
  Info,
} from 'lucide-react';

export const SchemesPage: React.FC = () => {
  const { farmerProfile, t } = useApp();
  
  // Explorer filters
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Eligibility modal state
  const [eligibilityScheme, setEligibilityScheme] = useState<AgriScheme | null>(null);
  const [eligibilityAnswers, setEligibilityAnswers] = useState({
    ownsLand: true,
    isSmallholder: true,
    hasBankLinked: true,
    activeGrower: true,
  });
  const [eligibilityResult, setEligibilityResult] = useState<'ELIGIBLE' | 'MORE_INFO' | 'NOT_ELIGIBLE' | null>(null);

  // Document checklist modal state
  const [checklistScheme, setChecklistScheme] = useState<AgriScheme | null>(null);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const countries = ['All', 'India', 'United States', 'European Union', 'Australia'];
  const categories = [
    'All',
    'Crop Support',
    'Equipment Subsidies',
    'Solar Agriculture',
    'Cold Storage',
    'Credit & Insurance',
    'Global Grant',
  ];

  const filteredSchemes = MOCK_SCHEMES.filter((s) => {
    const matchesCountry = selectedCountry === 'All' || s.country === selectedCountry;
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.authority.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesCategory && matchesSearch;
  });

  const runEligibilityAssessment = () => {
    if (!eligibilityAnswers.ownsLand) {
      setEligibilityResult('NOT_ELIGIBLE');
    } else if (eligibilityAnswers.ownsLand && eligibilityAnswers.hasBankLinked && eligibilityAnswers.activeGrower) {
      setEligibilityResult('ELIGIBLE');
    } else {
      setEligibilityResult('MORE_INFO');
    }
  };

  const toggleDoc = (doc: string) => {
    setCheckedDocs((prev) => ({ ...prev, [doc]: !prev[doc] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-stone-100">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Global Agriculture Policies & Subsidies
              </h1>
              <p className="text-xs text-stone-400">
                Verified Central, State, and Global Subsidies, Grants & Farmer Schemes
              </p>
            </div>
          </div>
        </div>

        {/* AI Matching summary pill */}
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 max-w-md">
          <Sparkles className="w-4 h-4 flex-shrink-0 text-amber-300" />
          <span>
            Matched <strong>4 active support programs</strong> for {farmerProfile.name} ({farmerProfile.district}, {farmerProfile.landSize} Acres).
          </span>
        </div>
      </div>

      {/* 2. POLICY EXPLORER FILTER BAR */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Global Scheme Explorer
          </span>
          <span className="text-xs text-stone-400">Showing {filteredSchemes.length} Verified Programs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scheme name, tractor subsidy, solar pump..."
              className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Country filter */}
          <div>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-200 focus:outline-none focus:border-blue-500"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  Country: {c}
                </option>
              ))}
            </select>
          </div>

          {/* Category filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-200 focus:outline-none focus:border-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  Category: {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. SCHEMES CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-stone-900 border border-stone-800 hover:border-blue-500/50 rounded-3xl p-6 transition shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {scheme.category}
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold text-emerald-400">
                    🟢 {scheme.status}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black text-white font-['Outfit']">{scheme.name}</h3>
                <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-stone-500" />
                  <span>{scheme.authority} • {scheme.region}</span>
                </p>
              </div>

              {/* Max Benefit Highlight Box */}
              <div className="p-3 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs">
                <span className="text-blue-300 font-bold block mb-0.5">Financial Support / Grant:</span>
                <p className="text-stone-100 font-medium">{scheme.maxBenefit}</p>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">{scheme.description}</p>

              <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 space-y-1">
                <p>
                  <strong>Eligibility:</strong> {scheme.eligibilitySummary}
                </p>
                <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1">
                  <span>Deadline: {scheme.deadline}</span>
                  <span>Verified: {scheme.lastVerifiedDate}</span>
                </div>
              </div>
            </div>

            {/* Actions: Check Eligibility, Required Docs, Official Source */}
            <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEligibilityScheme(scheme);
                    setEligibilityResult(null);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Am I Eligible?</span>
                </button>

                <button
                  onClick={() => {
                    setChecklistScheme(scheme);
                    setCheckedDocs({});
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Documents ({scheme.requiredDocuments.length})</span>
                </button>
              </div>

              <a
                href={scheme.officialSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-stone-400 hover:text-white text-xs flex items-center gap-1 transition"
              >
                <span>Official Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* 4. "AM I ELIGIBLE?" MODAL */}
      {eligibilityScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4 text-stone-100">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-['Outfit']">Eligibility Screener</h3>
                  <p className="text-xs text-stone-400 truncate max-w-xs">{eligibilityScheme.shortName}</p>
                </div>
              </div>
              <button
                onClick={() => setEligibilityScheme(null)}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-800/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={eligibilityAnswers.ownsLand}
                  onChange={(e) => setEligibilityAnswers({ ...eligibilityAnswers, ownsLand: e.target.checked })}
                  className="rounded text-blue-500 focus:ring-0 w-4 h-4"
                />
                <span>Owns cultivable agricultural land or valid farming lease in declared region</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-800/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={eligibilityAnswers.isSmallholder}
                  onChange={(e) => setEligibilityAnswers({ ...eligibilityAnswers, isSmallholder: e.target.checked })}
                  className="rounded text-blue-500 focus:ring-0 w-4 h-4"
                />
                <span>Meets landholding criteria (Smallholder/Marginal: up to 5 Acres)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-800/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={eligibilityAnswers.hasBankLinked}
                  onChange={(e) => setEligibilityAnswers({ ...eligibilityAnswers, hasBankLinked: e.target.checked })}
                  className="rounded text-blue-500 focus:ring-0 w-4 h-4"
                />
                <span>Active Aadhaar-linked Bank Account with Direct Benefit Transfer (DBT) enabled</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-800/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={eligibilityAnswers.activeGrower}
                  onChange={(e) => setEligibilityAnswers({ ...eligibilityAnswers, activeGrower: e.target.checked })}
                  className="rounded text-blue-500 focus:ring-0 w-4 h-4"
                />
                <span>Currently sowing or planning notified seasonal crop</span>
              </label>
            </div>

            <button
              onClick={runEligibilityAssessment}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition"
            >
              Evaluate My Farm Criteria
            </button>

            {/* Assessment Result */}
            {eligibilityResult && (
              <div
                className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1.5 animate-scale-up ${
                  eligibilityResult === 'ELIGIBLE'
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                    : eligibilityResult === 'MORE_INFO'
                    ? 'bg-amber-950/60 border-amber-500/40 text-amber-200'
                    : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  {eligibilityResult === 'ELIGIBLE' && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>🟢 Potentially Eligible</span>
                    </>
                  )}
                  {eligibilityResult === 'MORE_INFO' && (
                    <>
                      <HelpCircle className="w-4 h-4 text-amber-400" />
                      <span>🟡 More Information Required</span>
                    </>
                  )}
                  {eligibilityResult === 'NOT_ELIGIBLE' && (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>🔴 Does Not Appear to Match Criteria</span>
                    </>
                  )}
                </div>

                <p className="text-[11px] leading-relaxed opacity-90">
                  {eligibilityResult === 'ELIGIBLE' &&
                    'Your farm profile matches the published parameters for this program. You can proceed with preparing the document checklist.'}
                  {eligibilityResult === 'MORE_INFO' &&
                    'Some prerequisite documents (such as DBT bank link or crop verification) must be confirmed with your local Agriculture Office.'}
                  {eligibilityResult === 'NOT_ELIGIBLE' &&
                    'Land ownership or registration documentation appears to be outside published guidelines for this specific quota.'}
                </p>

                <div className="pt-2 text-[10px] text-stone-400 border-t border-stone-800/80">
                  ⚠️ <em>This is an informational eligibility assessment based on published guidelines. Final eligibility is determined by the relevant government department.</em>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. DOCUMENT CHECKLIST MODAL */}
      {checklistScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4 text-stone-100">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-['Outfit']">Required Document Checklist</h3>
                  <p className="text-xs text-stone-400 truncate max-w-xs">{checklistScheme.name}</p>
                </div>
              </div>
              <button
                onClick={() => setChecklistScheme(null)}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-400">
              Check off the documents you have ready for the application portal:
            </p>

            <div className="space-y-2 text-xs sm:text-sm max-h-64 overflow-y-auto pr-1">
              {checklistScheme.requiredDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleDoc(doc)}
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                    checkedDocs[doc]
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-stone-800/60 border-stone-700 text-stone-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition flex-shrink-0 ${
                      checkedDocs[doc] ? 'bg-emerald-500 border-emerald-500 text-stone-950' : 'border-stone-500'
                    }`}
                  >
                    {checkedDocs[doc] && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="flex-1">{doc}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
              <span className="text-xs text-stone-400">
                {Object.values(checkedDocs).filter(Boolean).length} / {checklistScheme.requiredDocuments.length} Prepared
              </span>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save Checklist</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
