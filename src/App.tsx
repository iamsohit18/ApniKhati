import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FloatingKrishiAiButton } from './components/common/FloatingKrishiAiButton';
import { KrishiAiModal } from './components/common/KrishiAiModal';
import { FarmerProfileModal } from './components/profile/FarmerProfileModal';

// Modules
import { HomePage } from './components/home/HomePage';
import { FarmerDashboard } from './components/dashboard/FarmerDashboard';
import { MarketPage } from './components/market/MarketPage';
import { SchemesPage } from './components/schemes/SchemesPage';
import { EquipmentPage } from './components/equipment/EquipmentPage';
import { StoragePage } from './components/storage/StoragePage';
import { CropScanner } from './components/scanner/CropScanner';
import { SoilTestingPage } from './components/testing/SoilTestingPage';
import { WeatherPage } from './components/weather/WeatherPage';
import { ProfitCalculator } from './components/calculator/ProfitCalculator';
import { FarmDiary } from './components/diary/FarmDiary';
import { BuyersPage } from './components/buyers/BuyersPage';
import { TransportPage } from './components/transport/TransportPage';
import { ExpertsPage } from './components/experts/ExpertsPage';
import { CommunityPage } from './components/community/CommunityPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FieldAgentDashboard } from './components/fieldagent/FieldAgentDashboard';

import { Home, Sprout, Coins, Bot, User } from 'lucide-react';

function AppContent() {
  const { activeTab, setActiveTab, setIsKrishiModalOpen, t } = useApp();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'dashboard':
        return <FarmerDashboard onOpenProfile={() => setProfileModalOpen(true)} />;
      case 'market':
        return <MarketPage />;
      case 'schemes':
        return <SchemesPage />;
      case 'equipment':
        return <EquipmentPage />;
      case 'storage':
        return <StoragePage />;
      case 'scanner':
        return <CropScanner />;
      case 'testing':
        return <SoilTestingPage />;
      case 'weather':
        return <WeatherPage />;
      case 'calculator':
        return <ProfitCalculator />;
      case 'diary':
        return <FarmDiary />;
      case 'buyers':
        return <BuyersPage />;
      case 'transport':
        return <TransportPage />;
      case 'experts':
        return <ExpertsPage />;
      case 'community':
        return <CommunityPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'fieldagent':
        return <FieldAgentDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-stone-950 pb-16 lg:pb-0">
      
      {/* Universal Top Header */}
      <Header onOpenProfile={() => setProfileModalOpen(true)} />

      {/* Main Content View */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Always-accessible Floating AI Assistant Button */}
      <FloatingKrishiAiButton />

      {/* Krishi AI Voice-First Conversational Modal */}
      <KrishiAiModal />

      {/* Farmer Profile Editor Modal */}
      <FarmerProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      {/* Mobile Sticky Bottom Navigation (Requested in Specification Section 43) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-xl border-t border-stone-800 px-3 py-2 flex items-center justify-around text-[10px] text-stone-400">
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'home' ? 'text-emerald-400 font-bold' : 'hover:text-stone-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'dashboard' ? 'text-emerald-400 font-bold' : 'hover:text-stone-200'
          }`}
        >
          <Sprout className="w-5 h-5" />
          <span>Farm</span>
        </button>

        <button
          onClick={() => setIsKrishiModalOpen(true)}
          className="flex flex-col items-center -mt-5 bg-gradient-to-tr from-emerald-500 to-teal-600 p-2.5 rounded-full text-white shadow-xl shadow-emerald-500/40 border-2 border-stone-900"
        >
          <Bot className="w-6 h-6 animate-pulse" />
        </button>

        <button
          onClick={() => {
            setActiveTab('market');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 transition ${
            activeTab === 'market' ? 'text-amber-400 font-bold' : 'hover:text-stone-200'
          }`}
        >
          <Coins className="w-5 h-5" />
          <span>Market</span>
        </button>

        <button
          onClick={() => setProfileModalOpen(true)}
          className="flex flex-col items-center gap-1 hover:text-stone-200 transition"
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
