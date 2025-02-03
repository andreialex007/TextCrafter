import {
  scopedPreflightStyles,
  isolateInsideOfContainer,
} from "tailwindcss-scoped-preflight";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./../front/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // Disable default preflight
  },
  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer(
        "#text-selection-extension-root",
        {
          // Optional: exclude certain elements from preflight
          // except: '.no-preflight'
        },
      ),
    }),
  ],
  important: "#text-selection-extension-root",
};
