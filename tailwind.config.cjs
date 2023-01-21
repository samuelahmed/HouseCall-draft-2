/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    // colors: {
    //   bgLight: "#151819",
    // },
    extend: {
      height: {
        '128': '32rem',
      },
      maxHeight: {
        '70vh': '70vh',
        '75vh': '75vh',
        '78vh': '78vh',
        '80vh': '80vh',
        '85vh': '85vh',
        '90vh': '90vh'
      },
      minHeight: {
        '70vh': '70vh',
        '78vh': '78vh',
        '85vh': '85vh',
        '80vh': '80vh',
        '85vh': '85vh',
        '90vh': '90vh',
      }
    },
  },
  plugins: [],
};
