module.exports = {
  "siteMetadata": {
    "title": "hughx",
    "description": "On-Demand UI/UX for Web Apps",
    "jobTitle": "UX Developer",
    "author": "Hugh Guiney",
  },
  "plugins": [
    "gatsby-plugin-react-helmet",
    {
      "resolve": "gatsby-source-filesystem",
      "options": {
        "name": "images",
        "path": `${__dirname}/src/images`,
      },
    },
    {
      "resolve": "gatsby-source-strapi-multiple-images",
      "options": {
        "apiURL": "http://localhost:1337",
        "contentTypes": [ // List of the Content Types you want to be able to request from Gatsby.
          "post",
          "page",
          "user",
          "category",
        ],
        "queryLimit": 1000,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      "resolve": "gatsby-plugin-manifest",
      "options": {
        "name": "gatsby-starter-default",
        "short_name": "starter",
        "start_url": "/",
        "background_color": "#663399",
        "theme_color": "#663399",
        "display": "minimal-ui",
        "icon": "src/images/gatsby-icon.png", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-styled-components",
  ],
};
