import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { BiCategory, BiStore } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { CgMenuBoxed } from "react-icons/cg";
import { RiHistoryFill, RiSettings4Line, RiDashboardLine, RiCouponLine } from "react-icons/ri";

function UserNav() {
  let { user } = useSelector((state) => ({ ...state }));
  const { pathname } = useLocation();

  const renderUserNav = () => {
    return (
      <ul className="nav-list">
        <li className={pathname === "/user/wishlist" ? "nav-item active" : "nav-item"}>
          <Link to="/user/wishlist" className="nav-text">
            <FiHeart className="nav-icon" />
            <span>Wishlist</span>
          </Link>
        </li>
        <li className={pathname === "/user/history" ? "nav-item active" : "nav-item"}>
          <Link to="/user/history" className="nav-text">
            <RiHistoryFill className="nav-icon" />
            <span>History</span>
          </Link>
        </li>
        <li className={pathname === "/user/setting" ? "nav-item active" : "nav-item"}>
          <Link to="/user/setting" className="nav-text">
            <RiSettings4Line className="nav-icon" />
            <span>Setting</span>
          </Link>
        </li>
      </ul>
    );
  };

  const renderAdminNav = () => {
    return (
      <ul className="nav-list">
        <li className={pathname === "/admin/dashboard" ? "nav-item active" : "nav-item"}>
          <Link to="/admin/dashboard" className="nav-text">
            <RiDashboardLine className="nav-icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={pathname === "/admin/product" ? "nav-item active" : "nav-item"}>
          <Link to="/admin/product" className="nav-text">
            <BiStore className="nav-icon" />
            <span>Product</span>
          </Link>
        </li>
        <li className={pathname === "/admin/category" ? "nav-item active" : "nav-item"}>
          <Link to="/admin/category" className="nav-text">
            <BiCategory className="nav-icon" />
            <span>Category</span>
          </Link>
        </li>
        <li className={pathname === "/admin/sub" ? "nav-item active" : "nav-item"}>
          <Link to="/admin/sub" className="nav-text">
            <BiCategory className="nav-icon" />
            <span>Sub-category</span>
          </Link>
        </li>
        <li className={pathname === "/admin/coupon" ? "nav-item active" : "nav-item"}>
          <Link to="/admin/coupon" className="nav-text">
            <RiCouponLine className="nav-icon" />
            <span>Coupon</span>
          </Link>
        </li>

        <li className={pathname === "/user/setting" ? "nav-item active" : "nav-item"}>
          <Link to="/user/setting" className="nav-text">
            <RiSettings4Line className="nav-icon" />
            <span>Setting</span>
          </Link>
        </li>
      </ul>
    );
  };
  return (
    <div className="nav-container">
      <div className="nav-title">
        <CgMenuBoxed className="nav-icon" />
        <span>Menu</span>
      </div>
      {user.role === "admin" ? renderAdminNav() : renderUserNav()}
    </div>
  );
}

export default UserNav;
