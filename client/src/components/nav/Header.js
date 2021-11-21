import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    console.log(e.key);
    setCurrent(e.key);
  };

  return (
    <header className="header" onClick={handleClick}>
      <div className="container">
        <div key="home" className="header-left">
          <img src="./index.svg" alt="logo" />
          <Link to="/"><span>SetUpStore</span></Link>
        </div>
        <div className="header-center">
          <form>
            <input type="email" placeholder="Type your product ..." />
            <button><FaSearch /></button>
          </form>
        </div>
        <div className="header-right">
          <div key="login" className="btn btn-login">
            <Link to="/login">Login</Link>
          </div>
          <div key="register" className="btn btn-register">
            <Link to="/register">Register</Link>
          </div>
          <div key="cart" className="cart">
            <Link to="/"><FaShoppingCart size={28}/></Link>
            <div className="cart-badge">1</div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
