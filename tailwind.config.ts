import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#14161A",
        primary: "rgba(29, 36, 44, 0.5)",
        primary_opaque: "rgb(29, 36, 44)",
        accent: "#379763",
      },
    },
  },
  plugins: [],
};
export default config;
