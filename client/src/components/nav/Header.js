import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

function Header() {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    console.log(e.target.dataset.key ?? "");
    // setCurrent(e.target.dataset.key);
  };

  return (
    <header className="header" onClick={handleClick}>
      <div className="container">
        <div className="header-left">
          <img src="https://firebasestorage.googleapis.com/v0/b/ecommerce-62fba.appspot.com/o/index.svg?alt=media&token=4582b9e5-16e0-4de1-a742-e1f0da3d3d62" alt="logo" />
          <Link data-key="home" to="/">
            SetUpStore
          </Link>
        </div>
        <div className="header-center">
          <form>
            <input type="text" placeholder="Type your product ..." />
            <button>
              <FaSearch />
            </button>
          </form>
        </div>
        <div className="header-right">
          <Link data-key="login" to="/login" className="btn btn-login">
            Login
          </Link>
          <Link data-key="register" to="/register" className="btn btn-register">
            Register
          </Link>
          <div className="cart">
            <Link data-key="cart" to="/">
              <FaShoppingCart size={28} />
            </Link>
            <div className="cart-badge">1</div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
