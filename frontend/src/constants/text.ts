export const UI_TEXT = {
  // App
  APP_NAME: 'Voyogo',
  APP_TAGLINE: 'Unforgettable Travel Awaits',

  // Auth
  LOGIN_TITLE: 'Login',
  LOGIN_SUBTITLE: 'Good to see you back \u{1F5A4}',
  REGISTER_TITLE: 'Create Account',
  LOGIN_BUTTON: 'Next',
  REGISTER_BUTTON: 'Done',
  LOGOUT_BUTTON: 'Logout',

  // Social Auth
  GOOGLE_LOGIN: 'Continue with Google',
  FACEBOOK_LOGIN: 'Continue with Facebook',
  GOOGLE_SIGNUP: 'Sign up with Google',
  FACEBOOK_SIGNUP: 'Sign up with Facebook',
  OR_DIVIDER: 'Or continue with email',

  // Form Labels
  LABEL_USERNAME: 'Username',
  LABEL_EMAIL: 'Email',
  LABEL_PASSWORD: 'Password',
  LABEL_CONFIRM_PASSWORD: 'Confirm Password',
  LABEL_PHONE: 'Phone',
  LABEL_COUNTRY: 'Country',
  LABEL_FIRST_NAME: 'First Name',
  LABEL_LAST_NAME: 'Last Name',

  // Placeholders
  PLACEHOLDER_USERNAME: 'Username',
  PLACEHOLDER_EMAIL: 'Email',
  PLACEHOLDER_PASSWORD: 'Password',
  PLACEHOLDER_CONFIRM_PASSWORD: 'Confirm Password',
  PLACEHOLDER_SEARCH: 'Search',

  // Validation Messages
  ERROR_REQUIRED: 'This field is required',
  ERROR_INVALID_EMAIL: 'Invalid email address',
  ERROR_PASSWORD_MIN: 'Password must be at least 6 characters',
  ERROR_PASSWORDS_MISMATCH: "Passwords don't match",
  ERROR_USERNAME_MIN: 'Username must be at least 5 characters',
  ERROR_USERNAME_MAX: 'Username must be maximum 15 characters',
  ERROR_USERNAME_FORMAT: 'Username can only contain letters, numbers, and underscores',
  ERROR_PHONE_FORMAT: 'Phone must start with + and contain only digits and spaces',
  ERROR_COUNTRY_FORMAT: 'Country must contain only letters, spaces, and hyphens',

  // User Dashboard
  USER_WELCOME: (name: string) => `Welcome back, ${name}!`,
  USER_SUBTITLE: 'Manage your bookings and profile',
  STAT_TOTAL_BOOKINGS: 'Total Bookings',
  STAT_UPCOMING_TRIPS: 'Upcoming Trips',
  STAT_COMPLETED_TRIPS: 'Completed Trips',
  RECENT_BOOKINGS: 'Recent Bookings',
  NO_BOOKINGS: 'No bookings yet',

  // Admin Dashboard
  ADMIN_WELCOME: 'Admin Dashboard',
  STAT_TOTAL_USERS: 'Total Users',
  STAT_TOTAL_REVENUE: 'Total Revenue',
  STAT_ACTIVE_TOURS: 'Active Tours',

  // Booking Status
  STATUS_PENDING: 'Pending',
  STATUS_CONFIRMED: 'Confirmed',
  STATUS_CANCELLED: 'Cancelled',

  // Actions
  ACTION_EDIT: 'Edit',
  ACTION_DELETE: 'Delete',
  ACTION_CANCEL: 'Cancel',
  ACTION_VIEW: 'View Details',
  ACTION_SAVE: 'Save Changes',
  ACTION_CREATE: 'Create',
  ACTION_UPDATE: 'Update',

  // Filters
  FILTER_ALL: 'All',
  FILTER_ROLE: 'Filter by Role',
  FILTER_STATUS: 'Filter by Status',
  FILTER_DESTINATION: 'Filter by Destination',
  SORT_BY: 'Sort by',
  SEARCH_PLACEHOLDER: 'Search...',

  // Admin Actions
  ACTION_ADD_USER: 'Add User',
  ACTION_ADD_DESTINATION: 'Add Destination',
  ACTION_ADD_TOUR: 'Add Tour',
  ACTION_CREATE_BOOKING: 'Create Booking',
  ACTION_EXPORT_CSV: 'Export CSV',
  ACTION_BULK_CONFIRM: 'Confirm Selected',
  ACTION_BULK_CANCEL: 'Cancel Selected',

  // Modal Titles
  MODAL_EDIT_USER: 'Edit User',
  MODAL_VIEW_USER: 'User Details',
  MODAL_EDIT_BOOKING: 'Edit Booking',
  MODAL_VIEW_BOOKING: 'Booking Details',

  // Confirmations
  CONFIRM_DELETE: 'Are you sure you want to delete this?',
  CONFIRM_CANCEL_BOOKING: 'Are you sure you want to cancel this booking?',
  CONFIRM_DELETE_USER: 'Delete this user? This action cannot be undone.',
  CONFIRM_DELETE_DESTINATION: (count: number) =>
    `Delete this destination? This will affect ${count} tours.`,
  CONFIRM_DELETE_TOUR: (count: number) =>
    `Delete this tour? ${count} bookings reference this tour.`,

  // Success Messages
  SUCCESS_LOGIN: 'Login successful!',
  SUCCESS_REGISTER: 'Registration successful!',
  SUCCESS_LOGOUT: 'Logged out successfully',
  SUCCESS_PROFILE_UPDATE: 'Profile updated successfully',
  SUCCESS_BOOKING_CREATED: 'Booking created successfully',
  SUCCESS_BOOKING_CANCELLED: 'Booking cancelled successfully',
  SUCCESS_USER_CREATED: 'User created successfully',
  SUCCESS_USER_UPDATED: 'User updated successfully',
  SUCCESS_USER_DELETED: 'User deleted successfully',
  SUCCESS_BOOKING_UPDATED: 'Booking updated successfully',
  SUCCESS_STATUS_CHANGED: 'Status updated successfully',
  SUCCESS_DESTINATION_CREATED: 'Destination created successfully',
  SUCCESS_DESTINATION_UPDATED: 'Destination updated successfully',
  SUCCESS_DESTINATION_DELETED: 'Destination deleted successfully',
  SUCCESS_TOUR_CREATED: 'Tour created successfully',
  SUCCESS_TOUR_UPDATED: 'Tour updated successfully',
  SUCCESS_TOUR_DELETED: 'Tour deleted successfully',

  // Error Messages
  ERROR_LOGIN: 'Login failed. Please check your credentials.',
  ERROR_REGISTER: 'Registration failed. Please try again.',
  ERROR_GENERIC: 'Something went wrong. Please try again.',

  // Loading
  LOADING: 'Loading...',
  LOADING_LOGIN: 'Logging in...',
  LOADING_REGISTER: 'Creating account...',

  // User Panel
  USER_MY_BOOKINGS: 'My Bookings',
  USER_PROFILE: 'My Profile',
  USER_EDIT_BOOKING: 'Edit Booking',
  USER_BOOKING_DETAILS: 'Booking Details',
  BOOKING_NOTES_LABEL: 'Special Requests / Notes',
  BOOKING_NOTES_PLACEHOLDER: 'Dietary requirements, accessibility needs, etc.',

  // Empty States
  NO_RESULTS: 'No results found',
  NO_USERS: 'No users found',
  NO_DESTINATIONS: 'No destinations found',
  NO_TOURS: 'No tours found',

  // Pagination
  SHOWING: 'Showing',
  OF: 'of',
  RESULTS: 'results',
  PER_PAGE: 'per page',
} as const;
