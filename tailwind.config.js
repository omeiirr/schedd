module.exports = {
  purge: {
    enabled: true,
    content: ['./pages/**/*.js', './components/**/*.js']
  },
  theme: {
    extend: {
      boxShadow: {
        above: '2px -8px 20px -10px rgba(0,0,0,0.3)',
        below: '2px 8px 20px -10px rgba(0,0,0,0.3)'
      }
    }
  },
  plugins: []
};
