import React from 'react'
import {
    Typography,
    Image,
    Divider,
  } from "antd";

const ProductSummary = ({productData}) => {

    return (
        <>
            <div style={{ display: "flex", width: "100%" }}>
              <Image width={100} src={productData.productImg} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flex: "1",
                  margin: "auto 1rem",
                }}
              >
                <Typography.Text>{productData.productName}</Typography.Text>
                <Typography.Text>${productData.productPrice}</Typography.Text>
              </div>
            </div>

            <Divider style={{ width: "100%" }}  />

            <div style={{
                  display: "flex",
                  justifyContent: "space-between", margin: "auto 1rem",
                }}>
              <Typography.Text>Subtotal</Typography.Text>
              <Typography.Text strong>${productData.productPrice}</Typography.Text>
            </div>
            <div style={{
                  display: "flex",
                  justifyContent: "space-between", margin: "auto 1rem",
                }}>
              <Typography.Text>Shipping</Typography.Text>
              <Typography.Text strong>${productData.shippingFee}</Typography.Text>
            </div>

            <Divider style={{ width: "100%" }}  />
            <div style={{
                  display: "flex",
                  justifyContent: "space-between", margin: "auto 1rem", alignItems: 'center'
                }}>
              <Typography.Text strong>Total</Typography.Text>
              <Typography.Text strong style={{fontSize: '1.5rem'}}>${productData.productPrice + productData.shippingFee}</Typography.Text>
            </div>
        </>
    )
}

export default ProductSummary
