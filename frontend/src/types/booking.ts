import type { Destination, User } from './index';

export interface TravelPreferences {
  accommodation?: string;
  mealPlan?: string;
  roomType?: string;
  dietaryRestrictions?: string[];
  specialRequests?: string;
  mobility?: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  meals: string[];
  accommodation: string;
  activities: string[];
}

export interface AvailableTour {
  id: string;
  tourId: string;
  tourName: string;
  destinationName: string;
  startDate: Date;
  endDate: Date;
  availableSpots: number;
  price: number;
  days: number;
  description: string;
  includes: string[];
  excludes: string[];
  highlights: string[];
  itinerary: DayItinerary[];
}

export interface BookingData {
  bookingReference?: string;
  paymentStatus?: string;
  duration: number;
  travelers: {
    adults: number;
    children: number;
  };
  startDate?: Date;
  endDate?: Date;
  destinationId?: number;
  destinationName?: string;
  totalPrice?: number;
  preferences?: TravelPreferences;
}

// Legacy types used by BookingForm, PackageSelector, PersonalInfoForm
export interface BookingFormData {
  gender: 'Mr.' | 'Ms.' | 'None';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  startDate: { day: number; month: number; year: number };
  duration: string;
  destination: string;
  selectedPackages: string[];
  insurance: boolean;
  termsAccepted: boolean;
}

export interface Package {
  id: string;
  name: string;
  location: string;
  price: number;
  img: string;
  destination: string;
}

export interface StepComponentProps {
  bookingData: BookingData;
  setBookingData: (data: BookingData) => void;
  user: User | null;
  selectedTour: AvailableTour | null;
  setSelectedTour: (tour: AvailableTour | null) => void;
  selectedDestination: Destination | null;
  setSelectedDestination: (dest: Destination | null) => void;
  onNext: () => void;
  onBack: () => void;
}
