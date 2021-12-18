import React from "react";
import { useSelector } from "react-redux";

import { getCategory, updateCategory } from "../../../functions/category";

import { toast } from "react-toastify";
import { Form, Layout, Input, Button, Typography, Row, Col, Space, Card } from "antd";

import Profile from "../../../components/profile/Profile";
import UserNav from "../../../components/nav/UserNav";
import { BsArrowReturnRight } from "react-icons/bs";

function CategoryUpdate({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [form] = Form.useForm();

  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => getCategory(match.params.slug).then((c) => setName(c.data.name));

  const handleEdit = ({ name }) => {
    // console.log(name);
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        form.resetFields();
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const categoryForm = () => {
    form.setFieldsValue({ name });
    return (
      <Form form={form} onFinish={handleEdit} layout="inline" requiredMark={false} size="large">
        <Form.Item name="name" rules={[{ required: true, message: "Please input category name!" }]}>
          <Input prefix={<BsArrowReturnRight />} placeholder="Enter category name..." autoFocus />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Layout.Content>
      <Row gutter={[24, 24]}>
        <Col flex="none">
          <Profile />
          <UserNav />
        </Col>
        <Col flex="auto">
          <Card>
            {loading ? <Typography.Title level={3}>Loading...</Typography.Title> : <Typography.Title level={3}>Update category {name}</Typography.Title>}
            {categoryForm()}
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default CategoryUpdate;
