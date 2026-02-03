/**
 * Application Constants
 */

export const APP_NAME = 'Flexible Form';
export const APP_DESCRIPTION = 'A flexible form builder application';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const;
