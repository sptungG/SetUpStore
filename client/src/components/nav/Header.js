import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Tooltip from "./Tooltip";
import { FaSearch, FaHome, FaStore, FaShoppingCart } from "react-icons/fa";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();

  const renderHeaderNav = () => {
    return (
      <ul className="header-nav">
        <li className={pathname === "/" ? "item show" : "item"} key="home">
          <Link to="/">
            <FaHome size={32} />
          </Link>
          <Tooltip content="Home" />
        </li>
        <li className={pathname === "/store" ? "item show" : "item"} key="store">
          <Link to="/store">
            <FaStore size={30} />
          </Link>
          <Tooltip content="Store" />
        </li>
        <li className={pathname === "/cart" ? "item show" : "item"} key="cart">
          <Link to="/cart">
            <FaShoppingCart size={28} />
          </Link>
          <Tooltip content="Cart" />
          <div className="item-badge">1</div>
        </li>
      </ul>
    );
  };

  const renderHeaderRight = () => {
    return (
      <div className="header-right">
        <Link data-key="login" to="/login" className="btn btn-login">
          Login
        </Link>
        <Link data-key="register" to="/register" className="btn btn-register">
          Register
        </Link>
      </div>
    );
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-left">
          <div className="header-logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/ecommerce-62fba.appspot.com/o/index.svg?alt=media&token=4582b9e5-16e0-4de1-a742-e1f0da3d3d62"
              alt="logo"
            />
            <Link to="/">SetUpStore</Link>
          </div>
          {renderHeaderNav()}
        </div>
        <div className="header-center">
          <form>
            <input type="text" placeholder="Type your product ..." />
            <button>
              <FaSearch size={18}/>
            </button>
          </form>
        </div>
        {renderHeaderRight()}
      </div>
    </header>
  );
}
export default Header;
