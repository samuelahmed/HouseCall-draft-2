/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    colors: {
      //Colors from: https://www.radix-ui.com/docs/colors/palette-composition/the-scales
      //Blue
      blue1: '#fbfdff', 
      blue2: '#f5faff', 
      blue3: '#edf6ff',
      blue6: '#b7d9f8',
      blue11: '#006adc',
      blue12: "#00254d", 
      //Dark Blue
      darkBlue1: '#0f1720', 
      darkBlue2: '#0f1b2d',  
      darkBlue3: '#10243e',
      darkBlue6: '#0d3868',
      darkBlue12: '#eaf6ff', 
      
      // Olive
      olive2:'#f8faf8',  
      olive11: '#6b716a',
      olive12: '#141e12',
      // Dark Olive
      darkOlive2:' #1a1d19', 
      darkOlive12: '#eceeec',

      // Slate - Side Menu
      slate12: '#11181c',

      // Yellow - Sun
      yellow9: '#f5d90a',




    },
    extend: {
      height: {
        '128': '32rem',
      },
      maxHeight: {
        '5vh': '5vh',

        '70vh': '70vh',
        '75vh': '75vh',
        '78vh': '78vh',
        '80vh': '80vh',
        '85vh': '85vh',
        '90vh': '90vh',
        '95vh': '95vh',
        '98vh': '98vh',

        '100vh': '100vh',


      },
      minHeight: {
        '5vh': '5vh',

        '70vh': '70vh',
        '78vh': '78vh',
        '85vh': '85vh',
        '80vh': '80vh',
        '85vh': '85vh',
        '90vh': '90vh',
        '95vh': '95vh',

        '100vh': '100vh'
      }
    },
  },
  plugins: [],
};
