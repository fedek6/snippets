import * as React from "react";
import { graphql } from "gatsby";
import MdxBlock from "../../../components/mdx/MdxBlock";
import Layout from "../../../components/layouts/HeaderSider";

// markup
const PlagroundPage = ({ data, location }) => (
  <>
    <Layout
      pageTitle={data.mdx.frontmatter.title}
      currentSubCategory={data.mdx.fields.subCategory}
      location={location}
      categoryContent={data.allMdx.group}
      metaDescription={data.mdx.frontmatter.description}
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
        description
      }
      fields {
        subCategory
      }
      body
    }
    allMdx(filter: { fields: { category: { eq: $fields__category } } }) {
      group(field: fields___subCategory) {
        fieldValue
        edges {
          node {
            frontmatter {
              title
            }
            fields {
              shortSlug
              subCategory
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
