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
          base: "#00C896",
          dark: "#114731",
          accent: "#00FFB3",
        },
        cyan: {
          light: "#67e8f9",
          base: "#06b6d4",
          dark: "#164e63",
          accent: "#22d3ee",
        },
        white: {
          DEFAULT: "#ffffff",
          faded: "#f8fafc"
        },
        // Semantic color names for easy use
        text: {
          paragraph: "#ffffff",
          title: "#06b6d4", // cyan-base
        },
        bg: {
          title: "#00C896", // green-base
          component: "#164e63", // cyan-dark
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
