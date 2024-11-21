// Re-export all types from their respective files
export * from './models';
export * from './marketplace';
export * from './auth';

// Common types used across the application
export type Status = 'idle' | 'loading' | 'success' | 'error';

export type SortDirection = 'asc' | 'desc';

export type ViewMode = 'grid' | 'list' | 'map';

export interface PaginationParams {
  page: number;
  limit: number;
  cursor?: string;
}

export interface FilterParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
}