import React from "react";

import { Layout, Typography, Row, Divider } from "antd";

import Loader from "../components/loader/Loader";
import TypeWriter from "../components/effect/TypeWriter";
import Footer from "../components/nav/Footer";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/list/CategoryList";
import SubList from "../components/list/SubList";

function Home() {
  return (
    <>
      <Layout.Content>
        <Row justify="center" style={{ margin: "16px 0" }}>
          <Typography.Link style={{ fontSize: 40 }}>
            <TypeWriter text={["Latest Products", "New Arrivals", "Best Sellers"]} />
          </Typography.Link>
        </Row>
        <CategoryList />
        <BestSellers />
        <NewArrivals />
        <Divider orientation="left">Sub-categories</Divider>
        <SubList type="tag" />
      </Layout.Content>
      <Footer />
    </>
  );
}
export default Home;
