import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { Card, Row, Col, Space, Button, Tooltip } from "antd";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { FiHeart } from "react-icons/fi";
import { BsCartPlus, BsStar } from "react-icons/bs";
import ProductListItems from "./ProductListItems";

const SingleProduct = ({ product }) => {
  const { images, slug } = product;
  const [tooltip, setTooltip] = React.useState("Click to add");

  // redux
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
    }
  };

  return (
    <Row gutter={[24, 0]} wrap={false} style={{ marginTop: 24 }}>
      <Col span={12}>
        {images && images.length ? (
          <Carousel autoPlay infiniteLoop thumbWidth={100} interval={3000}>
            {images && images.map((item) => <img src={item.url} alt={item.public_id} key={item.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={"https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"} alt={slug} height={450} />}></Card>
        )}
      </Col>
      <Col span={12}>
        <Space direction="vertical" size={48}>
          <Card bordered={false} style={{ margin: 0 }}>
            <ProductListItems product={product} />

            <Row gutter={[24, 24]} wrap={false} justify="center" style={{ marginTop: 24 }}>
              <Col span={8}>
                <Tooltip title={product.quantity < 1 ? "Out of Stock" : tooltip}>
                  <Button type="primary" block size="large" disabled={product.quantity < 1} onClick={handleAddToCart} icon={<BsCartPlus />}>
                    {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
                  </Button>
                </Tooltip>
              </Col>
              <Col span={8}>
                <Button type="link" block size="large" icon={<FiHeart />}>
                  Add to Wishlist
                </Button>
              </Col>
              <Col span={8}>
                <Button type="link" block size="large" icon={<BsStar />}>
                  Rating
                </Button>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default SingleProduct;
