// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  config: {
    name: 'Alexander Adewole',
    tagline: 'H. s. sapien',
    social: [
      {
        url: "https://github.com/adewole",
        icon: "github.svg"
      },
      {
        url: "mailto:alex@bizar.re",
        icon: "mail.svg"
      }
    ]
  },
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss'
    }
  ]
}
