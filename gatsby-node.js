const path = require("path");

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  // Additional slug for Mdx nodes
  if (node.internal.type === "Mdx") {
    const fileName = path.basename(node.fileAbsolutePath, ".mdx");
    let shortSlug;
    let category;

    const pathInfo = path.dirname(node.fileAbsolutePath).split(path.sep);

    if (fileName === "index") {
      shortSlug = pathInfo.pop();
      category = pathInfo.pop();
    } else {
      shortSlug = fileName;
      category = pathInfo.pop();
    }

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
