import { BackgroundVideo } from '../types';

export const AGRICULTURE_VIDEOS: BackgroundVideo[] = [
  {
    id: 1,
    title: "Lush Green Wheat Fields Under Morning Sun",
    subtitle: "Vibrant golden-hour winds caressing growing winter wheat in Punjab",
    url: "https://assets.mixkit.co/videos/preview/mixkit-wheat-field-in-the-wind-41662-large.mp4",
    poster: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
    tags: ["Wheat", "Morning Sun", "North India", "Green Field"],
  },
  {
    id: 2,
    title: "Modern Combine Harvester Gathering Golden Grains",
    subtitle: "Precision agricultural machinery harvesting ripe grain fields at twilight",
    url: "https://assets.mixkit.co/videos/preview/mixkit-combine-harvester-harvesting-wheat-41665-large.mp4",
    poster: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1920&q=80",
    tags: ["Harvesting", "Machinery", "Mechanization", "Golden Hour"],
  },
  {
    id: 3,
    title: "High-Tech Precision Agricultural Drone Survey",
    subtitle: "Next-generation multispectral agricultural drone mapping crop health",
    url: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-farm-landscape-41661-large.mp4",
    poster: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1920&q=80",
    tags: ["AgriTech", "Drone", "Precision Farming", "Aerial"],
  },
  {
    id: 4,
    title: "Terraced Emerald Green Rice Paddies & Natural Dew",
    subtitle: "Traditional sustainable terrace farming in morning mist and water channels",
    url: "https://assets.mixkit.co/videos/preview/mixkit-countryside-landscape-with-agricultural-fields-41664-large.mp4",
    poster: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=1920&q=80",
    tags: ["Paddy", "Terraces", "Water Irrigation", "Sustainable"],
  },
  {
    id: 5,
    title: "Automated Climate-Controlled Smart Greenhouse",
    subtitle: "Hydroponics, drip irrigation, and micro-climate control for high-yield crops",
    url: "https://assets.mixkit.co/videos/preview/mixkit-fields-of-a-farm-from-above-41660-large.mp4",
    poster: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1920&q=80",
    tags: ["Greenhouse", "Horticulture", "Drip Irrigation", "Modern"],
  },
  {
    id: 6,
    title: "Blooming Golden Mustard Fields in Rural Heartland",
    subtitle: "Rich blooming oilseeds under clear azure sky, symbol of Indian harvest",
    url: "https://assets.mixkit.co/videos/preview/mixkit-farm-field-landscape-seen-from-above-41663-large.mp4",
    poster: "https://images.unsplash.com/photo-1508873696983-2df5703bc225?auto=format&fit=crop&w=1920&q=80",
    tags: ["Mustard", "Flowering", "Rural India", "Biodiversity"],
  },
  {
    id: 7,
    title: "Ripe Orchard Groves & Drip Fertigation",
    subtitle: "Sustainable fruit production with solar-powered drip micro-irrigation",
    url: "https://assets.mixkit.co/videos/preview/mixkit-wheat-field-in-the-wind-41662-large.mp4",
    poster: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1920&q=80",
    tags: ["Orchard", "Solar", "Micro-Irrigation", "Harvest"],
  },
  {
    id: 8,
    title: "Healthy Organic Black Soil & Sprouting Seedlings",
    subtitle: "Rich microbial soil matrix nurturing the next generation of crops",
    url: "https://assets.mixkit.co/videos/preview/mixkit-combine-harvester-harvesting-wheat-41665-large.mp4",
    poster: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1920&q=80",
    tags: ["Soil Health", "Organic", "Regenerative", "Seedling"],
  },
];

// Returns active video based on 7-day calendar intervals
export function getActiveVideoForCurrentWeek(): {
  video: BackgroundVideo;
  index: number;
  daysRemainingInCycle: number;
  rotationCycleDays: number;
} {
  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const currentCycleNumber = Math.floor(now / ONE_WEEK_MS);
  const index = currentCycleNumber % AGRICULTURE_VIDEOS.length;
  
  const currentWeekStart = currentCycleNumber * ONE_WEEK_MS;
  const nextRotationTime = currentWeekStart + ONE_WEEK_MS;
  const daysRemainingInCycle = Math.max(1, Math.ceil((nextRotationTime - now) / (24 * 60 * 60 * 1000)));

  return {
    video: AGRICULTURE_VIDEOS[index],
    index,
    daysRemainingInCycle,
    rotationCycleDays: 7,
  };
}
