import * as React from "react";
import { graphql } from "gatsby";
import MdxBlock from "../components/mdx/MdxBlock";
import Layout from "../components/layouts/HeaderSider";

// markup
const PlagroundPage = ({ data }) => (
  <>
    <Layout pageTitle="main">
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <h2>{node.frontmatter.title}</h2>
          <p>Posted: {node.frontmatter.date}</p>
          <MdxBlock>{node.body}</MdxBlock>
        </article>
      ))}
    </Layout>
  </>
);

export default PlagroundPage;

export const query = graphql`
  query MyQuery {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        id
        body
      }
    }
  }
`;
