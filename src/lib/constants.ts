export const APP_NAME = 'Sabz Khushali';

export const ROUTES = {
  HOME: '/',
  STORE: '/store',
  MARKETPLACE: '/marketplace',
  PROFILE: '/profile',
  ORDERS: '/orders',
  AI: {
    HOME: '/ai',
    CHAT: '/ai/chat',
    ANALYSIS: '/ai/analysis',
    PLANNER: '/ai/planner',
    GROWTH: '/ai/growth',
    TIPS: '/ai/tips',
    AUTOMATION: '/ai/automation'
  }
} as const;

export const FIREBASE_COLLECTIONS = {
  USERS: 'users',
  PRODUCTS: 'products',
  ORDERS: 'orders',
  CART: 'cart',
  FARMERS: 'farmers',
  REVIEWS: 'reviews',
  SCHEDULES: 'schedules',
  AI_RECOMMENDATIONS: 'ai_recommendations',
  AI_ANALYSIS: 'ai_analysis',
  AI_CHAT: 'ai_chat'
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
} as const;

export const DELIVERY_TYPE = {
  DELIVERY: 'delivery',
  PICKUP: 'pickup'
} as const;