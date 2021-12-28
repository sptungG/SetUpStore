import React from "react";
import { Link } from "react-router-dom";

import { Card, Col, Popconfirm, Typography } from "antd";

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { BsTrash, BsCheckLg, BsXLg } from "react-icons/bs";

function AdminProductCard({ product, handleRemove }) {
  const { _id, name, desc, images, slug } = product;

  return (
    <Col sm={24} lg={12} xl={8} xxl={6}>
      <Card
        bordered={true}
        key={_id}
        cover={
          <img
            alt={_id}
            height={150}
            src={images && images.length ? images[0].url : "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"}
          />
        }
        actions={[
          <Link to={`/admin/product/${slug}`}>
            <FaRegEdit key="edit" />
          </Link>,
          <Popconfirm
            title={
              <p>
                Sure to delete <b>{name}</b> ?
              </p>
            }
            placement="topRight"
            okText={<BsCheckLg />}
            cancelText={<BsXLg />}
            onConfirm={() => handleRemove(slug)}
          >
            <FaRegTrashAlt />
          </Popconfirm>,
        ]}
      >
        <Card.Meta
          title={
            <Typography.Title level={4} style={{ marginBottom: 0 }} ellipsis>
              {name}
            </Typography.Title>
          }
          description={<Typography.Text ellipsis>{desc}</Typography.Text>}
        />
      </Card>
    </Col>
  );
}

export default AdminProductCard;
