import React, { useState } from "react";
import {
  Typography,
  Button,
  Layout,
  Image,
  InputNumber,
  Divider,
  Form,
  Input,
} from "antd";

const Checkout = () => {
  const [currentScreen, setCurrentScreen] = useState("cart");
  const [quantity, setQuantity] = useState(1);
  const PROPS = {
    productImg:
      "https://grovemade.com/static/thumbnails/shop/variant/walnut-ipad-stand-gridA-A3_400x400_85.jpg?_v=1603835220.37",
    productName: "Wood iPad Stand",
    productPrice: "90",
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  return (
    <>
      {currentScreen === "cart" && (
        <Layout
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography.Title type="primary">My Cart</Typography.Title>

          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "50%" }}
            onClick={() => setCurrentScreen("info")}
          >
            Continue to Checkout
          </Button>
          <div style={{ display: "flex", width: "50%" }}>
            <div style={{ width: "33%" }}>
              <Image src={PROPS.productImg} />
            </div>
            <div style={{ width: "67%", padding: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography.Text>{PROPS.productName}</Typography.Text>
                <Typography.Text>${PROPS.productPrice}</Typography.Text>
              </div>
              <div>
                Quantity:
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={quantity}
                  onChange={handleQuantityChange}
                  style={{ width: "4rem", marginLeft: "1rem" }}
                />
              </div>
            </div>
          </div>
          <Divider style={{ width: "50%" }} />
          <div
            style={{
              width: "50%",
              padding: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography.Title level={5}>Subtotal</Typography.Title>
            <Typography.Text strong>${PROPS.productPrice}</Typography.Text>
          </div>
        </Layout>
      )}

      {currentScreen === "info" && (
        <Layout
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ width: "60%", padding: "1rem 3rem" }}>
            <Form layout="vertical">
              <Form.Item label="Contact Information">
                <Input placeholder="Full Name" />
                <Input placeholder="Email" />
                <Input placeholder="Phone Number" />
              </Form.Item>
              <Form.Item label="Shipping Address">
                <Input placeholder="City" />
                <Input placeholder="Address Line 1" />
                <Input placeholder="Address Line 2 (optional)" />
              </Form.Item>
              <div style={{ display: "flex" }}>
                <Button
                  type="primary"
                  onClick={() => setCurrentScreen("payment")}
                  style={{ marginRight: "1rem" }}
                >
                  Continue to Payment
                </Button>
                <Button onClick={() => setCurrentScreen("cart")}>
                  Return to Cart
                </Button>
              </div>
            </Form>
          </div>
          <Divider type="vertical" style={{ height: "100vh" }} />
          <div style={{ width: "40%", padding: "1rem" }}>Content</div>
        </Layout>
      )}
      {currentScreen === "payment" && <div>Payment</div>}
    </>
  );
};

export default Checkout;
