/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      //Colors from: https://www.radix-ui.com/docs/colors/palette-composition/the-scales
      //Blue
      blue1: "#fbfdff",
      blue2: "#f5faff",
      blue3: "#edf6ff",
      blue4: "#e1f0ff",
      blue5: "#cee7fe",
      blue6: "#b7d9f8",
      blue7: "#96c7f2",
      blue8: "#5eb0ef",
      blue9: "#0091ff",
      blue10: "#0081f1",
      blue11: "#006adc",
      blue12: "#00254d",
      //Dark Blue
      darkBlue1: "#0f1720",
      darkBlue2: "#0f1b2d",
      darkBlue3: "#10243e",
      darkBlue4: "#102a4c",
      darkBlue5: "#0f3058",
      darkBlue6: "#0d3868",
      darkBlue7: "#0a4481",
      darkBlue8: "#0954a5",
      darkBlue9: "#0091ff",
      darkBlue10: "#369eff",
      darkBlue12: "#eaf6ff",
      // Olive
      olive2: "#f8faf8",
      olive10: "#818780",
      olive11: "#6b716a",
      olive12: "#141e12",
      // Dark Olive
      darkOlive2: " #1a1d19",
      darkOlive10: "#778175",
      darkOlive12: "#eceeec",
      // Slate - Side Menu
      slate12: "#11181c",
      // Yellow - Sun
      yellow9: "#f5d90a",
      // Red - error 
      red11: "#c30007d4",

      //White / Black - overlay
      white: "#ffffff",
      black: "#000000",
      darkBg: "#121212",


      //gray for messaging - current user message
      gray3: "#f3f3f3",
      gray4: "#ededed",

    },
    extend: {
      height: {
        128: "32rem",
      },
      maxHeight: {
        "5vh": "5vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "75vh": "75vh",
        "78vh": "78vh",
        "80vh": "80vh",
        "85vh": "85vh",
        "90vh": "90vh",
        "95vh": "95vh",
        "98vh": "98vh",
        "100vh": "100vh",
      },
      minHeight: {
        "5vh": "5vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "78vh": "78vh",
        "85vh": "85vh",
        "80vh": "80vh",
        "85vh": "85vh",
        "88vh": "88vh",
        "90vh": "90vh",
        "95vh": "95vh",
        "100vh": "100vh",
      },
      maxWidth: {
        "5vw": "5vw",
        "30vw": "30vw",
        "40vw": "40vw",
      },
      minWidth: {
        "40vw": "40vw",
        "30vw": "30vw",
      },
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        robotoSlab: ["Roboto Slab", "serif"],

      },
    },
  },
  plugins: [],
};
