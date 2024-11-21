# Sabz Khushali API Documentation

## Overview
This document provides comprehensive documentation for the Sabz Khushali API, including authentication, endpoints, and data models.

## Authentication
All API requests must include a valid Firebase authentication token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Marketplace API
- GET /api/marketplace/products
- POST /api/marketplace/products
- GET /api/marketplace/farmers
- POST /api/marketplace/orders

### Store API
- GET /api/store/products
- POST /api/store/orders
- GET /api/store/bundles
- POST /api/store/wishlist

### Community API
- GET /api/community/posts
- POST /api/community/posts
- GET /api/community/events
- POST /api/community/events

### Analytics API
- GET /api/analytics/growth
- GET /api/analytics/water-usage
- GET /api/analytics/yield

## Data Models

### Product
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  farmerId: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Order
```typescript
interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
```

[Additional models and documentation...]