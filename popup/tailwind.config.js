import tailwindChildren from "tailwind-children";
import hero from "tailwindcss-hero-patterns";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindChildren, hero],
};
