/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        teal: {
          50: "#effcf9",
          100: "#c9f6ec",
          200: "#95ecda",
          300: "#5cd9c1",
          400: "#2fbfa6",
          500: "#16a08a",
          600: "#0f8272",
          700: "#0e685d",
          800: "#0f534b",
          900: "#0d453f",
        },
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        sunset: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
        ink: {
          900: "#0b1f2a",
          800: "#12303f",
        },
      },
      fontFamily: {
        display: ["'Clash Display'", "'Sora'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(15, 130, 114, 0.25)",
        card: "0 8px 30px rgba(11, 31, 42, 0.08)",
        glow: "0 0 0 1px rgba(255,255,255,0.1), 0 8px 30px rgba(14, 165, 233, 0.25)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(120deg, rgba(12,74,110,0.85) 0%, rgba(15,130,114,0.75) 50%, rgba(234,88,12,0.35) 100%)",
        mesh: "radial-gradient(at 20% 20%, rgba(56,189,248,0.25) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(52,211,153,0.25) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(251,146,60,0.2) 0px, transparent 50%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        ripple: "ripple 0.6s linear",
        shimmer: "shimmer 1.8s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        ripple: {
          to: { transform: "scale(4)", opacity: 0 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" },
        },
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
    },
  },
  plugins: [],
};
