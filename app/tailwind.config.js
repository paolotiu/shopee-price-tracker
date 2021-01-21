const env = process.env.NODE_ENV;
module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF8D28",
          dark: "#E67F25",
        },
        accent: {
          DEFAULT: "#FFBC1C",
          dark: "#E6A819",
        },
        white: {
          DEFAULT: "#F2F2F2",
          pure: "#FFFFFF",
        },
        black: {
          DEFAULT: "#2b2b2b",
          lighter: "#3b3b3b",
        },
      },
    },

    fontFamily: {
      sans: ["Open Sans", "Helvetica"],
    },
  },
  variants: {
    extend: {
      inset: ["checked"],
      transform: ["checked"],
      translate: ["checked"],
      transitionDuration: ["hover"],
      backgroundColor: ["disabled"],
      opacity: ["dark"],
    },
  },
  plugins: [],
};
