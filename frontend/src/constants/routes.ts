export const ROUTES = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',

  // User
  USER_DASHBOARD: '/user/dashboard',
  USER_PROFILE: '/user/profile',
  USER_BOOKINGS: '/user/bookings',

  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_DESTINATIONS: '/admin/destinations',
  ADMIN_TOURS: '/admin/tours',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_ANALYTICS: '/admin/analytics',

  // Public
  HOME: '/',
  DESTINATIONS: '/destinations',
  TOURS: '/tours',
  TOUR_DETAILS: '/tours/:id',
  BOOKING: '/booking',
  NOT_FOUND: '/404',
} as const;
