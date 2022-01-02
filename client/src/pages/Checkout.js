import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Layout, Typography, Row, Col, Empty, Button, Statistic, Table, Tag, Space, List, Card } from "antd";
function Checkout() {
  const saveAddressToDb = () => {
    //
  };

  return (
    <Layout.Content>
      <Row wrap={false} style={{ marginTop: 24 }} gutter={[24, 24]}>
        <Col flex="auto">
          <Typography.Title level={3}>Delivery Address</Typography.Title>
          <br />
          <br />
          textarea
          <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
            Save
          </button>
          <hr />
          <Typography.Title level={4}>Got Coupon?</Typography.Title>
          <br />
          coupon input and apply button
        </Col>
        <Col flex="360px">
          <Card>
            <Typography.Title level={3}>Order Summary</Typography.Title>
            <hr />
            <p>Products x</p>
            <hr />
            <p>List of products</p>
            <hr />
            <p>Cart Total: $x</p>

            <Space size={24}>
              <Button size="large" type="primary">
                Place Order
              </Button>
              <Button size="large" type="text">
                Empty Cart
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Checkout;
