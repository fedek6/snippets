import * as React from "react";
import { graphql } from "gatsby";
import MdxBlock from "../../components/mdx/MdxBlock";
import Layout from "../../components/layouts/HeaderSider";

// markup
const PlagroundPage = ({ data }) => (
  <>
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <MdxBlock>{data.mdx.body}</MdxBlock>
    </Layout>
  </>
);

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      body
    }
  }
`;

export default PlagroundPage;
