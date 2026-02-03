/**
 * Common Type Definitions
 */

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';
