/**
 * Application Configuration
 * Centralized configuration for the application
 */

export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Flexible Form',
    environment: process.env.NODE_ENV || 'development',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
  },
} as const;
