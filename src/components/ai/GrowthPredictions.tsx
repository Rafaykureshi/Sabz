import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Sun, Droplets, Thermometer, Calendar } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GrowthPredictions = () => {
  const [selectedPlant, setSelectedPlant] = useState('tomato');
  const [timeRange, setTimeRange] = useState('month');

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Predicted Growth (cm)',
        data: [5, 12, 20, 30],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Actual Growth (cm)',
        data: [4, 10, 18, 28],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Plant Growth Prediction'
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-primary text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sprout className="h-6 w-6" />
          Growth Predictions
        </h2>
        <p className="text-white/80">Track and predict your plants' growth</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-gray-700 mb-2">Select Plant</label>
            <select
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="tomato">Tomato</option>
              <option value="pepper">Pepper</option>
              <option value="lettuce">Lettuce</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="season">Season</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <Line options={options} data={data} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <Sprout className="h-5 w-5" />
              <span className="font-medium">Current Height</span>
            </div>
            <p className="text-2xl font-bold text-green-700">28 cm</p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Droplets className="h-5 w-5" />
              <span className="font-medium">Water Needs</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">250 ml/day</p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-600 mb-2">
              <Sun className="h-5 w-5" />
              <span className="font-medium">Light Needs</span>
            </div>
            <p className="text-2xl font-bold text-yellow-700">6 hrs/day</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 text-purple-600 mb-2">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Time to Harvest</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">45 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthPredictions;