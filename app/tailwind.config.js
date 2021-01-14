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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
