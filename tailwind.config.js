/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          600: '#0891b2',
          700: '#0e7490',
        },
        teal: {
          50: '#f0fdfa',
          200: '#99f6e4',
          600: '#0d9488',
          700: '#0f766e',
        },
        rose: {
          50: '#fff1f2',
          200: '#fecdd3',
          600: '#e11d48',
          700: '#be123c',
        }
      }
    },
  },
  plugins: [],
};
