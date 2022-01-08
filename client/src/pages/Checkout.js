import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { Layout, Typography, Row, Col, Popconfirm, Button, Statistic, Form, Input, Select, Tag, Space, List, Card } from "antd";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { RiCouponLine } from "react-icons/ri";

import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon, createCashOrderForUser } from "../functions/user";
import { areas } from "../common/constant";
import { vietnameseSlug } from "../common/utils";
import CheckoutSteps from "../components/nav/CheckoutSteps";

function Checkout({ history }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [areaSaved, setAreaSaved] = React.useState(false);
  const [addressSaved, setAddressSaved] = React.useState(false);

  const [totalAfterDiscount, setTotalAfterDiscount] = React.useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponState = useSelector((state) => state.coupon);

  React.useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
      setAreaSaved(user.area);
      setAddressSaved(user.address);
    });
  }, []);

  const emptyCart = () => {
    setLoading(true);
    // remove from local storage
    if (typeof window !== "undefined") localStorage.removeItem("cart");
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setLoading(false);
      setTotalAfterDiscount(0);
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  const saveAddressToDb = ({ area, address }) => {
    // console.log(area, address);
    setLoading(true);
    saveUserAddress(user.token, area, address).then((res) => {
      if (res.data.ok) {
        setAreaSaved(true);
        setAddressSaved(true);
        toast.success("Address saved");
        setLoading(false);
      }
    });
  };

  const applyDiscountCoupon = ({ coupon }) => {
    setLoading(true);
    // console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      // console.log("RES ON COUPON APPLIED", res.data);
      // error
      if (res.data.err) {
        setLoading(false);
        toast.error(res.data.err);
        // update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      } else if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });

        setLoading(false);
        toast.success("Discount applied successfully!");
      }
    });
  };

  const createCashOrder = () => {
    setLoading(true);
    createCashOrderForUser(user.token, COD, couponState).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // empty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          setLoading(false);
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  const renderAddressForm = () => (
    <Card>
      <Typography.Title level={3}>Delivery Address</Typography.Title>
      <Form
        form={form}
        size="large"
        layout="vertical"
        requiredMark={false}
        onFinish={saveAddressToDb}
        initialValues={{ area: user.area, address: user.address }}
      >
        <Form.Item name="area" label="Area" colon={false} rules={[{ required: true }]}>
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => vietnameseSlug(option.children, " ").indexOf(vietnameseSlug(input, " ")) >= 0}
            placeholder="Select your area ..."
          >
            {areas.map((item) => (
              <Select.Option key={vietnameseSlug(item)} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="address" label="Detail Address" colon={false} rules={[{ required: true }]}>
          <Input.TextArea showCount maxLength={300} placeholder="Enter your address ..." />
        </Form.Item>
        <Form.Item>
          <Space size={24}>
            <Button size="large" type="primary" htmlType="submit" loading={loading} style={{ width: 160 }}>
              Save
            </Button>
            <Button size="large" type="text" htmlType="button" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );

  const renderCoupon = () => (
    <Space direction="vertical" style={{ marginTop: 24 }}>
      <Card style={{ backgroundColor: "rgba(245, 103, 102, 0.02)" }}>
        <Form layout="vertical" size="large" onFinish={applyDiscountCoupon}>
          <Typography.Title level={4}>Got Coupon?</Typography.Title>
          <Form.Item name="coupon" style={{ margin: 0 }}>
            <Input
              placeholder="Enter coupon..."
              style={{ padding: "5px 5px 5px 10px" }}
              allowClear
              prefix={<RiCouponLine size={24} />}
              suffix={
                <Button loading={loading} type="primary" htmlType="submit" disabled={!products.length}>
                  Apply
                </Button>
              }
            />
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );

  const renderSummary = () => (
    <Card>
      <Typography.Title level={3}>Order Summary</Typography.Title>
      <List
        loading={loading}
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
        footer={
          totalAfterDiscount > 0 ? (
            <Statistic
              title="Total"
              prefix="$"
              groupSeparator="."
              valueStyle={{ color: "#07bc0c" }}
              value={totalAfterDiscount}
              suffix={
                <Typography.Text delete type="danger" style={{ fontSize: 16 }}>
                  {total}
                </Typography.Text>
              }
            />
          ) : (
            <Statistic title="Total" prefix="$" groupSeparator="." value={total} />
          )
        }
      />

      <Space size={24}>
        {COD ? (
          <Button
            size="large"
            type="primary"
            loading={loading}
            onClick={createCashOrder}
            disabled={!areaSaved || !addressSaved || !products.length}
            style={{ width: 160 }}
          >
            Place Order
          </Button>
        ) : (
          <Button
            size="large"
            type="primary"
            loading={loading}
            onClick={() => history.push("/payment")}
            disabled={!areaSaved || !addressSaved || !products.length}
            style={{ width: 160 }}
          >
            Place Order
          </Button>
        )}
        <Popconfirm title={<p>Sure to empty cart ?</p>} placement="topRight" okText={<BsCheckLg />} cancelText={<BsXLg />} onConfirm={() => emptyCart()}>
          <Button size="large" type="text" disabled={!products.length}>
            Empty Cart
          </Button>
        </Popconfirm>
      </Space>
    </Card>
  );

  return (
    <Layout.Content>
      <CheckoutSteps current={1} />
      <Row wrap={false} gutter={[24, 24]}>
        <Col flex="auto">
          {renderAddressForm()}
          {renderCoupon()}
        </Col>
        <Col flex="560px">{renderSummary()}</Col>
      </Row>
    </Layout.Content>
  );
}

export default Checkout;
