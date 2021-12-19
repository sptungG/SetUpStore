import React from "react";

import { Card, Form, Input, Button, Typography, Space, Tooltip } from "antd";

import { BsArrowReturnRight, BsQuestionCircle } from "react-icons/bs";

function CategoryForm({ loading = true, slug = "", category = "", handleEdit, handleCreate }) {
  const [form] = Form.useForm();
  slug ? form.setFieldsValue({ name: category }) : form.setFieldsValue({ name: "" });
  return (
    <Card>
      <Space size="small">
        {loading ? (
          <Typography.Title level={3}>Loading...</Typography.Title>
        ) : (
          <Typography.Title level={3}>{slug ? `Update ${category}` : "Create new category"}</Typography.Title>
        )}
        <Tooltip placement="topLeft" title="Category name should contain more than 2 characters.">
          <Button type="text" style={{ alignItems: "flex-start" }}>
            <BsQuestionCircle size={18} />
          </Button>
        </Tooltip>
      </Space>
      <Form form={form} onFinish={slug ? handleEdit : handleCreate} layout="inline" requiredMark={false} size="large">
        <Form.Item name="name" rules={[{ required: true, message: "Please input category name!" }]}>
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
