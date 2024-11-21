import { Routes, Route } from 'react-router-dom';
import AIHome from '../components/ai/AIHome';
import AIChat from '../components/ai/AIChat';
import PlantAnalysis from '../components/ai/PlantAnalysis';
import GardenPlanner from '../components/ai/GardenPlanner';
import SmartScheduling from '../components/ai/SmartScheduling';
import GrowthPredictions from '../components/ai/GrowthPredictions';
import AITips from '../components/ai/AITips';

const AIPage = () => {
  return (
    <div className="py-32 min-h-screen bg-gradient-to-b from-white to-primary/5">
      <div className="max-w-7xl mx-auto px-6">
        <Routes>
          <Route index element={<AIHome />} />
          <Route path="chat" element={<AIChat />} />
          <Route path="analysis" element={<PlantAnalysis />} />
          <Route path="planner" element={<GardenPlanner />} />
          <Route path="scheduling" element={<SmartScheduling />} />
          <Route path="growth" element={<GrowthPredictions />} />
          <Route path="tips" element={<AITips />} />
        </Routes>
      </div>
    </div>
  );
};

export default AIPage;