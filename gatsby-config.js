const path = require("path");
const darkTheme = require("@ant-design/dark-theme").default;
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

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
    "gatsby-plugin-sharp",
    "gatsby-remark-images",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: "gatsby-remark-image-attributes",
            options: {
              // dataAttributes: false
            }
          }
        ],
      },
    },
  ],
};
