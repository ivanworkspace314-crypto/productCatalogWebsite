/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e8f2ff',
          100: '#c6dcff',
          200: '#9fc5ff',
          300: '#6e9fff',
          400: '#3f78ff',
          500: '#2158e8',
          600: '#1745c2',
          700: '#12369c',
          800: '#0d2875',
          900: '#081c52',
        },
      },
    },
  },
  plugins: [],
}

