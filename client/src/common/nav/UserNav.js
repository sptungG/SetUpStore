import React from "react";
import { Link, useLocation } from "react-router-dom";

import { FiHeart } from "react-icons/fi";
import { CgMenuBoxed } from "react-icons/cg";
import { RiHistoryFill, RiSettings4Line } from "react-icons/ri";
function UserNav() {
  const { pathname } = useLocation();
  return (
    <div className="nav-container">
      <div className="nav-title">
        <CgMenuBoxed className="nav-icon"/>
        <span>Menu</span>
      </div>
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
    </div>
  );
}

export default UserNav;
