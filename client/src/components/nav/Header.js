import React from "react";
import { Link, useLocation } from "react-router-dom";
import Tooltip from "./Tooltip";
import { FaSearch, FaStore, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));

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
      <div className="header-nav">
        <ul>
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
      </div>
    );
  };

  const renderLoginWrapper = () => {
    return (
      <>
        <Link data-key="login" to="/login" className="btn btn-login">
          Login
        </Link>
        <Link data-key="register" to="/register" className="btn btn-register">
          Register
        </Link>
      </>
    );
  };

  const renderDropdownMenu = () => {
    return (
      <div className="dropdown">
        <div className="dropdown-select">
          <div className="header-avatar">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/ecommerce-62fba.appspot.com/o/user.png?alt=media&token=bc8dc5bb-237f-497d-b59c-9672753d778b"
              alt="avatar"
            />
          </div>
          <span className="header-name">{user.email && user.email.split("@")[0]}</span>
          <FaChevronDown className="dropdown-caret" />
        </div>
        <ul className="dropdown-list">
          <li className="dropdown-item">
            <span className="dropdown-text">New project</span>
          </li>
          <li className="dropdown-item">
            <span className="dropdown-text">View profile</span>
          </li>
          <li className="dropdown-item">
            <span className="dropdown-text">Settings</span>
          </li>
          <li className="dropdown-item" onClick={logout}>
            <span className="dropdown-text">Logout</span>
            <FiLogOut className="dropdown-icon" />
          </li>
        </ul>
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
        </div>
        <div className="header-center">
          <form>
            <input type="text" placeholder="Type your product ..." />
            <button>
              <FaSearch size={18} />
            </button>
          </form>
        </div>
        <div className="header-right">
          {!user ? renderLoginWrapper() : renderDropdownMenu()}
          {renderHeaderNav()}
        </div>
      </div>
    </header>
  );
}
export default Header;
