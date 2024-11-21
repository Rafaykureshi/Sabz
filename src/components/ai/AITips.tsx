import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Search, Tag, ThumbsUp } from 'lucide-react';

interface Tip {
  id: string;
  category: string;
  title: string;
  content: string;
  likes: number;
  hasLiked?: boolean;
}

const AITips = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Tips' },
    { id: 'watering', label: 'Watering' },
    { id: 'soil', label: 'Soil Care' },
    { id: 'pests', label: 'Pest Control' },
    { id: 'seasonal', label: 'Seasonal' }
  ];

  const tips: Tip[] = [
    {
      id: '1',
      category: 'watering',
      title: 'Optimal Watering Schedule',
      content: 'Water deeply but less frequently to encourage deep root growth. Most plants prefer morning watering.',
      likes: 24
    },
    {
      id: '2',
      category: 'soil',
      title: 'Soil pH Balance',
      content: 'Maintain soil pH between 6.0-7.0 for most vegetables. Test soil regularly and amend as needed.',
      likes: 18
    },
    // Add more tips
  ];

  const filteredTips = tips.filter(tip => 
    (selectedCategory === 'all' || tip.category === selectedCategory) &&
    (tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     tip.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-primary text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="h-6 w-6" />
          AI Gardening Tips
        </h2>
        <p className="text-white/80">Personalized advice for your garden</p>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tips..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded-lg"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTips.map((tip) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-primary">{tip.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Tag className="h-4 w-4" />
                    <span className="capitalize">{tip.category}</span>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-gray-500 hover:text-primary">
                  <ThumbsUp className={`h-4 w-4 ${tip.hasLiked ? 'fill-current text-primary' : ''}`} />
                  <span>{tip.likes}</span>
                </button>
              </div>
              <p className="text-gray-600">{tip.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AITips;