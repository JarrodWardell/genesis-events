const colors = require('tailwindcss/colors')

module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', ' sans-serif'],
      },
    },
  },
  plugins: [],
}
