/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00BCD4',
          hover: '#00ACC1',
          light: '#B2EBF2',
          dark: '#00838F',
        },
        secondary: {
          DEFAULT: '#004CFF',
          hover: '#0043E6',
          light: '#E3F2FD',
          dark: '#0039CC',
        },
        accent: {
          DEFAULT: '#10B981',
          hover: '#059669',
          light: '#D1FAE5',
          dark: '#047857',
        },
        danger: {
          DEFAULT: '#EF4444',
          hover: '#DC2626',
          light: '#FEE2E2',
          dark: '#B91C1C',
        },
        warning: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FEF3C7',
          dark: '#B45309',
        },
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
          light: '#9CA3AF',
          white: '#FFFFFF',
        },
        background: {
          main: '#FFFFFF',
          light: '#F9FAFB',
          dark: '#1F2937',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': '9rem',
        'display': '6rem',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
