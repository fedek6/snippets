import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layouts/HeaderSider";

// markup
const IndexPage = ({ data }) => (
  <>
    <Layout pageTitle="main">
      {data.allMdx.nodes.map((node) => (
        <h1 key={node.id}>{node.frontmatter.title}</h1>
      ))}
    </Layout>
  </>
);

export const query = graphql`
  query {
    allMdx(filter: { fileAbsolutePath: { regex: "/\/javascript\//" } }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          description
        }
        id
        slug
      }
    }
  }
`;

export default IndexPage;
