import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages';
import { UserRole } from '../../types';
import {
  Sprout,
  Mic,
  Globe,
  Bell,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Tractor,
  Warehouse,
  ScanLine,
  FileText,
  Activity,
  UserCheck,
} from 'lucide-react';

export const Header: React.FC<{ onOpenProfile: () => void }> = ({ onOpenProfile }) => {
  const {
    currentLanguage,
    setLanguage,
    t,
    farmerProfile,
    activeRole,
    setActiveRole,
    activeTab,
    setActiveTab,
    setIsKrishiModalOpen,
    notificationCount,
    clearNotifications,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const roles: { role: UserRole; label: string; icon: any; color: string }[] = [
    { role: 'FARMER', label: 'Farmer (Ramesh)', icon: Sprout, color: 'text-emerald-500' },
    { role: 'BUYER', label: 'Buyer (ITC Fresh)', icon: TrendingUp, color: 'text-amber-500' },
    { role: 'EQUIPMENT_OWNER', label: 'Equipment Owner', icon: Tractor, color: 'text-orange-500' },
    { role: 'STORAGE_PROVIDER', label: 'Storage Provider', icon: Warehouse, color: 'text-purple-500' },
    { role: 'EXPERT', label: 'Agronomy Expert', icon: UserCheck, color: 'text-teal-500' },
    { role: 'FIELD_AGENT', label: 'Field Agent', icon: Activity, color: 'text-cyan-500' },
    { role: 'ADMIN', label: 'Admin Console', icon: ShieldCheck, color: 'text-rose-500' },
  ];

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'market', label: t.liveMarket || 'Market' },
    { id: 'schemes', label: t.agriBenefits || 'Agri Benefits' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'storage', label: 'Storage' },
    { id: 'scanner', label: 'Scan Crop' },
    { id: 'testing', label: 'Soil Testing' },
    { id: 'krishi-ai', label: 'Krishi AI' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-stone-900/90 backdrop-blur-xl border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Outfit']">
                    Apni<span className="text-emerald-400">Kheti</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    AI Agri OS
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 hidden sm:block truncate max-w-[200px]">
                  Global Farming Intelligence
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  if (link.id === 'krishi-ai') {
                    setIsKrishiModalOpen(true);
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === link.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Tools: Voice AI, Language, Role, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Ask Krishi AI Pill */}
            <button
              onClick={() => setIsKrishiModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-900/40 hover:scale-102 active:scale-98 transition-all group"
            >
              <Mic className="w-4 h-4 text-emerald-100 group-hover:animate-bounce" />
              <span className="hidden sm:inline">{t.askKrishiAi || 'Ask Krishi AI'}</span>
              <span className="sm:hidden">AI</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 ml-0.5" />
            </button>

            {/* Language Selector Dropdown (31 Languages) */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setRoleDropdownOpen(false);
                  setNotifDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700/80 text-stone-200 text-xs font-medium border border-stone-700 transition"
                title="Select Platform Language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span className="max-w-[70px] truncate">{currentLangObj.nativeName}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 max-h-96 overflow-y-auto bg-stone-900/95 backdrop-blur-md border border-stone-700 rounded-xl shadow-2xl p-2 z-50">
                  <div className="p-2 border-b border-stone-800 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    🇮🇳 Indian Languages (20)
                  </div>
                  <div className="grid grid-cols-2 gap-1 py-1">
                    {SUPPORTED_LANGUAGES.filter((l) => l.isIndian).map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`text-left px-2.5 py-1.5 rounded-lg text-xs transition flex flex-col ${
                          currentLanguage === lang.code
                            ? 'bg-emerald-600/30 text-emerald-300 font-semibold border border-emerald-500/40'
                            : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                        }`}
                      >
                        <span className="text-xs">{lang.nativeName}</span>
                        <span className="text-[10px] text-stone-400">{lang.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="p-2 border-t border-b border-stone-800 text-[11px] font-semibold text-stone-400 uppercase tracking-wider mt-1">
                    🌎 Global Languages (11)
                  </div>
                  <div className="grid grid-cols-2 gap-1 py-1">
                    {SUPPORTED_LANGUAGES.filter((l) => !l.isIndian).map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`text-left px-2.5 py-1.5 rounded-lg text-xs transition flex flex-col ${
                          currentLanguage === lang.code
                            ? 'bg-emerald-600/30 text-emerald-300 font-semibold border border-emerald-500/40'
                            : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                        }`}
                      >
                        <span className="text-xs">{lang.nativeName}</span>
                        <span className="text-[10px] text-stone-400">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher Pill */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setLangDropdownOpen(false);
                  setNotifDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700/80 text-stone-200 text-xs font-medium border border-stone-700 transition"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-stone-400">Role:</span>
                <span className="font-semibold text-emerald-300 truncate max-w-[90px]">
                  {activeRole}
                </span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl p-1.5 z-50">
                  <div className="px-3 py-2 text-[11px] text-stone-400 font-semibold uppercase tracking-wider border-b border-stone-800">
                    Switch Workspace View
                  </div>
                  {roles.map((r) => {
                    const Icon = r.icon;
                    return (
                      <button
                        key={r.role}
                        onClick={() => {
                          setActiveRole(r.role);
                          setRoleDropdownOpen(false);
                          if (r.role === 'ADMIN') setActiveTab('admin');
                          else if (r.role === 'FIELD_AGENT') setActiveTab('fieldagent');
                          else setActiveTab('dashboard');
                        }}
                        className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition ${
                          activeRole === r.role
                            ? 'bg-emerald-600/20 text-emerald-300 font-semibold'
                            : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${r.color}`} />
                        <span>{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifDropdownOpen(!notifDropdownOpen);
                  clearNotifications();
                }}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700/80 text-stone-300 hover:text-white relative transition"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                    <span className="text-xs font-bold text-stone-200">Smart Farm Alerts</span>
                    <span className="text-[10px] text-emerald-400 font-medium">All Caught Up</span>
                  </div>
                  <div className="divide-y divide-stone-800 text-xs mt-1 max-h-64 overflow-y-auto">
                    <div className="py-2">
                      <p className="font-semibold text-amber-300 text-[11px]">🌦 Weather Alert</p>
                      <p className="text-stone-300 text-xs">Unseasonal rain expected tomorrow in Ludhiana. Suspend spray.</p>
                    </div>
                    <div className="py-2">
                      <p className="font-semibold text-emerald-300 text-[11px]">💰 Market Opportunity</p>
                      <p className="text-stone-300 text-xs">Wheat traded at ₹2,420/Q (+₹140 over MSP) in Khanna Mandi.</p>
                    </div>
                    <div className="py-2">
                      <p className="font-semibold text-blue-300 text-[11px]">🏛 Subsidy Notification</p>
                      <p className="text-stone-300 text-xs">Punjab SMAM 50% Rotavator & Drone subsidy application open.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Farmer Profile Button */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700/80 text-stone-200 border border-stone-700 transition"
              title="Farmer Profile"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                {farmerProfile.name[0]}
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-semibold leading-none">{farmerProfile.name}</p>
                <p className="text-[10px] text-stone-400">{farmerProfile.district}, {farmerProfile.state}</p>
              </div>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-800 space-y-1">
            <div className="grid grid-cols-2 gap-1.5 pb-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                    if (link.id === 'krishi-ai') setIsKrishiModalOpen(true);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                    activeTab === link.id
                      ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                      : 'text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Role switch in mobile */}
            <div className="pt-2 border-t border-stone-800">
              <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider px-2 mb-1.5">
                Switch Perspective
              </p>
              <div className="flex flex-wrap gap-1">
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      setActiveRole(r.role);
                      setMobileMenuOpen(false);
                      if (r.role === 'ADMIN') setActiveTab('admin');
                      else if (r.role === 'FIELD_AGENT') setActiveTab('fieldagent');
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                      activeRole === r.role
                        ? 'bg-emerald-500 text-white'
                        : 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
