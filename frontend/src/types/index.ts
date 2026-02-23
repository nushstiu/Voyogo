
export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  country?: string;
  date_of_birth?: string;
  address?: string;
  preferred_language?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  profile_pic?: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export const UserRole = {
  Admin: 'admin',
  User: 'user',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateProfileData {
  username: string;
  phone: string;
  country: string;
  date_of_birth?: string;
  address?: string;
  preferred_language?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  profile_pic?: File | null;
}

// Destination Types
export interface Destination {
  id: number;
  name: string;
  packages: number;
  price_range: string;
  image: string;
  description: string;
  created_at?: string;
}

export interface CreateDestinationData {
  name: string;
  packages: number;
  price_range: string;
  image: string;
  description: string;
}

// Tour Types
export interface Tour {
  id: string;
  location: string;
  name: string;
  price: string;
  days: string;
  description: string;
  image: string;
  destination_id: number;
  status: TourStatus;
  created_at?: string;
}

export const TourStatus = {
  Active: 'active',
  Inactive: 'inactive',
} as const;

export type TourStatus = (typeof TourStatus)[keyof typeof TourStatus];

export interface CreateTourData {
  location: string;
  name: string;
  price: string;
  days: string;
  description: string;
  image: string;
  destination_id: number;
  status: TourStatus;
}

// Booking Types
export interface Booking {
  id: string;
  user_id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  destination: string;
  tour_id?: string;
  tour_name?: string;
  booking_date: string;
  duration: string;
  status: BookingStatus;
  notes?: string;
  admin_notes?: string;
  created_at: string;
  updated_at?: string;
}

export const BookingStatus = {
  Pending: 'pending',
  Confirmed: 'confirmed',
  Cancelled: 'cancelled',
} as const;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export interface CreateBookingData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  destination: string;
  tour_id?: string;
  booking_date: string;
  duration: string;
  status?: BookingStatus;
  notes?: string;
  admin_notes?: string;
  user_id?: string;
}

// Analytics Types
export interface AnalyticsOverview {
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  activeTours: number;
}

export interface BookingTrend {
  month: string;
  count: number;
}

export interface PopularDestination {
  name: string;
  bookings: number;
}

export interface RevenueData {
  destination: string;
  revenue: number;
}

export interface StatusDistribution {
  status: BookingStatus;
  count: number;
  percentage: number;
}

// Component Props Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
