/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#B61C1C',
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          300: '#252525',
          500: '#999AA5',
          600: '#66676E',
          700: '#38373A',
          800: '#232323',
          900: '#100f12',
          950: '#999999',
        },
      },
    },
  },
  plugins: [],
};
