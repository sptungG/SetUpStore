import React from "react";
import { Link } from "react-router-dom";
import { Layout, Affix, Row, Col, Space, Button, Typography } from "antd";
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";

function Footer() {
  return (
    <Layout.Footer style={{ backgroundColor: "#1e2f47", padding: "32px 16px 32px", marginTop: 24 }}>
    <Row justify="center" gutter={[16, 24]}></Row>
  </Layout.Footer>
  );
}

export default Footer;
