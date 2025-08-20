import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3E5F44',
        secondary: '#5E936C',
        accent: '#93DA97',
        light: '#E8FFD7',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #3E5F44 0%, #5E936C 35%, #93DA97 70%, #E8FFD7 100%)',
      },
      fontFamily: {
        calligraphy: ['"Scheherazade New"', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;

