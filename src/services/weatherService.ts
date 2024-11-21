import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  conditions: string;
  timestamp: Date;
}

export const weatherService = {
  async getWeatherData(location: string): Promise<WeatherData | null> {
    const weatherRef = collection(db, 'weather_data');
    const q = query(
      weatherRef,
      where('location', '==', location),
      where('timestamp', '>=', new Date(Date.now() - 3600000)) // Last hour
    );

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return doc.data() as WeatherData;
    }

    // In a real app, you would fetch from a weather API here
    // For now, return mock data
    const mockData: WeatherData = {
      location,
      temperature: 25,
      humidity: 65,
      conditions: 'Partly Cloudy',
      timestamp: new Date()
    };

    await addDoc(weatherRef, mockData);
    return mockData;
  }
};