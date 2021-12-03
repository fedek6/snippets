import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { urlParser } from "../../lib/helpers";
import { myContext } from "../../Provider";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const HeaderSider = ({
  pageTitle,
  children,
  location,
  categoryContent,
  currentSubCategory,
}) => {
  const { pathname } = location;
  // eslint-disable-next-line no-unused-vars
  const { category: currentCategory, slug: currentSlug } = urlParser(
    pathname,
    JSON.parse(process.env.GATSBY_GET_VARS)
  );

  const data = useStaticQuery(graphql`
    query {
      allMdx {
        categories: distinct(field: fields___category)
        subcategories: distinct(field: frontmatter___subcategory)
      }
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
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" selectedKeys={currentCategory}>
            {data.allMdx.categories.map((category) => {
              const categoryPath = `/${category}`;

              return (
                <Menu.Item key={category}>
                  <Link to={categoryPath}>{category}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Header>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            width={200}
            className="site-layout-background"
          >
            <myContext.Consumer>
              {(context) => (
                <Menu
                  mode="inline"
                  style={{ height: "100%", borderRight: 0 }}
                  activeKey={currentSlug}
                  defaultOpenKeys={[currentSubCategory]}
                  openKeys={context.openKeys}
                  onOpenChange={k => context.setOpenKeys(k)}
                >
                  {categoryContent.map((subCategory) => {
                    const { fieldValue } = subCategory;

                    return (
                      <SubMenu
                        key={fieldValue}
                        icon={<UserOutlined />}
                        title={fieldValue}
                      >
                        {subCategory.edges.map((edge) => (
                          <Menu.Item key={edge.node.fields.shortSlug}>
                            <Link to={`/${edge.node.slug}`}>
                              {edge.node.frontmatter.title}
                            </Link>
                          </Menu.Item>
                        ))}
                      </SubMenu>
                    );
                  })}
                </Menu>
              )}
            </myContext.Consumer>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {children}
              {currentSubCategory}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default HeaderSider;
