import * as React from "react";
import { graphql, Link } from "gatsby";
import { Typography, Divider } from "antd";
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
            {subCategory.edges.map((edge) => {
              const { frontmatter, slug } = edge.node;

              return (
                <li key="1">
                  <Link to={`/${slug}`}>{frontmatter.title}</Link>
                  <Typography.Text keyboard>{frontmatter.date}</Typography.Text>
                  <Typography.Paragraph>
                    {frontmatter.description}
                  </Typography.Paragraph>
                </li>
              );
            })}
            <Divider />
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
      group(field: frontmatter___subcategory) {
        fieldValue
        edges {
          node {
            frontmatter {
              title
              subcategory
              date(formatString: "MMMM D, YYYY")
              description
            }
            fields {
              shortSlug
              category
            }
            slug
          }
        }
        totalCount
      }
    }
  }
`;
