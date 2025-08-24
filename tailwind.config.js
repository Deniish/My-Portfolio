/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Golds
        "gold-dark": "#DAA520",
        "gold-warm": "#FFB800",
        "gold-amber": "#FFC107",

        // Whites
        "white-soft": "#F5F5F5",
        "white-cool": "#E0E0E0",
        "white-ivory": "#FFFFF0",

        // Reds
        "maroon-dark": "#800000",
        "red-wine": "#8B0000",
        "crimson": "#DC143C",

        // Blues
        "sapphire-dark": "#0F52BA",
        "navy-dark": "#001F3F",
        "indigo-dark": "#4B0082",

        // Greens
        "leaf-dark": "#014421",
        "forest-green": "#228B22",
        "emerald-dark": "#046307",

        // Other accents
        "purple-dark": "#4B0082",
        "teal-dark": "#008080",
        "orange-dark": "#FF8C00",
      },
      fontFamily: {
        dancing: ["DancingScript", "sans-serif"],
        kohinoor: ["Kohinoor", "sans-serif"],
        cabinet: ["Cabinet-thin", "sans-serif"],
        boska: ["Boska-light", "sans-serif"],
        gambarino: ["Gambarino", "sans-serif"],
        monsaBold: ["Monsa-Bold", "sans-serif"],
        monsaSemi: ["Monsa-Semi", "sans-serif"],
        monsaMedium: ["Monsa-Medium", "sans-serif"],
        cavet: ["Cavet", "cursive"],
        indieflower: ["Indieflower", "cursive"],
        luckiest: ["LuckiestGuy", "cursive"],
        manrope: ["Manrope", "sans-serif"],
        satisfy: ["Satisfy", "cursive"],
      },
      keyframes: {
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
      },
      animation: {
        shine: 'shine 5s linear infinite',
      },
    },
  },
  plugins: [],
}
