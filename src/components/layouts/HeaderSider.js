import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Layout, Menu } from "antd";
import { urlParser } from "../../lib/helpers";
import { myContext } from "../../Provider";
import Logo from "../../assets/logo-inverted.svg";
import {
  categoryDecorator,
  subCategoryDecorator,
} from "../../data/contentDecorators";
import * as style from "./index.module.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const HeaderSider = ({
  pageTitle = "",
  children,
  location,
  categoryContent = [],
  currentSubCategory = "",
}) => {
  const { pathname } = location;
  // eslint-disable-next-line no-unused-vars
  const { category: currentCategory, slug: currentSlug } = urlParser(
    pathname,
    JSON.parse(process.env.GATSBY_GET_VARS)
  );

  const data = useStaticQuery(graphql`
    query {
      allMdx(filter: { fields: { category: { ne: "content" } } }) {
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
        <Header className={["header", style.navbar]}>
          <div
            className="logo"
            style={{
              float: "left",
              width: "auto",
              paddingRight: "24px",
            }}
          >
            <Link to="/">
              <img
                src={Logo}
                alt="Realhero logo"
                style={{
                  width: "32px",
                  height: "auto",
                }}
              />
            </Link>
          </div>
          <Menu theme="dark" mode="horizontal" selectedKeys={currentCategory}>
            {data.allMdx.categories.map((category) => {
              const categoryPath = `/${category}`;
              const { niceName, description } = categoryDecorator.decorate(category);

              return (
                <Menu.Item key={category}>
                  <Link to={categoryPath} title={description}>
                    {niceName}
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Header>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            width={250}
            className={["site-layout-background", style.sider]}
          >
            <myContext.Consumer>
              {(context) => (
                <Menu
                  mode="inline"
                  style={{ height: "100%", borderRight: 0 }}
                  activeKey={currentSlug}
                  defaultOpenKeys={[currentSubCategory]}
                  openKeys={context.openKeys}
                  onOpenChange={(k) => context.setOpenKeys(k)}
                  className="site-layout-background"
                  selectedKeys={currentSlug}
                >
                  {categoryContent.map((subCategory) => {
                    const { fieldValue } = subCategory;
                    const { niceName, icon: Icon } =
                      subCategoryDecorator.decorate(fieldValue);

                    return (
                      <SubMenu
                        key={fieldValue}
                        icon={<Icon />}
                        title={niceName}
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
          <Layout className={style.content}>
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
