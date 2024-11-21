import { db } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { FIREBASE_COLLECTIONS } from '../lib/constants';

interface PlantRecommendation {
  name: string;
  confidence: number;
  requirements: {
    sunlight: string;
    water: string;
    soil: string;
    space: string;
  };
  benefits: string[];
  companionPlants: string[];
}

interface GardenPlan {
  layout: string;
  plants: Array<{
    name: string;
    quantity: number;
    location: string;
  }>;
  schedule: Array<{
    task: string;
    frequency: string;
    details: string;
  }>;
}

export const aiService = {
  async getPlantRecommendations(
    space: number,
    sunlight: string,
    climate: string
  ): Promise<PlantRecommendation[]> {
    // This will be replaced with actual AI model integration
    const recommendationsRef = collection(db, FIREBASE_COLLECTIONS.AI_RECOMMENDATIONS);
    const q = query(
      recommendationsRef,
      where('space', '<=', space),
      where('sunlight', '==', sunlight)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as PlantRecommendation);
  },

  async generateGardenPlan(
    space: number,
    preferences: string[],
    constraints: any
  ): Promise<GardenPlan> {
    // This will be replaced with actual AI model integration
    const defaultPlan: GardenPlan = {
      layout: 'grid',
      plants: [
        { name: 'Tomatoes', quantity: 4, location: 'north' },
        { name: 'Basil', quantity: 6, location: 'center' },
        { name: 'Lettuce', quantity: 8, location: 'south' }
      ],
      schedule: [
        {
          task: 'Watering',
          frequency: 'daily',
          details: 'Morning watering recommended'
        },
        {
          task: 'Fertilizing',
          frequency: 'monthly',
          details: 'Use organic compost'
        }
      ]
    };

    return defaultPlan;
  },

  async analyzePlantHealth(imageUrl: string): Promise<{
    health: number;
    issues: string[];
    recommendations: string[];
  }> {
    // This will be replaced with actual AI model integration
    return {
      health: 0.85,
      issues: ['Minor leaf discoloration'],
      recommendations: ['Adjust watering schedule', 'Check soil pH']
    };
  },

  async getChatResponse(message: string): Promise<{
    response: string;
    suggestions: string[];
  }> {
    // This will be replaced with actual AI model integration
    return {
      response: "Based on your garden's conditions, I recommend watering your tomatoes every morning and ensuring they get at least 6 hours of direct sunlight.",
      suggestions: [
        "Tell me more about your garden setup",
        "What issues are you facing?",
        "Would you like care tips for specific plants?"
      ]
    };
  }
};