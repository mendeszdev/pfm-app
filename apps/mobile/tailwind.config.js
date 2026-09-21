/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Stencil Mono 2a — light
        bg: "#FFFFFF",
        surface: "#FFFFFF",
        surface2: "#F7F7F7",
        ink: "#000000",
        ink2: "#6E6E6E",
        line: "#E0E0E0",
        acc: "#000000",
        "acc-soft": "#F0F0F0",
        "acc-ink": "#FFFFFF",
        pos: "#1D6F3C",
        neg: "#AE2318",
        warn: "#8A6400",
      },
      fontFamily: {
        mono: ["monospace"],
      },
      borderRadius: {
        none: "0px",
      },
    },
  },
  plugins: [],
}