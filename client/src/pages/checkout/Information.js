import React from 'react'
import {
    Button,
    Layout,
    Divider,
    Form,
    Input,
  } from "antd";
import ProductSummary from "./ProductSummary";

const Information = ({setCurrentScreen, productData}) => {
    return (
        <Layout
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ width: "60%", padding: "2rem 3rem" }}>
            <Form layout="vertical">
              <Form.Item label="Contact Information">
                <Input placeholder="Full Name" style={{marginBottom: '1rem'}}/>
                <Input placeholder="Email" style={{marginBottom: '1rem'}}/>
                <Input placeholder="Phone Number" />
              </Form.Item>
              <Form.Item label="Shipping Address">
                <Input placeholder="City" style={{marginBottom: '1rem'}}/>
                <Input placeholder="Address Line 1" style={{marginBottom: '1rem'}}/>
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

          <div style={{ width: "40%", padding: "2rem 1rem" }}>
            <ProductSummary productData={productData}/>
          </div>
        </Layout>
    )
}

export default Information
