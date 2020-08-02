const { colors } = require('tailwindcss/defaultTheme')


module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          '400': '#A0A2AF',
          '500': '#B9BCCA',
          '700': '#646670'
        }
      },
      screens: {
        light: {
          raw: "(prefers-color-scheme: light)"
        },
        dark: {
          raw: "(prefers-color-scheme: dark)"
        }
      }
    },
  },
  variants: {},
  plugins: [],
}
