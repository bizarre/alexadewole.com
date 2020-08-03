// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteUrl: 'https://www.alexadewole.com',
  siteName: 'Alex Adewole',
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

  templates: {
    Post: '/:title'
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
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Position',
        path: 'content/resume/*.md',
        ignore: ['content/resume/section/*.md']
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Section',
        path: 'content/resume/section/*.md',
        refs: {
          positions: {
            typeName: "Position"
          }
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/posts/*.md',
        refs: {
          positions: {
            typeName: "Post"
          }
        }
      }
    }
  ]
}
