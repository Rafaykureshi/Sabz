import { useState } from 'react';
import { X, Sliders, MapPin, Star, Clock, Leaf, Award, Truck } from 'lucide-react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const MarketplaceFilters = ({ onClose, onApplyFilters }: Props) => {
  const [radius, setRadius] = useState(5);
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [deliveryOptions, setDeliveryOptions] = useState<string[]>([]);
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);

  const categoryOptions = [
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'herbs', label: 'Herbs' },
    { value: 'microgreens', label: 'Microgreens' },
    { value: 'seasonal', label: 'Seasonal' },
    { value: 'exotic', label: 'Exotic' }
  ];

  const handleApplyFilters = () => {
    onApplyFilters({
      radius,
      categories,
      priceRange,
      rating,
      availability,
      certifications,
      deliveryOptions,
      deliveryDate
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-primary">Advanced Filters</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <label className="block text-gray-700 mb-2">Categories</label>
          <Select
            isMulti
            options={categoryOptions}
            onChange={(selected) => setCategories(selected.map(s => s.value))}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        {/* Delivery Date */}
        <div>
          <label className="block text-gray-700 mb-2">Preferred Delivery Date</label>
          <DatePicker
            selected={deliveryDate}
            onChange={(date) => setDeliveryDate(date)}
            minDate={new Date()}
            className="w-full p-2 border rounded-lg"
            placeholderText="Select delivery date"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-gray-700 mb-2">Price Range (₹)</label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-secondary"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-gray-700 mb-2">Minimum Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`p-2 rounded-lg ${
                  rating >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                <Star className="h-5 w-5 fill-current" />
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              setRadius(5);
              setCategories([]);
              setPriceRange([0, 1000]);
              setRating(0);
              setAvailability([]);
              setCertifications([]);
              setDeliveryOptions([]);
              setDeliveryDate(null);
            }}
            className="flex-1 btn border border-primary text-primary hover:bg-primary/5"
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilters}
            className="flex-1 btn bg-primary hover:bg-primary-dark text-white"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceFilters;