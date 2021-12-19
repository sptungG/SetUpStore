import React from "react";
import { Link } from "react-router-dom";

import { Card, Form, Input, Button, Typography, Space, Tooltip } from "antd";

import { BsArrowReturnRight, BsBackspaceReverse } from "react-icons/bs";

function CategoryForm({ loading = true, slug = "", category = "", handleEdit, handleCreate }) {
  const [form] = Form.useForm();
  slug ? form.setFieldsValue({ name: category }) : form.setFieldsValue({ name: "" });
  return (
    <Card>
      <Space size="small" align="start">
        {loading ? (
          <Typography.Title level={4}>Loading...</Typography.Title>
        ) : (
          <Typography.Title level={4}>{slug ? `Update ${category}` : "Create new category"}</Typography.Title>
        )}
        {slug ? (
          <Link to="/admin/category">
            <Tooltip placement="topLeft" title="Back to create">
              <Button type="text" icon={<BsBackspaceReverse size={20} />}></Button>
            </Tooltip>
          </Link>
        ) : (
          ""
        )}
      </Space>
      <Form form={form} onFinish={slug ? handleEdit : handleCreate} layout="inline" requiredMark={false} size="large">
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Please input category!" },
            {
              min: 2,
              message: "Category must be minimum 2 characters.",
            },
          ]}
        >
          <Input prefix={<BsArrowReturnRight />} placeholder="Enter category name..." autoFocus />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {slug ? "Save" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default CategoryForm;
