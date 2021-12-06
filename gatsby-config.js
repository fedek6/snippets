const path = require("path");
const darkTheme = require("@ant-design/dark-theme").default;
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: "https:/fedek6.github.io",
    title: "Snippets",
    description: "A curated collection of TS and JS snippets."
  },
  pathPrefix: "/snippets",
  plugins: [
    {
      resolve: "gatsby-plugin-react-helmet"
    },
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
              disableBgImage: true,
              quality: 66
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "./src/assets/js-logo.svg",
        name: "Snippets JS & TS",
        short_name: "Snippets",
        start_url: "/",
        background_color: "#1f1f1f",
        theme_color: "#177ddc",
        display: "standalone",
      },
    },
  ],
};
