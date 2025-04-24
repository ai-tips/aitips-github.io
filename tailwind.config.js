/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ffe5e8',
          100: '#ffb8c0',
          200: '#ff8a97',
          300: '#ff5c6d',
          400: '#ff2e44',
          500: '#ff0f2a', // crimson red
          600: '#e6001a',
          700: '#b30014',
          800: '#80000e',
          900: '#4d0008',
        },
        secondary: {
          50: '#e0faff',
          100: '#b3f1ff',
          200: '#85e9ff',
          300: '#57e0ff',
          400: '#29d8ff',
          500: '#00cfff', // electric cyan
          600: '#00a6cc',
          700: '#007d99',
          800: '#005366',
          900: '#002a33',
        },
        accent: {
          50: '#fffde0',
          100: '#fff9b3',
          200: '#fff685',
          300: '#fff257',
          400: '#ffef29',
          500: '#ffeb00', // neon yellow
          600: '#ccc000',
          700: '#999400',
          800: '#666300',
          900: '#333100',
        },
        manga: {
          dark: '#1a1a1a',
          panel: '#f5f5f5',
          ink: '#0f0f0f',
        }
      },
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'speedline': 'speedline 1.5s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        speedline: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};