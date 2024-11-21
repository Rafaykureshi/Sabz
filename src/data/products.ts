export type ProductCategory = 'all' | 'seeds' | 'tools' | 'soil' | 'planters' | 'irrigation';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
}

export const products: Product[] = [
  {
    id: 'seed-1',
    name: 'Organic Tomato Seeds',
    description: 'High-yield, disease-resistant variety',
    price: 49,
    image: 'https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'seeds'
  },
  {
    id: 'seed-2',
    name: 'Mixed Herb Seeds',
    description: 'Collection of essential culinary herbs',
    price: 99,
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'seeds'
  },
  {
    id: 'tool-1',
    name: 'Garden Tool Set',
    description: 'Essential tools for urban gardening',
    price: 599,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'tools'
  },
  {
    id: 'soil-1',
    name: 'Premium Potting Mix',
    description: 'Nutrient-rich soil for container gardens',
    price: 299,
    image: 'https://images.unsplash.com/photo-1521336575822-6da63fb45455?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'soil'
  },
  {
    id: 'planter-1',
    name: 'Self-Watering Planter',
    description: 'Smart planter with water reservoir',
    price: 799,
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'planters'
  },
  {
    id: 'irrigation-1',
    name: 'Drip Irrigation Kit',
    description: 'Water-efficient irrigation system',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'irrigation'
  }
];