import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { Menu, Card, Space, Typography } from "antd";
import { BiCategory, BiStore } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { CgMenuBoxed } from "react-icons/cg";
import { RiHistoryFill, RiSettings4Line, RiDashboardLine, RiCouponLine } from "react-icons/ri";

function UserNav() {
  let { user } = useSelector((state) => ({ ...state }));
  let { pathname } = useLocation();

  const renderUserNav = () => {
    return (
      <Menu mode="inline" selectedKeys={[pathname]}>
        <Menu.Item icon={<FiHeart />} key="/user/wishlist">
          <Link to="/user/wishlist">Wishlist</Link>
        </Menu.Item>
        <Menu.Item icon={<RiHistoryFill />} key="/user/history">
          <Link to="/user/history">History</Link>
        </Menu.Item>
        <Menu.Item icon={<RiSettings4Line />} key="/user/setting">
          <Link to="/user/setting">Setting</Link>
        </Menu.Item>
      </Menu>
    );
  };

  const renderAdminNav = () => {
    return (
      <Menu mode="inline" selectedKeys={[pathname]}>
        <Menu.Item icon={<RiDashboardLine />} key="/admin/dashboard">
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item icon={<BiStore />} key="/admin/product">
          <Link to="/admin/product">Product</Link>
        </Menu.Item>
        <Menu.Item icon={<BiCategory />} key="/admin/category">
          <Link to="/admin/category">Category</Link>
        </Menu.Item>
        <Menu.Item icon={<BiCategory />} key="/admin/sub">
          <Link to="/admin/sub">Sub-category</Link>
        </Menu.Item>
        <Menu.Item icon={<RiCouponLine />} key="/admin/coupon">
          <Link to="/admin/coupon">Coupon</Link>
        </Menu.Item>
        <Menu.Item icon={<RiSettings4Line />} key="/user/setting">
          <Link to="/user/setting">Setting</Link>
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <Card>
      <Space>
        <CgMenuBoxed size={24} />
        <Typography.Title level={3}>Menu</Typography.Title>
      </Space>
      {user.role === "admin" ? renderAdminNav() : renderUserNav()}
    </Card>
  );
}

export default UserNav;
