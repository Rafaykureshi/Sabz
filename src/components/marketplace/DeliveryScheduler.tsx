import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Truck } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format, isAfter, isBefore, setHours, setMinutes } from 'date-fns';

interface Props {
  farmerId: string;
  onSchedule: (details: ScheduleDetails) => void;
}

interface ScheduleDetails {
  date: Date;
  time: string;
  type: 'delivery' | 'pickup';
  address?: string;
  specialInstructions?: string;
}

const DeliveryScheduler = ({ farmerId, onSchedule }: Props) => {
  const [scheduleType, setScheduleType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [address, setAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const minDate = new Date();
  const maxDate = addDays(new Date(), 14);

  const timeSlots = [
    '09:00 - 11:00',
    '11:00 - 13:00',
    '14:00 - 16:00',
    '16:00 - 18:00'
  ];

  const isTimeSlotAvailable = (slot: string) => {
    if (!selectedDate) return true;
    
    const [startTime] = slot.split(' - ');
    const [hours, minutes] = startTime.split(':').map(Number);
    const slotTime = setHours(setMinutes(selectedDate, minutes), hours);
    
    // Disable past time slots for today
    if (format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')) {
      return isAfter(slotTime, new Date());
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    onSchedule({
      date: selectedDate,
      time: selectedTime,
      type: scheduleType,
      address: scheduleType === 'delivery' ? address : undefined,
      specialInstructions: specialInstructions.trim() || undefined
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h3 className="text-xl font-semibold text-primary mb-6">Schedule Delivery/Pickup</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Delivery Type */}
        <div>
          <label className="block text-gray-700 mb-4">Preferred Method</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setScheduleType('delivery')}
              className={`p-4 rounded-xl border-2 transition-all ${
                scheduleType === 'delivery'
                  ? 'border-secondary bg-secondary/10'
                  : 'border-gray-200'
              }`}
            >
              <Truck className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <span className="block font-medium">Home Delivery</span>
            </button>
            <button
              type="button"
              onClick={() => setScheduleType('pickup')}
              className={`p-4 rounded-xl border-2 transition-all ${
                scheduleType === 'pickup'
                  ? 'border-secondary bg-secondary/10'
                  : 'border-gray-200'
              }`}
            >
              <MapPin className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <span className="block font-medium">Store Pickup</span>
            </button>
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <label className="block text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Select Date
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat="MMMM d, yyyy"
            className="w-full p-3 border rounded-lg"
            placeholderText="Choose delivery date"
            required
          />
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-gray-700 mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Select Time Slot
          </label>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                disabled={!isTimeSlotAvailable(slot)}
                onClick={() => setSelectedTime(slot)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTime === slot
                    ? 'border-secondary bg-secondary/10'
                    : 'border-gray-200'
                } ${
                  !isTimeSlotAvailable(slot)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Address */}
        {scheduleType === 'delivery' && (
          <div>
            <label className="block text-gray-700 mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Delivery Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border rounded-lg resize-none"
              rows={3}
              placeholder="Enter your delivery address"
              required
            />
          </div>
        )}

        {/* Special Instructions */}
        <div>
          <label className="block text-gray-700 mb-2">
            Special Instructions (Optional)
          </label>
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            className="w-full p-3 border rounded-lg resize-none"
            rows={2}
            placeholder="Any special instructions for delivery/pickup"
          />
        </div>

        <button
          type="submit"
          className="w-full btn bg-primary hover:bg-primary-dark text-white"
        >
          Schedule {scheduleType === 'delivery' ? 'Delivery' : 'Pickup'}
        </button>
      </form>
    </motion.div>
  );
};

export default DeliveryScheduler;