import React from "react";
import { Link } from "react-router-dom";

import { Card, Col, Image, Typography, Space, Button, Statistic, Rate, Divider, Badge } from "antd";

import { FiHeart } from "react-icons/fi";
import { BsCartPlus, BsSearch } from "react-icons/bs";

function ProductCard({ product }) {
  const { name, desc, images, slug, price } = product;

  const renderThumbnail = () => (
    <Image
      alt={slug}
      height={180}
      style={{ borderRadius: 8 }}
      src={images && images.length ? images[0].url : "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"}
      preview={{
        visible: false,
        mask: (
          <Space size={16}>
            <Button type="primary" shape="circle" size="large" icon={<BsSearch />}></Button>
            <Button type="primary" shape="circle" size="large" icon={<BsCartPlus />}></Button>
            <Button type="primary" shape="circle" size="large" icon={<FiHeart />}></Button>
          </Space>
        ),
      }}
    />
  );

  const renderContent = () => (
    <Space direction="vertical">
      <Typography.Title level={3} style={{ maxWidth: 260, marginBottom: 0 }} ellipsis>
        {name}
      </Typography.Title>
      <Typography.Text ellipsis style={{ maxWidth: 280 }}>
        {desc}
      </Typography.Text>
      {/* <Statistic value={price} suffix={<Typography.Text underline>đ</Typography.Text>}/> */}
      <Space split={<Divider type="vertical" />}>
        <Rate disabled allowHalf defaultValue={2.5} />
        <Statistic groupSeparator="." valueStyle={{ fontSize: 20 }} value={price} suffix="$" />
      </Space>
    </Space>
  );

  return (
    <Col sm={12} lg={8} xl={6} xxl={6}>
      <Card style={{ padding: 16 }} hoverable bordered={false} size="small" cover={renderThumbnail()}>
        {renderContent()}
      </Card>
    </Col>
  );
}

export default ProductCard;
