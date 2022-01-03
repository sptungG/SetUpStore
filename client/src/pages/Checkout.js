import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { Layout, Typography, Row, Col, Popconfirm, Button, Statistic, Form, Input, Select, Tag, Space, List, Card } from "antd";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";
import { areas } from "../common/constant";
import { vietnameseSlug } from "../common/utils";

function Checkout() {
  const [form] = Form.useForm();
  const [products, setProducts] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [areaSaved, setAreaSaved] = React.useState(false);
  const [addressSaved, setAddressSaved] = React.useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  const saveAddressToDb = ({ area, address }) => {
    // console.log(area, address);
    saveUserAddress(user.token, area, address).then((res) => {
      if (res.data.ok) {
        setAreaSaved(true);
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  return (
    <Layout.Content>
      <Row wrap={false} style={{ marginTop: 24 }} gutter={[24, 24]}>
        <Col flex="auto">
          <Card>
            <Typography.Title level={3}>Delivery Address</Typography.Title>
            <Form form={form} size="large" layout="vertical" requiredMark={false} onFinish={saveAddressToDb}>
              <Form.Item name="area" label="Area" colon={false} rules={[{ required: true }]}>
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) => vietnameseSlug(option.children, " ").indexOf(vietnameseSlug(input, " ")) >= 0}
                  placeholder="Select your area ..."
                >
                  {areas.map((item) => (
                    <Select.Option value={item}>{item}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="address" label="Detail Address" colon={false} rules={[{ required: true }]}>
                <Input.TextArea showCount maxLength={300} placeholder="Enter your address ..." />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button size="large" type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Button size="large" type="text" htmlType="button" onClick={() => form.resetFields()}>
                    Reset
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
          <Card>
            <Typography.Title level={4}>Got Coupon?</Typography.Title>
            <br />
            coupon input and apply button
          </Card>
        </Col>
        <Col flex="560px">
          <Card>
            <Typography.Title level={3}>Order Summary</Typography.Title>
            <List
              itemLayout="vertical"
              dataSource={products}
              renderItem={(item) => (
                <List.Item key={item._id}>
                  <Row justify="space-between">
                    <Typography.Text>
                      {item.product.name} <Tag color={item.color.toLowerCase() !== "white" && item.color.toLowerCase()}>{item.color}</Tag> x <b>{item.count}</b>
                    </Typography.Text>
                    <Typography.Text>
                      <b>${item.product.price * item.count}</b>
                    </Typography.Text>
                  </Row>
                </List.Item>
              )}
              header={<div>Products</div>}
              footer={<Statistic title="Total" prefix="$" groupSeparator="." value={total} />}
            />

            <Space size={24}>
              <Button size="large" type="primary" disabled={!areaSaved || !addressSaved || !products.length}>
                Place Order
              </Button>
              <Popconfirm title={<p>Sure to empty cart ?</p>} placement="topRight" okText={<BsCheckLg />} cancelText={<BsXLg />} onConfirm={() => emptyCart()}>
                <Button size="large" type="text" disabled={!products.length}>
                  Empty Cart
                </Button>
              </Popconfirm>
            </Space>
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Checkout;
