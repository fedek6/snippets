const path = require("path");

module.exports = {
  siteMetadata: {
    siteUrl: "https:/fedek6.github.io",
    title: "Snippets",
  },
  pathPrefix: "/snippets",
  plugins: [
    "gatsby-plugin-antd",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: path.join(__dirname, "content"),
      },
    },
  ],
};
