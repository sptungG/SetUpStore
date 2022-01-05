import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/stripe/StripeCheckout";
import "../components/stripe/stripe.css";

import { Layout, Typography, Row, Col, Empty, Button, Statistic, Space, List, Card } from "antd";

import { userCart } from "../functions/user";
import CheckoutSteps from "../components/nav/CheckoutSteps";

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY || "pk_test_");

function Payment({ history }) {
  const [loading, setLoading] = React.useState(false);
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  return (
    <Layout.Content>
      <CheckoutSteps current={2} />
      <Row gutter={[24, 24]} justify="center">
        <Col span={12}>
          <Elements stripe={promise}>
            <StripeCheckout />
          </Elements>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Payment;
