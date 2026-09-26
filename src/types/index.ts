export type UserRole = 
  | 'FARMER' 
  | 'BUYER' 
  | 'EQUIPMENT_OWNER' 
  | 'STORAGE_PROVIDER' 
  | 'EXPERT' 
  | 'FIELD_AGENT' 
  | 'ADMIN';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  isIndian: boolean;
  dir?: 'ltr' | 'rtl';
}

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  country: string;
  state: string;
  district: string;
  village: string;
  landSize: number; // in Acres
  landUnit: 'Acres' | 'Hectares' | 'Bigha';
  crops: {
    name: string;
    variety: string;
    stage: 'Sowing' | 'Germination' | 'Tillering' | 'Flowering' | 'Grain Filling' | 'Harvesting';
    acreage: number;
    sowingDate: string;
  }[];
  soilType: string;
  soilPh: number;
  irrigationMethod: 'Drip' | 'Canal' | 'Tube-well' | 'Sprinkler' | 'Rainfed';
  farmingMethod: 'Conventional' | 'Organic' | 'Natural (ZBNF)' | 'Precision Hydroponics' | 'Integrated';
  farmType: 'Smallholder' | 'Marginal' | 'Commercial' | 'FPO Cooperative';
  equipmentOwned: string[];
  storageNeedsQuintals: number;
  previousCrops: string[];
}

export interface BackgroundVideo {
  id: number;
  title: string;
  subtitle: string;
  url: string;
  poster: string;
  tags: string[];
}

export interface MarketPrice {
  id: string;
  crop: string;
  variety: string;
  mandi: string;
  district: string;
  state: string;
  country: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number; // average/current trading price
  priceUnit: '₹/Quintal' | '$/Bushel' | '€/Tonne';
  trend: 'UP' | 'DOWN' | 'STABLE';
  changePercent: number;
  lastUpdated: string;
  distanceKm: number;
  transportCostEstimate: number;
  isLiveApi: boolean;
}

export interface EquipmentListing {
  id: string;
  title: string;
  category: 'Tractor' | 'Harvester' | 'Rotavator' | 'Seeder' | 'Sprayer' | 'Drone' | 'Solar Pump' | 'Thresher';
  model: string;
  providerName: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  dailyRate: number;
  currency: string;
  location: string;
  distanceKm: number;
  availableNow: boolean;
  image: string;
  specs: string[];
  operatorIncluded: boolean;
}

export interface StorageFacility {
  id: string;
  name: string;
  type: 'Cold Storage' | 'Grain Silo' | 'Dry Warehouse' | 'Controlled Atmosphere';
  totalCapacityMT: number;
  availableCapacityMT: number;
  monthlyRatePerMT: number;
  temperatureCelsius: string;
  humidityLevel: string;
  location: string;
  distanceKm: number;
  isVerified: boolean;
  rating: number;
  image: string;
  suitableCrops: string[];
  certifications: string[];
}

export interface BuyerProfile {
  id: string;
  name: string;
  organization: string;
  type: 'Wholesaler' | 'Food Processor' | 'Exporter' | 'Retail Supermarket' | 'Institutional Buyer';
  verified: boolean;
  rating: number;
  location: string;
  activeRequirements: {
    crop: string;
    variety: string;
    quantityMT: number;
    targetPricePerQ: number;
    qualityGrade: string;
  }[];
  phone: string;
  avatar: string;
}

export interface SoilTestRequest {
  id: string;
  farmerId: string;
  farmerName: string;
  fieldLocation: string;
  cropIntended: string;
  status: 'ASSIGNED' | 'ACCEPTED' | 'ON_THE_WAY' | 'COLLECTED' | 'SUBMITTED_TO_LAB' | 'COMPLETED';
  agentName: string;
  appointmentDate: string;
  report?: SoilHealthReport;
}

export interface SoilHealthReport {
  sampleId: string;
  collectionDate: string;
  labName: string;
  ph: number;
  organicCarbonPercent: number;
  nitrogenKgHa: number;
  phosphorusKgHa: number;
  potassiumKgHa: number;
  electricalConductivity: number;
  zincPpm: number;
  statusRating: 'EXCELLENT' | 'MODERATE' | 'DEFICIENT';
  aiRecommendations: string[];
}

export interface AgriScheme {
  id: string;
  name: string;
  shortName: string;
  category: 'Crop Support' | 'Equipment Subsidies' | 'Irrigation Support' | 'Solar Agriculture' | 'Cold Storage' | 'Organic Farming' | 'Credit & Insurance' | 'Global Grant';
  country: string;
  region: string; // State or "All India" or "Federal"
  authority: string;
  maxBenefit: string;
  eligibilitySummary: string;
  deadline: string;
  status: 'ACTIVE' | 'UPDATED' | 'CLOSED' | 'VERIFICATION_PENDING';
  officialSourceUrl: string;
  lastVerifiedDate: string;
  description: string;
  requiredDocuments: string[];
  farmerTypesSupported: string[];
  cropsApplicable: string[];
  isGlobal: boolean;
}

export interface PolicyAlert {
  id: string;
  title: string;
  type: 'NEW_SCHEME' | 'SUBSIDY_UPDATE' | 'DEADLINE_ALERT' | 'POLICY_CHANGE';
  country: string;
  region: string;
  publishedDate: string;
  effectiveDate: string;
  deadline: string;
  summary: string;
  whoIsAffected: string;
  officialSource: string;
  lastVerified: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  rainfallProbability: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  soilMoistureEstimate: number;
  forecast: {
    day: string;
    high: number;
    low: number;
    rainProb: number;
    icon: string;
  }[];
  alerts: {
    type: 'RAIN' | 'HEAT' | 'HAIL' | 'FROST';
    headline: string;
    advice: string;
    urgency: 'HIGH' | 'MODERATE' | 'LOW';
  }[];
}

export interface CropScanResult {
  possibleIssue: string;
  crop: string;
  confidence: string;
  severity: string;
  symptoms: string[];
  immediateSteps: string[];
  prevention: string[];
  biologicalRemedy: string;
  chemicalRemedy: string;
  disclaimer: string;
}

export interface FarmDiaryEntry {
  id: string;
  date: string;
  crop: string;
  activity: 'Sowing' | 'Irrigation' | 'Fertilizer' | 'Pest Control' | 'Weeding' | 'Harvesting' | 'Sale';
  details: string;
  expense: number;
  revenue?: number;
  notes: string;
}

export interface ExpertConsultant {
  id: string;
  name: string;
  title: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  rating: number;
  consultationsDone: number;
  avatar: string;
  languages: string[];
  consultationFee: number;
  isOnline: boolean;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorLocation: string;
  authorRole: 'FARMER' | 'EXPERT';
  timestamp: string;
  title: string;
  content: string;
  cropTag: string;
  imageUrl?: string;
  upvotes: number;
  repliesCount: number;
  expertAnswer?: {
    expertName: string;
    expertTitle: string;
    answer: string;
    verified: boolean;
  };
}
