const path = require("path");
const darkTheme = require("@ant-design/dark-theme").default;

module.exports = {
  siteMetadata: {
    siteUrl: "https:/fedek6.github.io",
    title: "Snippets",
  },
  pathPrefix: "/snippets",
  plugins: [
    {
      resolve: "gatsby-plugin-antd",
      options: {
        style: true,
      },
    },
    {
      resolve: "gatsby-plugin-less",
      options: {
        lessOptions: {
          modifyVars: darkTheme,
          javascriptEnabled: true,
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: path.join(__dirname, "content"),
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
    },
  ],
};
