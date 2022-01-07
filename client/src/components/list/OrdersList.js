import React from "react";

import { List } from "antd";
import OrderProductsList from "./OrderProductsList";

function OrdersList({ loading, orders }) {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        total: orders.length,
        showTotal: (total) => `Total ${total} items`,
        pageSize: 3,
      }}
      dataSource={orders}
      renderItem={(order) => <OrderProductsList loading={loading} order={order} />}
    />
  );
}

export default OrdersList;
