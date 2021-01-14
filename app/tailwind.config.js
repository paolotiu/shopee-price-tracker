module.exports = {
  purge: [],
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
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
    fontFamily: {
      sans: ["Open Sans", "Helvetica"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
