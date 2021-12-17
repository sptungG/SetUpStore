import React from "react";
import { auth } from "../../common/firebase";

import { toast } from "react-toastify";
import { Form, Input, Button, Typography, Row, Col, Space, Card } from "antd";

import { HiOutlineLockClosed } from "react-icons/hi";
import { FaUserLock } from "react-icons/fa";

import Profile from "../../components/profile/Profile";
import UserNav from "../../components/nav/UserNav";
function Setting() {
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    setLoading(true);
    // console.log(password);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <Form form={form} size="large" layout="vertical" onFinish={handleSubmit}>
      <Form.Item>
        {loading ? (
          <Typography.Title level={2}>Loading...</Typography.Title>
        ) : (
          <Space align="baseline">
            <FaUserLock size={28} />
            <Typography.Title level={3}>Password Update</Typography.Title>
          </Space>
        )}
        <Input.Password
          prefix={<HiOutlineLockClosed size={24} />}
          type="password"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }} disabled={!password || password.length < 6 || loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Row style={{ padding: 24}} gutter={[24, 24]}>
      <Col flex="none">
        <Profile />
        <UserNav />
      </Col>
      <Col flex="auto">
        <Card>{passwordUpdateForm()}</Card>
      </Col>
    </Row>
  );
}

export default Setting;
