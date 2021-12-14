import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";

import { Row, Col, Layout, Menu, Dropdown, Badge, Button, Avatar, Typography } from "antd";

import { FaSearch, FaStore, FaShoppingCart, FaChevronDown, FaRegUserCircle } from "react-icons/fa";
import { FiLogOut, FiHeart } from "react-icons/fi";
import { RiHistoryFill, RiAdminLine } from "react-icons/ri";

function Header() {
  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));
  const size = "large";

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.replace("/login");
  };

  const renderHeaderNav = () => {
    return (
      <Menu mode="horizontal" style={{ marginLeft: "20px", lineHeight: "46px", backgroundColor: "transparent" }}>
        <Menu.Item key="store">
          <Link to="/store">
            <FaStore size={30} />
          </Link>
        </Menu.Item>
        <Menu.Item key="cart">
          <Badge count={0} showZero>
            <Link to="/cart">
              <FaShoppingCart size={28} />
            </Link>
          </Badge>
        </Menu.Item>
      </Menu>
    );
  };

  const renderLoginWrapper = () => {
    return (
      <>
        <Button type="link" shape="round" size={size}>
          <Link to="/login">Login</Link>
        </Button>
        <Button type="primary" shape="round" size={size}>
          <Link to="/register">Register</Link>
        </Button>
      </>
    );
  };

  const renderDropdownMenu = () => {
    const iconSize = 22;
    const dropdownItemStyle = "rounded-[4px]";
    const dropdownTextStyle = "p-[10px] flex items-center justify-between font-bold";
    const menu = (
      <Menu style={{ borderRadius: 8, padding: 8 }}>
        {user.role !== "admin" ? (
          <>
            <Menu.Item className={dropdownItemStyle}>
              <Link to="/user/history" className={dropdownTextStyle}>
                View profile <FaRegUserCircle size={iconSize} />
              </Link>
            </Menu.Item>
            <Menu.Item className={dropdownItemStyle}>
              <Link to="/user/wishlist" className={dropdownTextStyle}>
                Wishlist <FiHeart size={iconSize} />
              </Link>
            </Menu.Item>
            <Menu.Item className={dropdownItemStyle}>
              <Link to="/user/history" className={dropdownTextStyle}>
                History <RiHistoryFill size={iconSize} />
              </Link>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item className={dropdownItemStyle}>
            <Link to="/admin/dashboard" className={dropdownTextStyle}>
              Dashboard <RiAdminLine size={iconSize} />
            </Link>
          </Menu.Item>
        )}
        <Menu.Item className={dropdownItemStyle} onClick={logout}>
          <span className={dropdownTextStyle + " font-normal"}>
            Logout <FiLogOut size={iconSize} />
          </span>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <div className="flex items-center">
          <div className="flex items-center p-[2px] rounded-full border-solid border">
            <Avatar size="large" src={user.picture} alt="avatar" />
          </div>
          <Typography.Text type="secondary" style={{ width: 100, marginLeft: 5 }} ellipsis>
            {user.name}
          </Typography.Text>
          <FaChevronDown className="dropdown-caret" />
        </div>
      </Dropdown>
    );
  };

  const renderHeaderLeft = () => {
    return (
      <Row align="middle" style={{ height: 70 }}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/ecommerce-62fba.appspot.com/o/index.svg?alt=media&token=4582b9e5-16e0-4de1-a742-e1f0da3d3d62"
          alt="logo"
          style={{ height: "inherit" }}
        />
        <Link to="/" className="text-2xl font-bold">
          SetUpStore
        </Link>
      </Row>
    );
  };

  const renderHeaderCenter = () => {
    return (
      <Row align="middle" justify="center">
        <form className="w-full p-[5px] h-[52px] flex items-center rounded-full border-solid border">
          <input className="w-full p-[10px] h-[50px] bg-transparent border-none outline-0" type="text" placeholder="Type your product ..." />
          <Button type="primary" shape="round" size="large">
            <FaSearch size={18} />
          </Button>
        </form>
      </Row>
    );
  };

  return (
    <Layout.Header style={{ height: 70, background: "#fff", padding: "0 15px" }}>
      <Row justify="space-between" align="middle">
        <Col span={7}>{renderHeaderLeft()}</Col>
        <Col span={10}>{renderHeaderCenter()}</Col>
        <Col span={7}>
          <Row align="middle" justify="end">
            {!user ? renderLoginWrapper() : renderDropdownMenu()}
            {renderHeaderNav()}
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  );
}
export default Header;
