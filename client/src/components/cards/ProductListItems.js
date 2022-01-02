import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Image, Typography, Space, Button, Statistic, Rate, Divider, Tag } from "antd";
function ProductListItems({ product }) {
  const { name, desc, price, category, subs, shipping, color, brand, quantity, sold } = product;

  const renderDetail = (col1, col2) => {
    return (
      <Row gutter={[24, 24]} wrap={false}>
        <Col span={8}>{col1}</Col>
        <Col span={12}>{col2}</Col>
      </Row>
    );
  };

  return (
    <Space size={14} direction="vertical">
      <Space>
        <Typography.Title level={2}>{name}</Typography.Title>
        <Typography.Text type="secondary">{brand}</Typography.Text>
      </Space>
      <Typography.Paragraph style={{margin: 0}}>{desc}</Typography.Paragraph>
      <Space split={<Divider type="vertical" />} style={{marginBottom: 16}}>
        <Space>
          <Rate disabled allowHalf defaultValue={2.5} />
          <Typography.Text>{0}</Typography.Text>
        </Space>
        <Space>
          <Typography.Text>Sold</Typography.Text>
          <Statistic groupSeparator="." valueStyle={{ fontSize: 20 }} value={sold} />
        </Space>
        <Statistic groupSeparator="." valueStyle={{ fontSize: 20 }} value={price} suffix="$" />
      </Space>

      {renderDetail(<Typography.Text>Category</Typography.Text>, category && <Link to={`/category/${category.slug}`}>{category.name}</Link>)}
      {renderDetail(
        <Typography.Text>Sub Categories</Typography.Text>,
        subs && (
          <Space size={24}>
            {subs.map((s) => (
              <Link key={s._id} to={`/sub/${s.slug}`}>
                {s.name}
              </Link>
            ))}
          </Space>
        )
      )}
      {renderDetail(
        <Typography.Text>Shipping</Typography.Text>,
        shipping && (
          <Tag color={shipping.toLowerCase() === "yes" ? "success" : "error"}>
            {shipping}
          </Tag>
        )
      )}
      {renderDetail(
        <Typography.Text>Color</Typography.Text>,
        color && (
          <Tag color={color.toLowerCase() !== "white" && color.toLowerCase()}>
            {color}
          </Tag>
        )
      )}
      {renderDetail(<Typography.Text>Brand</Typography.Text>, <Typography.Text>{brand}</Typography.Text>)}
      {renderDetail(<Typography.Text>Available</Typography.Text>, <Typography.Text>{quantity}</Typography.Text>)}
    </Space>
  );
}

export default ProductListItems;
