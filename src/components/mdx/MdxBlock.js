import * as React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { Typography } from "antd";
import CodeBlock from "./components/CodeBlock";

const { Title, Paragraph, Text } = Typography;

const components = {
  code: ({ children }) => (<Text code>{ children }</Text>),
  pre: CodeBlock,
  p: Paragraph,
};

for (let i = 1; i <= 6; i += 1) {
  components[`h${i}`] = ({ children }) => (
    <Title level={i}>{children}</Title>
  );
};

const MdxBlock = ({ children }) => (
  <MDXProvider components={components}>
    <MDXRenderer>{children}</MDXRenderer>
  </MDXProvider>
);

export default MdxBlock;
