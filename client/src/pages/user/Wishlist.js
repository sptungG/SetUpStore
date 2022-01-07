import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { List, Layout, Popconfirm, Button, Typography, Row, Col, Space, Card, Avatar, Progress, Tag } from "antd";
import { BsTrash, BsCheckLg, BsXLg } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

import Loader from "../../components/loader/Loader";
import Profile from "../../components/profile/Profile";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";

function Wishlist() {
  const [wishlist, setWishlist] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => setLoading(true);
  getWishlist(user.token).then((res) => {
    // console.log(res);
    setWishlist(res.data.wishlist);
    setLoading(false);
  });

  const handleRemove = (productId) => {
    setLoading(true);
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
      setLoading(false);
    });
  };

  return (
    <Layout.Content>
      {loading ? <Loader /> : ""}
      <Row gutter={[24, 24]}>
        <Col flex="none">
          <Profile />
          <UserNav />
        </Col>
        <Col flex="auto">
          <Card>
            <h1 className="text-demo">User Wishlist page</h1>
            <List
              itemLayout="vertical"
              size="large"
              loading={loading}
              dataSource={wishlist}
              renderItem={(item) => (
                <List.Item
                  extra={
                    <Popconfirm
                      title={
                        <p>
                          Sure to remove <b>{item.name}</b>?
                        </p>
                      }
                      placement="topRight"
                      okText={<BsCheckLg />}
                      cancelText={<BsXLg />}
                      onConfirm={() => handleRemove(item._id)}
                    >
                      <Button size="large" type="text" danger icon={<BsTrash />}></Button>
                    </Popconfirm>
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar size={100} shape="square" src={item.images && item.images.length ? item.images[0].url : ""} />}
                    title={
                      <Space>
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>{" "}
                        <Tag color="volcano" icon={<FaHeart />} style={{ padding: "4px 8px", border: 0, display: "flex", alignItems: "center", gap: 4 }}>
                          {item.wishlist.length}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Space direction="vertical">
                        <Typography.Text ellipsis style={{ maxWidth: 480 }}>
                          {item.desc}
                        </Typography.Text>
                        <Space>
                          <Typography.Text>Sold</Typography.Text>
                          <Progress
                            style={{ width: 240 }}
                            strokeColor={{
                              from: "#f56766",
                              to: "#faad14",
                            }}
                            percent={((item.sold / (item.quantity + item.sold)) * 100).toFixed(2)}
                            strokeWidth={12}
                            status="active"
                          />
                        </Space>
                      </Space>
                    }
                    style={{ marginBottom: 0 }}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Wishlist;
