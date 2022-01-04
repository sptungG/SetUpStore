import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Layout, Typography, Row, Col, Empty, Button, Statistic, Space, List, Card } from "antd";

import { userCart } from "../functions/user";
import CartTable from "../components/table/CartTable";
import CheckoutSteps from "../components/nav/CheckoutSteps";

function Payment({ history }) {
  const [loading, setLoading] = React.useState(false);
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    setLoading(true);
    userCart(cart, user.token)
      .then((res) => {
        // console.log("CART POST RES", res);
        setLoading(false);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const renderSummary = () => (
    <Card>
      <Typography.Title level={3}>Order Summary</Typography.Title>
      <List
        itemLayout="vertical"
        loading={loading}
        dataSource={cart}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <Row justify="space-between">
              <Typography.Text>
                {item.name} x <b>{item.count}</b>
              </Typography.Text>
              <Typography.Text>
                <b>${item.price * item.count}</b>
              </Typography.Text>
            </Row>
          </List.Item>
        )}
        header={<div>Products</div>}
        footer={<Statistic title="Total" prefix="$" groupSeparator="." value={getTotal()} />}
      />
      {user ? (
        <Button size="large" type="primary" loading={loading} onClick={saveOrderToDb} disabled={loading || !cart.length}>
          Proceed to Checkout
        </Button>
      ) : (
        <Link
          to={{
            pathname: "/login",
            state: { from: "cart" },
          }}
        >
          <Button size="large" type="primary">
            Login to Checkout
          </Button>
        </Link>
      )}
    </Card>
  );

  return (
    <Layout.Content>
      <CheckoutSteps current={2} />
      <Row wrap={false} gutter={[24, 24]}>
        <Col flex="auto">
          {!cart.length ? (
            <Card>
              <Empty
                description={
                  <span>
                    Your cart is empty now.
                    <b>
                      <Link to="/store">Continue Shopping.</Link>
                    </b>
                  </span>
                }
              />
            </Card>
          ) : (
            <Card size="small">
              <CartTable loading={loading} data={cart} />
            </Card>
          )}
        </Col>
        <Col flex="360px">{renderSummary()}</Col>
      </Row>
    </Layout.Content>
  );
}

export default Payment;
