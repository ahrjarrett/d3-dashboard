const path = require(`path`)

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        src: path.join(__dirname, 'src'),
        assets: path.join(__dirname, 'content/assets'),
        pages: path.join(__dirname, 'src/pages'),
        posts: path.join(__dirname, 'content/posts'),
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-theme-blog`,
    `gatsby-theme-waves`,
  ],
}
