const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.sky
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        heading: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        above: '2px -8px 20px -10px rgba(0,0,0,0.3)',
        below: '2px 8px 20px -10px rgba(0,0,0,0.3)'
      }
    }
  },
  plugins: []
};
