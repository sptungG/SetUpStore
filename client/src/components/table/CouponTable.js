import React from "react";
import { Link } from "react-router-dom";

import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";

import { Table, Button, Typography, Space, Popconfirm } from "antd";
import { formatFromNow, formatDate, sorterByDate } from "../../common/utils";

import { BsTrash, BsThreeDots, BsCheckLg, BsXLg } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

function CouponTable({ data, handleRemove }) {
  dayjs.extend(relativeTime);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
      sorter: (a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: 170,
      render: (text) => <Typography.Text>{text}%</Typography.Text>,
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: "Expiry",
      dataIndex: "expiry",
      key: "expiry",
      width: 170,
      render: (text) => <Typography.Text>{formatDate(text)}</Typography.Text>,
      sorter: (a, b) => sorterByDate("expiry")(a, b),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 170,
      render: (text) => <Typography.Text>{formatFromNow(text)}</Typography.Text>,
      sorter: (a, b) => sorterByDate("createdAt")(a, b),
    },
    {
      title: <BsThreeDots size={24} />,
      dataIndex: "",
      key: "action",
      width: 170,
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title={
              <p>
                Sure to delete <b>{record.name}</b> ?
              </p>
            }
            placement="topRight"
            okText={<BsCheckLg />}
            cancelText={<BsXLg />}
            onConfirm={() => handleRemove(record._id)}
          >
            <Button size="large" type="text" danger icon={<BsTrash />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      title={() => ""}
      footer={() => (
        <p style={{ position: "absolute" }}>
          Total <b>{data.length}</b> items
        </p>
      )}
      rowKey={(record) => record._id}
      dataSource={data}
      pagination={{ pageSize: 4 }}
    />
  );
}

export default CouponTable;
