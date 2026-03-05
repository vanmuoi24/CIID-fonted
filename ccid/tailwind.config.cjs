module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {fontFamily: {
        roboto: ["Montserrat", "sans-serif"],
        
      },
      colors: {
        primaryBlue: "#284393",
        backgroundBlue: "#0c9ee514",
        text:"#242424",
      },
    
    },
  },
  plugins: [],
};
