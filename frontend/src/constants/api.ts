export const API_BASE_URL = '/api';

export const API_ENDPOINTS = {
  // Auth
  AUTH_ME: '/auth/me',
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGOUT: '/auth/logout',

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
