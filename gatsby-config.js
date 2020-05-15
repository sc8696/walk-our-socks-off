module.exports = {
  siteMetadata: {
    title: `We're walking our socks off!`,
    description: `Lucy and Sarah are walking their socks off for Guide Dogs!`,
    author: `@`,
    url: "https://www.walkoursocksoff.co.uk",
    image: "/images/ogimage.png"
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#FFDF7F`,
        theme_color: `#FFDF7F`,
        display: `minimal-ui`,
        icon: `src/icons/favicon.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-166834854-1"
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};
