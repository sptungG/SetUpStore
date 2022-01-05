import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Card, Col, Image, Typography, Space, Button, Statistic, Rate, Divider, Tooltip, Tag, Badge } from "antd";

import { FiHeart } from "react-icons/fi";
import { BsCartPlus, BsSearch } from "react-icons/bs";
import { ImFire } from "react-icons/im";
import _ from "lodash";

function ProductCard({ product, size = "default" }) {
  const { name, desc, images, slug, price } = product;
  const [tooltip, setTooltip] = React.useState("Click to add");

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");
      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const renderBadgeStatus = () => {
    if (product.quantity < 1) return <Tag color="error">Out of stock</Tag>;
    else if (product.sold / product.quantity > 0.5)
      return (
        <Tag icon={<ImFire />} color="success">
          Trending
        </Tag>
      );
  };

  const renderThumbnail = () => (
    <Badge offset={[-24, 0]} count={renderBadgeStatus()}>
      <Image
        alt={slug}
        height={180}
        width={"100%"}
        style={{ borderRadius: 8 }}
        src={images && images.length ? images[0].url : "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"}
        preview={{
          visible: false,
          mask: (
            <Space size={16}>
              <Link to={`/product/${slug}`}>
                <Button type="primary" shape="circle" size="large" icon={<BsSearch />}></Button>
              </Link>
              <Tooltip title={product.quantity < 1 ? "Out of Stock" : tooltip}>
                <Button type="primary" shape="circle" size="large" onClick={handleAddToCart} disabled={product.quantity < 1} icon={<BsCartPlus />}></Button>
              </Tooltip>
              <Button type="primary" shape="circle" size="large" icon={<FiHeart />}></Button>
            </Space>
          ),
        }}
      />
    </Badge>
  );

  const renderContent = () => (
    <Space direction="vertical" style={{ margin: "-16px" }}>
      {size === "default" ? (
        <>
          <Typography.Title level={3} style={{ maxWidth: 260, marginBottom: 0 }} ellipsis>
            {name}
          </Typography.Title>
          <Typography.Text ellipsis style={{ maxWidth: 280 }}>
            {desc}
          </Typography.Text>
        </>
      ) : (
        <>
          <Typography.Title level={4} style={{ maxWidth: 220, marginBottom: 0 }} ellipsis>
            {name}
          </Typography.Title>
          <Typography.Text ellipsis style={{ maxWidth: 240 }}>
            {desc}
          </Typography.Text>
        </>
      )}

      {/* <Statistic value={price} suffix={<Typography.Text underline>đ</Typography.Text>}/> */}
      <Space split={<Divider type="vertical" />}>
        <Rate disabled allowHalf defaultValue={2.5} />
        <Statistic groupSeparator="." valueStyle={{ fontSize: 20 }} value={price} suffix="$" />
      </Space>
    </Space>
  );

  return (
    <Col sm={12} lg={8} xxl={6}>
      <Card style={{ padding: 16 }} hoverable bordered={false} size="small" cover={renderThumbnail()}>
        {renderContent()}
      </Card>
    </Col>
  );
}

export default ProductCard;
