import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { askKrishiAiApi, scanCropApi } from '../../services/api';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Camera,
  Bot,
  User,
  Globe,
  RefreshCw,
  Copy,
  Check,
  Wheat,
  CloudSun,
  Coins,
  ShieldAlert,
  Tractor,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  source?: string;
  imageUrl?: string;
}

export const KrishiAiModal: React.FC = () => {
  const {
    isKrishiModalOpen,
    setIsKrishiModalOpen,
    currentLanguage,
    setLanguage,
    t,
    farmerProfile,
    isVoiceListening,
    startVoiceListening,
    stopVoiceListening,
    speakText,
    stopSpeaking,
    isSpeaking,
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Sat Sri Akal / Namaste ${farmerProfile.name}! 🌾 I am Krishi AI, your multilingual agricultural companion. 
I am analyzing your ${farmerProfile.landSize} Acres farm in ${farmerProfile.district} growing ${farmerProfile.crops.map((c) => c.name).join(' & ')}.
You can speak or type in any language (Hindi, Punjabi, English, Telugu, Spanish, etc.) or upload a crop photo for disease scanning!`,
      timestamp: 'Just now',
      source: 'gemini-3.8-flash',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [imageUploadBase64, setImageUploadBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isKrishiModalOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() && !imageUploadBase64) return;

    const currentImg = imageUploadBase64;
    const currentPreview = imagePreview;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query || 'Crop Image Diagnostic Request',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageUrl: currentPreview || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setImageUploadBase64(null);
    setImagePreview(null);
    setIsLoading(true);

    try {
      if (currentImg) {
        // Run vision diagnostic
        const scanRes = await scanCropApi({
          cropName: farmerProfile.crops[0]?.name || 'Wheat',
          imageBase64: currentImg,
          symptoms: query,
        });

        const aiText = `🔬 **Crop Diagnostic Assessment:**
• **Detected Issue:** ${scanRes.possibleIssue}
• **Confidence:** ${scanRes.confidence} (${scanRes.severity})

📋 **Immediate Next Steps:**
${scanRes.immediateSteps.map((step: string) => `• ${step}`).join('\n')}

🌿 **Biological & Chemical Treatment:**
• Biological: ${scanRes.biologicalRemedy}
• Chemical: ${scanRes.chemicalRemedy}

⚠️ *${scanRes.disclaimer}*`;

        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: 'gemini-3.8-flash (vision)',
        };
        setMessages((prev) => [...prev, aiMsg]);
        speakText(aiText);
      } else {
        // Text/Voice conversational guidance
        const response = await askKrishiAiApi(query, currentLanguage, farmerProfile);
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: response.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: response.source,
        };
        setMessages((prev) => [...prev, aiMsg]);
        speakText(response.reply);
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'ai',
          text: 'ApniKheti AI is currently analyzing data. Please verify your connection or retry.',
          timestamp: 'Now',
          source: 'offline fallback',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    if (isVoiceListening) {
      stopVoiceListening();
    } else {
      startVoiceListening((transcript) => {
        setInputMessage(transcript);
        handleSendMessage(transcript);
      });
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUploadBase64(reader.result as string);
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = [
    { label: '🌦 Rain & Spray Advice', prompt: 'Rain is expected tomorrow. Should I spray pesticide on my wheat today?' },
    { label: '💰 Wheat Mandi Rate', prompt: 'What is today’s wheat market price in Khanna and nearby APMC mandis?' },
    { label: '🚜 50% Machinery Subsidy', prompt: 'What government subsidies are currently open in Punjab for rotary tillers and drones?' },
    { label: '🍂 Yellow Leaf Diagnose', prompt: 'मेरे गेहूं के पौधे के निचले पत्ते पीले हो रहे हैं। इसका क्या कारण और उपचार है?' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-stone-900 border border-stone-700 w-full max-w-4xl h-[90vh] max-h-[820px] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-stone-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                  Krishi AI (कृषि एआई)
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                  Multilingual Companion
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Connected to {farmerProfile.name} • {farmerProfile.landSize} Acres • {farmerProfile.district}
              </p>
            </div>
          </div>

          {/* Quick Actions & Close */}
          <div className="flex items-center gap-2">
            {/* Language Switch Quick Pill */}
            <select
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-stone-800 text-stone-200 text-xs px-2.5 py-1.5 rounded-xl border border-stone-700 focus:outline-none focus:border-emerald-500"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeName} ({l.name})
                </option>
              ))}
            </select>

            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="p-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition text-xs flex items-center gap-1 font-medium"
                title="Mute Speech"
              >
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline">Mute</span>
              </button>
            )}

            <button
              onClick={() => {
                stopSpeaking();
                stopVoiceListening();
                setIsKrishiModalOpen(false);
              }}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-stone-950/60 border-b border-stone-800 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="text-stone-400 flex items-center gap-1 flex-shrink-0 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Quick Ask:
          </span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp.prompt)}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-stone-800 hover:bg-emerald-900/40 text-stone-300 hover:text-emerald-300 border border-stone-700 hover:border-emerald-600/50 transition flex-shrink-0 text-xs font-medium"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Chat History Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-md'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-700 text-white rounded-tr-none'
                    : 'bg-stone-800 border border-stone-700 text-stone-100 rounded-tl-none shadow-sm'
                }`}
              >
                {msg.imageUrl && (
                  <div className="mb-2">
                    <img
                      src={msg.imageUrl}
                      alt="Uploaded crop"
                      className="rounded-lg max-h-48 object-cover border border-stone-600"
                    />
                  </div>
                )}

                <div className="whitespace-pre-line font-sans">{msg.text}</div>

                <div className="mt-2 pt-2 border-t border-stone-700/50 flex items-center justify-between text-[10px] text-stone-400">
                  <span>{msg.timestamp} {msg.source && `• ${msg.source}`}</span>
                  {msg.sender === 'ai' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => speakText(msg.text)}
                        className="hover:text-emerald-400 flex items-center gap-1 transition"
                        title="Listen to response"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{t.listen || 'Listen'}</span>
                      </button>
                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        className="hover:text-emerald-400 transition"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 max-w-[85%] mr-auto items-center text-xs text-stone-400 animate-pulse">
              <div className="w-8 h-8 rounded-xl bg-teal-600/30 text-teal-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-stone-800 rounded-2xl rounded-tl-none border border-stone-700 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Krishi AI is synthesizing agronomic data & market policies...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Voice Wave Animation while Listening */}
        {isVoiceListening && (
          <div className="p-3 bg-emerald-950/80 border-t border-emerald-500/40 flex items-center justify-center gap-3 text-emerald-300 text-xs animate-pulse">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold">{t.speakNow || 'Listening to your farm question... Speak now!'}</span>
            <div className="flex gap-1 h-4 items-center">
              <span className="w-1 bg-emerald-400 h-2 animate-bounce" />
              <span className="w-1 bg-emerald-400 h-4 animate-bounce delay-75" />
              <span className="w-1 bg-emerald-400 h-3 animate-bounce delay-150" />
              <span className="w-1 bg-emerald-400 h-5 animate-bounce delay-100" />
            </div>
            <button
              onClick={stopVoiceListening}
              className="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-700 rounded-lg text-white font-medium text-xs ml-2"
            >
              Done Speaking
            </button>
          </div>
        )}

        {/* Selected Image Preview Bar */}
        {imagePreview && (
          <div className="px-4 py-2 bg-stone-800/90 border-t border-stone-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={imagePreview} alt="Selected preview" className="w-10 h-10 object-cover rounded-lg border border-stone-600" />
              <span className="text-xs text-stone-300">Crop image attached for disease diagnosis</span>
            </div>
            <button
              onClick={() => {
                setImageUploadBase64(null);
                setImagePreview(null);
              }}
              className="text-stone-400 hover:text-rose-400 text-xs"
            >
              Remove
            </button>
          </div>
        )}

        {/* Input Bar: Mic, Camera, Text Input, Send */}
        <div className="p-3 sm:p-4 bg-stone-950 border-t border-stone-800 flex items-center gap-2 sm:gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition flex-shrink-0"
            title={t.uploadCropImage || 'Upload Crop Image'}
          >
            <Camera className="w-5 h-5 text-teal-400" />
          </button>

          <button
            onClick={handleVoiceToggle}
            className={`p-2.5 rounded-xl flex-shrink-0 transition font-medium ${
              isVoiceListening
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white'
            }`}
            title="Toggle Voice Input"
          >
            {isVoiceListening ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-emerald-400" />}
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={
              currentLanguage === 'hi'
                ? 'यहाँ अपनी फसल, मौसम या योजना के बारे में पूछें...'
                : 'Ask about crops, market prices, subsidies, or disease symptoms...'
            }
            className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={(!inputMessage.trim() && !imageUploadBase64) || isLoading}
            className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold flex items-center gap-1.5 transition flex-shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
