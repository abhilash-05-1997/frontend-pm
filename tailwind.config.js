/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1A1A1D', // Dark background color
        'dark-text': '#FFFFFF', // Light text for dark mode
        'dark-card': '#6A1E55', // Dark card color
        'dark-accent': '#4a5568', // Dark accent color
        'dark-subtabs': '#A64D79',
        'dark-add-button': '#90EE90', // light button color
        'dark-button-text': '#000000',
        'dark-info-cards': '#1F2937',
      },
    },
  },
  plugins: [],
}

