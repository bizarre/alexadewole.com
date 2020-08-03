const { colors } = require('tailwindcss/defaultTheme')


module.exports = {
  purge: [],
  theme: {
    typography: (theme) => ({
      default: {
        css: {
          color: 'inherit',
          strong: {
            color: 'inherit'
          },
          h1: {
            color: 'inherit',
            fontWeight: '500'
          },
          h2: {
            color: 'inherit',
            fontWeight: '500'
          },
          h3: {
            color: 'inherit',
            fontWeight: '500'
          },
          blockquote: {
            color: 'inherit'
          },
          a: {
            color: '#8B8F9B'
          },
          code: {
            color: '#8B8F9B'
          },
          th: {
            color: '#8B8F9B'
          }
        }
      }
    }),

    extend: {
      colors: {
        gray: {
          ...colors.gray,
          '400': '#A0A2AF',
          '500': '#B9BCCA',
          '600': '#8B8F9B',
          '700': '#646670',
          '800': '#585B66'
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
  plugins: [
    require('@tailwindcss/typography')
  ],
}
