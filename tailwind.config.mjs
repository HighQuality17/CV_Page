/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        graphite: "#0b0f17",
        ink: "#05070c",
        cyanline: "#35d8ff",
        electric: "#4f7cff",
        softviolet: "#9c7cff",
        mintline: "#6df4c9"
      },
      boxShadow: {
        glow: "0 0 48px rgba(53, 216, 255, 0.22)",
        violet: "0 0 42px rgba(156, 124, 255, 0.18)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};
