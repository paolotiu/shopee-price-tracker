const env = process.env.NODE_ENV;
module.exports = {
  purge: env === "production" && ["./components/**/*.tsx", "./pages/**/*.tsx"],

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
        white: "#F2F2F2",
        black: "#2b2b2b",
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
    },
  },
  plugins: [],
};
