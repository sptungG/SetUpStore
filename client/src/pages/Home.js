import React from "react";

import { Layout, Typography, Row } from "antd";

import Loader from "../components/loader/Loader";
import TypeWriter from "../components/effect/TypeWriter";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";

function Home() {
  return (
    <Layout.Content>
      <Row justify="center">
        <Typography.Link style={{fontSize: 40}}>
          <TypeWriter text={["Latest Products", "New Arrivals", "Best Sellers"]} />
        </Typography.Link>
      </Row>
      <Typography.Title level={3}>New Arrivals</Typography.Title>
      <NewArrivals />
      <Typography.Title level={3}>Best Sellers</Typography.Title>
      <BestSellers />
    </Layout.Content>
  );
}
export default Home;
