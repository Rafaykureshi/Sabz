import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Droplets, Leaf, Sun } from 'lucide-react';

interface Schedule {
  type: 'watering' | 'fertilizing' | 'pruning' | 'harvesting';
  frequency: string;
  time: string;
  notes: string;
}

const SmartScheduling = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      type: 'watering',
      frequency: 'daily',
      time: '08:00',
      notes: 'Water deeply in the morning'
    },
    {
      type: 'fertilizing',
      frequency: 'monthly',
      time: '10:00',
      notes: 'Use organic fertilizer'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState<Schedule>({
    type: 'watering',
    frequency: 'daily',
    time: '',
    notes: ''
  });

  const getScheduleIcon = (type: Schedule['type']) => {
    switch (type) {
      case 'watering':
        return Droplets;
      case 'fertilizing':
        return Leaf;
      case 'pruning':
        return Sun;
      case 'harvesting':
        return Calendar;
      default:
        return Clock;
    }
  };

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setSchedules([...schedules, newSchedule]);
    setShowAddForm(false);
    setNewSchedule({
      type: 'watering',
      frequency: 'daily',
      time: '',
      notes: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-primary text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          Smart Garden Scheduling
        </h2>
        <p className="text-white/80">Manage your garden care routines</p>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-primary">Active Schedules</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn bg-secondary hover:bg-secondary-dark text-white"
          >
            Add Schedule
          </button>
        </div>

        <div className="space-y-4">
          {schedules.map((schedule, index) => {
            const Icon = getScheduleIcon(schedule.type);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 p-4 rounded-xl flex items-center gap-4"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-primary capitalize">
                    {schedule.type}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="capitalize">{schedule.frequency}</span>
                    <span>at {schedule.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{schedule.notes}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 border-t pt-6"
          >
            <h3 className="text-lg font-semibold text-primary mb-4">
              Add New Schedule
            </h3>
            <form onSubmit={handleAddSchedule} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Type</label>
                <select
                  value={newSchedule.type}
                  onChange={(e) => setNewSchedule({
                    ...newSchedule,
                    type: e.target.value as Schedule['type']
                  })}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="watering">Watering</option>
                  <option value="fertilizing">Fertilizing</option>
                  <option value="pruning">Pruning</option>
                  <option value="harvesting">Harvesting</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Frequency</label>
                <select
                  value={newSchedule.frequency}
                  onChange={(e) => setNewSchedule({
                    ...newSchedule,
                    frequency: e.target.value
                  })}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule({
                    ...newSchedule,
                    time: e.target.value
                  })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Notes</label>
                <textarea
                  value={newSchedule.notes}
                  onChange={(e) => setNewSchedule({
                    ...newSchedule,
                    notes: e.target.value
                  })}
                  className="w-full p-3 border rounded-lg resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 btn border border-primary text-primary hover:bg-primary/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn bg-primary hover:bg-primary-dark text-white"
                >
                  Add Schedule
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SmartScheduling;