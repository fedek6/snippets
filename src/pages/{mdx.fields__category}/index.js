import * as React from "react";
import { graphql } from "gatsby";
import { Typography } from "antd";
import Layout from "../../components/layouts/HeaderSider";
import { subCategoryDecorator } from "../../data/contentDecorators";

// markup
const PlagroundPage = ({ data, location }) => (
  <>
    <Layout
      pageTitle="main"
      location={location}
      categoryContent={data.allMdx.group}
    >
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <h2>{node.frontmatter.title}</h2>
        </article>
      ))}

      {data.allMdx.group.map((subCategory) => {
        const { fieldValue } = subCategory;
        const { niceName, description } =
          subCategoryDecorator.decorate(fieldValue);

        return (
          <>
            <Typography.Title key={fieldValue} level={2}>
              {niceName}
            </Typography.Title>
            <Typography.Paragraph>{description}</Typography.Paragraph>
          </>
        );
      })}
    </Layout>
  </>
);

export default PlagroundPage;

export const query = graphql`
  query ($fields__category: String) {
    allMdx(
      filter: { fields: { category: { eq: $fields__category } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        id
        body
      }
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
