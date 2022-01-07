import React from "react";

import { Table, Typography, Space, Row, Col, Avatar, Select, Statistic } from "antd";

import { formatDate, sorterByDate } from "../../common/utils";
import OrderProductsList from "../list/OrderProductsList";

function OrderTable({ loading, data, handleStatusChange }) {
  const columns = [
    {
      title: "User",
      dataIndex: "orderedBy",
      key: "orderedBy",
      render: (text) => (
        <Space>
          <Avatar size="large" shape="circle" src={text.picture} key={text._id} />
          <Typography.Text>{text.name}</Typography.Text>
        </Space>
      ),
      // sorter: (a, b) => (a.orderedBy.name > b.orderedBy.name ? 1 : b.orderedBy.name > a.orderedBy.name ? -1 : 0),
    },
    {
      title: "OrderId",
      dataIndex: ["paymentIntent", "id"],
      key: "id",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "CreatedAt",
      dataIndex: ["paymentIntent", "created"],
      key: "create",
      width: 160,
      render: (text) => <Typography.Text>{formatDate(text * 1000, "DD/MM/YYYY HH:mm:ss")}</Typography.Text>,
      sorter: (a, b) => sorterByDate("createdAt")(a, b),
    },
    {
      title: "Total$$",
      dataIndex: ["paymentIntent", "amount"],
      key: "amount",
      width: 120,
      render: (text) => <Statistic valueStyle={{ fontSize: 18 }} value={text / 100} groupSeparator="." prefix="$" />,
      sorter: (a, b) => a.paymentIntent.amount - b.paymentIntent.amount,
    },
    {
      title: "Delivery Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      width: 200,
      render: (text, record) => (
        <Select onSelect={(value) => handleStatusChange(record._id, value)} value={text} placeholder="Select status.." style={{ width: "100%" }}>
          <Select.Option value="Not Processed">Not Processed</Select.Option>
          <Select.Option value="Processing">Processing</Select.Option>
          <Select.Option value="Dispatched">Dispatched</Select.Option>
          <Select.Option value="Cancelled">Cancelled</Select.Option>
          <Select.Option value="Completed">Completed</Select.Option>
        </Select>
      ),
      filters: [...["Not Processed", "Processing", "Dispatched", "Cancelled", "Completed"].map((item) => ({ text: item, value: item }))],
      onFilter: (value, record) => record.orderStatus === value,
    },
  ];

  return (
    <Table
      loading={loading}
      columns={columns}
      title={() => ""}
      footer={() => ""}
      rowKey={(record) => record._id}
      dataSource={data}
      pagination={{
        position: ["topRight"],
        total: data.length,
        showTotal: (total) => (
          <p style={{ marginRight: 16 }}>
            Total <b>{total}</b> items
          </p>
        ),
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "50"],
      }}
      expandable={{
        expandedRowRender: (record) => (
          <Row justify="end">
            <Col span={23}>
              <OrderProductsList loading={loading} order={record} />
            </Col>
          </Row>
        ),
      }}
    />
  );
}

export default OrderTable;
