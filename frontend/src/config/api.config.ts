

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK === 'true' || import.meta.env.VITE_USE_MOCK === undefined;

export const MOCK_DELAY = 400; // ms delay to simulate network latency

export const ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_ME: '/auth/me',

  // Users
  USERS: '/users',
  USER_BY_ID: (id: string) => `/users/${id}`,

  // Destinations
  DESTINATIONS: '/destinations',
  DESTINATION_BY_ID: (id: number) => `/destinations/${id}`,

  // Tours
  TOURS: '/tours',
  TOUR_BY_ID: (id: string) => `/tours/${id}`,
  TOURS_BY_DESTINATION: (destId: number) => `/tours/destination/${destId}`,

  // Bookings
  BOOKINGS: '/bookings',
  BOOKING_BY_ID: (id: string) => `/bookings/${id}`,
  BOOKING_CANCEL: (id: string) => `/bookings/${id}/cancel`,

  // Analytics
  ANALYTICS_OVERVIEW: '/analytics/overview',
  ANALYTICS_BOOKING_TRENDS: '/analytics/booking-trends',
  ANALYTICS_POPULAR_DESTINATIONS: '/analytics/popular-destinations',
  ANALYTICS_REVENUE: '/analytics/revenue',
} as const;
