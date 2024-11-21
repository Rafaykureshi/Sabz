import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Grid, Sun, Droplets, Wind, Maximize, Sprout } from 'lucide-react';

// Changed Plant to Sprout since Plant is not available in lucide-react
const GardenPlanner = () => {
  // Rest of the component remains the same
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-primary text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sprout className="h-6 w-6" />
          Garden Planner
        </h2>
        {/* Rest of the component remains the same */}
      </div>
      {/* Rest of the component remains the same */}
    </div>
  );
};

export default GardenPlanner;