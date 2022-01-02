import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { Layout, Typography, Row, Col, Empty, Button, Statistic, Form, Input, Divider, Tag, Space, List, Card } from "antd";
import { FaMapMarkedAlt } from "react-icons/fa";
import { getUserCart, emptyUserCart, saveUserAddress } from "../functions/user";

function Checkout() {
  const [form] = Form.useForm();
  const [products, setProducts] = React.useState([]);
  const [total, setTotal] = React.useState(0);
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

  const saveAddressToDb = ({ address }) => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
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
            <Form form={form} size="large" layout="inline" requiredMark={false} onFinish={saveAddressToDb}>
              <Form.Item name="address" label="Detail Address" colon={false} rules={[{ required: true }]}>
                <Input prefix={<FaMapMarkedAlt />} placeholder="Enter your address ..." style={{ width: 400 }} />
              </Form.Item>
              <Form.Item>
                <Button size="large" type="primary" htmlType="submit">
                  Save
                </Button>
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
              <Button size="large" type="primary" disabled={!addressSaved || !products.length}>
                Place Order
              </Button>
              <Button size="large" type="text" disabled={!products.length} onClick={emptyCart}>
                Empty Cart
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Checkout;
