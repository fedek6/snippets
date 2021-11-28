import * as React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../code/CodeBlock";

const components = {
  pre: CodeBlock,
};

const MdxBlock = ({ children }) => (
  <MDXProvider components={components}>
    <MDXRenderer>{children}</MDXRenderer>
  </MDXProvider>
);

export default MdxBlock;
