import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, AlertTriangle, Plus, Minus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { inventoryService } from '../../services/inventoryService';
import LoadingSpinner from '../LoadingSpinner';

interface InventoryItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  lastRestocked: Date;
}

const InventoryManager = () => {
  const { user } = useAuth();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const loadInventory = async () => {
      if (!user) return;
      try {
        const items = await inventoryService.getInventory(user.uid);
        setInventory(items);
      } catch (error) {
        console.error('Error loading inventory:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, [user]);

  const handleUpdateStock = async (itemId: string, quantity: number, type: 'in' | 'out') => {
    try {
      await inventoryService.updateStock(itemId, quantity, type);
      // Refresh inventory
      const updatedInventory = await inventoryService.getInventory(user!.uid);
      setInventory(updatedInventory);
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner className="mx-auto" />;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary">Inventory Management</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn bg-primary hover:bg-primary-dark text-white"
        >
          Add Product
        </button>
      </div>

      <div className="space-y-4">
        {inventory.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-600">
                  Last restocked: {new Date(item.lastRestocked).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStock(item.id, 1, 'out')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateStock(item.id, 1, 'in')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {item.quantity <= item.minQuantity && (
                  <div className="text-yellow-500 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">Low Stock</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InventoryManager;