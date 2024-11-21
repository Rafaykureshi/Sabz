import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Apple, Brain, Battery, Leaf, Sprout, ArrowRight, Activity, TreePine, Flower2 } from 'lucide-react';

interface HealthGoal {
  id: string;
  icon: any;
  title: string;
  description: string;
}

const healthGoals: HealthGoal[] = [
  {
    id: 'immunity',
    icon: Heart,
    title: 'Boost Immunity',
    description: 'Plants rich in antioxidants and vitamins'
  },
  {
    id: 'energy',
    icon: Battery,
    title: 'Energy & Vitality',
    description: 'Nutrient-dense vegetables and herbs'
  },
  {
    id: 'brain',
    icon: Brain,
    title: 'Brain Health',
    description: 'Herbs known for cognitive benefits'
  },
  {
    id: 'fitness',
    icon: Activity,
    title: 'Fitness Support',
    description: 'Plants supporting active lifestyle'
  }
];

const dietaryPreferences = [
  { id: 'vegan', label: 'Vegan' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'keto', label: 'Keto' },
  { id: 'paleo', label: 'Paleo' },
  { id: 'mediterranean', label: 'Mediterranean' }
];

const HealthyGrowing = () => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedDiet, setSelectedDiet] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-primary mb-6">Customize Your Health Garden</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Select Your Health Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => {
                    setSelectedGoals(prev =>
                      prev.includes(goal.id)
                        ? prev.filter(id => id !== goal.id)
                        : [...prev, goal.id]
                    );
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedGoals.includes(goal.id)
                      ? 'border-secondary bg-secondary/10'
                      : 'border-gray-200 hover:border-secondary/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      selectedGoals.includes(goal.id)
                        ? 'bg-secondary/20'
                        : 'bg-gray-100'
                    }`}>
                      <goal.icon className={`h-6 w-6 ${
                        selectedGoals.includes(goal.id)
                          ? 'text-secondary'
                          : 'text-gray-500'
                      }`} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-primary">{goal.title}</h4>
                      <p className="text-sm text-gray-600">{goal.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Dietary Preferences</h3>
            <div className="flex flex-wrap gap-3">
              {dietaryPreferences.map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => setSelectedDiet(diet.id)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedDiet === diet.id
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowRecommendations(true)}
            className="w-full btn bg-primary hover:bg-primary-dark text-white"
          >
            Get Personalized Recommendations
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </div>

        {showRecommendations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-secondary/10 rounded-lg"
          >
            <h3 className="text-xl font-bold text-primary mb-4">Your Personalized Garden Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold text-primary mb-2">Recommended Plants</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-secondary" />
                    <span>Spinach (Rich in Iron)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-secondary" />
                    <span>Holy Basil (Immunity Booster)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <TreePine className="h-5 w-5 text-secondary" />
                    <span>Cherry Tomatoes (Antioxidants)</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-semibold text-primary mb-2">Health Benefits</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-impact-health" />
                    <span>Improved Immunity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-sdg-purple" />
                    <span>Enhanced Mental Clarity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Battery className="h-5 w-5 text-impact-economic" />
                    <span>Increased Energy Levels</span>
                  </li>
                </ul>
              </div>
            </div>

            <button className="w-full btn bg-secondary hover:bg-secondary-dark text-white mt-6">
              Order Your Health Garden Package
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HealthyGrowing;