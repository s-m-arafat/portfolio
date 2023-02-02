/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blink: "blink 0.8s 7",
      },
      keyframes: {
        blink: {
          "0%,100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0,
          },
        },
      },
      backgroundImage: {
        "portfolio-hero-lg": "url('../assets/bg-3.png')",
        "portfolio-hero-sm": "url('../assets/bg-mobile-2.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
