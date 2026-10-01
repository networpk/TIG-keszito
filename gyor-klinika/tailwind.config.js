import relumePreset from "@relume_io/relume-tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [relumePreset],
  theme: {
    // A preset screens-listája százalékos értéket is tartalmaz, amiből a
    // container plugin érvénytelen @media (min-width: 100%) szabályt gyártana.
    container: {
      center: true,
      screens: { sm: "40rem", md: "48rem", lg: "64rem", xl: "80rem" },
    },
    extend: {
      // A preset lecseréli a theme.gradientColorStops-ot, ezért visszakötjük.
      gradientColorStops: ({ theme }) => theme("colors"),
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      // Csak a nem skálázódó méretek maradnak itt; a h1–h6 / large / medium a
      // lenti pluginből jön, mert azoknak mobilon kisebbnek kell lenniük.
      fontSize: {
        regular: ["1rem", { lineHeight: "1.5" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        tiny: ["0.75rem", { lineHeight: "1.5" }],
      },
      spacing: {
        18: "4.5rem",
        3.75: "0.9375rem",
      },
      colors: {
        // Szekciónként váltható színséma (lásd index.css: .scheme-*).
        scheme: {
          background: "rgb(var(--scheme-background) / <alpha-value>)",
          foreground: "rgb(var(--scheme-foreground) / <alpha-value>)",
          text: "rgb(var(--scheme-text) / <alpha-value>)",
          border: "rgb(var(--scheme-border) / <alpha-value>)",
          "btn-text": "rgb(var(--scheme-btn-text) / <alpha-value>)",
        },
        // Márkaszínek: nyugodt, orvosi kékeszöld.
        brand: {
          darkest: "#08343D",
          darker: "#0E4F5E",
          DEFAULT: "#136B7E",
          light: "#3E93A6",
          lighter: "#CFE3E8",
          lightest: "#EDF5F7",
        },
        accent: {
          DEFAULT: "#C2703B",
          light: "#F2E3D8",
        },
        neutral: {
          black: "#000000",
          darkest: "#08343D",
          darker: "#1F3B42",
          dark: "#3F5B63",
          DEFAULT: "#5E7278",
          light: "#C4D2D6",
          lighter: "#E2EAEC",
          lightest: "#F2F6F7",
          white: "#FFFFFF",
        },
      },
      borderRadius: {
        button: "0.375rem",
        card: "0.75rem",
        image: "0.75rem",
        form: "0.375rem",
        badge: "999rem",
        checkbox: "0.25rem",
        carousel: "999rem",
        dropdown: "0.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        tabs: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        tabs: "tabs 0.3s ease-out",
      },
    },
  },
  plugins: [
    /*
      Reszponzív Relume tipográfia.

      A publikált v3 preset fontSize-a nem lehet breakpointfüggő, a Relume v4
      @theme rétege viszont mobilon kisebb fokozatokat használ. Enélkül a
      hosszú magyar szavak (pl. „összehasonlítható”) asztali méretben lógnak ki
      a 390 pixeles képernyőn. A mobil érték az alap, 768 pixel felett vált át
      az asztali fokozatra.
    */
    ({ addUtilities, theme }) => {
      const ramp = {
        h1: ["2.5rem", "3.5rem", "1.2", "-0.01em"],
        h2: ["2.25rem", "3rem", "1.2", "-0.01em"],
        h3: ["2rem", "2.5rem", "1.2", "-0.01em"],
        h4: ["1.75rem", "2rem", "1.3", "-0.01em"],
        h5: ["1.25rem", "1.5rem", "1.4", "-0.01em"],
        h6: ["1.125rem", "1.25rem", "1.4", "-0.01em"],
        large: ["1.125rem", "1.25rem", "1.5", "0"],
        medium: ["1rem", "1.125rem", "1.5", "0"],
      };

      const base = {};
      const desktop = {};
      for (const [name, [mobile, large, lineHeight, tracking]] of Object.entries(ramp)) {
        base[`.text-${name}`] = {
          fontSize: mobile,
          lineHeight,
          letterSpacing: tracking,
        };
        desktop[`.text-${name}`] = { fontSize: large };
      }

      addUtilities([base, { [`@media (min-width: ${theme("screens.md")})`]: desktop }]);
    },
  ],
};
