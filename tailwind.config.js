/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,mdx}", "./components/**/*.{js,jsx}", "./lib/**/*.js"],
  theme: {
    container: {
      center: true,
      padding: "clamp(1rem, 4vw, 1.5rem)",
      screens: { "2xl": "72rem" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        canvas: "#FAFAF9",
        surface: "#FFFFFF",
        line: { DEFAULT: "#E7E5E4", strong: "#8A847E" },
        ink: "#1C1917",
        muted: "#57534E",
        accent: { DEFAULT: "#0F766E", hover: "#115E59", soft: "#F0FDFA" },
        book: {
          paper: "#F7F1E3",
          page: "#FFFCF5",
          ink: "#2B2118",
          muted: "#6B5B4B",
          rule: "#9C8668",
          accent: "#8B3A2B",
        },
      },
    },
  },
  plugins: [],
};
