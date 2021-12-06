import React from "react";
import { Link, useLocation } from "react-router-dom";

import { FiHeart } from "react-icons/fi";
import { RiHistoryFill, RiSettings4Line } from "react-icons/ri";
function UserNav() {
  const { pathname } = useLocation();
  return (
    <ul className="nav-side">
      <li className={pathname === "/user/wishlist" ? "nav-item active" : "nav-item"}>
        <FiHeart className="nav-icon" />
        <Link to="/user/wishlist" className="nav-text">
          Wishlist
        </Link>
      </li>
      <li className={pathname === "/user/history" ? "nav-item active" : "nav-item"}>
        <RiHistoryFill className="nav-icon" />
        <Link to="/user/history" className="nav-text">
          History
        </Link>
      </li>
      <li className={pathname === "/user/password" ? "nav-item active" : "nav-item"}>
        <RiSettings4Line className="nav-icon" />
        <Link to="/user/password" className="nav-text">
          Password
        </Link>
      </li>
    </ul>
  );
}

export default UserNav;
