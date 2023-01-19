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
        '90vh': '90vh'
      },
      minHeight: {
        '90vh': '90vh',
        '70vh': '70vh'
      }
    },
  },
  plugins: [],
};
