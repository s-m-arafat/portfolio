/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nav:"#1B1B1B",
        light: {
          // bg
          primary: "#FFFFFF",
        },
        dark: {
          // bg
          primary: "#212224",
        },
        white:{
          // white shades
          1: "#FFFFFF",
          2: "#E0E0E0",
          3: "#A5A4A4",
          4: "#6F6F6F",
        },
        black:{
          // black shades
          1: "#000000",
          2: "#1F1F1F",
          3: "#252525",
          4: "#4D4D4D",
        },
        green:{
          // green shades
          1: "#18392B",

        },
      },
      dropShadow: {
        customDark: "0 4px 3px rgba(24, 57, 43, 0.1)",
        customLight: "0 4px 3px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
