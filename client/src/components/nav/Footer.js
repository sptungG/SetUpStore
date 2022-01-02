import React from "react";
import { Link } from "react-router-dom";
import { Layout,  Row, Col, Space, Button, Typography } from "antd";
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";

function Footer() {
  return (
    <Layout.Footer style={{ backgroundColor: "#ffc1bd", padding: 24, marginTop: 24 }}>
    <Row justify="center" gutter={[24, 24]}>
    <Typography.Title level={4}>Footer</Typography.Title>
    </Row>
  </Layout.Footer>
  );
}

export default Footer;
