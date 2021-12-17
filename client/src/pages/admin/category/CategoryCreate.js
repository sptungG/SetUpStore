import React from 'react'
import { Form, Input, Button, Typography, Row, Col, Space, Card } from "antd";
import Profile from "../../../components/profile/Profile";
import UserNav from "../../../components/nav/UserNav";
function CategoryCreate() {
  return (
    <Row style={{ padding: 24 }} gutter={[24, 24]}>
      <Col flex="none">
        <Profile />
        <UserNav />
      </Col>
      <Col flex="auto">
        <Card>
          <h1 className="text-demo">User CategoryCreate page</h1>
        </Card>
      </Col>
    </Row>
  )
}

export default CategoryCreate
