import React from "react";
import { Statistic, Space, Divider, Typography, Row, Button } from "antd";

import { formatDate, setColor, formatFromNow, isSameTime } from "../../common/utils";

import { BsFillPrinterFill } from "react-icons/bs";

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <Row justify="space-between">
    <Space direction="vertical">
      <Space split={<Divider type="vertical" />}>
        <span>Order Id: {order.paymentIntent.id}</span>
        <Space>
          Amount: <Statistic valueStyle={{ fontSize: 18 }} value={order.paymentIntent.amount / 100} groupSeparator="." prefix="$" />
        </Space>
        {showStatus && (
          <span>
            STATUS:{" "}
            <Typography.Text strong type={setColor(order.orderStatus)}>
              {order.orderStatus}
            </Typography.Text>
            {!isSameTime(order.updatedAt, order.createdAt) && <Typography.Text type="secondary">--{formatFromNow(order.updatedAt)}</Typography.Text>}
          </span>
        )}
      </Space>
      <Space split={<Divider type="vertical" />}>
        <span>Payment: {capitalizeFirstLetter(order.paymentIntent.status)}</span>
        <span>Method: {capitalizeFirstLetter(order.paymentIntent.payment_method_types[0])}</span>
        <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
        <span>Ordered on: {formatDate(order.paymentIntent.created * 1000, "DD/MM/YYYY HH:mm:ss")}</span>
      </Space>
    </Space>
    <Button size="large" type="link" style={{ gap: 4 }} icon={<BsFillPrinterFill />}>
      PDF
    </Button>
  </Row>
);

export default ShowPaymentInfo;
