export const APP_CONFIG = {
  NAME: 'Next.js Template',
  DESCRIPTION: 'Enterprise Next.js Template',
  VERSION: '1.0.0',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  PROFILE: '/profile',
} as const;

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  TIMEOUT: 10000,
} as const;
