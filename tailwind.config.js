/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#000000",
        btn: {
          background: "hsl(var(--btn-background))",
          background_hover: "hsl(var(--btn-background-hover))",
        },
      },
    },
  },
  plugins: [],
};
