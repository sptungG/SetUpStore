import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {  getCategories } from "../../../functions/category";
import { createSub, getSub, removeSub, getSubs, updateSub } from "../../../functions/sub";

import { toast } from "react-toastify";
import { Form, Layout, Row, Col, Card, Typography, Space, Tooltip, Button, Select, Input } from "antd";

import Profile from "../../../components/profile/Profile";
import UserNav from "../../../components/nav/UserNav";
import LocalSearch from "../../../components/form/LocalSearch";
import CategoryTable from "../../../components/table/CategoryTable";
import { BsBackspaceReverse, BsArrowReturnRight } from "react-icons/bs";
function SubPage({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [form] = Form.useForm();

  const [category, setCategory] = React.useState("");
  const [sub, setSub] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const slug = match.params.slug;

  React.useEffect(() => {
    loadCategories();
  }, []);

  React.useEffect(() => {
    if (slug) {
      const loadCategory = () => getSub(slug).then((c) => setCategory(c.data.name));
      loadCategory();
    } else loadCategories();
  }, [slug]);

  const loadCategories = () => getCategories().then((c) => setCategories(c.data));

  const handleCreate = ({ name }) => {
    // console.log(name);
    setLoading(true);
    createSub({ name, parent: category }, user.token)
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
    removeSub(slug, user.token)
      .then((res) => {
        setLoading(false);
        toast.error(`${res.data.name} deleted`);
        history.replace("/admin/category");
        form.resetFields();
        loadCategories();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setLoading(false);
          toast.error(err.response.data);
        }
      });
  };

  const handleEdit = ({ name }) => {
    // console.log(name);
    setLoading(true);
    updateSub(slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        form.resetFields();
        toast.success(`"${res.data.name}" is updated`);
        history.replace("/admin/category");
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const renderFormTitle = () => {
    return (
      <Space size="small" align="start">
        {loading ? (
          <Typography.Title level={4}>Loading...</Typography.Title>
        ) : (
          <Typography.Title level={4}>{slug ? `Update` : "Create new subcategory"}</Typography.Title>
        )}
        {slug ? (
          <Link to="/admin/sub">
            <Tooltip placement="topLeft" title="Back to create">
              <Button type="text" icon={<BsBackspaceReverse size={20} />}></Button>
            </Tooltip>
          </Link>
        ) : (
          ""
        )}
      </Space>
    );
  };

  const renderForm = () => {
    if (slug) form.setFieldsValue({ name: category });
    return (
      <Form form={form} onFinish={slug ? handleEdit : handleCreate} layout="inline" requiredMark={false} size="large">
        <Form.Item>
          <Select placeholder="Please select..." style={{ width: 200 }} onChange={(value) => setCategory(value)}>
            {categories.length > 0 &&
              categories.map((c) => (
                <Select.Option key={c._id} value={c._id}>
                  {c.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name="name" rules={[{ required: true, message: "Please input category!" }]}>
          <Input prefix={<BsArrowReturnRight />} placeholder="Enter category name..." autoFocus />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {slug ? "Save" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const searched = (keyword) => (c) => c.slug.includes(keyword);

  return (
    <Layout.Content>
      <Row gutter={[24, 24]} wrap={false}>
        <Col flex="none">
          <Profile />
          <UserNav />
        </Col>
        <Col flex="auto">
          <Card>
            {renderFormTitle()}
            {renderForm()}
            {JSON.stringify(category)}
          </Card>
          <Card>
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            <CategoryTable data={categories.filter(searched(keyword))} handleRemove={handleRemove} />
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default SubPage;
