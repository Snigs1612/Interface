import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--sidebar-border))", // Ensure this line is present
        background: "hsl(var(--sidebar-background))",
        foreground: "hsl(var(--sidebar-foreground))",
      },
    },
  },
  plugins: [],
};

export default config;
