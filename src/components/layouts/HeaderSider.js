import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { urlParser } from "../../lib/helpers";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const HeaderSider = ({ pageTitle, children, location }) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        categories: distinct(field: fields___category)
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const { pathname } = location;
  // eslint-disable-next-line no-unused-vars
  const { category: currentCategory, slug: currentSlug } = urlParser(
    pathname,
    JSON.parse(process.env.GATSBY_GET_VARS)
  );

  return (
    <>
      <title>
        {data.site.siteMetadata.title}
        {pageTitle && ` – ${pageTitle}`}
      </title>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            activeKey={currentCategory}
            selectedKeys={currentCategory}
          >
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
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="subnav 3"
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
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
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default HeaderSider;
