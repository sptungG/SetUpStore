import React from 'react'
import {
    Button,
    Layout,
    Divider,
    Form,
    Input,
  } from "antd";
import ProductSummary from "./ProductSummary";

const Payment = ({setCurrentScreen, productData}) => {
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
              <Form.Item label="Payment">
                <Input placeholder="Card Number" style={{marginBottom: '1rem'}}/>
                <Input placeholder="Name on Card" style={{marginBottom: '1rem'}}/>
                <Input placeholder="Expiration Date (DD/MM)" />
              </Form.Item>
              <Form.Item label="Billing Address">
                <Input placeholder="City" style={{marginBottom: '1rem'}}/>
                <Input placeholder="Address Line 1" style={{marginBottom: '1rem'}}/>
                <Input placeholder="Address Line 2 (optional)" />
              </Form.Item>
              <div style={{ display: "flex" }}>
                <Button
                  type="primary"
                  onClick={() => {}}
                  style={{ marginRight: "1rem" }}
                >
                  Pay Now
                </Button>
                <Button onClick={() => setCurrentScreen("info")}>
                  Return to Info
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

export default Payment
