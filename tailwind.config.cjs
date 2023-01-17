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
      }
    },
  },
  plugins: [],
};
