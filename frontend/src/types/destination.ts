export interface Destination {
  id: string;
  name: string;
  image: string;
  packages: number;
  priceRange: string;
  description: string;
  category: 'nature' | 'city' | 'seasonal' | 'best-seller';
  link: string;
}