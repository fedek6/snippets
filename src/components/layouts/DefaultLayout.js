import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

const DefaultLayout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <title>
        {data.site.siteMetadata.title}
        {pageTitle && ` – ${pageTitle}`}
      </title>
      <Layout>
        <Header>{pageTitle}</Header>
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            Sider
          </Sider>
          <Content>{children}</Content>
        </Layout>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Footer
        </Footer>
      </Layout>
    </>
  );
};

export default DefaultLayout;
