const { colors } = require('tailwindcss/defaultTheme')


module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          '500': '#A0A2AF',
        }
      }
    },
  },
  variants: {},
  plugins: [],
}
