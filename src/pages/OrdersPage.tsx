import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const orders = [
  {
    id: 'ORD001',
    date: '2024-03-15',
    status: 'delivered',
    items: [
      { name: 'Garden Tool Set', quantity: 1, price: 599 },
      { name: 'Organic Tomato Seeds', quantity: 2, price: 49 }
    ],
    total: 697
  },
  {
    id: 'ORD002',
    date: '2024-03-10',
    status: 'processing',
    items: [
      { name: 'Premium Potting Mix', quantity: 1, price: 299 },
      { name: 'Self-Watering Planter', quantity: 1, price: 799 }
    ],
    total: 1098
  }
];

const OrdersPage = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-orange-500" />;
      default:
        return <Truck className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="py-32 bg-gradient-to-b from-white to-primary/5 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-8">
          <Package className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Your Orders</h1>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">₹{order.total}</span>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button className="flex-1 btn border border-primary text-primary hover:bg-primary/5">
                  Track Order
                </button>
                <button className="flex-1 btn bg-primary hover:bg-primary-dark text-white">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;