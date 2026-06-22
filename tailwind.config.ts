import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#FFF8F0',
          100: '#FFF0DB',
          200: '#FFE0B8',
          300: '#FFD194',
          400: '#FFC170',
          500: '#E8A849',
          600: '#C6930A',
          700: '#A67B00',
          800: '#7A5B00',
          900: '#4D3800',
        },
        maroon: {
          50: '#FDF2F2',
          100: '#F9E0E0',
          200: '#F0BDBD',
          300: '#E49494',
          400: '#D46B6B',
          500: '#B8383B',
          600: '#8B1A1A',
          700: '#722F37',
          800: '#5C1A1A',
          900: '#3D1010',
        },
        cream: {
          50: '#FFFDFB',
          100: '#FFF8F0',
          200: '#FAF0E6',
          300: '#F5E6D3',
          400: '#E8D5BE',
          500: '#D4C0A8',
        },
        temple: {
          gold: '#DAA520',
          copper: '#B87333',
          bronze: '#CD7F32',
          deepred: '#8B0000',
          ivory: '#FFFFF0',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-warm': 'linear-gradient(135deg, #FFF8F0 0%, #FFE0B8 50%, #FFF8F0 100%)',
        'gradient-gold': 'linear-gradient(135deg, #DAA520 0%, #C6930A 50%, #B87333 100%)',
        'gradient-spiritual': 'linear-gradient(180deg, #FFF8F0 0%, #F5E6D3 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
