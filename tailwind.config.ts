import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // ibm: ["IBM Plex Mono", "sans"],
        sans: ["Roboto", "sans-serif"],
        avenir: ["Avenir", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        cream: "#fff6ed",
        coffeeLight: "#FED8B1",
        coffee: "ECB176",
        coffeeDark: "#A67B5B",
        coffeeDarkest: "#6F4E37",
      },
      fontSize: {
        // xs: "8px",
        // sm: "10px",
        // base: "12px",
        // lg: "14px",
        // xl: "16px",
        // "2xl": "20px",
        // "3xl": "24px",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
