// Weather Mock Data
export const currentWeather = {
  temperature: 24,
  humidity: 60,
  windSpeed: 12,
  condition: "Cloudy",
  city: "San Francisco",
  lastUpdated: new Date().toISOString(),
};

export const aiInsights = {
  summary: "High probability of rain in the afternoon. Consider carrying an umbrella if heading out after 2 PM. Temperatures will remain mild throughout the day.",
  comfortLevel: "Pleasant",
  alerts: [
    { type: "rain", message: "Rain expected between 2 PM - 6 PM", severity: "moderate" },
  ],
  recommendations: [
    "Best time for outdoor activities: 9 AM - 12 PM",
    "UV Index: Low - No sun protection needed",
    "Air Quality: Good",
  ],
};

// Generate 24h temperature data
export const temperatureTrend = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  const baseTemp = 20;
  const variation = Math.sin((i - 6) * Math.PI / 12) * 8;
  const noise = (Math.random() - 0.5) * 2;
  return {
    hour: `${hour.toString().padStart(2, "0")}:00`,
    temperature: Math.round((baseTemp + variation + noise) * 10) / 10,
  };
});

// Rain probability data
export const rainProbability = [
  { time: "6 AM", probability: 10 },
  { time: "9 AM", probability: 15 },
  { time: "12 PM", probability: 25 },
  { time: "3 PM", probability: 70 },
  { time: "6 PM", probability: 55 },
  { time: "9 PM", probability: 30 },
];

// Historical weather logs
export const weatherHistory = [
  { id: 1, dateTime: "2024-01-15 08:00", city: "San Francisco", condition: "Sunny", temp: 18, humidity: 55 },
  { id: 2, dateTime: "2024-01-15 12:00", city: "San Francisco", condition: "Partly Cloudy", temp: 22, humidity: 52 },
  { id: 3, dateTime: "2024-01-15 16:00", city: "San Francisco", condition: "Cloudy", temp: 24, humidity: 58 },
  { id: 4, dateTime: "2024-01-15 20:00", city: "San Francisco", condition: "Light Rain", temp: 20, humidity: 72 },
  { id: 5, dateTime: "2024-01-14 08:00", city: "Los Angeles", condition: "Sunny", temp: 21, humidity: 45 },
  { id: 6, dateTime: "2024-01-14 12:00", city: "Los Angeles", condition: "Sunny", temp: 26, humidity: 42 },
  { id: 7, dateTime: "2024-01-14 16:00", city: "Los Angeles", condition: "Sunny", temp: 28, humidity: 40 },
  { id: 8, dateTime: "2024-01-14 20:00", city: "Los Angeles", condition: "Clear", temp: 22, humidity: 48 },
  { id: 9, dateTime: "2024-01-13 08:00", city: "Seattle", condition: "Rainy", temp: 12, humidity: 85 },
  { id: 10, dateTime: "2024-01-13 12:00", city: "Seattle", condition: "Overcast", temp: 14, humidity: 80 },
];

// Users Mock Data
export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  createdAt: string;
}

export const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", createdAt: "2024-01-01" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Editor", createdAt: "2024-01-05" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Viewer", createdAt: "2024-01-10" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "Editor", createdAt: "2024-01-15" },
  { id: "5", name: "Charlie Wilson", email: "charlie@example.com", role: "Viewer", createdAt: "2024-01-20" },
];

// Explorer Mock Data (Pokemon-like)
export interface ExplorerItem {
  id: number;
  name: string;
  type: string;
  description: string;
  stats: {
    power: number;
    speed: number;
    defense: number;
  };
  imageUrl: string;
}

export const explorerItems: ExplorerItem[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Creature ${i + 1}`,
  type: ["Fire", "Water", "Electric", "Grass", "Ice", "Dragon"][i % 6],
  description: `A mysterious creature with unique abilities. Known for its ${["fierce", "calm", "electric", "natural", "cold", "ancient"][i % 6]} nature.`,
  stats: {
    power: Math.floor(Math.random() * 100) + 50,
    speed: Math.floor(Math.random() * 100) + 50,
    defense: Math.floor(Math.random() * 100) + 50,
  },
  imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`,
}));
