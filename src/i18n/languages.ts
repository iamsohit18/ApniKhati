import { Language } from '../types';

export const SUPPORTED_LANGUAGES: Language[] = [
  // Indian Languages
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', isIndian: true },
  { code: 'en', name: 'English', nativeName: 'English', isIndian: false },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', isIndian: true },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', isIndian: true },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', isIndian: true },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', isIndian: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', isIndian: true },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', isIndian: true },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', isIndian: true, dir: 'rtl' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', isIndian: true },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', isIndian: true },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', isIndian: true },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', isIndian: true },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी', isIndian: true },
  { code: 'bgc', name: 'Haryanvi', nativeName: 'हरियाणवी', isIndian: true },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', isIndian: true },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', isIndian: true },
  { code: 'ks', name: 'Kashmiri', nativeName: 'कॉशुर', isIndian: true },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', isIndian: true, dir: 'rtl' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', isIndian: true },

  // Global Languages
  { code: 'es', name: 'Spanish', nativeName: 'Español', isIndian: false },
  { code: 'fr', name: 'French', nativeName: 'Français', isIndian: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', isIndian: false },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', isIndian: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', isIndian: false, dir: 'rtl' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', isIndian: false },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', isIndian: false },
  { code: 'ko', name: 'Korean', nativeName: '한국어', isIndian: false },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', isIndian: false },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', isIndian: false },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', isIndian: false },
];

export interface TranslationDictionary {
  brandTagline: string;
  askKrishiAi: string;
  whatShouldIDoToday: string;
  todayFarmPlan: string;
  services: string;
  liveMarket: string;
  agriBenefits: string;
  equipmentRental: string;
  coldStorage: string;
  soilTesting: string;
  cropScanner: string;
  farmerDashboard: string;
  talkToExpert: string;
  community: string;
  listen: string;
  speakAgain: string;
  speakNow: string;
  changeLanguage: string;
  uploadCropImage: string;
  whereShouldISell: string;
  verifiedBuyer: string;
  amIEligible: string;
  checkEligibility: string;
  requiredDocuments: string[];
  disclaimerDemo: string;
}

