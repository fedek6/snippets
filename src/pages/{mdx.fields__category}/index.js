import * as React from "react";
import { graphql } from "gatsby";
import MdxBlock from "../../components/mdx/MdxBlock";
import Layout from "../../components/layouts/HeaderSider";

// markup
const PlagroundPage = ({ data, location }) => (
  <>
    <Layout pageTitle="main" location={location}>
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
  query ($fields__category: String) {
    allMdx(filter: {fields: {category: {eq: $fields__category}}}, sort: { fields: frontmatter___date, order: DESC }) {
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
