import * as React from "react";
import Layout from "../components/layouts/HeaderSider";

// markup
const HomePage = ({ location }) => (
  <>
    <Layout pageTitle="home" location={location}>
      Hello World!
    </Layout>
  </>
);

export default HomePage;
