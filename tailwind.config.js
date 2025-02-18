/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector", '[data-mode="dark"]', "class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blueGray: {
          light: "#263238",
          base: "#13191C",
          dark: "#0F1113",
        },
        blue: {
          light: "#2196F3",
          base: "#0D3C61",
          dark: "#071E31",
        },
        green: {
          light: "#2AB17B",
          base: "#114731",
          dark: "#082319",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
