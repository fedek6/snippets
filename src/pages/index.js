import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layouts/HeaderSider";
import MdxBlock from "../components/mdx/MdxBlock";

// markup
const HomePage = ({ data, location }) => (
  <>
    <Layout pageTitle="home" location={location}>
      <MdxBlock>{data.mdx.body}</MdxBlock>
    </Layout>
  </>
);

export const query = graphql`
  query {
    mdx(slug: { eq: "home" }) {
      frontmatter {
        title
      }
      body
    }
  }
`;

export default HomePage;
