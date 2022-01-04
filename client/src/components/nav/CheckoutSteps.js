import React from "react";
import { useSelector } from "react-redux";
import { Typography, Steps, Row } from "antd";

function CheckoutSteps({ current }) {
  const { cart } = useSelector((state) => ({ ...state }));

  const renderDesc = () => (
    <p>
      <Typography.Link>{cart.length}</Typography.Link> products
    </p>
  );

  return (
    <Row style={{ marginBottom: 16, padding: "0 24px" }}>
      <Steps current={current}>
        <Steps.Step title="Cart" description={renderDesc()} />
        <Steps.Step title="Checkout" description={renderDesc()} />
        <Steps.Step title="Final" description={renderDesc()} />
      </Steps>
    </Row>
  );
}

export default CheckoutSteps;
