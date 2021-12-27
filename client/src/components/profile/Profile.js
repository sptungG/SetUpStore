import React from "react";
import { useSelector } from "react-redux";

import { Avatar, Tag, Space, Row, Col, Typography, Card, Button } from "antd";

import { FaHeart } from "react-icons/fa";
import { RiHistoryFill } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";

function Profile() {
  let { user } = useSelector((state) => ({ ...state }));

  const renderTotal = () => {
    return (
      <Space id="profile-total" size="small" style={{ marginTop: 10 }}>
        <Tag color="volcano" icon={<FaHeart />}>
          {100}
        </Tag>
        <Tag color="orange" icon={<RiHistoryFill />}>
          {100}
        </Tag>
        <Tag color="gold" icon={<AiFillStar />}>
          {100}
        </Tag>
      </Space>
    );
  };

  return (
    // <Card cover={<img alt="example" height={100} src="https://source.unsplash.com/random?setup%20desk" />}>
    <Card>
      <Row align="middle" wrap={false}>
        <Col flex="none">
          <Button size="large" shape="circle" style={{ height: 110, width: 110, padding: 2 }}>
            <Avatar size={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100, xxl: 100 }} src={user.picture} />
          </Button>
        </Col>
        <Col flex="auto" style={{ paddingLeft: 10 }}>
          <Row>
            <Typography.Title level={3} style={{ width: 150 }} ellipsis>{user.name}</Typography.Title>
          </Row>
          <Row>
            <Typography.Text style={{ width: 150 }} ellipsis>
              {user.email}
            </Typography.Text>
          </Row>
          <Row>{user.role === "admin" ? "" : renderTotal()}</Row>
        </Col>
      </Row>
    </Card>
  );
}

export default Profile;
