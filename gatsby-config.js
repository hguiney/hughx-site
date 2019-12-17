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
    // {
    //   "resolve": "gatsby-source-strapi-multiple-images",
    //   "options": {
    //     "apiURL": "http://localhost:1337",
    //     "contentTypes": [ // List of the Content Types you want to be able to request from Gatsby.
    //       "post",
    //       "page",
    //       "user",
    //       "category",
    //     ],
    //     "queryLimit": 1000,
    //   },
    // },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      "resolve": "gatsby-plugin-manifest",
      "options": {
        "name": "hughx",
        "short_name": "hughx",
        "start_url": "/",
        "background_color": "#ffffff",
        "theme_color": "#2c3d50",
        "display": "minimal-ui",
        "icon": "src/images/hughx-logo-face.png", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-styled-components",
    // "gatsby-plugin-stripe",
    // {
    //   "resolve": "gatsby-plugin-stripe",
    //   "options": {
    //     "async": true,
    //   },
    // },
    "gatsby-plugin-sass",
    {
      "resolve": "gatsby-plugin-purgecss",
      "options": {
        "printRejected": true, // Print removed selectors and processed file names
        // "develop": true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        "whitelist": [
          "fade",
          "show",
          "modal",
          "close",
          "modal-dialog",
          "modal-content",
          "modal-header",
          "modal-title",
          "modal-body",
          "modal-backdrop",
          "toast",
          "toast-body",
          "sr-only",
        ], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
  ],
};
