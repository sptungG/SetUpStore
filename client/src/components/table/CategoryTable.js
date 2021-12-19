import React from "react";
import { Link } from "react-router-dom";

import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";

import { Table, Button, Typography, Space, Popconfirm } from "antd";

import { BsTrash, BsThreeDots, BsCheckLg, BsXLg } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

function CategoryTable({ data, handleRemove }) {
  dayjs.extend(relativeTime);
  const columns = [
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
      sorter: (a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0),
      sortDirections: ["ascend"],
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 170,
      render: (text) => <Typography.Text>{dayjs(text).fromNow()}</Typography.Text>,
      sortDirections: ["ascend"],
      sorter: (a, b) => dayjs(b.updatedAt) - dayjs(a.updatedAt),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 170,
      render: (text) => <Typography.Text>{dayjs(text).format("DD/MM/YYYY")}</Typography.Text>,
      sortDirections: ["ascend"],
      sorter: (a, b) => dayjs(a.createdAt) - dayjs(b.createdAt),
    },
    {
      title: <BsThreeDots size={24} />,
      dataIndex: "",
      key: "action",
      width: 170,
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/category/${record.slug}`}>
            <Button size="large" type="text" icon={<BiEdit />}></Button>
          </Link>
          <Popconfirm
            title={
              <p>
                Sure to delete <b>{record.name}</b>
              </p>
            }
            placement="topRight"
            okText={<BsCheckLg />}
            cancelText={<BsXLg />}
            onConfirm={() => handleRemove(record.slug)}
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
      dataSource={data}
      pagination={{ pageSize: 4 }}
    />
  );
}

export default CategoryTable;
