/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2563EB",
          dark: "#1D4ED8",
          light: "#EFF6FF"
        }
      }
    }
  },
  plugins: []
};
