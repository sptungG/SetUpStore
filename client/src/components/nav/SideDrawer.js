import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Drawer, Button, List, Avatar, Typography, Badge } from "antd";

function SideDrawer({ children }) {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  return (
    <Drawer
      title={`Cart / ${cart.length} Product`}
      placement="right"
      closable={false}
      visible={drawer}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
    >
      <List
        itemLayout="vertical"
        dataSource={cart}
        rowKey={(item) => item._id}
        footer={
          <Link to="/cart">
          <Badge count={cart.length}>
            <Button
              block
              type="primary"
              size="large"
              style={{width: 320}}
              onClick={() =>
                dispatch({
                  type: "SET_VISIBLE",
                  payload: false,
                })
              }
            >
              Go To Cart
            </Button>
          </Badge>
          </Link>
        }
        renderItem={(item) => (
          <List.Item key={item._id}>
            <List.Item.Meta
              avatar={<Avatar size={100} shape="square" src={item.images && item.images.length ? item.images[0].url : ""} />}
              title={item.name}
              description={
                <Typography.Text ellipsis style={{ maxWidth: 160 }}>
                  {item.desc}
                </Typography.Text>
              }
              style={{marginBottom: 0}}
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
}

export default SideDrawer;
