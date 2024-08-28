/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    darkMode: ["class", '[data-mode="dark"]'],
    extend: {
      colors: {
        accent: "#b22db7",

        "accent-100": "#D9BBFDFF",
        "accent-200": "#C6B4E3FF",
        "accent-300": "#d667d9FF",
        "accent-400": "#9D26A1FF",
        "accent-500": "#811D93FF",
        "accent-600": "#66197CFF",
        "accent-700": "#4C1563FF",
        "accent-800": "#330E4DFF",
        "accent-900": "#190333FF",
        "accent-1000": "#000000FF",
      },
    },
  },
  plugins: [],
}
