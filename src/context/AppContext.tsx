import React, { createContext, useContext, useState, useEffect } from 'react';
import { FarmerProfile, UserRole } from '../types';
import { MOCK_FARMER_PROFILE } from '../data/mockData';
import { getActiveVideoForCurrentWeek } from '../data/videoData';
import { getTranslation, TranslationDictionary } from '../i18n/languages';

interface AppContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: TranslationDictionary;
  farmerProfile: FarmerProfile;
  updateFarmerProfile: (profile: Partial<FarmerProfile>) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isKrishiModalOpen: boolean;
  setIsKrishiModalOpen: (open: boolean) => void;
  activeVideoIndex: number;
  setActiveVideoIndex: (idx: number) => void;
  isVideoPlaying: boolean;
  setIsVideoPlaying: (playing: boolean) => void;
  isVideoMuted: boolean;
  setIsVideoMuted: (muted: boolean) => void;
  // Voice support
  isVoiceListening: boolean;
  startVoiceListening: (onResult: (transcript: string) => void) => void;
  stopVoiceListening: () => void;
  speakText: (text: string, langCode?: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  notificationCount: number;
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>(MOCK_FARMER_PROFILE);
  const [activeRole, setActiveRole] = useState<UserRole>('FARMER');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isKrishiModalOpen, setIsKrishiModalOpen] = useState<boolean>(false);

  // Background Video State: 7-day initial calculation
  const initialVideoWeek = getActiveVideoForCurrentWeek();
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(initialVideoWeek.index);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);

  // Voice State
  const [isVoiceListening, setIsVoiceListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);
  const [notificationCount, setNotificationCount] = useState<number>(4);

  const t = getTranslation(currentLanguage);

  const updateFarmerProfile = (updated: Partial<FarmerProfile>) => {
    setFarmerProfile((prev) => ({ ...prev, ...updated }));
  };

  // Text-To-Speech
  const speakText = (text: string, langCode?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }
    window.speechSynthesis.cancel();

    // Clean markdown stars/bullets before speech
    const cleanText = text.replace(/[*_#`]/g, '').slice(0, 400);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = langCode || (currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'pa' ? 'pa-IN' : 'en-US');
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Speech-To-Text Recognition
  const startVoiceListening = (onResult: (transcript: string) => void) => {
    if (typeof window === 'undefined') return;

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Speech Recognition is not supported on this browser. Please type your query.');
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'pa' ? 'pa-IN' : 'en-US';

      recognition.onstart = () => {
        setIsVoiceListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsVoiceListening(false);
        onResult(transcript);
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition error:', e);
        setIsVoiceListening(false);
      };

      recognition.onend = () => {
        setIsVoiceListening(false);
      };

      recognition.start();
      setRecognitionInstance(recognition);
    } catch (e) {
      console.error('Error starting speech recognition:', e);
      setIsVoiceListening(false);
    }
  };

  const stopVoiceListening = () => {
    if (recognitionInstance) {
      recognitionInstance.stop();
      setIsVoiceListening(false);
    }
  };

  const clearNotifications = () => setNotificationCount(0);

  return (
    <AppContext.Provider
      value={{
        currentLanguage,
        setLanguage: setCurrentLanguage,
        t,
        farmerProfile,
        updateFarmerProfile,
        activeRole,
        setActiveRole,
        activeTab,
        setActiveTab,
        isKrishiModalOpen,
        setIsKrishiModalOpen,
        activeVideoIndex,
        setActiveVideoIndex,
        isVideoPlaying,
        setIsVideoPlaying,
        isVideoMuted,
        setIsVideoMuted,
        isVoiceListening,
        startVoiceListening,
        stopVoiceListening,
        speakText,
        stopSpeaking,
        isSpeaking,
        notificationCount,
        clearNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
