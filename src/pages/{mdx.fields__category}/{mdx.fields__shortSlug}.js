import * as React from "react";
import { graphql } from "gatsby";
import MdxBlock from "../../components/mdx/MdxBlock";
import Layout from "../../components/layouts/HeaderSider";

// markup
const PlagroundPage = ({ data, location }) => (
  <>
    <Layout
      pageTitle={data.mdx.frontmatter.title}
      location={location}
      categoryContent={data.allMdx.group}
    >
      <MdxBlock>{data.mdx.body}</MdxBlock>
    </Layout>
  </>
);

export const query = graphql`
  query ($id: String, $fields__category: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      body
    }
    allMdx(filter: { fields: { category: { eq: $fields__category } } }) {
      group(field: frontmatter___subcategory) {
        fieldValue
        edges {
          node {
            frontmatter {
              title
              subcategory
            }
            fields {
              shortSlug
            }
            slug
          }
        }
        totalCount
      }
    }
  }
`;

export default PlagroundPage;
