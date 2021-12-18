import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createCategory, getCategories, removeCategory} from "../../../functions/category";

import { toast } from "react-toastify";
import { Form, Table, Layout, Input, Button, Typography, Row, Col, Space, Card, Popconfirm } from "antd";

import Profile from "../../../components/profile/Profile";
import UserNav from "../../../components/nav/UserNav";
import { BsArrowReturnRight, BsTrash, BsThreeDots, BsCheckLg, BsXLg } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

function CategoryCreate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [form] = Form.useForm();

  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => getCategories().then((c) => setCategories(c.data));

  const handleCreate = ({ name }) => {
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        toast.success(`"${res.data.name}" is created`);
        form.resetFields();
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // console.log(answer, slug);
    setLoading(true);
    removeCategory(slug, user.token)
      .then((res) => {
        setLoading(false);
        toast.error(`${res.data.name} deleted`);
        loadCategories();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setLoading(false);
          toast.error(err.response.data);
        }
      });
  };

  const categoryForm = () => (
    <Form form={form} onFinish={handleCreate} layout="inline" requiredMark={false} size="large">
      <Form.Item name="name" rules={[{ required: true, message: "Please input category name!" }]}>
        <Input prefix={<BsArrowReturnRight />} placeholder="Enter category name..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {"Add"}
        </Button>
      </Form.Item>
    </Form>
  );

  const renderTable = () => {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <Typography.Text>{text}</Typography.Text>,
        sorter: (a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0),
        sortDirections: ["ascend"],
      },
      {
        title: "Create At",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 150,
        render: (text) => <Typography.Text>{new Date(text).toLocaleDateString("vi-VI")}</Typography.Text>,
        sortDirections: ["ascend"],
        sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      },
      {
        title: <BsThreeDots size={24} />,
        dataIndex: "",
        key: "action",
        width: 150,
        render: (text, record) => (
          <Space size="middle">
            <Link to={`/admin/category/${record.slug}`}>
              <Button size="large" type="text" icon={<BiEdit />}></Button>
            </Link>
            <Popconfirm
              title={
                <p>
                  Sure to delete <b>{record.name}</b>
                </p>
              }
              placement="topRight"
              okText={<BsCheckLg />}
              cancelText={<BsXLg />}
              onConfirm={() => handleRemove(record.slug)}
            >
              <Button size="large" type="text" danger icon={<BsTrash />}></Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];

    return (
      <Table
        columns={columns}
        title={() => ""}
        footer={() => (
          <p style={{ position: "absolute" }}>
            Total <b>{categories.length}</b> items
          </p>
        )}
        dataSource={categories}
        pagination={{ pageSize: 4 }}
      />
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
            {loading ? (
              <Typography.Title level={3}>Loading...</Typography.Title>
            ) : (
              <Typography.Title level={3}>{"Create new category"}</Typography.Title>
            )}
            {categoryForm()}
          </Card>
          <Card>{renderTable()}</Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default CategoryCreate;
