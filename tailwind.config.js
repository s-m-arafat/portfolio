/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  // Enable dark mode based on the 'dark' class
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          // bg
          primary: "#FFFFFF",
          // black shades
          "black-1": "#000000",

        },
        dark: {
          // bg
          primary: "#212224",
          secondary: "#1B1B1B",
          // white shades
          1: "#FFFFFF",
          2: "#D9D9D9",
          3: "#A5A4A4",
          4: "#6F6F6F",
          // green shades
          "green-1": "#18392B",

        },
      },
      dropShadow: {
        customDark: "0 4px 3px rgba(24, 57, 43, 0.1)",
        customLight: "0 4px 3px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  // ...
};
