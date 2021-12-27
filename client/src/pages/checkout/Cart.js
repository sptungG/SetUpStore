import React from 'react'
import {
    Typography,
    Button,
    Layout,
    Image,
    InputNumber,
    Divider,
  } from "antd";

const Cart = ({setCurrentScreen, quantity, handleQuantityChange, productData}) => {
    return (
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
              <Image src={productData.productImg} />
            </div>
            <div style={{ width: "67%", padding: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography.Text>{productData.productName}</Typography.Text>
                <Typography.Text>${productData.productPrice}</Typography.Text>
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
            <Typography.Text strong>${productData.productPrice}</Typography.Text>
          </div>
        </Layout>
    )
}

export default Cart
