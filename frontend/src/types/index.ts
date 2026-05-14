
export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  country?: string;
  dateOfBirth?: string;
  address?: string;
  preferredLanguage?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  profilePic?: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export const UserRole = {
  Admin: 'Admin',
  User: 'User',
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
  dateOfBirth?: string;
  address?: string;
  preferredLanguage?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  profilePic?: File | null;
}

// Destination Types
export interface Destination {
  id: number;
  name: string;
  packages: number;
  priceRange: string;
  image: string;
  description: string;
  createdAt?: string;
}

export interface CreateDestinationData {
  name: string;
  packages: number;
  priceRange: string;
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
  destinationId: number;
  status: TourStatus;
  createdAt?: string;
  itinerary?: { title: string; description: string }[];
  included?: string[];
  notIncluded?: string[];
  reviews?: { name: string; avatar: string; text: string }[];
  gallery?: string[];
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
  destinationId: number;
  status: TourStatus;
}

// Booking Types
export interface Booking {
  id: string;
  userId: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  destination: string;
  tourId?: string;
  tourName?: string;
  bookingDate: string;
  duration: string;
  status: BookingStatus;
  notes?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
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
  tourId?: string;
  bookingDate: string;
  duration: string;
  status?: BookingStatus;
  notes?: string;
  adminNotes?: string;
  userId?: string;
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
