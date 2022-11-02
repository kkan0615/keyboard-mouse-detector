/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './packages/renderer/index.html',
    './packages/renderer/src/**/*.{js,ts,jsx,tsx}',
  ],
  important: true,
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#0069FF',
          DEFAULT: '#0069FF',
          dark: '#0069FF',
        }
      }
    },
  },
  plugins: [],
}
