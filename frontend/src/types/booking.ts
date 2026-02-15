export interface Package {
  id: string;
  name: string;
  location: string;
  img: string;
  price: number;
  destination: string;
}

export interface BookingFormData {
  gender: 'Ms.' | 'Mr.' | 'None';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  startDate: {
    day: number;
    month: number;
    year: number;
  };
  duration: string;
  destination: string;
  selectedPackages: string[];
  insurance: boolean;
  termsAccepted: boolean;
}