import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        elevated: "var(--elevated)",
        "code-bg": "var(--code-bg)",
        accent: "var(--accent)",
        "accent-glow": "var(--accent-glow)",
        "accent-bdr": "var(--accent-bdr)",
        blue: "var(--blue)",
        amber: "var(--amber)",
        red: "var(--red)",
        text: "var(--text)",
        text2: "var(--text2)",
        text3: "var(--text3)",
        border: "var(--border)",
        border2: "var(--border2)",
      },
      spacing: {
        "space-1": "4px",
        "space-2": "8px",
        "space-3": "12px",
        "space-4": "16px",
        "space-5": "20px",
        "space-6": "24px",
        "space-7": "28px",
        "space-8": "32px",
        "space-9": "36px",
        "space-10": "40px",
        "space-11": "44px",
        "space-12": "48px",
        "space-13": "52px",
        "space-14": "56px",
        "space-15": "60px",
      },
      borderRadius: {
        radius: "var(--radius)",
        "radius-lg": "var(--radius-lg)",
      },
      fontFamily: {
        display: ["var(--ff-d)"],
        body: ["var(--ff-b)"],
        mono: ["var(--ff-m)"],
      },
    },
  },
  plugins: [],
};

export default config;
