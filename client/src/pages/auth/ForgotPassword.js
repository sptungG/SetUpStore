import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../common/firebase";

import { toast } from "react-toastify";
import { Form, Input, Button, Typography, Row, Col } from "antd";

import { HiOutlineMail } from "react-icons/hi";

function ForgotPassword({ history }) {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();

  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

  const handleSubmit = async () => {
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("ERROR MSG IN FORGOT PASSWORD", error);
      });
  };
  const ForgotPasswordForm = () => (
    <Form form={form} size="large" layout="vertical" onFinish={handleSubmit}>
      {loading ? <Typography.Title>Loading...</Typography.Title> : <Typography.Title>Forgot Password</Typography.Title>}
      <Typography.Title level={5} type="secondary">
        Just one more step
      </Typography.Title>
      <Form.Item>
        <Input prefix={<HiOutlineMail size={24} />} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }} disabled={!email}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Row style={{ padding: "24px 0" }} align="middle">
      <Col span={10} offset={1} style={{ padding: "0 24px" }}>
        {ForgotPasswordForm()}
        <p style={{ textAlign: "right" }}>
          <Link to="/login">Back to login</Link>
        </p>
      </Col>
      <Col span={12}>
        <img
          src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
          alt="Login"
        />
      </Col>
    </Row>
  );
}

export default ForgotPassword;
