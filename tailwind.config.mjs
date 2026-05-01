/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        graphite: "#0B1020",
        ink: "#050816",
        cyanline: "#38BDF8",
        electric: "#22D3EE",
        softviolet: "#8B5CF6",
        mintline: "#10B981"
      },
      boxShadow: {
        glow: "0 0 48px rgba(56, 189, 248, 0.22)",
        violet: "0 0 42px rgba(139, 92, 246, 0.18)"
      },
      fontFamily: {
        heading: [
          "Space Grotesk",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
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
