export const COLORS = {
  primary: '#00BCD4',
  primaryHover: '#00ACC1',
  secondary: '#004CFF',
  accent: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
} as const;

export type ColorKey = keyof typeof COLORS;