export const TRANSLATIONS: Record<string, Partial<TranslationDictionary>> = {
  en: {
    brandTagline: "One Farmer. One AI. One Agricultural Ecosystem.",
    askKrishiAi: "Ask Krishi AI",
    whatShouldIDoToday: "What Should I Do Today?",
    todayFarmPlan: "Today's Farm Plan",
    services: "Services",
    liveMarket: "Live Market",
    agriBenefits: "Agri Benefits & Policies",
    equipmentRental: "Equipment Rental",
    coldStorage: "Warehouse & Cold Storage",
    soilTesting: "Soil & Crop Testing",
    cropScanner: "Scan My Crop",
    farmerDashboard: "Farmer Dashboard",
    talkToExpert: "Talk to an Expert",
    community: "Kisan Chopal Community",
    listen: "Listen",
    speakAgain: "Speak Again",
    speakNow: "Tap & Speak to Krishi AI",
    changeLanguage: "Language",
    uploadCropImage: "Upload Crop Image",
    whereShouldISell: "Where Should I Sell?",
    verifiedBuyer: "Verified Buyer",
    amIEligible: "Am I Eligible?",
    checkEligibility: "Check Eligibility",
    disclaimerDemo: "Demo Data — Connect official APMC / USDA API to enable live information.",
  },
  hi: {
    brandTagline: "एक किसान। एक एआई। एक समग्र कृषि पारिस्थितिकी तंत्र।",
    askKrishiAi: "कृषि एआई से पूछें",
    whatShouldIDoToday: "आज मुझे क्या करना चाहिए?",
    todayFarmPlan: "आज की कृषि कार्ययोजना",
    services: "कृषि सेवाएँ",
    liveMarket: "मंडी के लाइव भाव",
    agriBenefits: "कृषि योजनाएँ व सब्सिडी",
    equipmentRental: "कृषि यंत्र किराया",
    coldStorage: "गोदाम व कोल्ड स्टोरेज",
    soilTesting: "मिट्टी व फसल परीक्षण",
    cropScanner: "फसल रोग स्कैनर",
    farmerDashboard: "किसान डैशबोर्ड",
    talkToExpert: "कृषि विशेषज्ञ से बात करें",
    community: "किसान चौपाल",
    listen: "सुनें (बोलकर बताएं)",
    speakAgain: "फिर से बोलें",
    speakNow: "माइक दबाकर बोलें",
    changeLanguage: "भाषा बदलें",
    uploadCropImage: "फसल का फोटो अपलोड करें",
    whereShouldISell: "मुझे कहाँ बेचना चाहिए?",
    verifiedBuyer: "सत्यापित खरीदार",
    amIEligible: "क्या मैं पात्र हूँ?",
    checkEligibility: "पात्रता जांचें",
    disclaimerDemo: "डेमो डेटा — लाइव जानकारी हेतु सरकारी एपीआई कनेक्ट करें।",
  },
  pa: {
    brandTagline: "ਇੱਕ ਕਿਸਾਨ। ਇੱਕ ਏਆਈ। ਇੱਕ ਪੂਰਾ ਖੇਤੀਬਾੜੀ ਸਿਸਟਮ।",
    askKrishiAi: "ਕ੍ਰਿਸ਼ੀ ਏਆਈ ਨੂੰ ਪੁੱਛੋ",
    whatShouldIDoToday: "ਅੱਜ ਮੈਨੂੰ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?",
    todayFarmPlan: "ਅੱਜ ਦੀ ਖੇਤ ਯੋਜਨਾ",
    services: "ਸੇਵਾਵਾਂ",
    liveMarket: "ਲਾਈਵ ਮੰਡੀ ਭਾਅ",
    agriBenefits: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਤੇ ਸਬਸਿਡੀਆਂ",
    equipmentRental: "ਮਸ਼ੀਨਰੀ ਕਿਰਾਇਆ",
    coldStorage: "ਕੋਲਡ ਸਟੋਰੇਜ ਤੇ ਗੁਦਾਮ",
    soilTesting: "ਮਿੱਟੀ ਤੇ ਫਸਲ ਟੈਸਟਿੰਗ",
    cropScanner: "ਫਸਲ ਬਿਮਾਰੀ ਸਕੈਨਰ",
    farmerDashboard: "ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ",
    talkToExpert: "ਮਾਹਿਰ ਨਾਲ ਗੱਲ ਕਰੋ",
    community: "ਕਿਸਾਨ ਚੌਪਾਲ",
    listen: "ਸੁਣੋ",
    speakAgain: "ਦੁਬਾਰਾ ਬੋਲੋ",
    speakNow: "ਬੋਲਣ ਲਈ ਟੈਪ ਕਰੋ",
    changeLanguage: "ਭਾਸ਼ਾ",
    uploadCropImage: "ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ",
    whereShouldISell: "ਮੈਂ ਕਿੱਥੇ ਵੇਚਾਂ?",
    verifiedBuyer: "ਪ੍ਰਮਾਣਿਤ ਖਰੀਦਦਾਰ",
    amIEligible: "ਕੀ ਮੈਂ ਯੋਗ ਹਾਂ?",
    checkEligibility: "ਯੋਗਤਾ ਚੈੱਕ ਕਰੋ",
    disclaimerDemo: "ਡੈਮੋ ਡਾਟਾ — ਲਾਈਵ ਜਾਣਕਾਰੀ ਲਈ ਅਧਿਕਾਰਤ API ਕਨੈਕਟ ਕਰੋ।",
  },
  es: {
    brandTagline: "Un Agricultor. Una IA. Un Ecosistema Agrícola Global.",
    askKrishiAi: "Preguntar a Krishi IA",
    whatShouldIDoToday: "¿Qué debo hacer hoy?",
    todayFarmPlan: "Plan de Campo de Hoy",
    services: "Servicios",
    liveMarket: "Mercado Agrícola",
    agriBenefits: "Subsidios y Políticas",
    equipmentRental: "Alquiler de Maquinaria",
    coldStorage: "Almacenamiento y Frigoríficos",
    soilTesting: "Análisis de Suelo",
    cropScanner: "Escanear Cultivo",
    farmerDashboard: "Panel del Agricultor",
    talkToExpert: "Consultar a un Experto",
    community: "Comunidad Agrícola",
    listen: "Escuchar",
    speakAgain: "Hablar de nuevo",
    speakNow: "Presiona para hablar",
    changeLanguage: "Idioma",
    uploadCropImage: "Subir Foto del Cultivo",
    whereShouldISell: "¿Dónde debería vender?",
    verifiedBuyer: "Comprador Verificado",
    amIEligible: "¿Soy elegible?",
    checkEligibility: "Verificar Elegibilidad",
    disclaimerDemo: "Datos de Demostración — Conecte API oficial para datos en vivo.",
  },
};

export function getTranslation(langCode: string): TranslationDictionary {
  const base = TRANSLATIONS.en as TranslationDictionary;
  const target = TRANSLATIONS[langCode] || {};
  return { ...base, ...target };
}
