const fs = require("fs");
const path = require("path");
const md5 = require("md5");
const util = require("util");
const glob = require("glob");

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  // Additional slug for Mdx nodes
  if (node.internal.type === "Mdx") {
    const fileName = path.basename(node.fileAbsolutePath, ".mdx");
    let shortSlug;
    let category;
    let subCategory;

    const pathInfo = path.dirname(node.fileAbsolutePath).split(path.sep);

    if (fileName === "index") {
      shortSlug = pathInfo.pop();
      subCategory = pathInfo.pop();
      category = pathInfo.pop();
    } else {
      shortSlug = fileName;
      subCategory = pathInfo.pop();
      category = pathInfo.pop();
    }

    createNodeField({
      node,
      name: "subCategory",
      value: subCategory,
    });

    createNodeField({
      node,
      name: "shortSlug",
      value: shortSlug,
    });

    createNodeField({
      node,
      name: "category",
      value: category,
    });
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};

/**
 * Cache busting
 */
const hash = md5(`${new Date().getTime()}`);

const addPageDataVersion = async (file) => {
  const stats = await util.promisify(fs.stat)(file);
  if (stats.isFile()) {
    // eslint-disable-next-line no-console
    console.log(`Adding version to page-data.json in ${file}..`);
    const content = await util.promisify(fs.readFile)(file, "utf8");
    const result = content.replace(
      /page-data.json(\?v=[a-f0-9]{32})?/g,
      `page-data.json?v=${hash}`
    );
    await util.promisify(fs.writeFile)(file, result, "utf8");
  }
};

exports.onPostBootstrap = async () => {
  const loader = path.join(
    __dirname,
    "node_modules/gatsby/cache-dir/loader.js"
  );
  await addPageDataVersion(loader);
};

exports.onPostBuild = async () => {
  const publicPath = path.join(__dirname, "public");
  const htmlAndJSFiles = glob.sync(`${publicPath}/**/*.{html,js}`);
  for (const file of htmlAndJSFiles) {
    // eslint-disable-next-line no-await-in-loop
    await addPageDataVersion(file);
  }
};
