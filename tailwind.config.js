module.exports = {
  content: {
    enabled: true,
    content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}']
  },
  theme: {
    extend: {
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
