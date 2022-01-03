import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Layout, Typography, Row, Col, Empty, Button, Statistic, Table, Tag, Space, List, Card } from "antd";

import { userCart } from "../functions/user";
import CartTable from "../components/table/CartTable";

function Cart({ history }) {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        // console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  return (
    <Layout.Content>
      <Row wrap={false} gutter={[24, 24]}>
        <Col flex="auto">
          <Typography.Title level={3}>
            Cart <Typography.Link>{cart.length}</Typography.Link> product
          </Typography.Title>
          {!cart.length ? (
            <Card style={{ margin: 0 }}>
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
            <CartTable data={cart} />
          )}
        </Col>
        <Col flex="360px">
          <Card style={{ marginTop: 48 }}>
            <Typography.Title level={3}>Order Summary</Typography.Title>
            <List
              itemLayout="vertical"
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
              <Button size="large" type="primary" onClick={saveOrderToDb} disabled={!cart.length}>
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
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Cart;
