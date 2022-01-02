import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Card, Col, Image, Typography, Space, Button, Statistic, Rate, Divider, Tooltip } from "antd";

import { FiHeart } from "react-icons/fi";
import { BsCartPlus, BsSearch } from "react-icons/bs";
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
            <Link to={`/product/${slug}`}>
              <Button type="primary" shape="circle" size="large" icon={<BsSearch />}></Button>
            </Link>
            <Tooltip title={tooltip}>
              <Button type="primary" shape="circle" size="large" onClick={handleAddToCart} icon={<BsCartPlus />}></Button>
            </Tooltip>
            <Button type="primary" shape="circle" size="large" icon={<FiHeart />}></Button>
          </Space>
        ),
      }}
    />
  );

  const renderContent = () => (
    <Space direction="vertical">
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
    <Col sm={12} lg={8} xl={6} xxl={6}>
      <Card style={{ padding: 16 }} hoverable bordered={false} size="small" cover={renderThumbnail()}>
        {renderContent()}
      </Card>
    </Col>
  );
}

export default ProductCard;
