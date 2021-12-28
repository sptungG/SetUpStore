import React from "react";

import { Form, Typography, Button, Input, InputNumber, Select, Radio } from "antd";
import UploadImage from "./UploadImage";

function ProductForm({ form, onFinish, categories, handleCategoryChange, showSub, subOptions, setLoading }) {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  return (
    <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false} size="large">
      <Form.Item>
        <Typography.Title level={4}>{"Create new product"}</Typography.Title>
      </Form.Item>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="Enter product name..." autoFocus />
      </Form.Item>
      <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
        <Input placeholder="Enter brand..." />
      </Form.Item>
      <Form.Item name="desc" label="Description" rules={[{ required: true }]}>
        <Input.TextArea showCount maxLength={250} placeholder="Enter description..." />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
        <InputNumber placeholder="Enter price..." style={{ width: "50%" }} />
      </Form.Item>
      <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
        <InputNumber placeholder="Enter quantity..." style={{ width: "50%" }} />
      </Form.Item>
      <Form.Item name="shipping" label="Shipping" rules={[{ required: true }]} style={{ flexDirection: "row", columnGap: 20 }}>
        <Radio.Group>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="color" label="Color" rules={[{ required: true }]}>
        <Select placeholder="Please select color...">
          {colors.length > 0 &&
            colors.map((c) => (
              <Select.Option key={c} value={c}>
                {c}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        <Select placeholder="Select category..." onChange={handleCategoryChange}>
          {categories.length > 0 &&
            categories.map((c) => (
              <Select.Option key={c._id} value={c._id}>
                {c.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      {showSub && (
        <Form.Item name="subs" label="Sub-category" rules={[{ required: true }]}>
          <Select mode="multiple" placeholder="Select sub-category...">
            {subOptions.length &&
              subOptions.map((s) => (
                <Select.Option key={s._id} value={s._id}>
                  {s.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item label="Image">
        <UploadImage form={form} setLoading={setLoading} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          {"Create"}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ProductForm;
