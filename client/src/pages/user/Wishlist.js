import React from "react";

import { Form, Layout, Input, Button, Typography, Row, Col, Space, Card } from "antd";
import Profile from "../../components/profile/Profile";
import UserNav from "../../components/nav/UserNav";
function Wishlist() {
  return (
    <Layout.Content>
      <Row gutter={[24, 24]}>
        <Col flex="none">
          <Profile />
          <UserNav />
        </Col>
        <Col flex="auto">
          <Card>
            <h1 className="text-demo">User AdminDashboard page</h1>
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Wishlist;