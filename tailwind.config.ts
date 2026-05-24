import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        agro: {
          green: "#55B947",
          dark: "#2F6B2F",
          bg: "#F3F5F6",
          text: "#1D1D1F",
          border: "#E5E7EB"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(29, 29, 31, 0.08)",
        panel: "0 12px 34px rgba(47, 107, 47, 0.10)",
        glow: "0 0 0 6px rgba(85, 185, 71, 0.18), 0 18px 40px rgba(85, 185, 71, 0.22)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" }
        },
        pulseRing: {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" }
        },
        dash: {
          to: { strokeDashoffset: "-1000" }
        },
        floatUp: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" }
        }
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        blink: "blink 1s step-end infinite",
        "pulse-ring": "pulseRing 2.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
        dash: "dash 18s linear infinite",
        "float-up": "floatUp 4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
