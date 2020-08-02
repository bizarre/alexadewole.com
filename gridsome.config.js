// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  config: {
    name: 'Alexander Adewole',
    tagline: 'H. s. sapien',
    social: {
      twitter: 'alex_adewole',
      github: 'adewole',
      linkedin: 'alex-adewole',
      email: 'alex@bizar.re'
    }
  },
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss'
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'About',
        path: 'content/about.md'
      }
    },
  ]
}
