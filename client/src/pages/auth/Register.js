import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { Form, Layout, Input, Button, Typography, Row, Col } from "antd";
import { HiOutlineMail } from "react-icons/hi";

import { auth } from "../../common/firebase";
import { validateEmail } from "../../common/utils";
import Gallery from "./Gallery";

function Register({ history }) {
  const [email, setEmail] = React.useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

  const handleSubmit = async () => {
    try {
      if (email.trim() === "") throw new Error("Invalid email");
      if (!validateEmail(email)) throw new Error(`${email} is not an email!`);

      const config = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
      };

      await auth.sendSignInLinkToEmail(email, config);

      toast.success(`Email is sent to ${email}.\nClick the link to complete your registration.`);
      // save user email in local storage
      window.localStorage.setItem("emailForRegistration", email);
      // clear state
      setEmail("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const RegistrationForm = () => (
    <Form form={form} size="large" layout="vertical" onFinish={handleSubmit}>
      <Typography.Title>Create new account</Typography.Title>
      <Typography.Title level={5} type="secondary">
        Just one more step
      </Typography.Title>
      <Form.Item>
        <Input prefix={<HiOutlineMail size={24} />} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Layout.Content>
      <Row wrap={false} gutter={[54, 48]}>
        <Col flex="480px">
          {RegistrationForm()}
          <p style={{ textAlign: "center" }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Col>
        <Col flex="auto">
        <Gallery />
        </Col>
      </Row>
    </Layout.Content>
  );
}
export default Register;
