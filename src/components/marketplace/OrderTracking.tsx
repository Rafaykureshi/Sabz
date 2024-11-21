import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Order } from '../../types/models';
import { getOrder } from '../../services/orderService';
import LoadingSpinner from '../LoadingSpinner';

interface Props {
  orderId: string;
}

const OrderTracking = ({ orderId }: Props) => {
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const orderData = await getOrder(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error('Error loading order:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  if (loading) {
    return <LoadingSpinner className="mx-auto" />;
  }

  if (!order) {
    return (
      <div className="text-center text-gray-600">
        Order not found
      </div>
    );
  }

  const steps = [
    { id: 'pending', label: 'Order Placed', icon: Package },
    { id: 'processing', label: 'Processing', icon: Clock },
    { id: 'shipping', label: 'Out for Delivery', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === order.status);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-primary mb-6">Order Status</h3>

      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
        
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  isCompleted ? 'text-primary' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-primary text-white'
                      : 'bg-gray-200'
                  } ${
                    isCurrent ? 'ring-4 ring-primary/20' : ''
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="mt-2 text-sm font-medium">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h4 className="font-semibold mb-2">Order Details</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.total}</p>
          <p>Shipping Address: {order.shippingAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;