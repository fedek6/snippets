module.exports = {
  rules: {
    quotes: ["warn", "double", { allowTemplateLiterals: true }],
    "quote-props": ["error", "as-needed"],
  },
  extends: ["gatsby-standard", "airbnb-base", "react-app", "prettier"],
};
