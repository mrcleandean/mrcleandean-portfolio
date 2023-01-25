/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bigT: [
          'Fjalla One', 
          ...defaultTheme.fontFamily.sans
        ]
      }
    },
  },
  plugins: [],
}