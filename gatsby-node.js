const path = require("path");

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
