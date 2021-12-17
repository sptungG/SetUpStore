import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { Form, Input, Button, Typography, Row, Col} from "antd";

import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

import { auth } from "../../common/firebase";
import { createOrUpdateUser } from "../../functions/auth";

function RegisterComplete({ history }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [form] = Form.useForm();

  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  React.useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

  React.useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async () => {
    try {
      if (!email || !password) throw new Error("Email and password is required");
      if (password.length < 6) throw new Error("Password must be at least 6 characters long");

      const result = await auth.signInWithEmailLink(email, window.location.href);
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                _id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                picture: res.data.picture,
                role: res.data.role,
                token: idTokenResult.token,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
        // redirect
        history.replace("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <Form form={form} name="form-container" onFinish={handleSubmit} size="large" layout="vertical">
      <Typography.Title>Register Complete</Typography.Title>
      <Typography.Title level={5} type="secondary">
        The last step
      </Typography.Title>
      <Form.Item>
        <Input prefix={<HiOutlineMail size={24} />} value={email} onChange={(e) => setEmail(e.target.value)} disabled />
      </Form.Item>
      <Form.Item>
        <Input.Password
          prefix={<HiOutlineLockClosed size={24} />}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Complete Registration
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Row style={{ padding: "24px 0" }} align="middle">
      <Col span={10} offset={1} style={{ padding: "0 24px" }}>
        {completeRegistrationForm()}
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
export default RegisterComplete;
